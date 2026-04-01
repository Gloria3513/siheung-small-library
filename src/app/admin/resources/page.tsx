"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/shared/DataTable";
import Badge from "@/components/ui/Badge";
import { dummyResources } from "@/lib/dummy-data";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import { formatDate, formatFileSize } from "@/lib/client-utils";
import { Resource } from "@/types";

export default function AdminResourcesPage() {
  const columns = [
    { key: "id", label: "번호", className: "w-16", render: (item: Resource) => <span className="text-warm-gray-500">{item.id}</span> },
    { key: "category", label: "분류", className: "w-20", render: (item: Resource) => <Badge variant="category">{RESOURCE_CATEGORIES[item.category]}</Badge> },
    { key: "title", label: "제목", render: (item: Resource) => (
      <div>
        <span className="font-medium text-warm-gray-700">{item.title}</span>
        <p className="text-xs text-warm-gray-500">{item.fileName} ({formatFileSize(item.fileSize)})</p>
      </div>
    )},
    { key: "downloads", label: "다운로드", className: "w-20", render: (item: Resource) => (
      <span className="text-warm-gray-500 flex items-center gap-1"><Download className="w-3 h-3" />{item.downloadCount}</span>
    )},
    { key: "createdAt", label: "날짜", className: "w-28", render: (item: Resource) => <span className="text-warm-gray-500 text-xs">{formatDate(item.createdAt)}</span> },
    { key: "actions", label: "관리", className: "w-24", render: (item: Resource) => (
      <div className="flex items-center gap-1">
        <Link href={`/admin/resources/${item.id}/edit`}><button className="p-1.5 rounded hover:bg-warm-gray-100"><Edit className="w-4 h-4 text-warm-gray-500" /></button></Link>
        <button className="p-1.5 rounded hover:bg-red-50" onClick={() => confirm("삭제하시겠습니까?")}><Trash2 className="w-4 h-4 text-red-500" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-gray-700">자료 관리</h1>
        <Link href="/admin/resources/new"><Button size="sm"><Plus className="w-4 h-4 mr-1" />자료 등록</Button></Link>
      </div>
      <DataTable columns={columns} data={dummyResources} keyExtractor={(item) => item.id} />
    </div>
  );
}
