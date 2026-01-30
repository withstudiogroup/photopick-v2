-- PhotoPick Database Schema
-- Supabase PostgreSQL

-- ============================================
-- 1. ENUM 타입 정의
-- ============================================

CREATE TYPE user_role AS ENUM ('user', 'admin', 'superadmin');
CREATE TYPE studio_grade AS ENUM ('basic', 'premium', 'vip');
CREATE TYPE studio_status AS ENUM ('active', 'pending', 'suspended');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'noshow');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'partial_refund');

-- ============================================
-- 2. 사용자 관련 테이블
-- ============================================

-- 사용자 프로필 (auth.users 확장)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  profile_image TEXT,
  role user_role DEFAULT 'user',
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- 찜 목록
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, studio_id)
);

-- 장바구니
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  selected_date DATE,
  selected_time TIME,
  options JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 최근 본 스튜디오
CREATE TABLE recent_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, studio_id)
);

-- 사용자 보유 쿠폰
CREATE TABLE user_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. 스튜디오 관련 테이블
-- ============================================

-- 카테고리
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 스튜디오 (업체)
CREATE TABLE studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- 기본 정보
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,

  -- 등급
  grade studio_grade DEFAULT 'basic',
  grade_expires_at TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT FALSE,

  -- 위치 정보
  address TEXT NOT NULL,
  address_detail TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  nearest_station TEXT,
  parking_info TEXT,

  -- 연락처
  phone TEXT,
  email TEXT,
  business_number TEXT,

  -- 운영 정보
  operating_hours JSONB DEFAULT '{"mon": {"open": "10:00", "close": "20:00"}, "tue": {"open": "10:00", "close": "20:00"}, "wed": {"open": "10:00", "close": "20:00"}, "thu": {"open": "10:00", "close": "20:00"}, "fri": {"open": "10:00", "close": "20:00"}, "sat": {"open": "10:00", "close": "18:00"}, "sun": null}',
  closed_days TEXT[], -- 정기 휴무일

  -- 통계
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  reservation_count INTEGER DEFAULT 0,

  -- 상태
  status studio_status DEFAULT 'pending',

  -- 메타
  thumbnail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 스튜디오 이미지
CREATE TABLE studio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 시설/서비스
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 스튜디오-시설 연결
CREATE TABLE studio_facilities (
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  PRIMARY KEY (studio_id, facility_id)
);

-- 스튜디오-카테고리 연결
CREATE TABLE studio_categories (
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (studio_id, category_id)
);

-- 촬영 상품
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

  name TEXT NOT NULL,
  description TEXT,

  -- 가격
  base_price INTEGER NOT NULL,
  discount_rate INTEGER DEFAULT 0,

  -- 촬영 정보
  duration INTEGER, -- 분 단위
  max_people INTEGER DEFAULT 1,
  includes TEXT[], -- 포함 내역

  -- 재고/예약
  daily_limit INTEGER, -- 하루 예약 가능 수
  advance_days INTEGER DEFAULT 30, -- 예약 가능 일수

  -- 이미지
  thumbnail TEXT,
  images TEXT[],

  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. 예약/리뷰 테이블
-- ============================================

-- 예약
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_number TEXT UNIQUE NOT NULL,

  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  -- 예약 일시
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,

  -- 인원/옵션
  people_count INTEGER DEFAULT 1,
  options JSONB DEFAULT '{}',
  memo TEXT, -- 고객 요청사항

  -- 결제
  original_price INTEGER NOT NULL,
  discount_amount INTEGER DEFAULT 0,
  coupon_id UUID REFERENCES user_coupons(id),
  final_price INTEGER NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,

  -- 상태
  status reservation_status DEFAULT 'pending',
  cancelled_at TIMESTAMPTZ,
  cancel_reason TEXT,

  -- 관리자 메모
  admin_memo TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 리뷰
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  reservation_id UUID UNIQUE REFERENCES reservations(id) ON DELETE SET NULL,

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,

  -- 리뷰 이미지
  images TEXT[],
  is_photo_review BOOLEAN DEFAULT FALSE,

  -- 업체 답변
  reply TEXT,
  reply_at TIMESTAMPTZ,

  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. 운영 관리 테이블 (SuperAdmin)
-- ============================================

-- 쿠폰 템플릿
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,
  code TEXT UNIQUE,
  description TEXT,

  -- 할인 정보
  discount_type TEXT NOT NULL CHECK (discount_type IN ('fixed', 'percent')),
  discount_value INTEGER NOT NULL,
  min_order_amount INTEGER DEFAULT 0,
  max_discount_amount INTEGER,

  -- 사용 조건
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE, -- NULL이면 전체 사용 가능
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,

  -- 유효 기간
  starts_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,

  -- 발급 제한
  total_count INTEGER,
  used_count INTEGER DEFAULT 0,
  per_user_limit INTEGER DEFAULT 1,

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 이벤트/프로모션
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,

  -- 이미지
  banner_image TEXT,
  thumbnail TEXT,

  -- 링크
  link_url TEXT,
  link_type TEXT CHECK (link_type IN ('internal', 'external')),

  -- 기간
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,

  -- 노출
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 메인 배너
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,

  -- 링크
  link_url TEXT,
  link_type TEXT CHECK (link_type IN ('internal', 'external')),

  -- 노출 위치
  position TEXT NOT NULL CHECK (position IN ('main', 'category', 'event')),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,

  -- 기간
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 등급 요금제
CREATE TABLE grade_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  grade studio_grade NOT NULL,
  name TEXT NOT NULL,

  -- 가격
  price_monthly INTEGER NOT NULL,
  price_yearly INTEGER,

  -- 혜택
  benefits JSONB NOT NULL DEFAULT '[]',

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. 인덱스 생성
-- ============================================

CREATE INDEX idx_studios_grade ON studios(grade);
CREATE INDEX idx_studios_status ON studios(status);
CREATE INDEX idx_studios_owner ON studios(owner_id);
CREATE INDEX idx_studios_rating ON studios(rating DESC);

CREATE INDEX idx_products_studio ON products(studio_id);
CREATE INDEX idx_products_category ON products(category_id);

CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_studio ON reservations(studio_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);

CREATE INDEX idx_reviews_studio ON reviews(studio_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_carts_user ON carts(user_id);
CREATE INDEX idx_recent_views_user ON recent_views(user_id);

-- ============================================
-- 7. RLS (Row Level Security) 정책
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- 프로필: 본인만 수정 가능
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 스튜디오: 공개 읽기, 소유자만 수정
CREATE POLICY "Anyone can view active studios" ON studios FOR SELECT USING (status = 'active');
CREATE POLICY "Owners can update own studio" ON studios FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Admins can insert studios" ON studios FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 상품: 공개 읽기
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Studio owners can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM studios WHERE studios.id = products.studio_id AND studios.owner_id = auth.uid())
);

-- 예약: 본인 예약만 조회, 스튜디오 주인도 조회 가능
CREATE POLICY "Users can view own reservations" ON reservations FOR SELECT USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM studios WHERE studios.id = reservations.studio_id AND studios.owner_id = auth.uid())
);
CREATE POLICY "Users can create reservations" ON reservations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 리뷰: 공개 읽기, 본인만 작성/수정
CREATE POLICY "Anyone can view visible reviews" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- 찜: 본인만 관리
CREATE POLICY "Users can manage own wishlists" ON wishlists FOR ALL USING (auth.uid() = user_id);

-- 장바구니: 본인만 관리
CREATE POLICY "Users can manage own carts" ON carts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 8. 트리거 함수
-- ============================================

-- updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON studios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 리뷰 작성 시 스튜디오 평점 업데이트
CREATE OR REPLACE FUNCTION update_studio_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE studios
  SET
    rating = (SELECT ROUND(AVG(rating)::numeric, 1) FROM reviews WHERE studio_id = NEW.studio_id AND is_visible = true),
    review_count = (SELECT COUNT(*) FROM reviews WHERE studio_id = NEW.studio_id AND is_visible = true)
  WHERE id = NEW.studio_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review AFTER INSERT OR UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_studio_rating();

-- 예약 완료 시 스튜디오 예약 수 업데이트
CREATE OR REPLACE FUNCTION update_studio_reservation_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD IS NULL OR OLD.status != 'completed') THEN
    UPDATE studios
    SET reservation_count = reservation_count + 1
    WHERE id = NEW.studio_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reservation_count AFTER INSERT OR UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_studio_reservation_count();

-- 예약 번호 자동 생성
CREATE OR REPLACE FUNCTION generate_reservation_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reservation_number = 'PP' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_reservation_number_trigger BEFORE INSERT ON reservations FOR EACH ROW EXECUTE FUNCTION generate_reservation_number();

-- ============================================
-- 9. 초기 데이터 (시설, 카테고리)
-- ============================================

-- 시설/서비스
INSERT INTO facilities (name, slug, icon) VALUES
('자연광', 'natural-light', 'sun'),
('헤어메이크업', 'hair-makeup', 'sparkles'),
('의상대여', 'costume-rental', 'shirt'),
('주차가능', 'parking', 'car'),
('대기공간', 'waiting-area', 'sofa'),
('무선인터넷', 'wifi', 'wifi'),
('에어컨', 'air-conditioning', 'wind'),
('탈의실', 'changing-room', 'door-open'),
('소품제공', 'props', 'box'),
('즉석인화', 'instant-print', 'printer');

-- 카테고리
INSERT INTO categories (name, slug, icon, sort_order) VALUES
('증명사진', 'id-photo', 'id-card', 1),
('프로필/이력서', 'profile', 'user', 2),
('가족사진', 'family', 'users', 3),
('아기/돌스냅', 'baby', 'baby', 4),
('웨딩/스냅', 'wedding', 'heart', 5),
('컨셉촬영', 'concept', 'camera', 6),
('반려동물', 'pet', 'paw-print', 7),
('커플스냅', 'couple', 'heart-handshake', 8),
('우정스냅', 'friendship', 'users-round', 9);
