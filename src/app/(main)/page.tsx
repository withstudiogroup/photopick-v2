import {
  CategoryNav,
  HeroBanner,
  TodayDeals,
  PopularRanking,
  RegionalRecommend,
  PurposeRecommend,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0 bg-white">
      <CategoryNav />
      <HeroBanner />
      <PopularRanking />
      <div className="bg-[#F0F7FF]">
        <TodayDeals />
      </div>
      <RegionalRecommend />
      <div className="bg-[#F5F5F5]">
        <PurposeRecommend />
      </div>
    </div>
  );
}
