import { body, check } from "express-validator";

export const getUserPostValidator = () => (
  body("email").isEmail(),
  body("password").exists().isLength({ min: 8 }),
  body("policy").isBoolean(),
  body("firstName").exists(),
  body("lastName").exists(),
  check("avatar").exists()
);

export const getUserLoginValidator = () => (
  body("email").isEmail(),
  body("password").exists().isLength({ min: 8})
);
