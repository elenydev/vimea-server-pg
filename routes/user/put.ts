import { Router } from "express";
import upload from "../../config/multer";
import { avatar, password } from "../../controllers/user/put";
import verifyToken from "../../middleware/verifyToken";
import { getPutUserAvatarValidator, getPutUserChangePasswordValidator } from "../../validators/user/put";

const router = Router();

router.put("/avatar", getPutUserAvatarValidator(), upload.single("avatar"), verifyToken, avatar);
router.put("/password", getPutUserChangePasswordValidator(), verifyToken, password);

export default router;
