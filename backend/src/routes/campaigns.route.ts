import { getCampaignByIdValidation } from "./../validations/campaigns.validation";
import { Router } from "express";

import {
  createCampaign,
  getCampaignById,
  getCampaigns,
} from "@/controllers/campaigns.controller";
import { createCampaignValidation } from "@/validations/campaigns.validation";

const router = Router();

router.get("/", getCampaigns);
router.get("/:id", getCampaignByIdValidation, getCampaignById);

router.post("/", createCampaignValidation, createCampaign);

export default router;
