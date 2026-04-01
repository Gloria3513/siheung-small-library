import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/client-utils";
import GalleryGrid from "@/components/shared/GalleryGrid";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const album = await prisma.gallery.findUnique({ where: { id: Number(params.id) } });
  return {
    title: album?.title || "앨범 상세",
    description: album?.description || "",
  };
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const album = await prisma.gallery.findUnique({
    where: { id: Number(params.id) },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!album) notFound();

  const images = album.images.map((img) => ({
    id: img.id,
    imageUrl: img.imageUrl,
    caption: img.caption ?? undefined,
    order: img.order,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        갤러리
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-700 mb-2">
          {album.title}
        </h1>
        {album.description && (
          <p className="text-warm-gray-500 mb-3">{album.description}</p>
        )}
        <div className="flex items-center gap-1 text-sm text-warm-gray-500">
          <Calendar className="w-4 h-4" />
          {formatDate(album.date.toISOString())}
          <span className="ml-3">
            {images.length}장
          </span>
        </div>
      </div>

      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <div className="text-center py-16 text-warm-gray-500">
          <p>등록된 사진이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
