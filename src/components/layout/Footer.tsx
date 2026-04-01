import Link from "next/link";
import { BookOpen, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 협의회 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-forest-300" />
              <h3 className="text-lg font-bold">시흥시작은도서관협의회</h3>
            </div>
            <p className="text-forest-300 text-sm leading-relaxed">
              시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티.
              <br />
              함께 읽고, 함께 나누고, 함께 성장합니다.
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm text-forest-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>경기도 시흥시 시흥대로 123</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>031-000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@siheung-library.kr</span>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="text-lg font-bold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm text-forest-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  협의회 소개
                </Link>
              </li>
              <li>
                <Link href="/libraries" className="hover:text-white transition-colors">
                  회원도서관
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  도란도란
                </Link>
              </li>
              <li>
                <a
                  href="https://www.siheung.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  시흥시청
                </a>
              </li>
              <li>
                <a
                  href="https://www.smalllibrary.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (사)작은도서관만드는사람들
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-forest-700 text-center text-sm text-forest-300">
          <p>&copy; 2026 시흥시작은도서관협의회. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
