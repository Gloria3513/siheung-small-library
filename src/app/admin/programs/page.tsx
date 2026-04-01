"use client";

import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/shared/DataTable";
import { dummyPrograms } from "@/lib/dummy-data";
import { PROGRAM_STATUS, PROGRAM_STATUS_COLORS } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { Program } from "@/types";

export default function AdminProgramsPage() {
  const columns = [
    { key: "id", label: "번호", className: "w-16", render: (item: Program) => <span className="text-warm-gray-500">{item.id}</span> },
    { key: "status", label: "상태", className: "w-20", render: (item: Program) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PROGRAM_STATUS_COLORS[item.status]}`}>
        {PROGRAM_STATUS[item.status]}
      </span>
    )},
    { key: "title", label: "제목", render: (item: Program) => <span className="font-medium text-warm-gray-700 line-clamp-1">{item.title}</span> },
    { key: "period", label: "기간", className: "w-48", render: (item: Program) => (
      <span className="text-warm-gray-500 text-xs">
        {item.startDate ? formatDate(item.startDate) : "-"} ~ {item.endDate ? formatDate(item.endDate) : "-"}
      </span>
    )},
    { key: "actions", label: "관리", className: "w-24", render: (item: Program) => (
      <div className="flex items-center gap-1">
        <Link href={`/admin/programs/${item.id}/edit`}><button className="p-1.5 rounded hover:bg-warm-gray-100"><Edit className="w-4 h-4 text-warm-gray-500" /></button></Link>
        <button className="p-1.5 rounded hover:bg-red-50" onClick={() => confirm("삭제하시겠습니까?")}><Trash2 className="w-4 h-4 text-red-500" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-gray-700">사업 관리</h1>
        <Link href="/admin/programs/new"><Button size="sm"><Plus className="w-4 h-4 mr-1" />사업 등록</Button></Link>
      </div>
      <DataTable columns={columns} data={dummyPrograms} keyExtractor={(item) => item.id} />
    </div>
  );
}
