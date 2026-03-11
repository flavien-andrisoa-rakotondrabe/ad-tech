import { Request, Response } from 'express';
import { CampaignModel } from '@/models/campaign.model';

export const serveAd = async (req: Request, res: Response) => {
  const { country } = req.body;

  if (!country) return res.status(400).json({ error: 'Country is required' });

  const now = new Date();

  try {
    // Recherche atomique d'une campagne éligible [cite: 36, 40]
    const campaign = await CampaignModel.findOneAndUpdate(
      {
        status: 'active',
        targetCountries: country,
        startDate: { $lte: now },
        endDate: { $gte: now },
        // On vérifie que les impressions servies ne dépassent pas le budget [cite: 40]
        $expr: { $lt: ['$impressionsServed', '$budget'] },
      },
      { $inc: { impressionsServed: 1 } }, // Incrémentation atomique [cite: 41]
      { new: true },
    );

    if (!campaign) {
      return res
        .status(404)
        .json({ message: 'No active campaign found for this criteria' });
    }

    res.json(campaign); // [cite: 42]
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
