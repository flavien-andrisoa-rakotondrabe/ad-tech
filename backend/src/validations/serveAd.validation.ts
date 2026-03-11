import { body } from "express-validator";

export const getCountriesValidation = [
  body("country").trim().notEmpty().withMessage("country required"),
];
