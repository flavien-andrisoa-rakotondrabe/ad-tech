import { body } from "express-validator";

export const serveAdValidation = [
  body("country")
    .trim()
    .notEmpty()
    .withMessage("country required")
    .toUpperCase(),
];
