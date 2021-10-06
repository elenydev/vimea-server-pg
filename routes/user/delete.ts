import { Router } from "express";
import { logOut } from "../../controllers/user/delete";
import { favouriteMovie } from "../../controllers/user/post";
import verifyToken from "../../middleware/verifyToken";
import { getUserLogOutValidator, getUserRemoveFavouriteMovieValidator } from "../../validators/user/delete";

const router = Router();

router.delete("/logout", getUserLogOutValidator(), logOut);
router.delete("/favouriteMovie", getUserRemoveFavouriteMovieValidator(), verifyToken, favouriteMovie);

export default router;
