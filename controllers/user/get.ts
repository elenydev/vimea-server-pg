import Prisma from "../../prisma";
import { RequestHandler } from "express";
import { errorResponse } from "../../utils/errorResponse";
import { validationResult } from "express-validator";
import { validationErrorResponse } from "../../utils/validationErrorResponse";
import { GetUserFavouritesQueryParams } from "../../infrastructure/interfaces/User";



export const favouriteMovies: RequestHandler<GetUserFavouritesQueryParams> =
  async (req, res) => {
    const { userId, pageNumber, pageSize } = req.params;

    const validationStatus = validationResult(req);
    if (!validationStatus.isEmpty()) {
      validationErrorResponse(res, validationStatus);
    }

    try {
      const user = await Prisma.user.findFirst({
        where: {
          id: userId
        },
        include: {
          favouriteMovies: {
              skip: Number(pageNumber) * Number(pageSize),
              take: Number(pageSize),
          }
        },
      });

      if (user) {
        const { favouriteMovies } = user;
        res.status(200).send({
          results: favouriteMovies,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      errorResponse(res, 500);
    }
  };
