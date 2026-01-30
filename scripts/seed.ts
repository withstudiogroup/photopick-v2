/**
 * Supabase Seed Script
 * Excel 데이터를 Supabase에 삽입하는 스크립트
 *
 * 사용법: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// .env.local 파일 로드
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// 시설 데이터
// ============================================
const facilities = [
  { name: '무선 인터넷', slug: 'wifi', icon: 'wifi' },
  { name: '주차 가능', slug: 'parking', icon: 'car' },
  { name: '휠체어 출입', slug: 'wheelchair', icon: 'accessibility' },
  { name: '반려동물 동반', slug: 'pet-friendly', icon: 'paw' },
  { name: '단체 촬영', slug: 'group-photo', icon: 'users' },
  { name: '예약 필수', slug: 'reservation', icon: 'calendar' },
  { name: '메이크업 서비스', slug: 'makeup', icon: 'brush' },
  { name: '의상 대여', slug: 'costume-rental', icon: 'shirt' },
  { name: '헤어 서비스', slug: 'hair-service', icon: 'cut' },
  { name: '드레싱룸', slug: 'dressing-room', icon: 'door' },
  { name: '즉석 인화', slug: 'instant-print', icon: 'print' },
];

// ============================================
// 카테고리 데이터
// ============================================
const categories = [
  { name: '증명사진', slug: 'id-photo', description: '여권/비자/면허증', icon: 'camera', sort_order: 1 },
  { name: '프로필', slug: 'profile', description: '비즈니스/SNS 프로필', icon: 'user', sort_order: 2 },
  { name: '가족사진', slug: 'family', description: '가족/대가족 촬영', icon: 'users', sort_order: 3 },
  { name: '웨딩', slug: 'wedding', description: '웨딩/리마인드웨딩', icon: 'heart', sort_order: 4 },
  { name: '개인화보', slug: 'pictorial', description: '개인 컨셉 화보', icon: 'image', sort_order: 5 },
  { name: '배우', slug: 'actor', description: '배우 프로필', icon: 'star', sort_order: 6 },
  { name: '아티스트', slug: 'artist', description: '음악/예술가 프로필', icon: 'music', sort_order: 7 },
  { name: '단체', slug: 'group', description: '단체/커플 촬영', icon: 'group', sort_order: 8 },
  { name: '키즈', slug: 'kids', description: '어린이 촬영', icon: 'child', sort_order: 9 },
  { name: '바디프로필', slug: 'body', description: '바디 프로필 촬영', icon: 'fitness', sort_order: 10 },
];

// ============================================
// 스튜디오 데이터
// ============================================
const studios = [
  { name: '스튜디오피플', address: '서울 마포구 양화로 193 덕흥빌딩 B1', phone: '0507-1322-6294', description: '홍대 3번 출구 1분거리, 프로필사진 전문 스튜디오', short_description: '90,000~270,000원', operating_hours: { note: '예약제' }, status: 'active', grade: 'basic' },
  { name: '우리동네사진관 강남점', address: '서울 강남구', phone: '문의필요', description: '전국 체인, 프로필 및 증명사진 전문', short_description: '70,000~260,000원', operating_hours: { note: '운영시간 문의' }, status: 'active', grade: 'basic' },
  { name: '스튜디오애플', address: '서울 강남구 삼성동 25-9 B1', phone: '02-518-3388', description: '강남 위치, 일반인물 개인화보 광고 프로필사진 전문', short_description: '가격 문의', operating_hours: { note: '예약제' }, status: 'active', grade: 'basic' },
  { name: '스튜디오씨', address: '서울 지역', phone: '문의필요', description: '가족사진 전문, 3주 내 보정 완료', short_description: '가격 문의', operating_hours: { note: '예약제' }, status: 'active', grade: 'basic' },
  { name: '아이엠재민', address: '서울 지역', phone: '문의필요', description: '20년 경력, 100평 규모, 가족사진 전문, 대가족 촬영 가능', short_description: '가격 문의', operating_hours: { note: '예약제' }, status: 'active', grade: 'basic' },
  { name: '타임온미 스튜디오', address: '서울 마포구 동교로 156-13 동보빌딩 B1', phone: '0507-1328-1533', description: '홍대역 근처, 메이크업 서비스 제공', short_description: '35,000원~', operating_hours: { note: '월~금 10:00-19:00, 토 10:00-17:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '포토바이 홍대', address: '서울 마포구 와우산로 27길 50', phone: '0507-1301-4782', description: '홍대 위치, 셀프 메이크업 공간 제공', short_description: '30,000~60,000원', operating_hours: { note: '화~일 11:00-19:50, 월 휴무' }, status: 'active', grade: 'basic' },
  { name: '포크스튜디오 이대점', address: '서울 서대문구 이화여대7길 10 2층', phone: '02-313-9983', description: '이대역 근처, 섬세한 보정', short_description: '33,000원', operating_hours: { note: '12:00-19:30, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '우리동네사진관 홍대점', address: '서울 마포구 홍익로6길 74 3층', phone: '0507-1428-1148', description: '홍대, 의상 대여, 메이크업 선택 가능', short_description: '35,000원~', operating_hours: { note: '10:00-19:30' }, status: 'active', grade: 'basic' },
  { name: '다음사진관 홍대점', address: '서울 마포구 와우산로29길 31 지하1층', phone: '0507-1350-6251', description: '홍대, 다양한 배경색 선택', short_description: '55,000원', operating_hours: { note: '매일 12:00-21:00' }, status: 'active', grade: 'basic' },
  { name: '온누리 스튜디오', address: '서울 마포구 신촌로 142 신촌지앤피나인 3층 301호', phone: '0507-1307-8534', description: '신촌/이대 사이, 100% 예약제, 단체사진 가능', short_description: '55,000원', operating_hours: { note: '매일 09:00-21:00' }, status: 'active', grade: 'basic' },
  { name: '사랑이야기스튜디오', address: '서울 지역 (여러 지점)', phone: '문의필요', description: '가족사진, 리마인드웨딩 전문, 다수 지점 운영', short_description: '가격 문의', operating_hours: { note: '지점별 상이' }, status: 'active', grade: 'basic' },
  { name: '시간이 머무른 자리', address: '서울 중랑구 상봉동 292-10', phone: '02-433-0418', description: '컬러증명사진, 기념일사진, 프로필, 커플사진', short_description: '가격 문의', operating_hours: { note: '월~토 10:00-20:00, 일 휴무, 100% 예약제' }, status: 'active', grade: 'basic' },
  { name: '수상한사진관 노원점', address: '서울 노원구 상계동 602-10 시티파라다이스빌딩 B1', phone: '02-952-1147', description: '노원, 증명사진 취업사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-21:00' }, status: 'active', grade: 'basic' },
  { name: '노원역사진관포토존', address: '서울 노원구 상계동 724-3', phone: '02-937-0560', description: '노원역 근처', short_description: '가격 문의', operating_hours: { note: '평일 09:00-20:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '수선화사진관', address: '서울 노원구 상계동 386-4', phone: '02-6465-3360', description: '컬러증명사진, 커플사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-20:00, 목 휴무' }, status: 'active', grade: 'basic' },
  { name: '마주봄사진관 노원점', address: '서울 노원구 공릉동 714 삼익상가 2층', phone: '문의필요', description: '전통돌사진, 증명사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '공릉동 사진관', address: '서울 노원구 공릉동 684-11 지하1층', phone: '02-6402-7776', description: '증명사진, 면허사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '본스타일 베이비스튜디오', address: '서울 노원구 공릉동 617-6', phone: '02-976-5667', description: '가족아기사진관', short_description: '가격 문의', operating_hours: { note: '매일 10:00-18:30' }, status: 'active', grade: 'basic' },
  { name: '우정사진관 노원점', address: '서울 노원구 중계동 360-2 청구종합상가 2층 201호', phone: '02-952-1230', description: '증명/여권/프로필, 커플/우정', short_description: '가격 문의', operating_hours: { note: '평일 10:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '뉴페이스스튜디오 노원본점', address: '서울 노원구 상계동 693 미도빌딩 803호', phone: '02-939-2525', description: '노원사진관, 노원취업사진', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:30, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '알로하스튜디오', address: '서울 노원구 상계동 593-3', phone: '02-933-5565', description: '노원역사진관', short_description: '가격 문의', operating_hours: { note: '매일 10:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '종이거울스튜디오 노원점', address: '서울 노원구 상계동 581-2 센트럴타워 1층 114호', phone: '02-930-8818', description: '가족사진, 사진관', short_description: '가격 문의', operating_hours: { note: '매일 10:00-19:00, 월화 휴무' }, status: 'active', grade: 'basic' },
  { name: '리오사진예술원', address: '서울 노원구 하계동 208-12 리오빌딩2층', phone: '02-979-2547', description: '노원사진관, 노원가족사진', short_description: '가격 문의', operating_hours: { note: '평일 10:00-18:00, 주말 10:00-19:00, 월화 휴무' }, status: 'active', grade: 'basic' },
  { name: '베일리수 더엠 패밀리 노원점', address: '서울 노원구 상계동 711-9 노블레스관광호텔 9층', phone: '02-931-7785', description: '베일리수노원, 노원가족사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-19:00, 화 휴무' }, status: 'active', grade: 'basic' },
  { name: '스튜디오 오월애', address: '서울 노원구 상계동 1007-3', phone: '02-951-2577', description: '노원사진관, 노원가족사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-18:00, 월 휴무' }, status: 'active', grade: 'basic' },
  { name: '스튜디오 앨리스 월계점', address: '서울 노원구 월계동 333-1 이마트월계점 2F', phone: '02-974-2641', description: '대형 체인 키즈 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 10:00-21:00' }, status: 'active', grade: 'basic' },
  { name: '끌라르떼사진예술원', address: '서울 노원구 상계동 산96-2', phone: '02-939-7676', description: '노원구리마인드, 노원구가족사진', short_description: '가격 문의', operating_hours: { note: '화 휴무' }, status: 'active', grade: 'basic' },
  { name: '레몬쿠키스튜디오', address: '서울 노원구 공릉동 494-17', phone: '02-975-6874', description: '아기사진, 베이비스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 09:30-19:30, 월화 휴무' }, status: 'active', grade: 'basic' },
  { name: '그랑빌스튜디오', address: '서울 노원구 월계동 18', phone: '02-975-4005', description: '노원 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 09:00-22:00' }, status: 'active', grade: 'basic' },
  { name: '포크스튜디오 중계점', address: '서울 노원구 중계동 359-9 마들프라자 1층 106호', phone: '문의필요', description: '증명사진, 포크스튜디오', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:00, 일공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '그레이 아일랜드', address: '서울 노원구 공릉동 684-11', phone: '070-4647-1777', description: '노원셀프스튜디오, 노원셀프사진관', short_description: '가격 문의', operating_hours: { note: '화~일 11:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '보람스튜디오', address: '서울 노원구 중계동 364-22 대명프라자 1층', phone: '02-931-2997', description: '여권사진, 증명사진', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:30, 토 10:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '양현모사진관', address: '서울 중구 충무로2가 52-4', phone: '02-3442-4176', description: '충무로 사진관', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '네오포토', address: '서울 중구 무교동 25-1 2층', phone: '02-771-9665', description: '명동 사진관', short_description: '가격 문의', operating_hours: { note: '평일 10:00-20:00, 일공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '지스튜디오 명동점', address: '서울 중구 명동2가 3-11', phone: '02-757-7530', description: '명동 증명사진', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:00, 토 12:00-18:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '드레스시네마', address: '서울 중구 충무로1가 24-18', phone: '02-318-4223', description: '충무로 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 10:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '이츠미포토스튜디오', address: '서울 중구 충무로2가 60-4 삼대인 2층', phone: '02-773-4246', description: '명동 주말영업', short_description: '가격 문의', operating_hours: { note: '매일 09:30-19:00, 수 휴무' }, status: 'active', grade: 'basic' },
  { name: '첼리스스튜디오', address: '서울 중구 충무로2가 49-6', phone: '02-2263-9306', description: '충무로 스튜디오', short_description: '가격 문의', operating_hours: { note: '평일 09:30-19:00' }, status: 'active', grade: 'basic' },
  { name: '셀프사진관 광각도시', address: '서울 중구 인현동1가 15-11', phone: '02-2274-8618', description: '명동 셀프사진관', short_description: '가격 문의', operating_hours: { note: '평일 10:00-21:00, 주말 11:00-20:00' }, status: 'active', grade: 'basic' },
  { name: '청계사진관', address: '서울 중구 주교동 125-2', phone: '070-8803-1635', description: '종로 청계천', short_description: '가격 문의', operating_hours: { note: '월~토 10:00-20:00, 일 12:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '맥스튜디오', address: '서울 중구 필동2가 82-1', phone: '02-596-0062', description: '중구 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 09:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '명동 스튜디오 사진관', address: '서울 중구 회현동1가 206', phone: '02-318-2093', description: '명동역 근처', short_description: '가격 문의', operating_hours: { note: '평일 09:00-20:00, 토 10:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '원사진관', address: '서울 중구 회현동1가 94-1', phone: '02-752-0436', description: '명동 사진관', short_description: '가격 문의', operating_hours: { note: '평일 09:30-21:00, 공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '고래사진관 필름현상소', address: '서울 중구 충무로3가 25-5 3층', phone: '02-2266-2191', description: '충무로 필름현상', short_description: '가격 문의', operating_hours: { note: '평일 12:00-20:00, 주말 12:00-18:00, 목 휴무' }, status: 'active', grade: 'basic' },
  { name: '필동사진관', address: '서울 중구 필동2가 121-3', phone: '문의필요', description: '중구 필동', short_description: '가격 문의', operating_hours: { note: '평일 11:00-19:00, 월 휴무, 주말 예약필수' }, status: 'active', grade: 'basic' },
  { name: '소리사진관 스튜디오', address: '서울 중구 정동 27-2', phone: '02-318-7028', description: '정동 스튜디오', short_description: '가격 문의', operating_hours: { note: '평일 10:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '인스튜디오', address: '서울 중구 서소문동 50-2 삼령빌딩 201호', phone: '02-6263-1102', description: '서소문 스튜디오', short_description: '가격 문의', operating_hours: { note: '평일 09:30-19:00, 토 11:00-17:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '망우삼림', address: '서울 중구 을지로3가 346-3', phone: '02-6261-0563', description: '을지로 감성 사진관', short_description: '가격 문의', operating_hours: { note: '평일 11:00-19:00, 토일 13:00-19:00, 수 휴무' }, status: 'active', grade: 'basic' },
  { name: '포토이즈 서울역점', address: '서울 중구 봉래동2가 122 롯데마트 서울역점 2층', phone: '02-363-4782', description: '서울역 롯데마트', short_description: '가격 문의', operating_hours: { note: '매일 10:00-20:00, 2,4째 일요일 휴무' }, status: 'active', grade: 'basic' },
  { name: '타임포토', address: '서울 중구 필동1가 19', phone: '02-2269-5025', description: '중구 필동', short_description: '가격 문의', operating_hours: { note: '평일 10:00-20:00, 주말 10:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '피카포토 시청점', address: '서울 중구 태평로2가 69-11 301호', phone: '02-3463-2470', description: '시청역 근처', short_description: '가격 문의', operating_hours: { note: '평일 09:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '중앙사진실', address: '서울 중구 정동 23-9', phone: '02-737-7373', description: '정동 오래된 사진관', short_description: '가격 문의', operating_hours: { note: '평일 09:00-18:00, 토 09:00-12:00, 공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '쌍마스튜디오', address: '서울 영등포구 여의도동 24-5', phone: '02-786-7800', description: '여의도 대표 사진관, 연예인 촬영', short_description: '가격 문의', operating_hours: { note: '평일 09:00-19:30, 토 10:00-16:30' }, status: 'active', grade: 'basic' },
  { name: '로뎀스튜디오', address: '서울 영등포구 여의도동 54-2', phone: '02-782-5547', description: '여의도 사진관', short_description: '가격 문의', operating_hours: { note: '평일 09:00-18:00, 토 10:00-18:00, 일공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '샐러드스튜디오', address: '서울 영등포구 여의도동 44-12', phone: '문의필요', description: '여의도 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 10:00-19:00' }, status: 'active', grade: 'basic' },
  { name: '엘림스튜디오', address: '서울 영등포구 여의도동 13-5 오성빌딩3층', phone: '02-780-3508', description: '여의도 오성빌딩', short_description: '가격 문의', operating_hours: { note: '평일 09:00-18:30, 토 09:00-18:00, 일 10:30-18:00' }, status: 'active', grade: 'basic' },
  { name: '엘림샘스튜디오', address: '서울 영등포구 여의도동 35-5 여의도종합상가', phone: '02-786-9596', description: '여의도종합상가', short_description: '가격 문의', operating_hours: { note: '평일 08:30-20:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: 'HP포토카페 여의도점', address: '서울 영등포구 여의도동 54-2', phone: '02-783-6547', description: '여의도 HP포토', short_description: '가격 문의', operating_hours: { note: '평일 09:00-19:00, 주말 13:00-18:00, 공휴일 휴무' }, status: 'active', grade: 'basic' },
  { name: '정우17분칼라', address: '서울 영등포구 여의도동 13-25', phone: '02-784-9944', description: '여의도 즉석 사진', short_description: '가격 문의', operating_hours: { note: '매일 10:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '킴스미디어', address: '서울 영등포구 여의도동 1', phone: '02-338-6440', description: '국회 근처', short_description: '가격 문의', operating_hours: { note: '평일 09:00-18:00, 주말공휴일 예약제' }, status: 'active', grade: 'basic' },
  { name: '윤스튜디오', address: '서울 영등포구 여의도동 43-4 롯데캐슬아이비 B1 110호', phone: '02-783-8878', description: '여의도 롯데캐슬', short_description: '가격 문의', operating_hours: { note: '평일 09:00-21:00, 토 10:00-19:00, 일 12:30-19:00' }, status: 'active', grade: 'basic' },
  { name: '우리동네사진관 여의도점', address: '서울 영등포구 여의도동 30-3', phone: '02-782-1401', description: '여의도 체인점', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '트윈스튜디오', address: '서울 영등포구 여의도동 20 LG트윈빌딩 동관 B1', phone: '02-783-8802', description: 'LG트윈타워', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '스위스 포토', address: '서울 영등포구 여의도동 14-8 극동 VIP빌딩 303호', phone: '070-4025-9392', description: '여의도 24시간 스튜디오', short_description: '가격 문의', operating_hours: { note: '매일 00:00-24:00' }, status: 'active', grade: 'basic' },
  { name: '서울칼라', address: '서울 영등포구 여의도동 20 엘지트윈타워 동관 B1', phone: '02-783-8806', description: 'LG트윈타워 현상소', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: 'GNY스튜디오 본점', address: '서울 영등포구 여의도동 81-8', phone: '문의필요', description: '여의도 스튜디오', short_description: '가격 문의', operating_hours: { note: '평일 10:00-18:00' }, status: 'active', grade: 'basic' },
  { name: '플레이인더박스 더현대서울점', address: '서울 영등포구 여의도동 22 더현대서울 5층', phone: '문의필요', description: '더현대서울 백화점', short_description: '가격 문의', operating_hours: { note: '월~목 10:30-20:00, 금토일 10:30-20:30' }, status: 'active', grade: 'basic' },
  { name: '강남역에뜬별스튜디오', address: '서울 서초구 강남대로55길 9-11 시원빌딩 10층', phone: '070-7737-5225', description: '강남역 1분, 증명사진 프로필', short_description: '가격 문의', operating_hours: { note: '매일 10:00-22:00' }, status: 'active', grade: 'basic' },
  { name: '스펙플러스 스튜디오', address: '서울 강남구 봉은사로2길 17 3층', phone: '02-568-1236', description: '강남역 사진관', short_description: '가격 문의', operating_hours: { note: '평일 10:00-20:00, 토 10:00-18:00, 일 휴무' }, status: 'active', grade: 'basic' },
  { name: '우리동네사진관 강남역점', address: '서울 강남구 테헤란로 111 대건빌딩 6층', phone: '02-533-5242', description: '강남역 12번 출구 본점', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '키다리아저씨사진관 강남점', address: '서울 강남구 봉은사로4길 36', phone: '0507-1406-6502', description: '강남 증명사진', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '강남역사진관', address: '서울 서초구 강남대로 381 702호', phone: '문의필요', description: '강남역 프로필사진 전문', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '남산사진관', address: '서울 중구 명동 지역', phone: '문의필요', description: '명동, 연예인 전문 프로필, 송혜교/전지현 촬영', short_description: '가격 문의', operating_hours: { note: '예약제' }, status: 'active', grade: 'basic' },
  { name: '레드나우스튜디오', address: '서울 중구 명동 지역', phone: '문의필요', description: '명동 프로필사진 전문', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '스튜디오 피네', address: '서울 종로구 종로 72-1 5층', phone: '문의필요', description: '종각역 10번출구 60m, 증명사진/프로필', short_description: '가격 문의', operating_hours: { note: '11월 예약 진행중' }, status: 'active', grade: 'basic' },
  { name: '다시봄사진관', address: '서울 종로구 삼일대로19길6 혜미빌딩 4층', phone: '문의필요', description: '종로2가 청계천 중심, 증명/프로필/여권', short_description: '가격 문의', operating_hours: { note: '문의필요' }, status: 'active', grade: 'basic' },
  { name: '사진공간엘 종로5가점', address: '서울 종로구 종로36나길3 2층', phone: '0507-1354-4151', description: '종로5가역 254m, 저렴한 종로사진관', short_description: '가격 문의', operating_hours: { note: '월~토 영업, 일 휴무' }, status: 'active', grade: 'basic' },
];

// ============================================
// 스튜디오-카테고리 연결
// ============================================
const studioCategories: { studio: string; category: string }[] = [
  { studio: '스튜디오피플', category: 'profile' },
  { studio: '스튜디오피플', category: 'id-photo' },
  { studio: '우리동네사진관 강남점', category: 'profile' },
  { studio: '우리동네사진관 강남점', category: 'id-photo' },
  { studio: '스튜디오애플', category: 'profile' },
  { studio: '스튜디오애플', category: 'pictorial' },
  { studio: '스튜디오씨', category: 'family' },
  { studio: '아이엠재민', category: 'family' },
  { studio: '아이엠재민', category: 'profile' },
  { studio: '아이엠재민', category: 'body' },
  { studio: '타임온미 스튜디오', category: 'id-photo' },
  { studio: '타임온미 스튜디오', category: 'profile' },
  { studio: '포토바이 홍대', category: 'id-photo' },
  { studio: '포토바이 홍대', category: 'profile' },
  { studio: '포크스튜디오 이대점', category: 'id-photo' },
  { studio: '우리동네사진관 홍대점', category: 'id-photo' },
  { studio: '우리동네사진관 홍대점', category: 'profile' },
  { studio: '다음사진관 홍대점', category: 'id-photo' },
  { studio: '온누리 스튜디오', category: 'id-photo' },
  { studio: '사랑이야기스튜디오', category: 'family' },
  { studio: '사랑이야기스튜디오', category: 'wedding' },
  { studio: '시간이 머무른 자리', category: 'id-photo' },
  { studio: '시간이 머무른 자리', category: 'profile' },
  { studio: '수상한사진관 노원점', category: 'id-photo' },
  { studio: '수상한사진관 노원점', category: 'profile' },
  { studio: '노원역사진관포토존', category: 'id-photo' },
  { studio: '수선화사진관', category: 'id-photo' },
  { studio: '마주봄사진관 노원점', category: 'id-photo' },
  { studio: '마주봄사진관 노원점', category: 'kids' },
  { studio: '공릉동 사진관', category: 'id-photo' },
  { studio: '본스타일 베이비스튜디오', category: 'kids' },
  { studio: '본스타일 베이비스튜디오', category: 'family' },
  { studio: '우정사진관 노원점', category: 'id-photo' },
  { studio: '우정사진관 노원점', category: 'profile' },
  { studio: '뉴페이스스튜디오 노원본점', category: 'id-photo' },
  { studio: '뉴페이스스튜디오 노원본점', category: 'profile' },
  { studio: '알로하스튜디오', category: 'id-photo' },
  { studio: '알로하스튜디오', category: 'profile' },
  { studio: '종이거울스튜디오 노원점', category: 'family' },
  { studio: '리오사진예술원', category: 'family' },
  { studio: '베일리수 더엠 패밀리 노원점', category: 'family' },
  { studio: '스튜디오 오월애', category: 'family' },
  { studio: '스튜디오 앨리스 월계점', category: 'kids' },
  { studio: '스튜디오 앨리스 월계점', category: 'family' },
  { studio: '끌라르떼사진예술원', category: 'family' },
  { studio: '끌라르떼사진예술원', category: 'wedding' },
  { studio: '레몬쿠키스튜디오', category: 'kids' },
  { studio: '그랑빌스튜디오', category: 'profile' },
  { studio: '그랑빌스튜디오', category: 'family' },
  { studio: '포크스튜디오 중계점', category: 'id-photo' },
  { studio: '그레이 아일랜드', category: 'id-photo' },
  { studio: '그레이 아일랜드', category: 'profile' },
  { studio: '보람스튜디오', category: 'id-photo' },
  { studio: '양현모사진관', category: 'id-photo' },
  { studio: '양현모사진관', category: 'profile' },
  { studio: '네오포토', category: 'id-photo' },
  { studio: '지스튜디오 명동점', category: 'id-photo' },
  { studio: '지스튜디오 명동점', category: 'profile' },
  { studio: '드레스시네마', category: 'profile' },
  { studio: '드레스시네마', category: 'wedding' },
  { studio: '이츠미포토스튜디오', category: 'id-photo' },
  { studio: '이츠미포토스튜디오', category: 'profile' },
  { studio: '첼리스스튜디오', category: 'profile' },
  { studio: '셀프사진관 광각도시', category: 'id-photo' },
  { studio: '셀프사진관 광각도시', category: 'profile' },
  { studio: '청계사진관', category: 'id-photo' },
  { studio: '맥스튜디오', category: 'profile' },
  { studio: '맥스튜디오', category: 'id-photo' },
  { studio: '명동 스튜디오 사진관', category: 'id-photo' },
  { studio: '명동 스튜디오 사진관', category: 'profile' },
  { studio: '원사진관', category: 'id-photo' },
  { studio: '고래사진관 필름현상소', category: 'id-photo' },
  { studio: '고래사진관 필름현상소', category: 'profile' },
  { studio: '필동사진관', category: 'id-photo' },
  { studio: '소리사진관 스튜디오', category: 'profile' },
  { studio: '소리사진관 스튜디오', category: 'family' },
  { studio: '인스튜디오', category: 'profile' },
  { studio: '인스튜디오', category: 'id-photo' },
  { studio: '망우삼림', category: 'id-photo' },
  { studio: '망우삼림', category: 'profile' },
  { studio: '포토이즈 서울역점', category: 'id-photo' },
  { studio: '타임포토', category: 'id-photo' },
  { studio: '타임포토', category: 'profile' },
  { studio: '피카포토 시청점', category: 'id-photo' },
  { studio: '피카포토 시청점', category: 'profile' },
  { studio: '중앙사진실', category: 'id-photo' },
  { studio: '쌍마스튜디오', category: 'id-photo' },
  { studio: '쌍마스튜디오', category: 'profile' },
  { studio: '로뎀스튜디오', category: 'id-photo' },
  { studio: '로뎀스튜디오', category: 'profile' },
  { studio: '샐러드스튜디오', category: 'profile' },
  { studio: '샐러드스튜디오', category: 'id-photo' },
  { studio: '엘림스튜디오', category: 'id-photo' },
  { studio: '엘림스튜디오', category: 'profile' },
  { studio: '엘림샘스튜디오', category: 'id-photo' },
  { studio: 'HP포토카페 여의도점', category: 'id-photo' },
  { studio: '정우17분칼라', category: 'id-photo' },
  { studio: '킴스미디어', category: 'profile' },
  { studio: '킴스미디어', category: 'id-photo' },
  { studio: '윤스튜디오', category: 'id-photo' },
  { studio: '윤스튜디오', category: 'profile' },
  { studio: '우리동네사진관 여의도점', category: 'id-photo' },
  { studio: '우리동네사진관 여의도점', category: 'profile' },
  { studio: '트윈스튜디오', category: 'id-photo' },
  { studio: '스위스 포토', category: 'id-photo' },
  { studio: '스위스 포토', category: 'profile' },
  { studio: '서울칼라', category: 'id-photo' },
  { studio: 'GNY스튜디오 본점', category: 'profile' },
  { studio: 'GNY스튜디오 본점', category: 'id-photo' },
  { studio: '플레이인더박스 더현대서울점', category: 'id-photo' },
  { studio: '플레이인더박스 더현대서울점', category: 'profile' },
  { studio: '강남역에뜬별스튜디오', category: 'id-photo' },
  { studio: '강남역에뜬별스튜디오', category: 'profile' },
  { studio: '스펙플러스 스튜디오', category: 'id-photo' },
  { studio: '스펙플러스 스튜디오', category: 'profile' },
  { studio: '우리동네사진관 강남역점', category: 'id-photo' },
  { studio: '우리동네사진관 강남역점', category: 'profile' },
  { studio: '키다리아저씨사진관 강남점', category: 'id-photo' },
  { studio: '키다리아저씨사진관 강남점', category: 'profile' },
  { studio: '강남역사진관', category: 'id-photo' },
  { studio: '강남역사진관', category: 'profile' },
  { studio: '남산사진관', category: 'profile' },
  { studio: '레드나우스튜디오', category: 'profile' },
  { studio: '스튜디오 피네', category: 'id-photo' },
  { studio: '스튜디오 피네', category: 'profile' },
  { studio: '다시봄사진관', category: 'id-photo' },
  { studio: '다시봄사진관', category: 'profile' },
  { studio: '사진공간엘 종로5가점', category: 'id-photo' },
  { studio: '사진공간엘 종로5가점', category: 'profile' },
];

// ============================================
// 스튜디오-시설 연결
// ============================================
const studioFacilities: { studio: string; facility: string }[] = [
  { studio: '스튜디오피플', facility: 'reservation' },
  { studio: '스튜디오피플', facility: 'makeup' },
  { studio: '스튜디오피플', facility: 'costume-rental' },
  { studio: '스튜디오피플', facility: 'dressing-room' },
  { studio: '우리동네사진관 강남점', facility: 'reservation' },
  { studio: '우리동네사진관 강남점', facility: 'makeup' },
  { studio: '우리동네사진관 강남점', facility: 'costume-rental' },
  { studio: '스튜디오애플', facility: 'reservation' },
  { studio: '스튜디오애플', facility: 'parking' },
  { studio: '스튜디오씨', facility: 'reservation' },
  { studio: '아이엠재민', facility: 'reservation' },
  { studio: '아이엠재민', facility: 'makeup' },
  { studio: '아이엠재민', facility: 'costume-rental' },
  { studio: '아이엠재민', facility: 'hair-service' },
  { studio: '아이엠재민', facility: 'dressing-room' },
  { studio: '아이엠재민', facility: 'group-photo' },
  { studio: '타임온미 스튜디오', facility: 'reservation' },
  { studio: '타임온미 스튜디오', facility: 'makeup' },
  { studio: '타임온미 스튜디오', facility: 'dressing-room' },
  { studio: '포토바이 홍대', facility: 'reservation' },
  { studio: '포토바이 홍대', facility: 'dressing-room' },
  { studio: '포크스튜디오 이대점', facility: 'reservation' },
  { studio: '우리동네사진관 홍대점', facility: 'reservation' },
  { studio: '우리동네사진관 홍대점', facility: 'makeup' },
  { studio: '우리동네사진관 홍대점', facility: 'costume-rental' },
  { studio: '다음사진관 홍대점', facility: 'reservation' },
  { studio: '다음사진관 홍대점', facility: 'dressing-room' },
  { studio: '온누리 스튜디오', facility: 'reservation' },
  { studio: '온누리 스튜디오', facility: 'group-photo' },
  { studio: '사랑이야기스튜디오', facility: 'reservation' },
  { studio: '사랑이야기스튜디오', facility: 'group-photo' },
  { studio: '시간이 머무른 자리', facility: 'reservation' },
];

// ============================================
// 상품 데이터
// ============================================
const products: { studio: string; name: string; description: string; base_price: number; duration: number | null; includes: string[] }[] = [
  { studio: '스튜디오피플', name: '전문직(베이직) 프로필', description: '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', base_price: 90000, duration: 40, includes: ['1장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '퍼스널 컬러 프로필', description: '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', base_price: 100000, duration: 40, includes: ['1장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '배우 프로필', description: '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', base_price: 100000, duration: 40, includes: ['1장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '아티스트 프로필', description: '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', base_price: 100000, duration: 40, includes: ['1장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '특별화보 컨셉', description: '1장 보정, 1개 의상, 전체 원본 제공(약 80장)', base_price: 150000, duration: 40, includes: ['1장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '2가지 컨셉 2컷', description: '2장 보정, 2개 의상, 전신 촬영, 원본 약 150장', base_price: 180000, duration: 90, includes: ['2장 보정', '원본 제공'] },
  { studio: '스튜디오피플', name: '3가지 컨셉 3컷', description: '3장 보정, 3개 의상, 전신 촬영, 원본 약 150장', base_price: 270000, duration: 90, includes: ['3장 보정', '원본 제공'] },
  { studio: '우리동네사진관 강남점', name: '프로필 1컷+증명 세트', description: '1:1 맞춤수정, 3x4cm 증명사진, 5x7inch 프로필', base_price: 100000, duration: 60, includes: ['1장 보정', '원본 제공'] },
  { studio: '우리동네사진관 강남점', name: '프로필 1컷', description: '1:1 맞춤수정, 5x7inch 프로필 사진', base_price: 70000, duration: 60, includes: ['1장 보정', '원본 제공'] },
  { studio: '우리동네사진관 강남점', name: '프로필 2컷', description: '1:1 맞춤수정, 컷별 5x7inch 프로필', base_price: 130000, duration: 90, includes: ['2장 보정', '원본 제공'] },
  { studio: '우리동네사진관 강남점', name: '프로필화보 4컷', description: '1:1 맞춤수정, 포토카드, 컷별 프로필', base_price: 260000, duration: 120, includes: ['4장 보정', '원본 제공'] },
  { studio: '우리동네사진관 강남점', name: '원본 파일 추가', description: '컷별 10장 내외 원본 파일', base_price: 70000, duration: null, includes: ['원본 제공'] },
  { studio: '타임온미 스튜디오', name: '증명/여권 사진', description: '3x4 8매 또는 3.5x4.5 6매, 사진파일', base_price: 35000, duration: 30, includes: ['1장 보정', '원본 제공'] },
  { studio: '포토바이 홍대', name: '증명사진', description: '기본 증명사진', base_price: 30000, duration: 20, includes: ['1장 보정', '원본 제공'] },
  { studio: '포토바이 홍대', name: '개인프로필', description: '프로필 촬영 (예약필수)', base_price: 60000, duration: 60, includes: ['1장 보정', '원본 제공'] },
  { studio: '포크스튜디오 이대점', name: '신분증/여권/비자', description: '증명사진, 섬세한 보정', base_price: 33000, duration: 20, includes: ['1장 보정', '원본 제공'] },
  { studio: '우리동네사진관 홍대점', name: '증명/여권/비자', description: '의상 대여, 메이크업 선택 가능', base_price: 35000, duration: 30, includes: ['1장 보정', '원본 제공'] },
  { studio: '다음사진관 홍대점', name: '증명/여권/취업', description: '다양한 배경색 선택', base_price: 55000, duration: 30, includes: ['1장 보정', '원본 제공'] },
  { studio: '온누리 스튜디오', name: '증명/여권/취업', description: '단체사진 가능', base_price: 55000, duration: 30, includes: ['1장 보정', '원본 제공'] },
];

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // 1. 기존 데이터 삭제
    console.log('🗑️  Deleting existing data...');
    await supabase.from('studio_facilities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('studio_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('studios').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('facilities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. 시설 삽입
    console.log('📦 Inserting facilities...');
    const { data: insertedFacilities, error: facilitiesError } = await supabase
      .from('facilities')
      .insert(facilities)
      .select();
    if (facilitiesError) throw facilitiesError;
    console.log(`   ✅ ${insertedFacilities?.length || 0} facilities inserted`);

    // 3. 카테고리 삽입
    console.log('📦 Inserting categories...');
    const { data: insertedCategories, error: categoriesError } = await supabase
      .from('categories')
      .insert(categories)
      .select();
    if (categoriesError) throw categoriesError;
    console.log(`   ✅ ${insertedCategories?.length || 0} categories inserted`);

    // 4. 스튜디오 삽입
    console.log('📦 Inserting studios...');
    const { data: insertedStudios, error: studiosError } = await supabase
      .from('studios')
      .insert(studios)
      .select();
    if (studiosError) throw studiosError;
    console.log(`   ✅ ${insertedStudios?.length || 0} studios inserted`);

    // ID 매핑 생성
    const facilityMap = new Map(insertedFacilities?.map(f => [f.slug, f.id]) || []);
    const categoryMap = new Map(insertedCategories?.map(c => [c.slug, c.id]) || []);
    const studioMap = new Map(insertedStudios?.map(s => [s.name, s.id]) || []);

    // 5. 스튜디오-카테고리 연결
    console.log('📦 Inserting studio-category relationships...');
    const studioCategoryInserts = studioCategories
      .filter(sc => studioMap.has(sc.studio) && categoryMap.has(sc.category))
      .map(sc => ({
        studio_id: studioMap.get(sc.studio),
        category_id: categoryMap.get(sc.category),
      }));

    const { data: insertedStudioCategories, error: scError } = await supabase
      .from('studio_categories')
      .insert(studioCategoryInserts)
      .select();
    if (scError) throw scError;
    console.log(`   ✅ ${insertedStudioCategories?.length || 0} studio-category relationships inserted`);

    // 6. 스튜디오-시설 연결
    console.log('📦 Inserting studio-facility relationships...');
    const studioFacilityInserts = studioFacilities
      .filter(sf => studioMap.has(sf.studio) && facilityMap.has(sf.facility))
      .map(sf => ({
        studio_id: studioMap.get(sf.studio),
        facility_id: facilityMap.get(sf.facility),
      }));

    const { data: insertedStudioFacilities, error: sfError } = await supabase
      .from('studio_facilities')
      .insert(studioFacilityInserts)
      .select();
    if (sfError) throw sfError;
    console.log(`   ✅ ${insertedStudioFacilities?.length || 0} studio-facility relationships inserted`);

    // 7. 상품 삽입
    console.log('📦 Inserting products...');
    const productInserts = products
      .filter(p => studioMap.has(p.studio))
      .map(p => ({
        studio_id: studioMap.get(p.studio),
        name: p.name,
        description: p.description,
        base_price: p.base_price,
        duration: p.duration,
        includes: p.includes,
      }));

    const { data: insertedProducts, error: productsError } = await supabase
      .from('products')
      .insert(productInserts)
      .select();
    if (productsError) throw productsError;
    console.log(`   ✅ ${insertedProducts?.length || 0} products inserted`);

    console.log('\n✨ Seeding completed successfully!');
    console.log('Summary:');
    console.log(`   - Facilities: ${insertedFacilities?.length || 0}`);
    console.log(`   - Categories: ${insertedCategories?.length || 0}`);
    console.log(`   - Studios: ${insertedStudios?.length || 0}`);
    console.log(`   - Studio-Categories: ${insertedStudioCategories?.length || 0}`);
    console.log(`   - Studio-Facilities: ${insertedStudioFacilities?.length || 0}`);
    console.log(`   - Products: ${insertedProducts?.length || 0}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
