import { body, param } from "express-validator";

export const getCampaignByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("id requis")
    .isMongoId()
    .withMessage("id invalide"),
];

export const createCampaignValidation = [
  body("name").trim().notEmpty().withMessage("name required"),
  body("advertiser").trim().notEmpty().withMessage("advertiser required"),
  body("budget").isNumeric().withMessage("budget must be a number").toFloat(),
  body("targetCountries")
    .isArray({ min: 1 })
    .withMessage("targetCountries required"),
  body("startDate")
    .trim()
    .notEmpty()
    .withMessage("startDate required")
    .isISO8601()
    .withMessage("Format ISO8601 required")
    .toDate(),
  body("endDate")
    .trim()
    .notEmpty()
    .withMessage("endDate required")
    .isISO8601()
    .withMessage("Format ISO8601 required")
    .toDate()
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("endDate must be after startDate");
      }
      return true;
    }),
];
