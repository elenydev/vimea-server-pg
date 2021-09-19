import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import prisma from "../../prisma";
import { errorResponse } from "../../utils/errorResponse";
import { validationErrorResponse } from "../../utils/validationErrorResponse";

export const logOut: RequestHandler<{}, {}, { id: string }> = async (req,res,next) => {
  const { id } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (user) {
      res.status(200).send({ message: "Logged out", token: "" });
    } else {
      errorResponse(res, 401, "We can't delete session for this user, as he's doesn't exist");
    }
  } catch (err) {
    errorResponse(res, 500, "Deleting session failed");
    next(err);
  }
};
