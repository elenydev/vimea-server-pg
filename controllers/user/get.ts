import Prisma from "../../prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { RequestHandler } from "express";
import { errorResponse } from "../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../utils/validationErrorResponse";
import {
  GetCurrentUserQueryParams,
  GetUserFavouritesQueryParams,
} from "../../infrastructure/interfaces/User";

export const favouriteMovies: RequestHandler<GetUserFavouritesQueryParams> =
  async (req, res) => {
    const { userId, pageNumber, pageSize } = req.params;

    const validationStatus = validationResult(req);
    if (!validationStatus.isEmpty()) {
      return validationErrorResponse(res, validationStatus);
    }

    try {
      const user = await Prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          favouriteMovies: {
            skip: Number(pageNumber) * Number(pageSize),
            take: Number(pageSize),
          },
          _count: {
            select: {
              favouriteMovies: true,
            },
          },
        },
      });

      if (user) {
        const { favouriteMovies, _count } = user;
        res.status(200).send({
          results: favouriteMovies,
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalCount: _count,
        });
      } else {
        errorResponse(res, 404, "User not found");
      }
    } catch (err) {
      errorResponse(res, 500);
    }
  };

export const currentUser: RequestHandler<GetCurrentUserQueryParams> = async (
  req,
  res
) => {
  const { userId } = req.params;

  const validationStatus = validationResult(req.params);
  if (!validationStatus.isEmpty()) {
    return validationErrorResponse(res, validationStatus);
  }

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
      const token = jwt.sign(
        { email: user.email, userId: user.id },
        process.env.SECRET!,
        { expiresIn: "1h" }
      );
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 60 * 60,
          path: "/",
        })
      );
      const { firstName, lastName, avatarUrl, email, favouriteMovies, id } =
        user;
      res.status(200).send({
        result: {
          firstName,
          lastName,
          email,
          avatarUrl,
          userId: id,
          accessToken: token,
          favouriteMovies: favouriteMovies,
        },
      });
    } else {
      errorResponse(res, 404, "User not found");
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
