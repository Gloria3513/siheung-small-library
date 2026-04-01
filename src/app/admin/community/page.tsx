"use client";

import { Trash2, Eye } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import Badge from "@/components/ui/Badge";
import { dummyCommunityPosts } from "@/lib/dummy-data";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { CommunityPost } from "@/types";

export default function AdminCommunityPage() {
  const columns = [
    { key: "id", label: "번호", className: "w-16", render: (item: CommunityPost) => <span className="text-warm-gray-500">{item.id}</span> },
    { key: "category", label: "분류", className: "w-24", render: (item: CommunityPost) => <Badge variant="category">{COMMUNITY_CATEGORIES[item.category]}</Badge> },
    { key: "title", label: "제목", render: (item: CommunityPost) => <span className="font-medium text-warm-gray-700 line-clamp-1">{item.title}</span> },
    { key: "author", label: "작성자", className: "w-24", render: (item: CommunityPost) => <span className="text-warm-gray-500">{item.authorName}</span> },
    { key: "viewCount", label: "조회", className: "w-16", render: (item: CommunityPost) => <span className="text-warm-gray-500">{item.viewCount}</span> },
    { key: "createdAt", label: "날짜", className: "w-28", render: (item: CommunityPost) => <span className="text-warm-gray-500 text-xs">{formatDate(item.createdAt)}</span> },
    { key: "actions", label: "관리", className: "w-20", render: (item: CommunityPost) => (
      <div className="flex items-center gap-1">
        <a href={`/community/${item.id}`} target="_blank" className="p-1.5 rounded hover:bg-warm-gray-100"><Eye className="w-4 h-4 text-warm-gray-500" /></a>
        <button className="p-1.5 rounded hover:bg-red-50" onClick={() => confirm(`'${item.title}' 글을 삭제하시겠습니까?`)}><Trash2 className="w-4 h-4 text-red-500" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">커뮤니티 관리</h1>
      <DataTable columns={columns} data={dummyCommunityPosts} keyExtractor={(item) => item.id} emptyMessage="등록된 커뮤니티 글이 없습니다." />
    </div>
  );
}
