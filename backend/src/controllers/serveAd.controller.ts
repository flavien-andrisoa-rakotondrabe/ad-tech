import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { CampaignModel } from "@/models/campaign.model";

export const serveAd = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const now = new Date();

  try {
    const body = req.body as { country: string };

    // Recherche atomique d'une campagne éligible
    const campaign = await CampaignModel.findOneAndUpdate(
      {
        status: "active",
        targetCountries: body.country,
        startDate: { $lte: now },
        endDate: { $gte: now },
        // On vérifie que les impressions servies ne dépassent pas le budget
        $expr: { $lt: ["$impressionsServed", "$budget"] },
      },
      { $inc: { impressionsServed: 1 } }, // Incrémentation atomique
      { new: true },
    );

    if (!campaign) {
      return res
        .status(404)
        .json({ message: "No active campaign found for this criteria" });
    }

    res.status(200).json({ campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

export const getCountries = async (_req: Request, res: Response) => {
  try {
    const uniqueCountries: string[] =
      await CampaignModel.distinct("targetCountries");

    const countries = uniqueCountries.sort();

    res.status(200).json({ countries });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};
