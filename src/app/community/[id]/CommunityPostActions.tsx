"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/store/useStore";

export default function CommunityPostActions({ postId }: { postId: number }) {
  const router = useRouter();
  const { showToast } = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (password.length < 4) {
      showToast("비밀번호를 입력해주세요.", "error");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/community/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        showToast("게시글이 삭제되었습니다.", "success");
        router.push("/community");
        router.refresh();
      } else {
        const data = await res.json();
        showToast(data.message || "삭제에 실패했습니다.", "error");
      }
    } catch {
      showToast("네트워크 오류가 발생했습니다.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteModal(true)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          삭제
        </Button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPassword("");
        }}
        title="게시글 삭제"
      >
        <div className="space-y-4">
          <p className="text-sm text-warm-gray-500">
            작성 시 입력한 비밀번호를 입력해주세요.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-3 py-2.5 rounded-lg border border-warm-gray-300 bg-white text-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleDelete();
            }}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowDeleteModal(false);
                setPassword("");
              }}
            >
              취소
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              isLoading={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
