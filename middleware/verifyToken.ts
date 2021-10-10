import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenInterface } from "../infrastructure/interfaces/Token";
dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token || "", process.env.SECRET!);
  } catch (err) {
    res.status(403).send({ message: "Authorization failed, please try again" });
  }
  if (!decodedToken) {
    res.status(403).send({ message: "Wrong authorization token, try again" });
  }

  req.body.userId = (decodedToken as TokenInterface).user?.userId;
  next();
};
