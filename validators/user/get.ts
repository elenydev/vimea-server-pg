import { param, check } from "express-validator";

export const getUserFavouriteMoviesValidator = () => (
    check('userId').exists(),
    check('pageNumber').exists(),
    check('pageSize').exists()
);

export const getCurrentUserValidator = () => (
    param('userId').exists()
);
