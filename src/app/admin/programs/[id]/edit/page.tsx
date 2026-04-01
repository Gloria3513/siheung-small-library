"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PROGRAM_STATUS } from "@/lib/constants";
import { useStore } from "@/store/useStore";
import { dummyPrograms } from "@/lib/dummy-data";

interface PageProps { params: { id: string }; }

export default function AdminEditProgramPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", content: "", status: "planned",
    startDate: "", endDate: "", location: "", targetAudience: "",
  });

  useEffect(() => {
    const program = dummyPrograms.find((p) => p.id === Number(params.id));
    if (program) {
      setForm({
        title: program.title, description: program.description || "",
        content: program.content?.replace(/<[^>]*>/g, "") || "",
        status: program.status, startDate: program.startDate || "",
        endDate: program.endDate || "", location: program.location || "",
        targetAudience: program.targetAudience || "",
      });
    }
    setIsLoading(false);
  }, [params.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/programs/${params.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, content: `<p>${form.content.replace(/\n/g, "</p><p>")}</p>` }),
      });
      if (res.ok) { showToast("수정되었습니다.", "success"); router.push("/admin/programs"); }
      else showToast("수정 실패", "error");
    } catch { showToast("네트워크 오류", "error"); }
    finally { setIsSubmitting(false); }
  };

  if (isLoading) return <LoadingSpinner text="로딩 중..." />;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/programs" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-4">
        <ArrowLeft className="w-4 h-4" />사업 목록
      </Link>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">사업 수정</h1>
      <Card hover={false}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">상태</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
              {Object.entries(PROGRAM_STATUS).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">제목 *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">간략 설명</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">시작일</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">종료일</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">상세 내용</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10} className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/programs"><Button type="button" variant="ghost">취소</Button></Link>
            <Button type="submit" isLoading={isSubmitting}>수정하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
