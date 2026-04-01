import Link from "next/link";
import { Library, Newspaper, Briefcase, MessageCircle, FolderOpen, Image } from "lucide-react";

const quickLinks = [
  { label: "회원도서관", href: "/libraries", icon: Library, color: "bg-forest-100 text-forest-700" },
  { label: "공지사항", href: "/news", icon: Newspaper, color: "bg-warm-100 text-warm-700" },
  { label: "사업안내", href: "/programs", icon: Briefcase, color: "bg-blue-50 text-blue-700" },
  { label: "도란도란", href: "/community", icon: MessageCircle, color: "bg-green-50 text-green-700" },
  { label: "자료실", href: "/resources", icon: FolderOpen, color: "bg-purple-50 text-purple-700" },
  { label: "갤러리", href: "/gallery", icon: Image, color: "bg-pink-50 text-pink-700" },
];

export default function QuickLinks() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-warm-gray-100 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${link.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-warm-gray-700">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
