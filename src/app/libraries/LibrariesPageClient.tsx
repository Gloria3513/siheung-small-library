"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import LibraryCard from "@/components/library/LibraryCard";
import SearchBar from "@/components/ui/SearchBar";
import { Library } from "@/types";

export default function LibrariesPageClient({ libraries }: { libraries: Library[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLibraries = libraries.filter(
    (lib) =>
      lib.name.includes(searchQuery) ||
      lib.address.includes(searchQuery) ||
      (lib.specialProgram && lib.specialProgram.includes(searchQuery))
  );

  return (
    <>
      <PageHeader
        title="회원 도서관"
        description="시흥시 곳곳에 자리한 작은도서관을 소개합니다"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <p className="text-sm text-warm-gray-500">
            총 <strong className="text-forest-700">{filteredLibraries.length}</strong>개 도서관
          </p>
          <SearchBar
            placeholder="도서관 이름, 주소, 프로그램 검색"
            onSearch={setSearchQuery}
          />
        </div>

        {filteredLibraries.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLibraries.map((library) => (
              <LibraryCard key={library.id} library={library} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-warm-gray-500">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
