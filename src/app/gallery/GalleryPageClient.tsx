"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Calendar, Image as ImageIcon } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SearchBar from "@/components/ui/SearchBar";
import Card from "@/components/ui/Card";
import { formatDate } from "@/lib/client-utils";
import { GalleryAlbum } from "@/types";

export default function GalleryPageClient({ albums }: { albums: GalleryAlbum[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = albums.filter((album) =>
    searchQuery ? album.title.includes(searchQuery) : true
  );

  return (
    <>
      <PageHeader
        title="갤러리"
        description="협의회와 도서관의 활동 사진을 모았습니다"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-6">
          <SearchBar placeholder="앨범 검색" onSearch={setSearchQuery} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-warm-gray-500">
            <Camera className="w-10 h-10 mx-auto mb-3 text-warm-gray-300" />
            <p>등록된 앨범이 없습니다.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((album) => (
              <Link key={album.id} href={`/gallery/${album.id}`}>
                <Card className="overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-warm-100 to-forest-100 flex items-center justify-center relative">
                    {album.thumbnailUrl ? (
                      <img
                        src={album.thumbnailUrl}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-warm-gray-400 mx-auto" />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {album.imageCount || album.images?.length || 0}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-warm-gray-700 line-clamp-1 mb-1">
                      {album.title}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-warm-gray-500 line-clamp-1 mb-2">
                        {album.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-warm-gray-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(album.date)}
                    </div>
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
