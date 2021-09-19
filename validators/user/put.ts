import { check, param } from "express-validator";

export const getPutUserAvatarValidator = () => (
  param("id").exists(), check("avatar").exists()
);
