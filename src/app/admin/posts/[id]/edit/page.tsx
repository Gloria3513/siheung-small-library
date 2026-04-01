"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { POST_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/store/useStore";
import { dummyPosts } from "@/lib/dummy-data";

interface PageProps {
  params: { id: string };
}

export default function AdminEditPostPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", category: "notice", isPinned: false });

  useEffect(() => {
    const post = dummyPosts.find((p) => p.id === Number(params.id));
    if (post) {
      setForm({
        title: post.title,
        content: post.content.replace(/<[^>]*>/g, ""),
        category: post.category,
        isPinned: post.isPinned,
      });
    }
    setIsLoading(false);
  }, [params.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, content: `<p>${form.content.replace(/\n/g, "</p><p>")}</p>` }),
      });
      if (res.ok) {
        showToast("게시글이 수정되었습니다.", "success");
        router.push("/admin/posts");
      } else showToast("수정 실패", "error");
    } catch { showToast("네트워크 오류", "error"); }
    finally { setIsSubmitting(false); }
  };

  if (isLoading) return <LoadingSpinner text="로딩 중..." />;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/posts" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-4">
        <ArrowLeft className="w-4 h-4" />소식 목록
      </Link>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">게시글 수정</h1>
      <Card hover={false}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">카테고리</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
              {Object.entries(POST_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">제목 *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">내용 *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={15} className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPinned" checked={form.isPinned}
              onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
              className="rounded border-warm-gray-300 text-forest-700 focus:ring-forest-500" />
            <label htmlFor="isPinned" className="text-sm text-warm-gray-700">상단 고정</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/posts"><Button type="button" variant="ghost">취소</Button></Link>
            <Button type="submit" isLoading={isSubmitting}>수정하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
