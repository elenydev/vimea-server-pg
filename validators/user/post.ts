import { body, check, param } from "express-validator";

export const getUserPostValidator = () => [
  check("email").trim().isEmail(),
  check("password").trim().exists().isLength({ min: 8 }),
  check("policy").custom(policy => policy === true),
  check("lastName").trim().exists(),
  check("firstName").trim().exists(),
];

export const getUserLoginValidator = () => (
  body("email").isEmail(), body("password").exists().isLength({ min: 8 })
);

export const getUserPostFavouriteMovieValidator = () => (
  param("userId").exists(), check("movie").exists()
);
