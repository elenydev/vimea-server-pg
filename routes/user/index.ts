import { Router } from "express";
import postRoutes from "./post";
import deleteRoutes from './delete';

const userRoutes = Router();

userRoutes.use("/user", postRoutes);
userRoutes.use("/user", deleteRoutes);

export default userRoutes;
