import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ultvpvuklyvtuyoqddyt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdHZwdnVrbHl2dHV5b3FkZHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODgwMTAzOSwiZXhwIjoyMDg0Mzc3MDM5fQ.zZtGBNa6OV_ID4nDDA1BaG_ye22I2JuFi-GJrqwjQuQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 카테고리별 Unsplash 컬렉션 ID (인물사진 관련)
// 각 스튜디오마다 다른 이미지를 위해 Unsplash source API 사용
const categorySearchTerms: Record<string, string> = {
  'id-photo': 'professional,headshot,portrait',
  'profile': 'business,portrait,corporate',
  'family': 'family,portrait,happy',
  'wedding': 'wedding,bride,couple',
  'pictorial': 'fashion,portrait,model',
  'actor': 'actor,headshot,portrait',
  'artist': 'musician,artist,performer',
  'group': 'team,group,friends',
  'kids': 'child,kid,baby',
  'body': 'fitness,gym,athlete',
};

// 스튜디오별 고유 시드로 이미지 URL 생성
function generateUniqueImageUrl(studioIndex: number, imageIndex: number, category: string): string {
  // 각 스튜디오+이미지 조합마다 고유한 시드 생성
  const seed = `studio${studioIndex}-img${imageIndex}-${category}`;
  return `https://picsum.photos/seed/${seed}/800/600`;
}

async function seedImages() {
  console.log('🖼️ 스튜디오별 고유 이미지 시드 시작...\n');

  // 1. 기존 이미지 삭제
  console.log('기존 이미지 삭제 중...');
  const { error: deleteError } = await supabase
    .from('studio_images')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('삭제 오류:', deleteError);
  }

  // 2. 스튜디오와 카테고리 정보 조회
  const { data: studios, error: studiosError } = await supabase
    .from('studios')
    .select('id, name')
    .order('created_at');

  if (studiosError || !studios) {
    console.error('스튜디오 조회 오류:', studiosError);
    return;
  }

  // 스튜디오별 카테고리 조회
  const { data: studioCategories } = await supabase
    .from('studio_categories')
    .select(`
      studio_id,
      categories (slug)
    `);

  // 스튜디오별 카테고리 맵 생성
  const studioCategoryMap = new Map<string, string>();
  (studioCategories || []).forEach((sc: any) => {
    const slug = Array.isArray(sc.categories)
      ? sc.categories[0]?.slug
      : sc.categories?.slug;
    if (slug && !studioCategoryMap.has(sc.studio_id)) {
      studioCategoryMap.set(sc.studio_id, slug);
    }
  });

  console.log(`${studios.length}개 스튜디오 발견\n`);

  // 3. 각 스튜디오에 고유한 10장씩 이미지 추가
  let totalImages = 0;

  for (let studioIndex = 0; studioIndex < studios.length; studioIndex++) {
    const studio = studios[studioIndex];
    const categorySlug = studioCategoryMap.get(studio.id) || 'profile';

    const imageRecords = [];
    for (let i = 0; i < 10; i++) {
      imageRecords.push({
        studio_id: studio.id,
        image_url: generateUniqueImageUrl(studioIndex, i, categorySlug),
        alt_text: `${studio.name} 포트폴리오 ${i + 1}`,
        sort_order: i + 1,
        is_main: i === 0,
      });
    }

    const { error: insertError } = await supabase
      .from('studio_images')
      .insert(imageRecords);

    if (insertError) {
      console.error(`❌ ${studio.name} 이미지 추가 실패:`, insertError.message);
    } else {
      console.log(`✅ ${studio.name} (${categorySlug}): 10장 고유 이미지 추가`);
      totalImages += 10;
    }
  }

  console.log(`\n🎉 완료! 총 ${totalImages}장의 고유 이미지 추가됨`);

  // 유니크 URL 확인
  const { data: allImages } = await supabase
    .from('studio_images')
    .select('image_url');

  const uniqueUrls = new Set(allImages?.map(i => i.image_url) || []);
  console.log(`📊 유니크한 이미지 URL 수: ${uniqueUrls.size} / ${allImages?.length || 0}`);
}

seedImages().catch(console.error);
