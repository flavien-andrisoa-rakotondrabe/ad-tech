import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { getCampaignById } from "@/services/campaign.service";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  id: string;
}

export default async function CampaignDetailsComponent({ id }: PageProps) {
  const res = await getCampaignById(id);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <Button asChild variant={"secondary"} className="mb-8 text-xl h-12 px-4">
        <Link href="/" className="py-5">
          <ArrowLeft className="mr-2 size-6" /> Retour
        </Link>
      </Button>

      <header className="border-b pb-6 mb-6">
        <h1 className="text-5xl font-semibold mb-2">{res.campaign.name}</h1>
        <p className="text-gray-500 text-lg">
          Annonceur : {res.campaign.advertiser}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Informations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Détails de la diffusion</h2>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p>
              <strong>Début :</strong> {formatDate(res.campaign.startDate)}
            </p>
            <p>
              <strong>Fin :</strong> {formatDate(res.campaign.endDate)}
            </p>
          </div>

          <h2 className="text-xl font-semibold">Budget</h2>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-2xl font-bold text-green-700">
              {res.campaign.budget} €
            </p>
          </div>
        </section>

        {/* Section Ciblage */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Pays ciblés</h2>
          <div className="flex flex-wrap gap-2">
            {res.campaign.targetCountries.map((country: string) => (
              <span
                key={country}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
              >
                {country}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
