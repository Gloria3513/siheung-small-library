export const dynamic = "force-dynamic";

import { getPrograms } from "@/lib/db";
import ProgramsPageClient from "./ProgramsPageClient";

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return <ProgramsPageClient programs={programs} />;
}
