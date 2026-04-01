export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/db";
import NewsPageClient from "./NewsPageClient";

export default async function NewsPage() {
  const posts = await getPosts();
  return <NewsPageClient posts={posts} />;
}
