import { fetchJson } from "@/lib/fetcher";
import { CampaignInterface, StatsInterface } from "@/types/campaign.type";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export const getStats = async () => {
  return await fetchJson<StatsInterface>(`${apiUrl}/api/stats`);
};

export const getCampaigns = async () => {
  return await fetchJson<{ campaigns: CampaignInterface[] }>(
    `${apiUrl}/api/campaigns`,
  );
};

export const createCampaign = async (data: {
  name: string;
  advertiser: string;
  budget: number;
  targetCountries: string[];
  startDate: Date;
  endDate: Date;
}) => {
  return fetchJson<{ campaign: CampaignInterface }>(`${apiUrl}/api/campaigns`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const serveAd = async (country: string) => {
  return await fetchJson(`${apiUrl}/api/serve-ad`, {
    method: "POST",
    body: JSON.stringify({ country }),
  });
};

export const getCampaignById = async (id: string) => {
  return await fetchJson<{ campaign: CampaignInterface }>(
    `${apiUrl}/api/campaigns/${id}`,
  );
};
