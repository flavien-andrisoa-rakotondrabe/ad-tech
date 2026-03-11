import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats } from "@/services/campaign.service";
import { ArrowLeft } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdTech | Dashboard",
  description: "AdTech | Dashboard",
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-7xl py-8 space-y-6">
      <h1 className="text-5xl font-semibold">Dashboard AdTech</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Campagnes" value={stats.totalCampaigns} />
        <StatCard
          title="Actives"
          value={stats.activeCampaigns}
          color="text-green-600"
        />
        <StatCard
          title="Impressions Totales"
          value={stats.totalImpressions.toLocaleString()}
        />
        <StatCard title="Top Annonceur" value={stats.topAdvertiser} />
      </div>

      <Button asChild variant={"secondary"} className="text-xl h-12 px-4">
        <Link href="/" className="py-5">
          <ArrowLeft className="mr-2 size-6" /> Retour
        </Link>
      </Button>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "",
}: {
  title: string;
  value: any;
  color?: string;
}) {
  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
