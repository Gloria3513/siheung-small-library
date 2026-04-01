"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Pin } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/shared/DataTable";
import Badge from "@/components/ui/Badge";
import { dummyPosts } from "@/lib/dummy-data";
import { POST_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { Post } from "@/types";

export default function AdminPostsPage() {
  const columns = [
    {
      key: "id", label: "번호", className: "w-16",
      render: (item: Post) => <span className="text-warm-gray-500">{item.id}</span>,
    },
    {
      key: "category", label: "분류", className: "w-24",
      render: (item: Post) => <Badge variant="category">{POST_CATEGORIES[item.category]}</Badge>,
    },
    {
      key: "title", label: "제목",
      render: (item: Post) => (
        <div className="flex items-center gap-2">
          {item.isPinned && <Pin className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />}
          <span className="font-medium text-warm-gray-700 line-clamp-1">{item.title}</span>
        </div>
      ),
    },
    {
      key: "viewCount", label: "조회", className: "w-16",
      render: (item: Post) => <span className="text-warm-gray-500">{item.viewCount}</span>,
    },
    {
      key: "createdAt", label: "날짜", className: "w-28",
      render: (item: Post) => <span className="text-warm-gray-500 text-xs">{formatDate(item.createdAt)}</span>,
    },
    {
      key: "actions", label: "관리", className: "w-24",
      render: (item: Post) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/posts/${item.id}/edit`}>
            <button className="p-1.5 rounded hover:bg-warm-gray-100"><Edit className="w-4 h-4 text-warm-gray-500" /></button>
          </Link>
          <button className="p-1.5 rounded hover:bg-red-50" onClick={() => confirm("삭제하시겠습니까?")}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-gray-700">소식 관리</h1>
        <Link href="/admin/posts/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />글 작성</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={dummyPosts} keyExtractor={(item) => item.id} />
    </div>
  );
}
