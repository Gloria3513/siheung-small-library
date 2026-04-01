export const dynamic = "force-dynamic";

import { getLibraries } from "@/lib/db";
import LibrariesPageClient from "./LibrariesPageClient";

export default async function LibrariesPage() {
  const libraries = await getLibraries();
  return <LibrariesPageClient libraries={libraries} />;
}
