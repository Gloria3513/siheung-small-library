import Link from "next/link";
import { BookOpen, Users, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-forest-700 via-forest-900 to-forest-700 text-white overflow-hidden">
      {/* Decorative book shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-40 border-2 border-white rounded-r-lg rotate-[-15deg]" />
        <div className="absolute top-20 left-16 w-32 h-40 border-2 border-white rounded-r-lg rotate-[-10deg]" />
        <div className="absolute bottom-10 right-10 w-24 h-32 border-2 border-white rounded-r-lg rotate-[15deg]" />
        <div className="absolute top-1/2 right-1/4 w-20 h-28 border-2 border-white rounded-r-lg rotate-[5deg]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              <span>도란도란, 책으로 이어지는 마을 이야기</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              시흥시 작은도서관이
              <br />
              <span className="text-warm-300">함께</span> 만드는
              <br />
              따뜻한 이야기
            </h1>
            <p className="mt-6 text-forest-300 text-base md:text-lg leading-relaxed max-w-lg">
              22개 작은도서관이 모여 마을의 지식과 이야기를 나눕니다.
              <br />
              책으로 연결되는 우리 동네 커뮤니티에 함께해주세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/libraries">
                <Button size="lg" className="bg-white text-forest-700 hover:bg-cream">
                  회원도서관 둘러보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  도란도란 참여하기
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Stylized book stack illustration */}
              <div className="w-72 h-80 relative">
                <div className="absolute bottom-0 left-8 w-56 h-12 bg-warm-700 rounded-t-sm" />
                <div className="absolute bottom-12 left-6 w-60 h-12 bg-forest-500 rounded-t-sm" />
                <div className="absolute bottom-24 left-10 w-52 h-12 bg-warm-500 rounded-t-sm" />
                <div className="absolute bottom-36 left-4 w-64 h-12 bg-forest-300 rounded-t-sm" />
                <div className="absolute bottom-48 left-12 w-48 h-12 bg-warm-300 rounded-t-sm" />
                {/* Open book on top */}
                <div className="absolute bottom-56 left-1/2 -translate-x-1/2">
                  <div className="flex">
                    <div className="w-28 h-36 bg-cream rounded-l-sm border-r border-warm-gray-300 shadow-lg transform -rotate-6 origin-bottom-right" />
                    <div className="w-28 h-36 bg-cream rounded-r-sm shadow-lg transform rotate-6 origin-bottom-left" />
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 right-0 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
                  <Users className="w-3 h-3" />
                  22개 도서관
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
