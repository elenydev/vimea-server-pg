import { Router } from "express";
import upload from "../../config/multer";
import { avatar } from "../../controllers/user/put";
import verifyToken from "../../middleware/verifyToken";
import { getPutUserAvatarValidator } from "../../validators/user/put";

const router = Router();

router.put("/avatar", getPutUserAvatarValidator(), upload.single("avatar"), verifyToken, avatar);

export default router;
