import { ValidationError, Result } from "express-validator"
import { Response } from "express";

export const validationErrorResponse = (res: Response, validationStatus: Result<ValidationError>) => {
    const firstError = validationStatus.array({ onlyFirstError: true });
    return res.status(400).send({ message: `${firstError[0].msg} in field ${firstError[0].param}`});
}
