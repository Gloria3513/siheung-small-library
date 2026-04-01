import { prisma } from "@/lib/prisma";
import ProgramsPageClient from "./ProgramsPageClient";

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { startDate: "desc" },
  });

  const serialized = programs.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? undefined,
    content: p.content ?? undefined,
    category: p.category ?? undefined,
    status: p.status as "planned" | "ongoing" | "completed",
    startDate: p.startDate?.toISOString(),
    endDate: p.endDate?.toISOString(),
    imageUrl: p.imageUrl ?? undefined,
    location: p.location ?? undefined,
    targetAudience: p.targetAudience ?? undefined,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <ProgramsPageClient programs={serialized} />;
}
