"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { RESOURCE_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/store/useStore";
import { dummyResources } from "@/lib/dummy-data";

interface PageProps { params: { id: string }; }

export default function AdminEditResourcePage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "minutes" });

  useEffect(() => {
    const resource = dummyResources.find((r) => r.id === Number(params.id));
    if (resource) {
      setForm({ title: resource.title, description: resource.description || "", category: resource.category });
    }
    setIsLoading(false);
  }, [params.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      showToast("자료가 수정되었습니다. (데모)", "success");
      router.push("/admin/resources");
    } catch { showToast("네트워크 오류", "error"); }
    finally { setIsSubmitting(false); }
  };

  if (isLoading) return <LoadingSpinner text="로딩 중..." />;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/resources" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-4">
        <ArrowLeft className="w-4 h-4" />자료 목록
      </Link>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">자료 수정</h1>
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
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/resources"><Button type="button" variant="ghost">취소</Button></Link>
            <Button type="submit" isLoading={isSubmitting}>수정하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
