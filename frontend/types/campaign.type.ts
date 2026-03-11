export type CampaignStatusType = 'active' | 'paused' | 'ended';

export interface CampaignInterface {
  _id: string;
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

export interface StatsInterface {
  totalCampaigns: number;
  activeCampaigns: number;
  totalImpressions: number;
  topAdvertiser: string;
}
