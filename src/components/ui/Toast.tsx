"use client";

import { useStore } from "@/store/useStore";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/client-utils";

export default function Toast() {
  const { toast, hideToast } = useStore();

  if (!toast.isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bg = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] animate-slide-up">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg",
          bg[toast.type]
        )}
      >
        {icons[toast.type]}
        <span className="text-sm font-medium text-warm-gray-700">
          {toast.message}
        </span>
        <button onClick={hideToast} className="ml-2 p-0.5">
          <X className="w-4 h-4 text-warm-gray-500" />
        </button>
      </div>
    </div>
  );
}
