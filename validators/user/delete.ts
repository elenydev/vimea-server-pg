import { body, check } from "express-validator";

export const getUserLogOutValidator = () => body("id").exists();

export const getUserRemoveFavouriteMovieValidator = () => (
  check("userId").exists(), check("movieId").exists()
);
