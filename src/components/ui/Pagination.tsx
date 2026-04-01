"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/client-utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="페이지 네비게이션">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-warm-gray-500 hover:bg-warm-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pages.map((page, i) =>
        typeof page === "string" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-warm-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-forest-700 text-white"
                : "text-warm-gray-700 hover:bg-warm-gray-100"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-warm-gray-500 hover:bg-warm-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
