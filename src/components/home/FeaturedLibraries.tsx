import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";

export default async function FeaturedLibraries() {
  const libraries = await prisma.library.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 4,
  });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-700">회원 도서관</h2>
            <p className="mt-1 text-warm-gray-500 text-sm">
              시흥시 곳곳에 자리한 따뜻한 작은도서관들
            </p>
          </div>
          <Link
            href="/libraries"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-900"
          >
            전체보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {libraries.map((lib) => (
            <Link key={lib.id} href={`/libraries/${lib.id}`}>
              <Card className="h-full">
                <div className="h-40 bg-gradient-to-br from-forest-100 to-forest-300 rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-2xl">📚</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-forest-700">
                      {lib.name}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-1.5 text-sm text-warm-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{lib.address}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-sm text-warm-gray-500">
                    <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{lib.hours}</span>
                  </div>
                  {lib.specialProgram && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {lib.specialProgram.split(", ").slice(0, 2).map((prog) => (
                        <span
                          key={prog}
                          className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <Link
          href="/libraries"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-forest-700"
        >
          전체 도서관 보기
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
