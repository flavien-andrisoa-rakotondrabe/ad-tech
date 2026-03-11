import { Request, Response } from "express";
import { CampaignModel } from "@/models/campaign.model";

// Statistiques
export const getStats = async (_req: Request, res: Response) => {
  try {
    const stats = await CampaignModel.aggregate([
      {
        $group: {
          _id: null,
          totalCampaigns: { $sum: 1 },
          activeCampaigns: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalImpressions: { $sum: "$impressionsServed" },
        },
      },
    ]);

    const topAdvertiser = await CampaignModel.aggregate([
      { $group: { _id: "$advertiser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      ...(stats[0] || {
        totalCampaigns: 0,
        activeCampaigns: 0,
        totalImpressions: 0,
      }),
      topAdvertiser: topAdvertiser[0]?._id || "N/A",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};
