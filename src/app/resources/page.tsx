export const dynamic = "force-dynamic";

import { getResources } from "@/lib/db";
import ResourcesPageClient from "./ResourcesPageClient";

export default async function ResourcesPage() {
  const resources = await getResources();
  return <ResourcesPageClient resources={resources} />;
}
