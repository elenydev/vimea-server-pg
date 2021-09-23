import { body, check } from "express-validator";

export const getPutUserAvatarValidator = () => (
  body("id").exists(), check("avatar").exists()
);

export const getPutUserChangePasswordValidator = () => (
  body("email").exists().isEmail(),
  body("password").exists().isLength({ min: 8 }),
  body("newPassword").exists().isLength({ min: 8 })
);

export const getPutUserRemindPasswordValidator = () =>
  body("email").exists().isEmail();
