import { Router } from "express";
import { avatar } from "../../controllers/user/put";
import { getPutUserAvatarValidator } from "../../validators/user/put";

const router = Router();

router.put("/avatar", getPutUserAvatarValidator(), avatar);

export default router;
