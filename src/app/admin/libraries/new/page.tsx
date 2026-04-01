"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useStore } from "@/store/useStore";

export default function AdminNewLibraryPage() {
  const router = useRouter();
  const { showToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", address: "", phone: "", hours: "",
    closedDays: "", description: "", specialProgram: "",
    homepageUrl: "", lat: "", lng: "", order: "1",
  });

  const updateField = (field: string, value: string) => {
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
      const res = await fetch("/api/libraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lat: form.lat ? parseFloat(form.lat) : undefined,
          lng: form.lng ? parseFloat(form.lng) : undefined,
          order: parseInt(form.order) || 1,
          isActive: true,
        }),
      });
      if (res.ok) {
        showToast("도서관이 등록되었습니다.", "success");
        router.push("/admin/libraries");
      } else {
        const data = await res.json();
        showToast(data.message || "등록 실패", "error");
      }
    } catch {
      showToast("네트워크 오류", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { label: "도서관명 *", field: "name", placeholder: "예: 꿈나무작은도서관" },
    { label: "주소 *", field: "address", placeholder: "예: 시흥시 정왕동 1234-5" },
    { label: "전화번호", field: "phone", placeholder: "예: 031-123-4567" },
    { label: "운영시간", field: "hours", placeholder: "예: 월~금 10:00-18:00" },
    { label: "휴관일", field: "closedDays", placeholder: "예: 일요일, 공휴일" },
    { label: "특색 프로그램", field: "specialProgram", placeholder: "쉼표로 구분" },
    { label: "홈페이지", field: "homepageUrl", placeholder: "https://" },
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
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">도서관 등록</h1>

      <Card hover={false}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.field}>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.field as keyof typeof form]}
                onChange={(e) => updateField(f.field, e.target.value)}
                placeholder={f.placeholder}
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
              placeholder="도서관 소개글을 작성하세요"
              className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">위도</label>
              <input
                type="text" value={form.lat}
                onChange={(e) => updateField("lat", e.target.value)}
                placeholder="37.xxxx"
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">경도</label>
              <input
                type="text" value={form.lng}
                onChange={(e) => updateField("lng", e.target.value)}
                placeholder="126.xxxx"
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray-700 mb-1">정렬순서</label>
              <input
                type="number" value={form.order}
                onChange={(e) => updateField("order", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/libraries">
              <Button type="button" variant="ghost">취소</Button>
            </Link>
            <Button type="submit" isLoading={isSubmitting}>등록하기</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
