"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import CategoryTabs from "@/components/shared/CategoryTabs";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import FileDownloadItem from "@/components/shared/FileDownloadItem";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/client-utils";
import { Resource } from "@/types";

export default function ResourcesPageClient({ resources }: { resources: Resource[] }) {
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = resources.filter((res) => {
    if (category && res.category !== category) return false;
    if (searchQuery && !res.title.includes(searchQuery)) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="자료실"
        description="협의회 관련 자료를 다운로드 받으실 수 있습니다"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <CategoryTabs
            categories={RESOURCE_CATEGORIES}
            activeCategory={category}
            onCategoryChange={(c) => {
              setCategory(c);
              setPage(1);
            }}
          />
          <SearchBar
            placeholder="자료 검색"
            onSearch={(q) => {
              setSearchQuery(q);
              setPage(1);
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-warm-gray-500">
            <p>등록된 자료가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-warm-gray-300/50 overflow-hidden">
            {/* Desktop */}
            <table className="hidden md:table w-full">
              <thead>
                <tr className="bg-warm-gray-100/50 border-b border-warm-gray-300/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-16">번호</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-20">분류</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500">제목</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-28">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray-500 w-20">다운로드</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-gray-300/30">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-warm-gray-100/30 transition-colors">
                    <td className="px-4 py-3.5 text-sm text-warm-gray-500">{res.id}</td>
                    <td className="px-4 py-3.5 text-xs">
                      <span className="bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                        {RESOURCE_CATEGORIES[res.category]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <FileDownloadItem
                        fileName={res.title}
                        fileUrl={res.fileUrl}
                        fileSize={res.fileSize}
                        downloadCount={res.downloadCount}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-sm text-warm-gray-500">
                      {formatDate(res.createdAt)}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-warm-gray-500">
                      {res.downloadCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-warm-gray-300/30">
              {filtered.map((res) => (
                <div key={res.id} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                      {RESOURCE_CATEGORIES[res.category]}
                    </span>
                    <span className="text-xs text-warm-gray-500">
                      {formatDate(res.createdAt)}
                    </span>
                  </div>
                  <FileDownloadItem
                    fileName={res.title}
                    fileUrl={res.fileUrl}
                    fileSize={res.fileSize}
                    downloadCount={res.downloadCount}
                  />
                </div>
              ))}
            </div>
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
