"use client";

import Link from "next/link";

import { useState } from "react";
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
import { serveAd } from "@/services/campaign.service";

export default function SimulatorComponent() {
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    if (!country) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ad = await serveAd(country);
      setResult(ad);

      toast.success("Simulation effectuée.");
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Aucune campagne éligible trouvée pour ce pays actuellement.");
      } else {
        setError("Une erreur technique est survenue.");
      }
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
              <Select onValueChange={setCountry}>
                <SelectTrigger className="h-10! px-4">
                  <SelectValue placeholder="Sélectionnez un pays..." />
                </SelectTrigger>
                <SelectContent position="popper" className="p-2">
                  <SelectItem value="FR" className="py-1 px-2">
                    France (FR)
                  </SelectItem>
                  <SelectItem value="ES" className="py-1 px-2">
                    Espagne (ES)
                  </SelectItem>
                  <SelectItem value="US" className="py-1 px-2">
                    États-Unis (US)
                  </SelectItem>
                  <SelectItem value="BE" className="py-1 px-2">
                    Belgique (BE)
                  </SelectItem>
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
          <Alert variant="destructive">
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
