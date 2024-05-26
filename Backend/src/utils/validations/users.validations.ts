import { Request, Response, NextFunction } from "express";
import Joi, { ValidationErrorItem, ValidationResult } from "joi";

export const userSchema = Joi.object({
  id: Joi.number().min(1).integer().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate user data
  const result: ValidationResult = userSchema.validate(
    req.body,
    { abortEarly: false } // Return all errors
  );

  // If errors, return error response
  if (result.error) {
    return res.status(422).json({
      message: "Invalid request data",
      errors: result.error.details.map((err: ValidationErrorItem) => ({
        field: err.path[0],
        message: formatErrorMessage(err.message),
      })),
    });
  }

  // If no errors, continue to next handler
  next();
};

function formatErrorMessage(message: string): string {
  return message.replace('"', "").replace('"', "");
}