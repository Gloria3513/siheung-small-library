"use client";

import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/shared/DataTable";
import Badge from "@/components/ui/Badge";
import { dummyLibraries } from "@/lib/dummy-data";
import { Library } from "@/types";

export default function AdminLibrariesPage() {
  const columns = [
    {
      key: "order",
      label: "순서",
      className: "w-16",
      render: (item: Library) => <span className="text-warm-gray-500">{item.order}</span>,
    },
    {
      key: "name",
      label: "도서관명",
      render: (item: Library) => (
        <span className="font-medium text-warm-gray-700">{item.name}</span>
      ),
    },
    {
      key: "address",
      label: "주소",
      render: (item: Library) => (
        <span className="text-warm-gray-500 text-xs">{item.address}</span>
      ),
    },
    {
      key: "phone",
      label: "전화",
      className: "w-32",
      render: (item: Library) => (
        <span className="text-warm-gray-500">{item.phone || "-"}</span>
      ),
    },
    {
      key: "status",
      label: "상태",
      className: "w-20",
      render: (item: Library) => (
        <Badge variant={item.isActive ? "ongoing" : "completed"}>
          {item.isActive ? "활성" : "비활성"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "관리",
      className: "w-24",
      render: (item: Library) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/libraries/${item.id}/edit`}>
            <button className="p-1.5 rounded hover:bg-warm-gray-100" title="수정">
              <Edit className="w-4 h-4 text-warm-gray-500" />
            </button>
          </Link>
          <button
            className="p-1.5 rounded hover:bg-red-50"
            title="삭제"
            onClick={() => {
              if (confirm(`'${item.name}'을(를) 삭제하시겠습니까?`)) {
                // Delete logic
              }
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-gray-700">도서관 관리</h1>
        <Link href="/admin/libraries/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            도서관 등록
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={dummyLibraries}
        keyExtractor={(item) => item.id}
        emptyMessage="등록된 도서관이 없습니다."
      />
    </div>
  );
}
