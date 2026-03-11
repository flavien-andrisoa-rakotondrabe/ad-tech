import SimulatorComponent from "@/components/campaigns/simulator/SimulatorComponent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdTech | Simulateur",
  description: "AdTech | Simulateur",
};

export default function SimulatorPage() {
  return <SimulatorComponent />;
}
