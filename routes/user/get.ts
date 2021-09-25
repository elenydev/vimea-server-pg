import { Router } from "express";
import { favouriteMovies, currentUser } from "../../controllers/user/get";
import { getUserFavouriteMoviesValidator, getCurrentUserValidator } from "../../validators/user/get";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

router.get("/favouriteMovies", getUserFavouriteMoviesValidator(), verifyToken, favouriteMovies);
router.get("/currentUser", getCurrentUserValidator(), verifyToken, currentUser);

export default router;
