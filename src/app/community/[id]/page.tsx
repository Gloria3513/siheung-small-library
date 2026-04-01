import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, Calendar, User } from "lucide-react";
import { getCommunityPostById } from "@/lib/db";
import { formatDate } from "@/lib/client-utils";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { notFound } from "next/navigation";
import CommunityPostActions from "./CommunityPostActions";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getCommunityPostById(Number(params.id));
  return {
    title: post?.title || "게시글 상세",
    description: post ? post.content.replace(/<[^>]+>/g, "").slice(0, 100) : "",
  };
}

export default async function CommunityDetailPage({ params }: PageProps) {
  const post = await getCommunityPostById(Number(params.id));
  if (!post) notFound();

  const createdAt = typeof post.createdAt === "string" ? post.createdAt : (post.createdAt as Date).toISOString();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/community" className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        도란도란 목록
      </Link>

      <Card hover={false}>
        <div className="p-6 md:p-8">
          <div className="border-b border-warm-gray-300/30 pb-4 mb-6">
            <Badge variant="category" className="mb-3">
              {COMMUNITY_CATEGORIES[post.category as keyof typeof COMMUNITY_CATEGORIES] || post.category}
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold text-warm-gray-700 mb-3">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-warm-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                조회 {post.viewCount}
              </span>
            </div>
          </div>
          <div className="prose max-w-none text-warm-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Card>

      <CommunityPostActions postId={post.id} />
    </div>
  );
}
