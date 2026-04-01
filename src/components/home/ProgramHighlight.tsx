import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getActivePrograms } from "@/lib/db";
import { formatDate } from "@/lib/client-utils";
import { PROGRAM_STATUS, PROGRAM_STATUS_COLORS } from "@/lib/constants";
import Card from "@/components/ui/Card";

export default async function ProgramHighlight() {
  const programs = await getActivePrograms(3);

  return (
    <section className="py-16 bg-forest-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-700">사업 안내</h2>
            <p className="mt-1 text-warm-gray-500 text-sm">
              진행중이거나 예정된 사업과 프로그램
            </p>
          </div>
          <Link
            href="/programs"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-900"
          >
            전체보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Link key={program.id} href={`/programs/${program.id}`}>
              <Card className="h-full">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        PROGRAM_STATUS_COLORS[program.status as keyof typeof PROGRAM_STATUS_COLORS] || ""
                      }`}
                    >
                      {PROGRAM_STATUS[program.status as keyof typeof PROGRAM_STATUS] || program.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-warm-gray-700 line-clamp-2 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-warm-gray-500 line-clamp-2 mb-4">
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
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
