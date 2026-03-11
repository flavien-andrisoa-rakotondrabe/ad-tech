import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getCampaigns } from '@/services/campaign.service';

export default async function CampaignList() {
  const campaigns = await getCampaigns();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Liste des Campagnes</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Annonceur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((c: any) => (
            <TableRow key={c._id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>{c.advertiser}</TableCell>
              <TableCell>
                <Badge
                  variant={c.status === 'active' ? 'default' : 'secondary'}
                >
                  {c.status}
                </Badge>
              </TableCell>
              <TableCell>{c.impressionsServed}</TableCell>
              <TableCell>{c.budget} €</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
