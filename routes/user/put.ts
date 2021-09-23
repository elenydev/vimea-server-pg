import { Router } from "express";
import upload from "../../config/multer";
import { avatar, password, remindPassword } from "../../controllers/user/put";
import verifyToken from "../../middleware/verifyToken";
import { getPutUserAvatarValidator, getPutUserChangePasswordValidator, getPutUserRemindPasswordValidator } from "../../validators/user/put";

const router = Router();

router.put("/avatar", getPutUserAvatarValidator(), upload.single("avatar"), verifyToken, avatar);
router.put("/password", getPutUserChangePasswordValidator(), verifyToken, password);
router.put("/remindPassword", getPutUserRemindPasswordValidator(), remindPassword);

export default router;
