import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { getProgramById } from "@/lib/db";
import { formatDate } from "@/lib/client-utils";
import { PROGRAM_STATUS, PROGRAM_STATUS_COLORS } from "@/lib/constants";
import Card from "@/components/ui/Card";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const program = await getProgramById(Number(params.id));
  return {
    title: program?.title || "사업 상세",
    description: program?.description || "",
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const program = await getProgramById(Number(params.id));
  if (!program) notFound();

  const startDate = program.startDate ? (typeof program.startDate === "string" ? program.startDate : (program.startDate as Date).toISOString()) : null;
  const endDate = program.endDate ? (typeof program.endDate === "string" ? program.endDate : (program.endDate as Date).toISOString()) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/programs" className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        사업 목록
      </Link>

      <Card hover={false}>
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${PROGRAM_STATUS_COLORS[program.status as keyof typeof PROGRAM_STATUS_COLORS] || ""}`}>
              {PROGRAM_STATUS[program.status as keyof typeof PROGRAM_STATUS] || program.status}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-warm-gray-700 mb-4">{program.title}</h1>
          {program.description && <p className="text-warm-gray-500 mb-6">{program.description}</p>}

          <div className="grid sm:grid-cols-3 gap-4 mb-8 p-4 bg-warm-gray-100/50 rounded-lg">
            {startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-forest-500" />
                <div>
                  <p className="text-xs text-warm-gray-500">기간</p>
                  <p className="text-sm text-warm-gray-700">
                    {formatDate(startDate)}
                    {endDate && ` ~ ${formatDate(endDate)}`}
                  </p>
                </div>
              </div>
            )}
            {program.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest-500" />
                <div>
                  <p className="text-xs text-warm-gray-500">장소</p>
                  <p className="text-sm text-warm-gray-700">{program.location}</p>
                </div>
              </div>
            )}
            {program.targetAudience && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-forest-500" />
                <div>
                  <p className="text-xs text-warm-gray-500">대상</p>
                  <p className="text-sm text-warm-gray-700">{program.targetAudience}</p>
                </div>
              </div>
            )}
          </div>

          {program.content && (
            <div className="prose max-w-none text-warm-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: program.content }} />
          )}
        </div>
      </Card>
    </div>
  );
}
