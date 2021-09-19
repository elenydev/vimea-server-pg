import { Response } from "express";
export const errorResponse = (response: Response<any>, status: number, message: string) =>
  response
    .status(status)
    .send({ message });
