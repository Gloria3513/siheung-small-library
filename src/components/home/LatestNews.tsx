import Link from "next/link";
import { ArrowRight, Pin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/client-utils";
import { POST_CATEGORIES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default async function LatestNews() {
  const posts = await prisma.post.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-700">최신 소식</h2>
            <p className="mt-1 text-warm-gray-500 text-sm">
              협의회와 도서관의 새로운 소식을 전합니다
            </p>
          </div>
          <Link
            href="/news"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-900"
          >
            더보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/news/${post.id}`}>
              <Card className="h-full">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="category">
                      {POST_CATEGORIES[post.category as keyof typeof POST_CATEGORIES] || post.category}
                    </Badge>
                    {post.isPinned && (
                      <Pin className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    )}
                  </div>
                  <h3 className="font-bold text-warm-gray-700 line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-warm-gray-500 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-warm-gray-500">
                    <span>{formatDate(post.createdAt.toISOString())}</span>
                    <span>조회 {post.viewCount}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <Link
          href="/news"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-forest-700"
        >
          소식 더보기
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
