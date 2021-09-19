import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import prisma from "../../prisma";
import { errorResponse } from "../../utils/errorResponse";
import { validationErrorResponse } from "../../utils/validationErrorResponse";

export const avatar: RequestHandler<{ userId: string }, {}, {}> = async (req, res, next) => {
  const { userId } = req.params;
  const avatar = req.file;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  const imageUrl = avatar!.filename;
  const specificUser = await prisma.user.findFirst({ where: { id: userId } });

  if (specificUser) {
    try {
      await prisma.user.update({
          where: {
              id: userId
          },
          data: {
              avatarUrl: imageUrl
          }
      });
      res.status(201).send({
        result: specificUser,
        message: "Avatar succesfully changed",
      });
      return;
    } catch (err) {
      errorResponse(res, 422, "Updating user avatar failed, please try again");
    }
  } else {
    errorResponse(res, 500, "Server error, please try again");
    next();
  }
};
