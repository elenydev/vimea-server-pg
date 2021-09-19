import { Router } from "express";
import { logOut } from "../../controllers/user/delete";
import { getUserLogOutValidator } from "../../validators/user/delete";

const router = Router();

router.delete("/logout", getUserLogOutValidator(), logOut);

export default router;
