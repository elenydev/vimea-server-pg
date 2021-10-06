import { param } from "express-validator";

export const getUserFavouriteMoviesValidator = () => (
    param('userId').exists(),
    param('pageNumber').exists(),
    param('pageSize').exists()
);

export const getCurrentUserValidator = () => (
    param('userId').exists()
);
