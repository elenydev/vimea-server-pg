import { Router } from "express";
import postRoutes from "./post";

const userRoutes = Router();

userRoutes.use("/user", postRoutes);

export default userRoutes;
