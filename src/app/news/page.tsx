import { prisma } from "@/lib/prisma";
import NewsPageClient from "./NewsPageClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: { attachments: true },
  });

  const serialized = posts.map((p) => ({
    ...p,
    excerpt: p.excerpt ?? undefined,
    images: JSON.parse(p.images) as string[],
    category: p.category as "notice" | "news" | "press",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <NewsPageClient posts={serialized} />;
}
