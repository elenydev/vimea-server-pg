import { Router } from "express";
import postRoutes from "./post";
import deleteRoutes from './delete';
import putRoutes from './put';

const userRoutes = Router();

userRoutes.use("/user", postRoutes);
userRoutes.use("/user", deleteRoutes);
userRoutes.use("/user/update/", putRoutes);

export default userRoutes;
