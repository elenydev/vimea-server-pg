import { Router } from "express";
import upload from "../../config/multer";
import { create, login } from "../../controllers/user/post";
import { getUserLoginValidator, getUserPostValidator } from "../../validators/user/post";

const router = Router();

router.post("/create", getUserPostValidator(), upload.single("avatar"), create);
router.post("/login", getUserLoginValidator(), login);

export default router;
