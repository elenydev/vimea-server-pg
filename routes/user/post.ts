import { Router } from "express";
import upload from "../../config/multer";
import { create } from "../../controllers/user/post";
import { getUserPostValidator } from "../../validators/user/post";

const router = Router();

router.use("/create", getUserPostValidator(), upload.single("avatar"), create);

export default router;
