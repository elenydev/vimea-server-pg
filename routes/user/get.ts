import { Router } from "express";
import { favouriteMovies } from "../../controllers/user/get";
import { getUserFavouriteMoviesValidator } from "../../validators/user/get";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

router.get("/favouriteMovies", getUserFavouriteMoviesValidator(), verifyToken, favouriteMovies);

export default router;
