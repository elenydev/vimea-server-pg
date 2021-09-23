import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import prisma from "../../prisma";
import { errorResponse } from "../../utils/errorResponse";
import { validationErrorResponse } from "../../utils/validationErrorResponse";
import bcrypt from "bcryptjs";
import { sendEmailAfterChangePassword, sendEmailAfterRemindPassword } from "../mailers";
import { generateRandomPassword } from "../../utils/randomPassword";

export const avatar: RequestHandler<{ userId: string }> = async (
  req,
  res
) => {
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
          id: userId,
        },
        data: {
          avatarUrl: imageUrl,
        },
      });
      res.status(201).send({
        message: "Avatar succesfully changed",
      });
      return;
    } catch (err) {
      errorResponse(res, 422, "Updating user avatar failed, please try again");
    }
  } else {
    errorResponse(res, 500);
  }
};

export const password: RequestHandler<
  {},
  {},
  { email: string; password: string; newPassword: string }
> = async (req, res) => {
  const { email, password, newPassword } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  if (password === newPassword) {
    return res.status(403).send({ message: "You provided the same password " });
  }

  if (email === "admin@admin.com") {
    return res
      .status(403)
      .send({ message: "You can't change password for admin account " });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user !== null) {
      await bcrypt
        .compare(password, user.passwordHash)
        .then(async (match) => {
          if (match === true) {
            const hashedPw = await bcrypt.hash(newPassword, 12);
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                passwordHash: hashedPw,
              },
            });
            sendEmailAfterChangePassword(email);
            return res.status(201).send({
              message: "Password successfully changed",
            });
          } else {
            res
              .status(422)
              .send({ message: "Wrong password provided, try again" });
          }
        })
        .catch((err) =>
          errorResponse(res, 403, "Error with authentication occured")
        );
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};

export const remindPassword: RequestHandler<{ email: string }> = async (
  req,
  res,
) => {
  const { email }: { email: string } = req.body;

  const validationStatus = validationResult(req);
  if (!validationStatus.isEmpty()) {
    validationErrorResponse(res, validationStatus);
  }

  try {
    const user = await prisma.user.findFirst({ where: { email: email }});
    if (user) {
      const generatedRandomPassword = generateRandomPassword();
      const hashedPw = await bcrypt.hash(generatedRandomPassword, 12);
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          passwordHash: hashedPw
        }
      })
      sendEmailAfterRemindPassword(email, generatedRandomPassword);
      res.status(201).send({
        message: "Check your email account for new password",
      });
    } else {
      res.status(404).send({ message: "We don't have user with this email" });
    }
  } catch (err) {
    errorResponse(res, 500);
  }
};
