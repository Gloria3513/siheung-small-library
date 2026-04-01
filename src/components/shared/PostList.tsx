"use client";

import Link from "next/link";
import { Pin, Paperclip } from "lucide-react";
import { Post } from "@/types";
import { formatDate } from "@/lib/client-utils";
import Badge from "@/components/ui/Badge";
import { POST_CATEGORIES } from "@/lib/constants";

interface PostListProps {
  posts: Post[];
  basePath?: string;
}

export default function PostList({ posts, basePath = "/news" }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-warm-gray-500">
        <p>등록된 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-warm-gray-300/50 overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="bg-warm-gray-100/50 border-b border-warm-gray-300/30">
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-20">번호</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-24">분류</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500">제목</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-28">날짜</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-20">조회</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-warm-gray-300/30">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-warm-gray-100/30 transition-colors">
              <td className="px-4 py-3.5 text-sm text-warm-gray-500">{post.id}</td>
              <td className="px-4 py-3.5">
                <Badge variant="category">{POST_CATEGORIES[post.category]}</Badge>
              </td>
              <td className="px-4 py-3.5">
                <Link
                  href={`${basePath}/${post.id}`}
                  className="text-sm font-medium text-warm-gray-700 hover:text-forest-700 flex items-center gap-2"
                >
                  {post.isPinned && <Pin className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />}
                  <span className="line-clamp-1">{post.title}</span>
                  {post.attachments && post.attachments.length > 0 && (
                    <Paperclip className="w-3.5 h-3.5 text-warm-gray-400 shrink-0" />
                  )}
                </Link>
              </td>
              <td className="px-4 py-3.5 text-sm text-warm-gray-500">{formatDate(post.createdAt)}</td>
              <td className="px-4 py-3.5 text-sm text-warm-gray-500">{post.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-warm-gray-300/30">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`${basePath}/${post.id}`}
            className="block px-4 py-4 hover:bg-warm-gray-100/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="category">{POST_CATEGORIES[post.category]}</Badge>
              {post.isPinned && <Pin className="w-3.5 h-3.5 text-red-500 fill-red-500" />}
            </div>
            <h3 className="text-sm font-medium text-warm-gray-700 line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-warm-gray-500">
              <span>{formatDate(post.createdAt)}</span>
              <span>조회 {post.viewCount}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
