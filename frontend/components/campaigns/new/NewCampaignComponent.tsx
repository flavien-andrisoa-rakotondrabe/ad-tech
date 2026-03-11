"use client";

import Link from "next/link";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Save, X } from "lucide-react";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { createCampaign } from "@/services/campaign.service";
import { Badge } from "@/components/ui/badge";

// Schéma de validation
const campaignSchema = z
  .object({
    name: z.string().min(3, "Le nom doit avoir au moins 3 caractères"),
    advertiser: z.string().min(2, "L'annonceur est requis"),
    startDate: z.coerce
      .date({ message: "Date de début requise" })
      .refine((date) => date !== null, "Date de début requise"),
    endDate: z.coerce
      .date({ message: "Date de fin requise" })
      .refine((date) => date !== null, "Date de fin requise"),
    budget: z.coerce.number().positive("Le budget doit être supérieur à 0"),
    targetCountries: z.array(z.string()).min(1, "Ajouter au moins un pays"),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof campaignSchema>;

export default function NewCampaignComponent() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(campaignSchema) as any,
    defaultValues: {
      name: "",
      advertiser: "",
      startDate: "" as any,
      endDate: "" as any,
      budget: 0,
      targetCountries: [],
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [countryInput, setCountryInput] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsSubmit(true);

      await createCampaign(data);

      toast.success("Nouvelle campagne ajoutée.");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la création de la campagne.",
      );
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Button asChild variant="secondary" className="h-12 px-4 text-xl mb-6">
        <Link href="/" className="">
          <ArrowLeft className="mr-2 size-6" /> Retour
        </Link>
      </Button>

      <Card className="p-8">
        <CardHeader className="mb-6">
          <CardTitle className="text-5xl mb-4 font-semibold">
            Nouvelle Campagne
          </CardTitle>
          <CardDescription className="text-base">
            Remplissez les informations pour lancer votre campagne publicitaire.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="w-full">
              {/* Nom de la campagne */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="name" className="text-lg">
                      Nom de la campagne
                    </Label>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Summer Sale 2025"
                      className="h-14 px-4 rounded-lg"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Annonceur */}
              <Controller
                name="advertiser"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="advertiser" className="text-lg">
                      Annonceur
                    </Label>
                    <Input
                      {...field}
                      id="advertiser"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ex: Nike, Apple..."
                      className="h-14 px-4 rounded-lg"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Start Date */}
              <Controller
                name="startDate"
                control={form.control}
                render={({ field: { value, ...fieldProps }, fieldState }) => {
                  const dateValue =
                    value instanceof Date
                      ? value.toISOString().split("T")[0]
                      : ((value as string) ?? "");

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <Label htmlFor="startDate" className="text-lg">
                        Date de début
                      </Label>
                      <Input
                        {...fieldProps}
                        id="startDate"
                        type="date"
                        value={dateValue}
                        aria-invalid={fieldState.invalid}
                        className="h-14 px-4 rounded-lg"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* End Date */}
              <Controller
                name="endDate"
                control={form.control}
                render={({ field: { value, ...fieldProps }, fieldState }) => {
                  const dateValue =
                    value instanceof Date
                      ? value.toISOString().split("T")[0]
                      : ((value as string) ?? "");

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <Label htmlFor="endDate" className="text-lg">
                        Date de fin
                      </Label>
                      <Input
                        {...fieldProps}
                        id="endDate"
                        type="date"
                        value={dateValue}
                        aria-invalid={fieldState.invalid}
                        className="h-14 px-4 rounded-lg"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Budget */}
              <Controller
                name="budget"
                control={form.control}
                render={({ field: { value, ...fieldProps }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="budget" className="text-lg">
                      Budget
                    </Label>
                    <div className="w-full flex items-center gap-1">
                      <Input
                        {...fieldProps}
                        id="budget"
                        type="number"
                        value={(value as number) ?? ""}
                        aria-invalid={fieldState.invalid}
                        placeholder="10"
                        className="h-14 px-4 rounded-lg"
                      />
                      <span>€</span>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Pays cibles */}
              <Controller
                name="targetCountries"
                control={form.control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="space-y-3">
                      <Label htmlFor="targetCountries" className="text-lg">
                        Pays cibles
                      </Label>

                      <div
                        className={`flex flex-wrap gap-2 ${fieldState.invalid ? "border-red-500" : "border-input"}`}
                      >
                        {/* Affichage des badges (pays déjà ajoutés) */}
                        {field.value?.map((country: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 p-2"
                          >
                            <Globe className="h-3 w-3" />
                            {country}
                            <button
                              type="button"
                              onClick={() => {
                                const newValue = field.value.filter(
                                  (_: any, i: number) => i !== index,
                                );
                                field.onChange(newValue);
                              }}
                              className="ml-1 hover:text-destructive focus:outline-none"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}

                        {/* Input pour taper le nouveau pays */}
                        <Input
                          placeholder={"Ex: FR, US, ES..."}
                          className="h-14 px-4 rounded-lg"
                          value={countryInput}
                          onChange={(e) => setCountryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Empêche de soumettre le formulaire entier
                              const val = countryInput.trim().toUpperCase();
                              if (val && !field.value.includes(val)) {
                                field.onChange([...field.value, val]);
                                setCountryInput("");
                              }
                            }
                          }}
                        />
                      </div>

                      <p className="text-[11px] text-muted-foreground italic">
                        Appuyez sur{" "}
                        <kbd className="px-1 py-0.5 rounded border bg-muted">
                          Entrée
                        </kbd>{" "}
                        pour ajouter un pays.
                      </p>

                      {fieldState.invalid && (
                        <p className="text-sm text-red-500 font-medium">
                          {fieldState.error?.message}
                        </p>
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              size={"lg"}
              type="submit"
              className="w-full h-14 text-lg cursor-pointer"
              disabled={isSubmit}
            >
              <Save className="mr-2 size-5" />
              {isSubmit ? "Création en cours..." : "Créer la campagne"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
