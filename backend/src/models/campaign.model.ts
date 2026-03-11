import { Schema, model } from 'mongoose';
import { CampaignInterface } from '@/types/campaign.type';

const campaignSchema = new Schema<CampaignInterface>(
  {
    name: { type: String, required: true },
    advertiser: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    impressionsServed: { type: Number, default: 0 },
    targetCountries: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'paused', 'ended'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export const CampaignModel = model<CampaignInterface>(
  'Campaign',
  campaignSchema,
);
