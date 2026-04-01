"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <AdminSidebar />
      <div className="flex-1 bg-warm-gray-100/50">
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
