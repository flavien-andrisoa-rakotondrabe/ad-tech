import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CampaignModel } from "@/models/campaign.model";

// GET Campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;

    const campaign = await CampaignModel.findById(id);

    if (!campaign) {
      return res.status(404).json({ message: "Campagne introuvable" });
    }

    res.status(200).json({ campaign });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

// Create Campaign
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const body = req.body as {
      name: string;
      advertiser: string;
      budget: number;
      targetCountries: string[];
      startDate: Date;
      endDate: Date;
    };

    const campaign = await CampaignModel.create(body);

    res.status(201).json({ campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

// List campaign with filters
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const { status, advertiser, country } = req.query;
    let query: any = {};

    if (status) query.status = status;
    if (advertiser) query.advertiser = advertiser;
    if (country) query.targetCountries = country;

    const campaigns = await CampaignModel.find(query).sort({ createdAt: -1 });
    res.status(200).json({ campaigns });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};
