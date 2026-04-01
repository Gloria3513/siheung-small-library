import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Calendar } from "lucide-react";
import { getPostById } from "@/lib/db";
import { formatDate } from "@/lib/client-utils";
import { POST_CATEGORIES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FileDownloadItem from "@/components/shared/FileDownloadItem";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostById(Number(params.id));
  return {
    title: post?.title || "소식 상세",
    description: post?.excerpt || "",
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const post = await getPostById(Number(params.id));
  if (!post) notFound();

  const prevPost = (post as any).prevPost || null;
  const nextPost = (post as any).nextPost || null;
  const attachments = (post as any).attachments || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/news"
        className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        목록으로
      </Link>

      <Card hover={false}>
        <div className="p-6 md:p-8">
          <div className="border-b border-warm-gray-300/30 pb-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="category">
                {POST_CATEGORIES[post.category as keyof typeof POST_CATEGORIES] || post.category}
              </Badge>
              {post.isPinned && <Badge variant="notice">고정</Badge>}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-warm-gray-700 mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-warm-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                조회 {post.viewCount}
              </span>
            </div>
          </div>

          <div
            className="prose max-w-none text-warm-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {attachments.length > 0 && (
            <div className="border-t border-warm-gray-300/30 pt-6">
              <h3 className="text-sm font-bold text-warm-gray-700 mb-3">첨부파일</h3>
              <div className="space-y-2">
                {attachments.map((file: any, i: number) => (
                  <FileDownloadItem
                    key={i}
                    fileName={file.name}
                    fileUrl={file.url}
                    fileSize={file.size}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {(nextPost || prevPost) && (
        <div className="mt-4 border border-warm-gray-300/50 rounded-xl bg-white overflow-hidden">
          {nextPost && (
            <Link
              href={`/news/${nextPost.id}`}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-warm-gray-100/50 transition-colors border-b border-warm-gray-300/30"
            >
              <ChevronLeft className="w-4 h-4 text-warm-gray-400 shrink-0" />
              <span className="text-xs text-warm-gray-500 shrink-0 w-12">다음글</span>
              <span className="text-sm text-warm-gray-700 line-clamp-1">{nextPost.title}</span>
            </Link>
          )}
          {prevPost && (
            <Link
              href={`/news/${prevPost.id}`}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-warm-gray-100/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-warm-gray-400 shrink-0" />
              <span className="text-xs text-warm-gray-500 shrink-0 w-12">이전글</span>
              <span className="text-sm text-warm-gray-700 line-clamp-1">{prevPost.title}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
