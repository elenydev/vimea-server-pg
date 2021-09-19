import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { errorResponse } from "../../utils/errorResponse";
import Prisma from "../../prisma";
import { sendEmailAfterUserRegister } from "../mailers/index";
import { UserCreateParams } from "../../infrastructure/interfaces/User";
import { validationErrorResponse } from "../../utils/validationErrorResponse";
import { uploadFile } from "../../config/s3-bucket";

export const create: RequestHandler<{}, {}, UserCreateParams> = async (req, res, next) => {
  const { firstName, lastName, email, password, policy } = req.body;
  const avatar = req.file;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  try {
    const existingUser = await Prisma.user.findFirst({
      where: {
        email: email,
      },
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
          policy,
        },
      });

      res.status(201).send({ message: "User successfully created" });
      sendEmailAfterUserRegister(firstName, email);
    } else {
      errorResponse(res, 422, "User already exist");
    }
  } catch (err) {
    errorResponse(res, 500, "Creating account failed, please try again");
  }
};
