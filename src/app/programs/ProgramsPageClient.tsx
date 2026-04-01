"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import CategoryTabs from "@/components/shared/CategoryTabs";
import Card from "@/components/ui/Card";
import { PROGRAM_STATUS, PROGRAM_STATUS_COLORS } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { Program } from "@/types";

export default function ProgramsPageClient({ programs }: { programs: Program[] }) {
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = programs.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="사업 안내"
        description="시흥시작은도서관협의회의 사업과 프로그램을 소개합니다"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <CategoryTabs
            categories={PROGRAM_STATUS}
            activeCategory={statusFilter}
            onCategoryChange={setStatusFilter}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-warm-gray-500">
            <p>등록된 사업이 없습니다.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program) => (
              <Link key={program.id} href={`/programs/${program.id}`}>
                <Card className="h-full">
                  <div className="h-40 bg-gradient-to-br from-warm-100 to-forest-100 rounded-t-xl flex items-center justify-center">
                    {program.imageUrl ? (
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    ) : (
                      <span className="text-4xl">📋</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          PROGRAM_STATUS_COLORS[program.status]
                        }`}
                      >
                        {PROGRAM_STATUS[program.status]}
                      </span>
                    </div>
                    <h3 className="font-bold text-warm-gray-700 line-clamp-2 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-warm-gray-500 line-clamp-2 mb-3">
                      {program.description}
                    </p>
                    {program.startDate && (
                      <div className="flex items-center gap-1.5 text-xs text-warm-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {formatDate(program.startDate)}
                          {program.endDate && ` ~ ${formatDate(program.endDate)}`}
                        </span>
                      </div>
                    )}
                    {program.location && (
                      <p className="text-xs text-warm-gray-500 mt-1">
                        장소: {program.location}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
