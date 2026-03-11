import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date en chaîne de caractères lisible (ex: 20 mai 2024)
 * @param date - Date ou chaîne de caractères ISO
 * @param includeTime - Si vrai, ajoute l'heure (ex: 20 mai 2024 à 14:30)
 */
export const formatDate = (
  date: Date | string | number,
  includeTime: boolean = false,
): string => {
  if (!date) return "";

  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  // Vérification si la date est valide
  if (isNaN(d.getTime())) return "Date invalide";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }).format(d);
};
