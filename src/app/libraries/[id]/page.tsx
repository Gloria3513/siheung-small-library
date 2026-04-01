import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone, Globe, ArrowLeft } from "lucide-react";
import { getLibraryById } from "@/lib/db";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const library = await getLibraryById(Number(params.id));
  return {
    title: library ? library.name : "도서관 상세",
    description: library?.description || "도서관 상세 정보",
  };
}

export default async function LibraryDetailPage({ params }: PageProps) {
  const library = await getLibraryById(Number(params.id));
  if (!library) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/libraries"
        className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        도서관 목록
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-64 md:h-80 bg-gradient-to-br from-forest-100 to-forest-300/50 rounded-xl flex items-center justify-center mb-6">
            {library.imageUrl ? (
              <img src={library.imageUrl} alt={library.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-center">
                <span className="text-6xl">📚</span>
                <p className="mt-2 text-forest-700 font-medium">{library.name}</p>
              </div>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-700 mb-4">{library.name}</h1>
          {library.description && <p className="text-warm-gray-700 leading-relaxed mb-6">{library.description}</p>}
          {library.specialProgram && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-warm-gray-700 mb-3">특색 프로그램</h2>
              <div className="flex flex-wrap gap-2">
                {library.specialProgram.split(", ").map((prog) => (
                  <Badge key={prog} variant="category">{prog}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Card hover={false}>
            <div className="p-5 space-y-4">
              <h2 className="font-bold text-warm-gray-700 border-b border-warm-gray-300/30 pb-3">도서관 정보</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-forest-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-warm-gray-500 mb-0.5">주소</p>
                  <p className="text-sm text-warm-gray-700">{library.address}</p>
                </div>
              </div>
              {library.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-forest-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-warm-gray-500 mb-0.5">운영시간</p>
                    <p className="text-sm text-warm-gray-700">{library.hours}</p>
                    {library.closedDays && <p className="text-xs text-red-500 mt-1">휴관일: {library.closedDays}</p>}
                  </div>
                </div>
              )}
              {library.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-forest-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-warm-gray-500 mb-0.5">전화</p>
                    <a href={`tel:${library.phone}`} className="text-sm text-forest-700 hover:underline">{library.phone}</a>
                  </div>
                </div>
              )}
              {library.homepageUrl && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-forest-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-warm-gray-500 mb-0.5">홈페이지</p>
                    <a href={library.homepageUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-forest-700 hover:underline break-all">{library.homepageUrl}</a>
                  </div>
                </div>
              )}
            </div>
          </Card>
          <Card hover={false} className="mt-4">
            <div className="h-48 bg-warm-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center text-warm-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">지도 영역</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
