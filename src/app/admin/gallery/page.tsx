"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Camera, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { dummyGalleryAlbums } from "@/lib/dummy-data";
import { formatDate } from "@/lib/client-utils";

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-gray-700">갤러리 관리</h1>
        <Link href="/admin/gallery/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />앨범 등록</Button>
        </Link>
      </div>

      {dummyGalleryAlbums.length === 0 ? (
        <div className="text-center py-16 text-warm-gray-500">
          <Camera className="w-10 h-10 mx-auto mb-3 text-warm-gray-300" />
          <p>등록된 앨범이 없습니다.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyGalleryAlbums.map((album) => (
            <Card key={album.id}>
              <div className="aspect-[4/3] bg-gradient-to-br from-warm-100 to-forest-100 rounded-t-xl flex items-center justify-center relative">
                <Camera className="w-10 h-10 text-warm-gray-400" />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  {album.imageCount || album.images?.length || 0}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-warm-gray-700 line-clamp-1 mb-1">{album.title}</h3>
                <p className="text-xs text-warm-gray-500 mb-3">{formatDate(album.date)}</p>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/gallery/${album.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-3.5 h-3.5 mr-1" />수정
                    </Button>
                  </Link>
                  <Button
                    variant="ghost" size="sm"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => confirm(`'${album.title}' 앨범을 삭제하시겠습니까?`)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
