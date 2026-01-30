import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = 'https://ultvpvuklyvtuyoqddyt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdHZwdnVrbHl2dHV5b3FkZHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODgwMTAzOSwiZXhwIjoyMDg0Mzc3MDM5fQ.zZtGBNa6OV_ID4nDDA1BaG_ye22I2JuFi-GJrqwjQuQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setup() {
  console.log('🔧 Admin 테이블 설정 확인...\n');

  // 1. studio_admins 테이블 확인
  const { error: studioAdminsError } = await supabase
    .from('studio_admins')
    .select('id')
    .limit(1);

  if (studioAdminsError?.code === '42P01') {
    console.log('❌ studio_admins 테이블이 없습니다.');
    console.log('\n👉 Supabase Dashboard > SQL Editor에서 다음 SQL을 실행하세요:\n');
    console.log(`
-- Studio Admins 테이블 (업체 관리자)
CREATE TABLE studio_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Super Admins 테이블 (플랫폼 관리자)
CREATE TABLE super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_studio_admins_studio_id ON studio_admins(studio_id);
CREATE INDEX idx_studio_admins_username ON studio_admins(username);
CREATE INDEX idx_super_admins_username ON super_admins(username);
    `);
    return;
  }

  console.log('✅ studio_admins 테이블 존재');

  // 2. super_admins 테이블 확인
  const { error: superAdminsError } = await supabase
    .from('super_admins')
    .select('id')
    .limit(1);

  if (superAdminsError?.code === '42P01') {
    console.log('❌ super_admins 테이블이 없습니다. 위 SQL을 실행하세요.');
    return;
  }

  console.log('✅ super_admins 테이블 존재');

  // 3. 테스트 SuperAdmin 계정 생성
  const { data: existingSuperAdmin } = await supabase
    .from('super_admins')
    .select('id')
    .eq('username', 'superadmin')
    .single();

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const { error } = await supabase
      .from('super_admins')
      .insert({
        username: 'superadmin',
        password_hash: hashedPassword,
        name: '최고관리자',
      });

    if (error) {
      console.log('❌ SuperAdmin 생성 실패:', error.message);
    } else {
      console.log('✅ SuperAdmin 생성: superadmin / admin123');
    }
  } else {
    console.log('✅ SuperAdmin 이미 존재');
  }

  // 4. 테스트 Studio Admin 계정 생성
  const { data: firstStudio } = await supabase
    .from('studios')
    .select('id, name')
    .order('created_at')
    .limit(1)
    .single();

  if (firstStudio) {
    const { data: existingStudioAdmin } = await supabase
      .from('studio_admins')
      .select('id')
      .eq('username', 'studio1')
      .single();

    if (!existingStudioAdmin) {
      const hashedPassword = await bcrypt.hash('studio123', 10);
      const { error } = await supabase
        .from('studio_admins')
        .insert({
          studio_id: firstStudio.id,
          username: 'studio1',
          password_hash: hashedPassword,
          name: `${firstStudio.name} 관리자`,
        });

      if (error) {
        console.log('❌ Studio Admin 생성 실패:', error.message);
      } else {
        console.log(`✅ Studio Admin 생성: studio1 / studio123 (${firstStudio.name})`);
      }
    } else {
      console.log('✅ Studio Admin 이미 존재');
    }
  }

  console.log('\n🎉 설정 완료!');
  console.log('\n📋 테스트 계정:');
  console.log('  SuperAdmin: superadmin / admin123');
  console.log('  StudioAdmin: studio1 / studio123');
}

setup().catch(console.error);
