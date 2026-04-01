import { prisma } from "@/lib/prisma";
import LibrariesPageClient from "./LibrariesPageClient";

export const dynamic = "force-dynamic";

export default async function LibrariesPage() {
  const libraries = await prisma.library.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const serialized = libraries.map((lib) => ({
    ...lib,
    lat: lib.lat ?? undefined,
    lng: lib.lng ?? undefined,
    phone: lib.phone ?? undefined,
    hours: lib.hours ?? undefined,
    closedDays: lib.closedDays ?? undefined,
    description: lib.description ?? undefined,
    specialProgram: lib.specialProgram ?? undefined,
    imageUrl: lib.imageUrl ?? undefined,
    homepageUrl: lib.homepageUrl ?? undefined,
    createdAt: lib.createdAt.toISOString(),
    updatedAt: lib.updatedAt.toISOString(),
  }));

  return <LibrariesPageClient libraries={serialized} />;
}
