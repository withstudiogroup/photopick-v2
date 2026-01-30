import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';

const supabaseUrl = 'https://ultvpvuklyvtuyoqddyt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdHZwdnVrbHl2dHV5b3FkZHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODgwMTAzOSwiZXhwIjoyMDg0Mzc3MDM5fQ.zZtGBNa6OV_ID4nDDA1BaG_ye22I2JuFi-GJrqwjQuQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('🔧 Studio Admins 테이블 마이그레이션 시작...\n');

  // 1. studio_admins 테이블 생성
  const { error: createStudioAdminsError } = await supabase.rpc('exec_sql', {
    sql: `
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
        created_by UUID,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  });

  // RPC가 없으면 직접 테이블 체크
  const { data: existingTable } = await supabase
    .from('studio_admins')
    .select('id')
    .limit(1);

  if (existingTable === null) {
    console.log('⚠️ studio_admins 테이블이 없습니다. Supabase Dashboard에서 SQL을 직접 실행해주세요.');
    console.log('\n📋 실행할 SQL:');
    console.log(`
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
  created_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
    `);
    return;
  }

  console.log('✅ studio_admins 테이블 확인됨');

  // 2. super_admins 테이블 확인
  const { data: superAdminTable } = await supabase
    .from('super_admins')
    .select('id')
    .limit(1);

  if (superAdminTable === null) {
    console.log('⚠️ super_admins 테이블이 없습니다.');
  } else {
    console.log('✅ super_admins 테이블 확인됨');
  }

  // 3. 테스트용 SuperAdmin 계정 생성
  const testPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(testPassword, 10);

  const { data: existingSuperAdmin } = await supabase
    .from('super_admins')
    .select('id')
    .eq('username', 'superadmin')
    .single();

  if (!existingSuperAdmin) {
    const { error: insertError } = await supabase
      .from('super_admins')
      .insert({
        username: 'superadmin',
        password_hash: hashedPassword,
        name: '최고관리자',
      });

    if (insertError) {
      console.log('❌ SuperAdmin 생성 실패:', insertError.message);
    } else {
      console.log('✅ SuperAdmin 계정 생성됨 (superadmin / admin123)');
    }
  } else {
    console.log('✅ SuperAdmin 계정 이미 존재');
  }

  // 4. 테스트용 Studio Admin 계정 생성 (첫 번째 스튜디오에)
  const { data: firstStudio } = await supabase
    .from('studios')
    .select('id, name')
    .limit(1)
    .single();

  if (firstStudio) {
    const { data: existingAdmin } = await supabase
      .from('studio_admins')
      .select('id')
      .eq('username', 'studio1')
      .single();

    if (!existingAdmin) {
      const studioPassword = await bcrypt.hash('studio123', 10);
      const { error: insertStudioAdminError } = await supabase
        .from('studio_admins')
        .insert({
          studio_id: firstStudio.id,
          username: 'studio1',
          password_hash: studioPassword,
          name: `${firstStudio.name} 관리자`,
        });

      if (insertStudioAdminError) {
        console.log('❌ Studio Admin 생성 실패:', insertStudioAdminError.message);
      } else {
        console.log(`✅ Studio Admin 계정 생성됨 (studio1 / studio123) - ${firstStudio.name}`);
      }
    } else {
      console.log('✅ Studio Admin 테스트 계정 이미 존재');
    }
  }

  console.log('\n🎉 마이그레이션 완료!');
  console.log('\n📋 테스트 계정:');
  console.log('  - SuperAdmin: superadmin / admin123');
  console.log('  - StudioAdmin: studio1 / studio123');
}

migrate().catch(console.error);
