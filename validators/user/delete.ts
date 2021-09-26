import { body, param } from "express-validator";

export const getUserLogOutValidator = () => body("id").exists();

export const getUserRemoveFavouriteMovieValidator = () => (
  param("userId").exists(), param("movieId").exists()
);
