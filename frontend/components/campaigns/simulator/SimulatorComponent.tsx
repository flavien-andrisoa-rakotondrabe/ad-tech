"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import {
  PlayCircle,
  Globe,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getCountries, serveAd } from "@/services/campaign.service";

import { CampaignInterface } from "@/types/campaign.type";

export default function SimulatorComponent() {
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CampaignInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getCountries();

      setCountries(res.countries);
    })();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      setCountry(countries[0]);
    }
  }, [countries]);

  const handleSimulate = async () => {
    if (!country) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await serveAd(country);
      setResult(res.campaign);

      toast.success("Simulation effectuée.");
    } catch (err: any) {
      setError("Aucune campagne éligible trouvée pour ce pays actuellement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-5xl font-semibold">Simulateur d'Impression</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Testez l'algorithme de diffusion en simulant une requête utilisateur
          par pays.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Panneau de Contrôle */}
        <Card className="py-8 px-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">
              Configuration de la requête
            </CardTitle>
            <CardDescription>
              L'API filtrera les campagnes actives, datées et avec budget
              suffisant.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 space-y-2 w-full">
              <label className="font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" /> Pays du visiteur
              </label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="min-w-32 h-10! px-4">
                  <SelectValue placeholder="Sélectionnez un pays..." />
                </SelectTrigger>
                <SelectContent position="popper" className="min-w-32 p-2">
                  {countries.map((item) => (
                    <SelectItem
                      key={`country-${item}`}
                      value={item}
                      className="py-1 px-2"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSimulate}
              disabled={!country || loading}
              className="w-full md:w-auto h-10 px-8 cursor-pointer"
            >
              {loading ? (
                "Recherche..."
              ) : (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" /> Lancer la simulation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Zone de Résultat */}
        {result && (
          <Alert
            variant="default"
            className="px-4 py-6 rounded-xl border-green-500 bg-green-50 dark:bg-green-950/20"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-400 font-bold">
              Publicité Servie !
            </AlertTitle>
            <AlertDescription className="mt-4">
              <div className="bg-white dark:bg-black/40 p-4 rounded-lg border space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-muted-foreground">
                    Campagne :
                  </span>
                  <span className="font-bold">{result.name}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-muted-foreground">
                    Annonceur :
                  </span>
                  <Badge variant="outline">{result.advertiser}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Impressions cumulées :
                  </span>
                  <span className="font-mono text-blue-600 font-bold">
                    {result.impressionsServed}
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="p-4 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Échec de diffusion</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button asChild variant={"secondary"} className="mt-8 text-xl h-12 px-4">
        <Link href="/" className="py-5">
          <ArrowLeft className="mr-2 size-6" /> Retour
        </Link>
      </Button>
    </div>
  );
}
