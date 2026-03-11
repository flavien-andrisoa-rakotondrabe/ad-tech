import Link from "next/link";

import { PlusCircle, LayoutDashboard, List, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCampaigns, getStats } from "@/services/campaign.service";

export default async function LandingPage() {
  const res = await getCampaigns();
  const stats = await getStats();

  return (
    <div className="container mx-auto max-w-7xl py-10 space-y-8">
      {/* Header avec Navigation Rapide */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-semibold">AdTech Manager</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Gérez et diffusez vos campagnes en temps réel.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            asChild
            size={"lg"}
            className="h-12 px-4 rounded-lg text-lg"
          >
            <Link href="/simulator">
              <PlayCircle className="mr-1 size-5" /> Simulateur
            </Link>
          </Button>
          <Button asChild size={"lg"} className="h-12 px-4 rounded-lg text-lg">
            <Link href="/campaigns/new">
              <PlusCircle className="mr-2 size-4" /> Créer une campagne
            </Link>
          </Button>
        </div>
      </div>

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

      {/* Liste des Campagnes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
            <List className="size-5" /> Campagnes Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Nom</TableHead>
                <TableHead className="text-lg">Annonceur</TableHead>
                <TableHead className="text-lg">Statut</TableHead>
                <TableHead className="text-right text-lg">
                  Impressions
                </TableHead>
                <TableHead className="text-right text-lg">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res.campaigns.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Aucune campagne trouvée. Commencez par en créer une !
                  </TableCell>
                </TableRow>
              ) : (
                res.campaigns.map((c: any) => (
                  <TableRow key={c._id} className="h-12">
                    <TableCell className="font-medium">
                      <Link
                        href={`/campaigns/${c._id}`}
                        className="hover:underline"
                      >
                        {c.name}
                      </Link>
                    </TableCell>
                    <TableCell>{c.advertiser}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          c.status === "active" ? "default" : "secondary"
                        }
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {c.impressionsServed.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {c.budget} €
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
