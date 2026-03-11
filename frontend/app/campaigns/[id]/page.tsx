import CampaignDetailsComponent from "@/components/campaigns/details/CampaignDetailsComponent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdTech | Dashboard",
  description: "AdTech | Dashboard",
};

export default async function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CampaignDetailsComponent id={id} />;
}
