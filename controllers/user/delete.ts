import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { EmptyInterface } from "../../infrastructure/interfaces/shared";
import { DeleteUserFavouriteMovieParams, UserIdQueryParam } from "../../infrastructure/interfaces/User";
import prisma from "../../prisma";
import { errorResponse } from "../../utils/errorResponse";
import { validationErrorResponse } from "../../utils/validationErrorResponse";

export const logOut: RequestHandler<EmptyInterface, EmptyInterface, UserIdQueryParam> = async (
  req,
  res
) => {
  const { userId } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user) {
      res.status(200).send({ message: "Logged out", token: "" });
    } else {
      errorResponse(
        res,
        401,
        "We can't delete session for this user, as he's doesn't exist"
      );
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};

export const favouriteMovie: RequestHandler<DeleteUserFavouriteMovieParams> =
  async (req, res) => {
    const { userId, movieId } = req.params;

    const validationStatus = validationResult(req);
    if (!validationStatus.isEmpty()) {
      validationErrorResponse(res, validationStatus);
    }

    try {
      const user = await prisma.user.findFirst({ where: { id: userId } });
      if (user) {
        const movieToDelete = await prisma.movie.findFirst({
          where: { id: movieId },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            favouriteMovies: {
              delete: {
                id: movieToDelete?.id,
              },
            },
          },
        });
        res.status(201).send({
          message: "Favourite movie succesfully removed",
        });
      } else {
        errorResponse(res, 404, "Some authorization error occured");
      }
    } catch (err) {
      errorResponse(res, 500);
    }
  };
