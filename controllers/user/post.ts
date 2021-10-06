import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { errorResponse } from "../../utils/errorResponse";
import Prisma from "../../prisma";
import { sendEmailAfterUserRegister } from "../mailers/index";
import {
  PostUserFavouriteMovieBody,
  UserCreateParams,
  UserCredentials,
  UserIdQueryParam,
} from "../../infrastructure/interfaces/User";
import { validationErrorResponse } from "../../utils/validationErrorResponse";
import { uploadFile } from "../../config/s3-bucket";
import jwt from "jsonwebtoken";
import { EmptyInterface } from "../../infrastructure/interfaces/shared";

export const create: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  UserCreateParams
> = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const avatar = req.file;

  if (!avatar) {
    errorResponse(res, 400, "Avatar is required");
  }

  const validationStatus = validationResult(req.body);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const existingUser = await Prisma.user.findFirst({
      where: { email: email },
    });

    if (!existingUser) {
      const imageUrl = avatar!.filename;
      await uploadFile(avatar!);
      const hashedPw = await bcrypt.hash(password, 12);
      await Prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash: hashedPw,
          avatarUrl: imageUrl,
          policy: true,
        },
      });

      res.status(201).send({ message: "User successfully created" });
      sendEmailAfterUserRegister(firstName, email);
    } else {
      errorResponse(res, 422, "User already exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};

export const login: RequestHandler<
  EmptyInterface,
  EmptyInterface,
  UserCredentials
> = async (req, res) => {
  const { email, password } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await Prisma.user.findFirst({
      where: { email: email },
      include: { favouriteMovies: true },
    });

    if (user !== null) {
      await bcrypt
        .compare(password, user.passwordHash)
        .then((match) => {
          if (match) {
            const {
              firstName,
              lastName,
              email,
              avatarUrl,
              id,
              favouriteMovies,
            } = user;
            const token = jwt.sign(
              { email: email, userId: id },
              process.env.SECRET!,
              { expiresIn: "1h" }
            );

            return res.status(201).send({
              result: {
                firstName,
                lastName,
                email,
                avatarUrl,
                userId: id,
                accessToken: token,
                favouriteMovies: favouriteMovies,
              },
              message: "Successfull authorization",
            });
          } else {
            errorResponse(
              res,
              401,
              "Wrong password or email provided, please try again"
            );
          }
        })
        .catch((err) => errorResponse(res, 400, err));
    } else {
      errorResponse(res, 404, "User doesn't exist");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};

export const favouriteMovie: RequestHandler<
  UserIdQueryParam,
  EmptyInterface,
  PostUserFavouriteMovieBody
> = async (req, res) => {
  const { movie } = req.body;
  const { userId } = req.params;

  try {
    const user = await Prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        favouriteMovies: true,
      },
    });

    if (user) {
      const isAlreadyAdded = user.favouriteMovies.find(
        ({ externalApiId }) => externalApiId === movie.id
      );

      if (!isAlreadyAdded) {
        const movieInstance = await Prisma.movie.findFirst({
          where: { externalApiId: movie.id },
        });

        await Prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            favouriteMovies: {
              connectOrCreate: {
                where: {
                  id: movieInstance?.id,
                },
                create: {
                  externalApiId: movie.id,
                  title: movie.title,
                  averageVote: movie.vote_average,
                  overview: movie.overview,
                  backdropPathUrl: movie.backdrop_path,
                },
              },
            },
          },
        });
        res.status(201).send({
          message: "Favourite movie succesfully added",
        });
      } else {
        errorResponse(
          res,
          404,
          "This movie already exist in your favourites movies"
        );
      }
    } else {
      errorResponse(res, 404, "Some authorization error occured");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
