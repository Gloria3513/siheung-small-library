export const dynamic = "force-dynamic";

import { getGalleries } from "@/lib/db";
import GalleryPageClient from "./GalleryPageClient";

export default async function GalleryPage() {
  const albums = await getGalleries();
  return <GalleryPageClient albums={albums} />;
}
