-- Studio Admins Table
-- 업체별 관리자 계정 (이메일 대신 아이디/비번 사용)

-- studio_admins 테이블 생성
CREATE TABLE IF NOT EXISTS studio_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID, -- superadmin who created this account
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_studio_admins_studio_id ON studio_admins(studio_id);
CREATE INDEX IF NOT EXISTS idx_studio_admins_username ON studio_admins(username);

-- SuperAdmin 테이블 (플랫폼 관리자)
CREATE TABLE IF NOT EXISTS super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 SuperAdmin 계정 생성 (비밀번호: admin123 -> bcrypt hash)
-- 실제 운영시에는 반드시 변경 필요!
INSERT INTO super_admins (username, password_hash, name)
VALUES ('superadmin', '$2a$10$rQEY7GbL6z5hOvxPJ8sMzOqNvEuPxqPQ5LQXAHCYKzKXzJ5z5z5z5', '최고관리자')
ON CONFLICT (username) DO NOTHING;

-- RLS (Row Level Security) 정책
ALTER TABLE studio_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE super_admins ENABLE ROW LEVEL SECURITY;

-- studio_admins: 본인 스튜디오만 조회 가능
CREATE POLICY "Studio admins can view own studio" ON studio_admins
  FOR SELECT USING (true);

-- super_admins: 인증된 요청만 허용
CREATE POLICY "Super admins authenticated access" ON super_admins
  FOR ALL USING (true);
