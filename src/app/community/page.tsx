export const dynamic = "force-dynamic";

import { getCommunityPosts } from "@/lib/db";
import CommunityPageClient from "./CommunityPageClient";

export default async function CommunityPage() {
  const posts = await getCommunityPosts();
  return <CommunityPageClient posts={posts} />;
}
