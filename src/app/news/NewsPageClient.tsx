"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import CategoryTabs from "@/components/shared/CategoryTabs";
import PostList from "@/components/shared/PostList";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import { POST_CATEGORIES } from "@/lib/constants";
import { Post } from "@/types";

export default function NewsPageClient({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (searchQuery && !post.title.includes(searchQuery) && !post.excerpt?.includes(searchQuery))
      return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="소식"
        description="협의회와 회원도서관의 소식을 전합니다"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <CategoryTabs
            categories={POST_CATEGORIES}
            activeCategory={category}
            onCategoryChange={(c) => {
              setCategory(c);
              setPage(1);
            }}
          />
          <SearchBar
            placeholder="제목, 내용 검색"
            onSearch={(q) => {
              setSearchQuery(q);
              setPage(1);
            }}
          />
        </div>

        <PostList posts={filtered} basePath="/news" />

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / 10)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
