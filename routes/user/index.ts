import { Router } from "express";
import postRoutes from "./post";
import deleteRoutes from './delete';
import putRoutes from './put';
import getRoutes from './get';

const userRoutes = Router();

userRoutes.use("/user/post", postRoutes);
userRoutes.use("/user/delete", deleteRoutes);
userRoutes.use("/user/update/", putRoutes);
userRoutes.use("/user/get", getRoutes);

export default userRoutes;
