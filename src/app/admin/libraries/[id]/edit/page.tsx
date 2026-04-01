"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useStore } from "@/store/useStore";
import { dummyLibraries } from "@/lib/dummy-data";

interface PageProps {
  params: { id: string };
}

export default function AdminEditLibraryPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", address: "", phone: "", hours: "",
    closedDays: "", description: "", specialProgram: "",
    homepageUrl: "", lat: "", lng: "", order: "1", isActive: true,
  });

  useEffect(() => {
    // In production, fetch from API
    const library = dummyLibraries.find((l) => l.id === Number(params.id));
    if (library) {
      setForm({
        name: library.name, address: library.address,
        phone: library.phone || "", hours: library.hours || "",
        closedDays: library.closedDays || "",
        description: library.description || "",
        specialProgram: library.specialProgram || "",
        homepageUrl: library.homepageUrl || "",
        lat: library.lat?.toString() || "",
        lng: library.lng?.toString() || "",
        order: library.order.toString(),
        isActive: library.isActive,
      });
    }
    setIsLoading(false);
  }, [params.id]);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim()) {
      showToast("도서관명과 주소는 필수입니다.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/libraries/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lat: form.lat ? parseFloat(form.lat) : undefined,
          lng: form.lng ? parseFloat(form.lng) : undefined,
          order: parseInt(form.order) || 1,
        }),
      });
      if (res.ok) {
        showToast("도서관 정보가 수정되었습니다.", "success");
        router.push("/admin/libraries");
      } else {
        showToast("수정 실패", "error");
      }
    } catch {
      showToast("네트워크 오류", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner text="로딩 중..." />;

  const fields = [
    { label: "도서관명 *", field: "name" },
    { label: "주소 *", field: "address" },
    { label: "전화번호", field: "phone" },
    { label: "운영시간", field: "hours" },
    { label: "휴관일", field: "closedDays" },
    { label: "특색 프로그램", field: "specialProgram" },
    { label: "홈페이지", field: "homepageUrl" },
  ];

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/libraries"
        className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        도서관 목록
      </Link>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">도서관 수정</h1>

      <Card hover={false}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.field}>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">{f.label}</label>
              <input
                type="text"
                value={form[f.field as keyof typeof form] as string}
                onChange={(e) => updateField(f.field, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-warm-gray-700 mb-1">소개</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => updateField("isActive", e.target.checked)}
              className="rounded border-warm-gray-300 text-forest-700 focus:ring-forest-500"
            />
            <label htmlFor="isActive" className="text-sm text-warm-gray-700">
              활성 상태
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/libraries">
              <Button type="button" variant="ghost">취소</Button>
            </Link>
            <Button type="submit" isLoading={isSubmitting}>수정하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
