import { Types } from 'mongoose';

export type CampaignStatusType = 'active' | 'paused' | 'ended';

export interface CampaignInterface {
  _id: Types.ObjectId;
  name: string;
  advertiser: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  impressionsServed: number;
  targetCountries: string[];
  status: CampaignStatusType;

  createdAt: Date;
  updatedAt: Date;
}
