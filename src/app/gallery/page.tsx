import { prisma } from "@/lib/prisma";
import GalleryPageClient from "./GalleryPageClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { date: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });

  const serialized = galleries.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description ?? undefined,
    date: g.date.toISOString(),
    imageCount: g.images.length,
    thumbnailUrl: g.images[0]?.imageUrl || undefined,
    images: g.images.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      caption: img.caption ?? undefined,
      order: img.order,
    })),
    createdAt: g.createdAt.toISOString(),
  }));

  return <GalleryPageClient albums={serialized} />;
}
