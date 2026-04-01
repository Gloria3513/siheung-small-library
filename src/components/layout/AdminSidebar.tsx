"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Library, FileText, Briefcase,
  MessageSquare, FolderOpen, Image, LogOut, BookOpen,
} from "lucide-react";
import { cn } from "@/lib/client-utils";

const adminMenuItems = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "도서관 관리", href: "/admin/libraries", icon: Library },
  { label: "소식 관리", href: "/admin/posts", icon: FileText },
  { label: "사업 관리", href: "/admin/programs", icon: Briefcase },
  { label: "커뮤니티 관리", href: "/admin/community", icon: MessageSquare },
  { label: "자료 관리", href: "/admin/resources", icon: FolderOpen },
  { label: "갤러리 관리", href: "/admin/gallery", icon: Image },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-warm-gray-300/50 min-h-screen hidden md:block">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-forest-700" />
          <span className="font-bold text-forest-700 text-sm">관리자</span>
        </Link>
      </div>
      <nav className="px-3 space-y-1">
        {adminMenuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-forest-100 text-forest-700"
                  : "text-warm-gray-700 hover:bg-warm-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-warm-gray-300/50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-warm-gray-500 hover:text-warm-gray-700 mb-2"
        >
          <BookOpen className="w-4 h-4" />
          홈페이지로 이동
        </Link>
        <button
          onClick={() => {
            fetch("/api/auth/signout", { method: "POST" }).then(() => {
              window.location.href = "/admin/login";
            });
          }}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
