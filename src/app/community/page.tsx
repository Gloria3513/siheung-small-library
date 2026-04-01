import { prisma } from "@/lib/prisma";
import CommunityPageClient from "./CommunityPageClient";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const posts = await prisma.communityPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = posts.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    excerpt: p.content.replace(/<[^>]+>/g, "").slice(0, 100),
    category: p.category as "free" | "book-recommend" | "reading-group" | "human-library",
    authorName: p.authorName,
    viewCount: p.viewCount,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <CommunityPageClient posts={serialized} />;
}
