import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ultvpvuklyvtuyoqddyt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdHZwdnVrbHl2dHV5b3FkZHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODgwMTAzOSwiZXhwIjoyMDg0Mzc3MDM5fQ.zZtGBNa6OV_ID4nDDA1BaG_ye22I2JuFi-GJrqwjQuQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkImages() {
  console.log('🔍 이미지 데이터 확인...\n');

  // 총 이미지 수
  const { count } = await supabase
    .from('studio_images')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 총 이미지 수: ${count}\n`);

  // 스튜디오별 이미지 수 확인
  const { data: studios } = await supabase
    .from('studios')
    .select('id, name')
    .limit(10);

  console.log('📸 스튜디오별 이미지 확인 (처음 10개):');
  console.log('─'.repeat(60));

  for (const studio of studios || []) {
    const { data: images } = await supabase
      .from('studio_images')
      .select('image_url')
      .eq('studio_id', studio.id)
      .order('sort_order')
      .limit(3);

    console.log(`\n[${studio.name}]`);
    console.log(`  이미지 수: ${images?.length || 0}`);
    if (images && images.length > 0) {
      console.log(`  첫번째: ${images[0].image_url.substring(0, 70)}...`);
    }
  }

  // 유니크한 이미지 URL 수 확인
  const { data: allImages } = await supabase
    .from('studio_images')
    .select('image_url');

  const uniqueUrls = new Set(allImages?.map(i => i.image_url) || []);
  console.log(`\n\n📊 유니크한 이미지 URL 수: ${uniqueUrls.size}`);
  console.log(`📊 전체 이미지 수: ${allImages?.length || 0}`);
}

checkImages().catch(console.error);
