"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/store/useStore";

export default function CommunityWritePage() {
  const router = useRouter();
  const { showToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "free",
    authorName: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      showToast("제목을 입력해주세요.", "error");
      return;
    }
    if (!form.content.trim()) {
      showToast("내용을 입력해주세요.", "error");
      return;
    }
    if (!form.authorName.trim()) {
      showToast("닉네임을 입력해주세요.", "error");
      return;
    }
    if (form.password.length < 4) {
      showToast("비밀번호는 4자 이상 입력해주세요.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          content: `<p>${form.content.replace(/\n/g, "</p><p>")}</p>`,
        }),
      });

      if (res.ok) {
        showToast("글이 등록되었습니다.", "success");
        router.push("/community");
      } else {
        const data = await res.json();
        showToast(data.message || "등록에 실패했습니다.", "error");
      }
    } catch {
      showToast("네트워크 오류가 발생했습니다.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="글쓰기" description="도란도란에 이야기를 남겨주세요" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>

        <Card hover={false}>
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1.5">
                카테고리
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                {Object.entries(COMMUNITY_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Author + Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-1.5">
                  닉네임
                </label>
                <input
                  type="text"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  placeholder="닉네임을 입력하세요"
                  maxLength={50}
                  className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-1.5">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="수정/삭제 시 필요합니다"
                  maxLength={20}
                  className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1.5">
                제목
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="제목을 입력하세요"
                maxLength={200}
                className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1.5">
                내용
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="내용을 입력하세요"
                rows={12}
                className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 manuscript-lines resize-y"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/community">
                <Button type="button" variant="ghost">
                  취소
                </Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting}>
                등록하기
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
