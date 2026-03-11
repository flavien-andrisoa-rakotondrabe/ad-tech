import { Router } from "express";

import { getCountries, serveAd } from "@/controllers/serveAd.controller";
import { getCountriesValidation } from "@/validations/serveAd.validation";

const router = Router();

router.post("/", serveAd);

router.get("/countries", getCountriesValidation, getCountries);

export default router;
