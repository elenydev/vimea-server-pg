import { Response } from "express";
export const errorResponse = (response: Response<any>, status: number, message = "Server error, please try again") =>
  response
    .status(status)
    .send({ message });
