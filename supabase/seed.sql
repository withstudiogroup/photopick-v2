-- PhotoPick Seed Data
-- Generated from Excel: AI_시트-Genspark_AI_Sheets-20260119_2021.xlsx
-- 78개 스튜디오, 10개 카테고리, 11개 시설, 19개 상품

-- ============================================
-- 1. 시설/서비스 (Facilities)
-- ============================================

DELETE FROM studio_facilities;
DELETE FROM facilities;

INSERT INTO facilities (name, slug, icon) VALUES ('무선 인터넷', 'wifi', 'wifi');
INSERT INTO facilities (name, slug, icon) VALUES ('주차 가능', 'parking', 'car');
INSERT INTO facilities (name, slug, icon) VALUES ('휠체어 출입', 'wheelchair', 'accessibility');
INSERT INTO facilities (name, slug, icon) VALUES ('반려동물 동반', 'pet-friendly', 'paw');
INSERT INTO facilities (name, slug, icon) VALUES ('단체 촬영', 'group-photo', 'users');
INSERT INTO facilities (name, slug, icon) VALUES ('예약 필수', 'reservation', 'calendar');
INSERT INTO facilities (name, slug, icon) VALUES ('메이크업 서비스', 'makeup', 'brush');
INSERT INTO facilities (name, slug, icon) VALUES ('의상 대여', 'costume-rental', 'shirt');
INSERT INTO facilities (name, slug, icon) VALUES ('헤어 서비스', 'hair-service', 'cut');
INSERT INTO facilities (name, slug, icon) VALUES ('드레싱룸', 'dressing-room', 'door');
INSERT INTO facilities (name, slug, icon) VALUES ('즉석 인화', 'instant-print', 'print');

-- ============================================
-- 2. 카테고리 (Categories)
-- ============================================

DELETE FROM studio_categories;
DELETE FROM categories;

INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('증명사진', 'id-photo', '여권/비자/면허증', 'camera', 1);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('프로필', 'profile', '비즈니스/SNS 프로필', 'user', 2);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('가족사진', 'family', '가족/대가족 촬영', 'users', 3);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('웨딩', 'wedding', '웨딩/리마인드웨딩', 'heart', 4);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('개인화보', 'pictorial', '개인 컨셉 화보', 'image', 5);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('배우', 'actor', '배우 프로필', 'star', 6);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('아티스트', 'artist', '음악/예술가 프로필', 'music', 7);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('단체', 'group', '단체/커플 촬영', 'group', 8);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('키즈', 'kids', '어린이 촬영', 'child', 9);
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES ('바디프로필', 'body', '바디 프로필 촬영', 'fitness', 10);

-- ============================================
-- 3. 스튜디오 (Studios)
-- ============================================

DELETE FROM products;
DELETE FROM studios;

INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오피플', '서울 마포구 양화로 193 덕흥빌딩 B1', '0507-1322-6294', '홍대 3번 출구 1분거리, 프로필사진 전문 스튜디오', '90,000~270,000원', '{"note": "예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('우리동네사진관 강남점', '서울 강남구', '문의필요', '전국 체인, 프로필 및 증명사진 전문', '70,000~260,000원', '{"note": "운영시간 문의"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오애플', '서울 강남구 삼성동 25-9 B1', '02-518-3388', '강남 위치, 일반인물 개인화보 광고 프로필사진 전문', '가격 문의', '{"note": "예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오씨', '서울 지역', '문의필요', '가족사진 전문, 3주 내 보정 완료', '가격 문의', '{"note": "예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('아이엠재민', '서울 지역', '문의필요', '20년 경력, 100평 규모, 가족사진 전문, 대가족 촬영 가능', '가격 문의', '{"note": "예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('타임온미 스튜디오', '서울 마포구 동교로 156-13 동보빌딩 B1', '0507-1328-1533', '홍대역 근처, 메이크업 서비스 제공', '35,000원~', '{"note": "월~금 10:00-19:00, 토 10:00-17:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('포토바이 홍대', '서울 마포구 와우산로 27길 50', '0507-1301-4782', '홍대 위치, 셀프 메이크업 공간 제공', '30,000~60,000원', '{"note": "화~일 11:00-19:50, 월 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('포크스튜디오 이대점', '서울 서대문구 이화여대7길 10 2층', '02-313-9983', '이대역 근처, 섬세한 보정', '33,000원', '{"note": "12:00-19:30, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('우리동네사진관 홍대점', '서울 마포구 홍익로6길 74 3층', '0507-1428-1148', '홍대, 의상 대여, 메이크업 선택 가능', '35,000원~', '{"note": "10:00-19:30"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('다음사진관 홍대점', '서울 마포구 와우산로29길 31 지하1층', '0507-1350-6251', '홍대, 다양한 배경색 선택', '55,000원', '{"note": "매일 12:00-21:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('온누리 스튜디오', '서울 마포구 신촌로 142 신촌지앤피나인 3층 301호', '0507-1307-8534', '신촌/이대 사이, 100% 예약제, 단체사진 가능', '55,000원', '{"note": "매일 09:00-21:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('사랑이야기스튜디오', '서울 지역 (여러 지점)', '문의필요', '가족사진, 리마인드웨딩 전문, 다수 지점 운영', '가격 문의', '{"note": "지점별 상이"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('시간이 머무른 자리', '서울 중랑구 상봉동 292-10', '02-433-0418', '컬러증명사진, 기념일사진, 프로필, 커플사진', '가격 문의', '{"note": "월~토 10:00-20:00, 일 휴무, 100% 예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('수상한사진관 노원점', '서울 노원구 상계동 602-10 시티파라다이스빌딩 B1', '02-952-1147', '노원, 증명사진 취업사진', '가격 문의', '{"note": "매일 10:00-21:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('노원역사진관포토존', '서울 노원구 상계동 724-3', '02-937-0560', '노원역 근처', '가격 문의', '{"note": "평일 09:00-20:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('수선화사진관', '서울 노원구 상계동 386-4', '02-6465-3360', '컬러증명사진, 커플사진', '가격 문의', '{"note": "매일 10:00-20:00, 목 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('마주봄사진관 노원점', '서울 노원구 공릉동 714 삼익상가 2층', '문의필요', '전통돌사진, 증명사진', '가격 문의', '{"note": "매일 10:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('공릉동 사진관', '서울 노원구 공릉동 684-11 지하1층', '02-6402-7776', '증명사진, 면허사진', '가격 문의', '{"note": "매일 10:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('본스타일 베이비스튜디오', '서울 노원구 공릉동 617-6', '02-976-5667', '가족아기사진관', '가격 문의', '{"note": "매일 10:00-18:30"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('우정사진관 노원점', '서울 노원구 중계동 360-2 청구종합상가 2층 201호', '02-952-1230', '증명/여권/프로필, 커플/우정', '가격 문의', '{"note": "평일 10:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('뉴페이스스튜디오 노원본점', '서울 노원구 상계동 693 미도빌딩 803호', '02-939-2525', '노원사진관, 노원취업사진', '가격 문의', '{"note": "평일 10:00-19:30, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('알로하스튜디오', '서울 노원구 상계동 593-3', '02-933-5565', '노원역사진관', '가격 문의', '{"note": "매일 10:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('종이거울스튜디오 노원점', '서울 노원구 상계동 581-2 센트럴타워 1층 114호', '02-930-8818', '가족사진, 사진관', '가격 문의', '{"note": "매일 10:00-19:00, 월화 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('리오사진예술원', '서울 노원구 하계동 208-12 리오빌딩2층', '02-979-2547', '노원사진관, 노원가족사진', '가격 문의', '{"note": "평일 10:00-18:00, 주말 10:00-19:00, 월화 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('베일리수 더엠 패밀리 노원점', '서울 노원구 상계동 711-9 노블레스관광호텔 9층', '02-931-7785', '베일리수노원, 노원가족사진', '가격 문의', '{"note": "매일 10:00-19:00, 화 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오 오월애', '서울 노원구 상계동 1007-3', '02-951-2577', '노원사진관, 노원가족사진', '가격 문의', '{"note": "매일 10:00-18:00, 월 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오 앨리스 월계점', '서울 노원구 월계동 333-1 이마트월계점 2F', '02-974-2641', '대형 체인 키즈 스튜디오', '가격 문의', '{"note": "매일 10:00-21:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('끌라르떼사진예술원', '서울 노원구 상계동 산96-2', '02-939-7676', '노원구리마인드, 노원구가족사진', '가격 문의', '{"note": "화 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('레몬쿠키스튜디오', '서울 노원구 공릉동 494-17', '02-975-6874', '아기사진, 베이비스튜디오', '가격 문의', '{"note": "매일 09:30-19:30, 월화 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('그랑빌스튜디오', '서울 노원구 월계동 18', '02-975-4005', '노원 스튜디오', '가격 문의', '{"note": "매일 09:00-22:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('포크스튜디오 중계점', '서울 노원구 중계동 359-9 마들프라자 1층 106호', '문의필요', '증명사진, 포크스튜디오', '가격 문의', '{"note": "평일 10:00-19:00, 일공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('그레이 아일랜드', '서울 노원구 공릉동 684-11', '070-4647-1777', '노원셀프스튜디오, 노원셀프사진관', '가격 문의', '{"note": "화~일 11:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('보람스튜디오', '서울 노원구 중계동 364-22 대명프라자 1층', '02-931-2997', '여권사진, 증명사진', '가격 문의', '{"note": "평일 10:00-19:30, 토 10:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('양현모사진관', '서울 중구 충무로2가 52-4', '02-3442-4176', '충무로 사진관', '가격 문의', '{"note": "평일 10:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('네오포토', '서울 중구 무교동 25-1 2층', '02-771-9665', '명동 사진관', '가격 문의', '{"note": "평일 10:00-20:00, 일공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('지스튜디오 명동점', '서울 중구 명동2가 3-11', '02-757-7530', '명동 증명사진', '가격 문의', '{"note": "평일 10:00-19:00, 토 12:00-18:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('드레스시네마', '서울 중구 충무로1가 24-18', '02-318-4223', '충무로 스튜디오', '가격 문의', '{"note": "매일 10:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('이츠미포토스튜디오', '서울 중구 충무로2가 60-4 삼대인 2층', '02-773-4246', '명동 주말영업', '가격 문의', '{"note": "매일 09:30-19:00, 수 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('첼리스스튜디오', '서울 중구 충무로2가 49-6', '02-2263-9306', '충무로 스튜디오', '가격 문의', '{"note": "평일 09:30-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('셀프사진관 광각도시', '서울 중구 인현동1가 15-11', '02-2274-8618', '명동 셀프사진관', '가격 문의', '{"note": "평일 10:00-21:00, 주말 11:00-20:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('청계사진관', '서울 중구 주교동 125-2', '070-8803-1635', '종로 청계천', '가격 문의', '{"note": "월~토 10:00-20:00, 일 12:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('맥스튜디오', '서울 중구 필동2가 82-1', '02-596-0062', '중구 스튜디오', '가격 문의', '{"note": "매일 09:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('명동 스튜디오 사진관', '서울 중구 회현동1가 206', '02-318-2093', '명동역 근처', '가격 문의', '{"note": "평일 09:00-20:00, 토 10:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('원사진관', '서울 중구 회현동1가 94-1', '02-752-0436', '명동 사진관', '가격 문의', '{"note": "평일 09:30-21:00, 공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('고래사진관 필름현상소', '서울 중구 충무로3가 25-5 3층', '02-2266-2191', '충무로 필름현상', '가격 문의', '{"note": "평일 12:00-20:00, 주말 12:00-18:00, 목 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('필동사진관', '서울 중구 필동2가 121-3', '문의필요', '중구 필동', '가격 문의', '{"note": "평일 11:00-19:00, 월 휴무, 주말 예약필수"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('소리사진관 스튜디오', '서울 중구 정동 27-2', '02-318-7028', '정동 스튜디오', '가격 문의', '{"note": "평일 10:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('인스튜디오', '서울 중구 서소문동 50-2 삼령빌딩 201호', '02-6263-1102', '서소문 스튜디오', '가격 문의', '{"note": "평일 09:30-19:00, 토 11:00-17:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('망우삼림', '서울 중구 을지로3가 346-3', '02-6261-0563', '을지로 감성 사진관', '가격 문의', '{"note": "평일 11:00-19:00, 토일 13:00-19:00, 수 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('포토이즈 서울역점', '서울 중구 봉래동2가 122 롯데마트 서울역점 2층', '02-363-4782', '서울역 롯데마트', '가격 문의', '{"note": "매일 10:00-20:00, 2,4째 일요일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('타임포토', '서울 중구 필동1가 19', '02-2269-5025', '중구 필동', '가격 문의', '{"note": "평일 10:00-20:00, 주말 10:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('피카포토 시청점', '서울 중구 태평로2가 69-11 301호', '02-3463-2470', '시청역 근처', '가격 문의', '{"note": "평일 09:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('중앙사진실', '서울 중구 정동 23-9', '02-737-7373', '정동 오래된 사진관', '가격 문의', '{"note": "평일 09:00-18:00, 토 09:00-12:00, 공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('쌍마스튜디오', '서울 영등포구 여의도동 24-5', '02-786-7800', '여의도 대표 사진관, 연예인 촬영', '가격 문의', '{"note": "평일 09:00-19:30, 토 10:00-16:30"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('로뎀스튜디오', '서울 영등포구 여의도동 54-2', '02-782-5547', '여의도 사진관', '가격 문의', '{"note": "평일 09:00-18:00, 토 10:00-18:00, 일공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('샐러드스튜디오', '서울 영등포구 여의도동 44-12', '문의필요', '여의도 스튜디오', '가격 문의', '{"note": "매일 10:00-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('엘림스튜디오', '서울 영등포구 여의도동 13-5 오성빌딩3층', '02-780-3508', '여의도 오성빌딩', '가격 문의', '{"note": "평일 09:00-18:30, 토 09:00-18:00, 일 10:30-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('엘림샘스튜디오', '서울 영등포구 여의도동 35-5 여의도종합상가', '02-786-9596', '여의도종합상가', '가격 문의', '{"note": "평일 08:30-20:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('HP포토카페 여의도점', '서울 영등포구 여의도동 54-2', '02-783-6547', '여의도 HP포토', '가격 문의', '{"note": "평일 09:00-19:00, 주말 13:00-18:00, 공휴일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('정우17분칼라', '서울 영등포구 여의도동 13-25', '02-784-9944', '여의도 즉석 사진', '가격 문의', '{"note": "매일 10:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('킴스미디어', '서울 영등포구 여의도동 1', '02-338-6440', '국회 근처', '가격 문의', '{"note": "평일 09:00-18:00, 주말공휴일 예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('윤스튜디오', '서울 영등포구 여의도동 43-4 롯데캐슬아이비 B1 110호', '02-783-8878', '여의도 롯데캐슬', '가격 문의', '{"note": "평일 09:00-21:00, 토 10:00-19:00, 일 12:30-19:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('우리동네사진관 여의도점', '서울 영등포구 여의도동 30-3', '02-782-1401', '여의도 체인점', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('트윈스튜디오', '서울 영등포구 여의도동 20 LG트윈빌딩 동관 B1', '02-783-8802', 'LG트윈타워', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스위스 포토', '서울 영등포구 여의도동 14-8 극동 VIP빌딩 303호', '070-4025-9392', '여의도 24시간 스튜디오', '가격 문의', '{"note": "매일 00:00-24:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('서울칼라', '서울 영등포구 여의도동 20 엘지트윈타워 동관 B1', '02-783-8806', 'LG트윈타워 현상소', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('GNY스튜디오 본점', '서울 영등포구 여의도동 81-8', '문의필요', '여의도 스튜디오', '가격 문의', '{"note": "평일 10:00-18:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('플레이인더박스 더현대서울점', '서울 영등포구 여의도동 22 더현대서울 5층', '문의필요', '더현대서울 백화점', '가격 문의', '{"note": "월~목 10:30-20:00, 금토일 10:30-20:30"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('강남역에뜬별스튜디오', '서울 서초구 강남대로55길 9-11 시원빌딩 10층', '070-7737-5225', '강남역 1분, 증명사진 프로필', '가격 문의', '{"note": "매일 10:00-22:00"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스펙플러스 스튜디오', '서울 강남구 봉은사로2길 17 3층', '02-568-1236', '강남역 사진관', '가격 문의', '{"note": "평일 10:00-20:00, 토 10:00-18:00, 일 휴무"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('우리동네사진관 강남역점', '서울 강남구 테헤란로 111 대건빌딩 6층', '02-533-5242', '강남역 12번 출구 본점', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('키다리아저씨사진관 강남점', '서울 강남구 봉은사로4길 36', '0507-1406-6502', '강남 증명사진', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('강남역사진관', '서울 서초구 강남대로 381 702호', '문의필요', '강남역 프로필사진 전문', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('남산사진관', '서울 중구 명동 지역', '문의필요', '명동, 연예인 전문 프로필, 송혜교/전지현 촬영', '가격 문의', '{"note": "예약제"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('레드나우스튜디오', '서울 중구 명동 지역', '문의필요', '명동 프로필사진 전문', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('스튜디오 피네', '서울 종로구 종로 72-1 5층', '문의필요', '종각역 10번출구 60m, 증명사진/프로필', '가격 문의', '{"note": "11월 예약 진행중"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('다시봄사진관', '서울 종로구 삼일대로19길6 혜미빌딩 4층', '문의필요', '종로2가 청계천 중심, 증명/프로필/여권', '가격 문의', '{"note": "문의필요"}', 'active', 'basic');
INSERT INTO studios (name, address, phone, description, short_description, operating_hours, status, grade) VALUES ('사진공간엘 종로5가점', '서울 종로구 종로36나길3 2층', '0507-1354-4151', '종로5가역 254m, 저렴한 종로사진관', '가격 문의', '{"note": "월~토 영업, 일 휴무"}', 'active', 'basic');

-- ============================================
-- 4. 스튜디오-카테고리 연결 (Studio Categories)
-- ============================================

INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오피플' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오피플' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 강남점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 강남점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오애플' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오애플' AND c.slug = 'pictorial';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오씨' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '아이엠재민' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '아이엠재민' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '아이엠재민' AND c.slug = 'body';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '타임온미 스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '타임온미 스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '포토바이 홍대' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '포토바이 홍대' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '포크스튜디오 이대점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 홍대점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 홍대점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '다음사진관 홍대점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '온누리 스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '사랑이야기스튜디오' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '사랑이야기스튜디오' AND c.slug = 'wedding';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '시간이 머무른 자리' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '시간이 머무른 자리' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '수상한사진관 노원점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '수상한사진관 노원점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '노원역사진관포토존' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '수선화사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '마주봄사진관 노원점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '마주봄사진관 노원점' AND c.slug = 'kids';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '공릉동 사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '본스타일 베이비스튜디오' AND c.slug = 'kids';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '본스타일 베이비스튜디오' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우정사진관 노원점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우정사진관 노원점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '뉴페이스스튜디오 노원본점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '뉴페이스스튜디오 노원본점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '알로하스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '알로하스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '종이거울스튜디오 노원점' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '리오사진예술원' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '베일리수 더엠 패밀리 노원점' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오 오월애' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오 앨리스 월계점' AND c.slug = 'kids';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오 앨리스 월계점' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '끌라르떼사진예술원' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '끌라르떼사진예술원' AND c.slug = 'wedding';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '레몬쿠키스튜디오' AND c.slug = 'kids';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '그랑빌스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '그랑빌스튜디오' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '포크스튜디오 중계점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '그레이 아일랜드' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '그레이 아일랜드' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '보람스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '양현모사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '양현모사진관' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '네오포토' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '지스튜디오 명동점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '지스튜디오 명동점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '드레스시네마' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '드레스시네마' AND c.slug = 'wedding';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '이츠미포토스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '이츠미포토스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '첼리스스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '셀프사진관 광각도시' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '셀프사진관 광각도시' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '청계사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '맥스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '맥스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '명동 스튜디오 사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '명동 스튜디오 사진관' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '원사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '고래사진관 필름현상소' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '고래사진관 필름현상소' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '필동사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '소리사진관 스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '소리사진관 스튜디오' AND c.slug = 'family';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '인스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '인스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '망우삼림' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '망우삼림' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '포토이즈 서울역점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '타임포토' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '타임포토' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '피카포토 시청점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '피카포토 시청점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '중앙사진실' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '쌍마스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '쌍마스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '로뎀스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '로뎀스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '샐러드스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '샐러드스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '엘림스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '엘림스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '엘림샘스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = 'HP포토카페 여의도점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '정우17분칼라' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '킴스미디어' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '킴스미디어' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '윤스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '윤스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 여의도점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 여의도점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '트윈스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스위스 포토' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스위스 포토' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '서울칼라' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = 'GNY스튜디오 본점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = 'GNY스튜디오 본점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '플레이인더박스 더현대서울점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '플레이인더박스 더현대서울점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '강남역에뜬별스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '강남역에뜬별스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스펙플러스 스튜디오' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스펙플러스 스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 강남역점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '우리동네사진관 강남역점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '키다리아저씨사진관 강남점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '키다리아저씨사진관 강남점' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '강남역사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '강남역사진관' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '남산사진관' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '레드나우스튜디오' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오 피네' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '스튜디오 피네' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '다시봄사진관' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '다시봄사진관' AND c.slug = 'profile';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '사진공간엘 종로5가점' AND c.slug = 'id-photo';
INSERT INTO studio_categories (studio_id, category_id) SELECT s.id, c.id FROM studios s, categories c WHERE s.name = '사진공간엘 종로5가점' AND c.slug = 'profile';

-- ============================================
-- 5. 스튜디오-시설 연결 (Studio Facilities)
-- ============================================

INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오피플' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오피플' AND f.slug = 'makeup';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오피플' AND f.slug = 'costume-rental';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오피플' AND f.slug = 'dressing-room';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 강남점' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 강남점' AND f.slug = 'makeup';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 강남점' AND f.slug = 'costume-rental';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오애플' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오애플' AND f.slug = 'parking';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '스튜디오씨' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'makeup';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'costume-rental';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'hair-service';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'dressing-room';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '아이엠재민' AND f.slug = 'group-photo';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '타임온미 스튜디오' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '타임온미 스튜디오' AND f.slug = 'makeup';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '타임온미 스튜디오' AND f.slug = 'dressing-room';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '포토바이 홍대' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '포토바이 홍대' AND f.slug = 'dressing-room';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '포크스튜디오 이대점' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 홍대점' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 홍대점' AND f.slug = 'makeup';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '우리동네사진관 홍대점' AND f.slug = 'costume-rental';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '다음사진관 홍대점' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '다음사진관 홍대점' AND f.slug = 'dressing-room';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '온누리 스튜디오' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '온누리 스튜디오' AND f.slug = 'group-photo';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '사랑이야기스튜디오' AND f.slug = 'reservation';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '사랑이야기스튜디오' AND f.slug = 'group-photo';
INSERT INTO studio_facilities (studio_id, facility_id) SELECT s.id, f.id FROM studios s, facilities f WHERE s.name = '시간이 머무른 자리' AND f.slug = 'reservation';

-- ============================================
-- 6. 상품 (Products)
-- ============================================

INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '전문직(베이직) 프로필', '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', 90000, 40, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '퍼스널 컬러 프로필', '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', 100000, 40, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '배우 프로필', '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', 100000, 40, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '아티스트 프로필', '1장 보정, 1개 의상, 전체 원본 제공(약 50장)', 100000, 40, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '특별화보 컨셉', '1장 보정, 1개 의상, 전체 원본 제공(약 80장)', 150000, 40, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '2가지 컨셉 2컷', '2장 보정, 2개 의상, 전신 촬영, 원본 약 150장', 180000, 90, ARRAY['2장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '3가지 컨셉 3컷', '3장 보정, 3개 의상, 전신 촬영, 원본 약 150장', 270000, 90, ARRAY['3장 보정','원본 제공'] FROM studios s WHERE s.name = '스튜디오피플';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '프로필 1컷+증명 세트', '1:1 맞춤수정, 3x4cm 증명사진, 5x7inch 프로필', 100000, 60, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 강남점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '프로필 1컷', '1:1 맞춤수정, 5x7inch 프로필 사진', 70000, 60, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 강남점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '프로필 2컷', '1:1 맞춤수정, 컷별 5x7inch 프로필', 130000, 90, ARRAY['2장 보정','원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 강남점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '프로필화보 4컷', '1:1 맞춤수정, 포토카드, 컷별 프로필', 260000, 120, ARRAY['4장 보정','원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 강남점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '원본 파일 추가', '컷별 10장 내외 원본 파일', 70000, NULL, ARRAY['원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 강남점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '증명/여권 사진', '3x4 8매 또는 3.5x4.5 6매, 사진파일', 35000, 30, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '타임온미 스튜디오';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '증명사진', '기본 증명사진', 30000, 20, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '포토바이 홍대';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '개인프로필', '프로필 촬영 (예약필수)', 60000, 60, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '포토바이 홍대';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '신분증/여권/비자', '증명사진, 섬세한 보정', 33000, 20, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '포크스튜디오 이대점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '증명/여권/비자', '의상 대여, 메이크업 선택 가능', 35000, 30, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '우리동네사진관 홍대점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '증명/여권/취업', '다양한 배경색 선택', 55000, 30, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '다음사진관 홍대점';
INSERT INTO products (studio_id, name, description, base_price, duration, includes) SELECT s.id, '증명/여권/취업', '단체사진 가능', 55000, 30, ARRAY['1장 보정','원본 제공'] FROM studios s WHERE s.name = '온누리 스튜디오';

-- ============================================
-- 완료!
-- 78개 스튜디오, 10개 카테고리, 11개 시설, 19개 상품
-- ============================================
