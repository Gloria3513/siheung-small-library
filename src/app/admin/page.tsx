"use client";

import { Library, FileText, Briefcase, MessageSquare, FolderOpen, Image, Eye } from "lucide-react";
import Card from "@/components/ui/Card";

const stats = [
  { label: "회원도서관", value: "22", icon: Library, color: "bg-forest-100 text-forest-700" },
  { label: "공지/소식", value: "45", icon: FileText, color: "bg-blue-50 text-blue-700" },
  { label: "사업/프로그램", value: "12", icon: Briefcase, color: "bg-warm-100 text-warm-700" },
  { label: "커뮤니티 글", value: "30", icon: MessageSquare, color: "bg-green-50 text-green-700" },
  { label: "자료실", value: "20", icon: FolderOpen, color: "bg-purple-50 text-purple-700" },
  { label: "갤러리 앨범", value: "8", icon: Image, color: "bg-pink-50 text-pink-700" },
];

const recentActivities = [
  { text: "새 공지사항 '2026년 정기총회 안내' 등록", time: "2시간 전" },
  { text: "커뮤니티 글 '추천도서: 나미야 잡화점의 기적' 신규 작성", time: "5시간 전" },
  { text: "갤러리 앨범 '봄 독서캠프' 사진 12장 업로드", time: "1일 전" },
  { text: "도서관 정보 '꿈나무작은도서관' 운영시간 수정", time: "2일 전" },
  { text: "자료실 '2026년 사업계획서' 파일 등록", time: "3일 전" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-warm-gray-700 mb-6">대시보드</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} hover={false}>
              <div className="p-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-warm-gray-700">{stat.value}</p>
                <p className="text-xs text-warm-gray-500 mt-0.5">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card hover={false}>
          <div className="p-5">
            <h2 className="font-bold text-warm-gray-700 mb-4">최근 활동</h2>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-forest-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-warm-gray-700 line-clamp-1">{activity.text}</p>
                    <p className="text-xs text-warm-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card hover={false}>
          <div className="p-5">
            <h2 className="font-bold text-warm-gray-700 mb-4">이번 달 방문 현황</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray-500">총 페이지뷰</span>
                <span className="text-lg font-bold text-warm-gray-700 flex items-center gap-1">
                  <Eye className="w-4 h-4 text-forest-500" />
                  1,234
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray-500">인기 페이지</span>
                <span className="text-sm text-warm-gray-700">회원도서관</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray-500">신규 게시글</span>
                <span className="text-sm text-warm-gray-700">8건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray-500">자료 다운로드</span>
                <span className="text-sm text-warm-gray-700">42회</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
