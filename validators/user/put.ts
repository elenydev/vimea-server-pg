import { check, param } from "express-validator";

export const getPutUserAvatarValidator = () => (
  param("id").exists(), check("avatar").exists()
);

export const getPutUserChangePasswordValidator = () => (
  param('email').exists().isEmail(),
  param('password').exists().isLength({ min: 8}),
  param('newPassword').exists().isLength({ min: 8})
);

export const getPutUserRemindPassword = () => (
  param('email').exists().isEmail()
)
