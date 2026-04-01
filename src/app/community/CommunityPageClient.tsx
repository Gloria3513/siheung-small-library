"use client";

import { useState } from "react";
import Link from "next/link";
import { PenSquare, MessageCircle, Eye } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import CategoryTabs from "@/components/shared/CategoryTabs";
import SearchBar from "@/components/ui/SearchBar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { CommunityPost } from "@/types";

export default function CommunityPageClient({ posts }: { posts: CommunityPost[] }) {
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (
      searchQuery &&
      !post.title.includes(searchQuery) &&
      !post.excerpt?.includes(searchQuery)
    )
      return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="도란도란"
        description="책으로 이어지는 우리 마을 이야기를 나눠요"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <CategoryTabs
            categories={COMMUNITY_CATEGORIES}
            activeCategory={category}
            onCategoryChange={(c) => {
              setCategory(c);
              setPage(1);
            }}
          />
          <div className="flex items-center gap-3">
            <SearchBar
              placeholder="검색"
              onSearch={(q) => {
                setSearchQuery(q);
                setPage(1);
              }}
            />
            <Link href="/community/write">
              <Button size="sm">
                <PenSquare className="w-4 h-4 mr-1" />
                글쓰기
              </Button>
            </Link>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-warm-gray-500">
            <MessageCircle className="w-10 h-10 mx-auto mb-3 text-warm-gray-300" />
            <p>등록된 글이 없습니다.</p>
            <Link href="/community/write">
              <Button variant="outline" size="sm" className="mt-4">
                첫 글을 작성해보세요
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <Card className="mb-3">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="category">
                        {COMMUNITY_CATEGORIES[post.category]}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-warm-gray-700 mb-1.5">
                      {post.title}
                    </h3>
                    <p className="text-sm text-warm-gray-500 line-clamp-1 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-warm-gray-500">
                      <span>{post.authorName}</span>
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.viewCount}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / 10)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
