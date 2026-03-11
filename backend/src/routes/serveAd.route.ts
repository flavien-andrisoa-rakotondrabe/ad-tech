import { Router } from "express";

import { getCountries, serveAd } from "@/controllers/serveAd.controller";
import { serveAdValidation } from "@/validations/serveAd.validation";

const router = Router();

router.post("/", serveAdValidation, serveAd);

router.get("/countries", getCountries);

export default router;
