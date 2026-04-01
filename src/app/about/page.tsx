import { Metadata } from "next";
import { BookOpen, Target, Users, Heart } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Timeline from "@/components/shared/Timeline";
import Card from "@/components/ui/Card";
import { historyData } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "협의회 소개",
  description: "시흥시작은도서관협의회를 소개합니다. 설립목적, 연혁, 조직도, 회칙을 확인하세요.",
};

const purposes = [
  {
    icon: Users,
    title: "연대와 협력",
    description: "시흥시 작은도서관 간 네트워크를 구축하고 상호 협력하여 함께 성장합니다.",
  },
  {
    icon: BookOpen,
    title: "독서문화 확산",
    description: "지역사회 독서문화 진흥을 위한 다양한 프로그램을 기획하고 운영합니다.",
  },
  {
    icon: Target,
    title: "역량 강화",
    description: "작은도서관 운영자의 전문성을 높이고 운영 역량을 강화합니다.",
  },
  {
    icon: Heart,
    title: "지역사회 기여",
    description: "마을의 문화 거점으로서 주민들의 삶의 질 향상에 기여합니다.",
  },
];

const orgChart = [
  { role: "회장", name: "김도서", org: "꿈나무작은도서관" },
  { role: "부회장", name: "이독서", org: "햇살작은도서관" },
  { role: "총무", name: "박서관", org: "은행나무작은도서관" },
  { role: "감사", name: "정마을", org: "물결작은도서관" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="협의회 소개"
        description="시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 인사말 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-warm-gray-700 mb-6">인사말</h2>
          <Card hover={false}>
            <div className="p-6 md:p-8">
              <div className="prose max-w-none text-warm-gray-700">
                <p className="text-lg leading-relaxed mb-4">
                  안녕하세요. 시흥시작은도서관협의회를 찾아주셔서 감사합니다.
                </p>
                <p className="leading-relaxed mb-4">
                  우리 협의회는 시흥시 곳곳에 자리한 22개 작은도서관이 모여 만든 자발적인 협력
                  네트워크입니다. &lsquo;도란도란&rsquo;이라는 이름처럼, 책을 매개로 마을 주민들이 소곤소곤
                  이야기를 나누며 서로의 삶을 풍요롭게 하는 공간을 만들어 가고 있습니다.
                </p>
                <p className="leading-relaxed mb-4">
                  작은도서관은 단순히 책을 빌려주는 곳이 아닙니다. 아이들에게는 꿈을, 어르신들에게는
                  추억을, 청소년들에게는 성장의 발판을, 이웃에게는 따뜻한 한마디를 건네는
                  마을의 사랑방입니다.
                </p>
                <p className="leading-relaxed">
                  앞으로도 시흥시 작은도서관들이 지역사회의 문화 거점으로 자리매김할 수 있도록
                  최선을 다하겠습니다. 많은 관심과 참여 부탁드립니다.
                </p>
                <p className="mt-6 text-right text-forest-700 font-medium">
                  시흥시작은도서관협의회 회장 김도서
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 설립목적 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-warm-gray-700 mb-6">설립목적</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {purposes.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} hover={false}>
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto bg-forest-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-forest-700" />
                    </div>
                    <h3 className="font-bold text-warm-gray-700 mb-2">{item.title}</h3>
                    <p className="text-sm text-warm-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 연혁 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-warm-gray-700 mb-8">연혁</h2>
          <Timeline items={historyData} />
        </section>

        {/* 조직도 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-warm-gray-700 mb-6">조직도</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {orgChart.map((member) => (
              <Card key={member.role} hover={false}>
                <div className="p-5 text-center">
                  <div className="w-16 h-16 mx-auto bg-forest-100 rounded-full flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-forest-700" />
                  </div>
                  <p className="text-xs text-forest-700 font-medium mb-1">{member.role}</p>
                  <p className="font-bold text-warm-gray-700">{member.name}</p>
                  <p className="text-xs text-warm-gray-500 mt-1">{member.org}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 회칙 */}
        <section>
          <h2 className="text-2xl font-bold text-warm-gray-700 mb-6">회칙</h2>
          <Card hover={false}>
            <div className="p-6 md:p-8">
              <div className="prose max-w-none text-warm-gray-700 text-sm leading-relaxed">
                <h3 className="text-base font-bold mb-3">제1장 총칙</h3>
                <p className="mb-2"><strong>제1조 (명칭)</strong> 본 회는 &ldquo;시흥시작은도서관협의회&rdquo;라 한다.</p>
                <p className="mb-2"><strong>제2조 (목적)</strong> 본 회는 시흥시 관내 작은도서관 간의 상호 교류 및 협력을 통하여 작은도서관의 발전과 지역사회 독서문화 진흥에 기여함을 목적으로 한다.</p>
                <p className="mb-2"><strong>제3조 (소재지)</strong> 본 회의 사무소는 경기도 시흥시에 둔다.</p>
                <p className="mb-4"><strong>제4조 (사업)</strong> 본 회는 제2조의 목적을 달성하기 위하여 다음 사업을 행한다.</p>
                <ol className="list-decimal list-inside mb-4 space-y-1 pl-4">
                  <li>작은도서관 간 네트워크 구축 및 교류</li>
                  <li>작은도서관 운영자 교육 및 역량 강화</li>
                  <li>지역 독서문화 프로그램 기획 및 운영</li>
                  <li>작은도서관 관련 정책 제안 및 건의</li>
                  <li>기타 본 회의 목적에 부합하는 사업</li>
                </ol>
                <p className="text-warm-gray-500 text-xs mt-6">
                  * 전체 회칙은 자료실에서 다운로드하실 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
