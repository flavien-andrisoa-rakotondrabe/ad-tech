import NewCampaignComponent from '@/components/campaigns/new/NewCampaignComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AdTech | New Campaign',
  description: 'AdTech | New Campaign',
};

export default function NewCampaignPage() {
  return <NewCampaignComponent />;
}
