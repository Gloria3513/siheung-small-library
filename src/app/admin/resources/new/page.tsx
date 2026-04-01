"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/store/useStore";

export default function AdminNewResourcePage() {
  const router = useRouter();
  const { showToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "minutes" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { showToast("제목은 필수입니다.", "error"); return; }
    setIsSubmitting(true);
    try {
      showToast("자료가 등록되었습니다. (데모)", "success");
      router.push("/admin/resources");
    } catch { showToast("네트워크 오류", "error"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/resources" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-4">
        <ArrowLeft className="w-4 h-4" />자료 목록
      </Link>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">자료 등록</h1>
      <Card hover={false}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">카테고리</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
              {Object.entries(RESOURCE_CATEGORIES).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">제목 *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">설명</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">파일 업로드</label>
            <div className="border-2 border-dashed border-warm-gray-300 rounded-lg p-8 text-center text-warm-gray-500">
              <p className="text-sm">파일을 드래그하거나 클릭하여 업로드</p>
              <p className="text-xs mt-1">PDF, HWP, DOC, XLSX, PPTX, ZIP (최대 20MB)</p>
              <input type="file" className="hidden" />
              <Button type="button" variant="outline" size="sm" className="mt-3">파일 선택</Button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/resources"><Button type="button" variant="ghost">취소</Button></Link>
            <Button type="submit" isLoading={isSubmitting}>등록하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
