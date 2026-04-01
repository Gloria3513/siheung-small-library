import { prisma } from "@/lib/prisma";
import ResourcesPageClient from "./ResourcesPageClient";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? undefined,
    category: r.category as "minutes" | "archive" | "form" | "etc",
    fileUrl: r.fileUrl,
    fileName: r.fileName,
    fileSize: r.fileSize,
    downloadCount: r.downloadCount,
    createdAt: r.createdAt.toISOString(),
  }));

  return <ResourcesPageClient resources={serialized} />;
}
