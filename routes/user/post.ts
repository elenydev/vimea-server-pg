import { Router } from "express";
import upload from "../../config/multer";
import { create, favouriteMovie, login } from "../../controllers/user/post";
import verifyToken from "../../middleware/verifyToken";
import { getUserLoginValidator, getUserPostFavouriteMovieValidator, getUserPostValidator } from "../../validators/user/post";

const router = Router();

router.post("/create", getUserPostValidator(), upload.single("avatar"), create);
router.post("/login", getUserLoginValidator(), login);
router.post("/favouriteMovie", getUserPostFavouriteMovieValidator(), verifyToken, favouriteMovie);

export default router;
