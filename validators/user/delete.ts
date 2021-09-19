import { body } from "express-validator";

export const getUserLogOutValidator = () => (
  body("id").exists()
)