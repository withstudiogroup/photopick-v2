import { createClient } from './client';
import type { Studio, Category, Product } from '@/types';

// DB 타입 정의
interface DbStudio {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  short_description: string;
  operating_hours: { note?: string } | null;
  status: string;
  grade: string;
  rating: number;
  review_count: number;
  thumbnail_url: string | null;
  created_at: string;
}

interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

interface DbProduct {
  id: string;
  studio_id: string;
  name: string;
  description: string | null;
  base_price: number;
  duration: number | null;
  includes: string[] | null;
}

interface DbFacility {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

// 주소에서 지역 정보 추출
function extractLocationInfo(address: string) {
  const districts: Record<string, string> = {
    '강남구': '강남/서초',
    '서초구': '강남/서초',
    '마포구': '홍대/마포',
    '송파구': '잠실/송파',
    '서대문구': '신촌/이대',
    '영등포구': '여의도/영등포',
    '노원구': '노원/도봉',
    '중구': '명동/충무로',
    '종로구': '종로/인사동',
  };

  let district = '서울';
  let city = '서울';

  for (const [key, value] of Object.entries(districts)) {
    if (address.includes(key)) {
      district = value;
      break;
    }
  }

  if (address.includes('경기')) {
    city = '경기';
  }

  // 가장 가까운 역 추출 (간단한 로직)
  const stationMatch = address.match(/(\S+역)/);
  const nearestStation = stationMatch ? stationMatch[1] : '';

  return {
    address,
    district,
    city,
    nearestStation,
    walkingMinutes: 5, // 기본값
  };
}

// grade 변환
function mapGrade(grade: string): 'premium' | 'standard' | 'budget' {
  switch (grade) {
    case 'premium':
      return 'premium';
    case 'standard':
      return 'standard';
    default:
      return 'budget';
  }
}

// Supabase Studio를 프론트엔드 Studio로 변환
function transformStudio(
  dbStudio: DbStudio,
  categories: string[],
  facilities: string[],
  products: Product[],
  images: string[] = []
): Studio {
  const studioImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800'];

  return {
    id: dbStudio.id,
    name: dbStudio.name,
    location: extractLocationInfo(dbStudio.address),
    rating: dbStudio.rating || 4.5,
    reviewCount: dbStudio.review_count || 0,
    grade: mapGrade(dbStudio.grade),
    images: studioImages,
    thumbnail: studioImages[0] || 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400',
    categories,
    facilities,
    products,
    description: dbStudio.description || '',
    operatingHours: dbStudio.operating_hours?.note || '문의필요',
    closedDays: '',
    phone: dbStudio.phone || '문의필요',
    hasCoupon: false,
    discountRate: 0,
  };
}

// Product 변환
function transformProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || '',
    basePrice: dbProduct.base_price,
    discountRate: 0,
    includes: dbProduct.includes || [],
    duration: dbProduct.duration || 30,
    maxPersons: 1,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    category: '',
  };
}

// ============================================
// 공개 API 함수들
// ============================================

/**
 * 모든 카테고리 조회
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return (data as DbCategory[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon || 'camera',
    slug: cat.slug,
  }));
}

/**
 * 모든 스튜디오 조회 (with relations)
 */
export async function getStudios(): Promise<Studio[]> {
  const supabase = createClient();

  // 스튜디오 기본 정보
  const { data: studiosData, error: studiosError } = await supabase
    .from('studios')
    .select('*')
    .eq('status', 'active');

  if (studiosError) {
    console.error('Error fetching studios:', studiosError);
    return [];
  }

  // 카테고리 연결 정보
  const { data: studioCategoriesData } = await supabase
    .from('studio_categories')
    .select(`
      studio_id,
      categories (name)
    `);

  // 시설 연결 정보
  const { data: studioFacilitiesData } = await supabase
    .from('studio_facilities')
    .select(`
      studio_id,
      facilities (name)
    `);

  // 상품 정보
  const { data: productsData } = await supabase
    .from('products')
    .select('*');

  // 이미지 정보
  const { data: imagesData } = await supabase
    .from('studio_images')
    .select('studio_id, image_url, sort_order')
    .order('sort_order');

  // 데이터 매핑
  const studioCategoriesMap = new Map<string, string[]>();
  const studioFacilitiesMap = new Map<string, string[]>();
  const studioProductsMap = new Map<string, Product[]>();
  const studioImagesMap = new Map<string, string[]>();

  // 카테고리 매핑
  (studioCategoriesData || []).forEach((sc) => {
    const studioId = sc.studio_id as string;
    const categories = sc.categories as { name: string } | { name: string }[] | null;
    const categoryName = Array.isArray(categories) ? categories[0]?.name : categories?.name;
    if (categoryName) {
      if (!studioCategoriesMap.has(studioId)) {
        studioCategoriesMap.set(studioId, []);
      }
      studioCategoriesMap.get(studioId)!.push(categoryName);
    }
  });

  // 시설 매핑
  (studioFacilitiesData || []).forEach((sf) => {
    const studioId = sf.studio_id as string;
    const facilities = sf.facilities as { name: string } | { name: string }[] | null;
    const facilityName = Array.isArray(facilities) ? facilities[0]?.name : facilities?.name;
    if (facilityName) {
      if (!studioFacilitiesMap.has(studioId)) {
        studioFacilitiesMap.set(studioId, []);
      }
      studioFacilitiesMap.get(studioId)!.push(facilityName);
    }
  });

  // 상품 매핑
  (productsData || []).forEach((product: DbProduct) => {
    const studioId = product.studio_id;
    if (!studioProductsMap.has(studioId)) {
      studioProductsMap.set(studioId, []);
    }
    studioProductsMap.get(studioId)!.push(transformProduct(product));
  });

  // 이미지 매핑
  (imagesData || []).forEach((img: { studio_id: string; image_url: string }) => {
    const studioId = img.studio_id;
    if (!studioImagesMap.has(studioId)) {
      studioImagesMap.set(studioId, []);
    }
    studioImagesMap.get(studioId)!.push(img.image_url);
  });

  // 최종 변환
  return (studiosData as DbStudio[]).map((studio) =>
    transformStudio(
      studio,
      studioCategoriesMap.get(studio.id) || [],
      studioFacilitiesMap.get(studio.id) || [],
      studioProductsMap.get(studio.id) || [],
      studioImagesMap.get(studio.id) || []
    )
  );
}

/**
 * 단일 스튜디오 조회
 */
export async function getStudioById(id: string): Promise<Studio | null> {
  const supabase = createClient();

  const { data: studio, error } = await supabase
    .from('studios')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !studio) {
    console.error('Error fetching studio:', error);
    return null;
  }

  // 카테고리
  const { data: categoriesData } = await supabase
    .from('studio_categories')
    .select('categories (name)')
    .eq('studio_id', id);

  const categories = (categoriesData || [])
    .map((c) => {
      const cat = c.categories as { name: string } | { name: string }[] | null;
      return Array.isArray(cat) ? cat[0]?.name : cat?.name;
    })
    .filter(Boolean) as string[];

  // 시설
  const { data: facilitiesData } = await supabase
    .from('studio_facilities')
    .select('facilities (name)')
    .eq('studio_id', id);

  const facilities = (facilitiesData || [])
    .map((f) => {
      const fac = f.facilities as { name: string } | { name: string }[] | null;
      return Array.isArray(fac) ? fac[0]?.name : fac?.name;
    })
    .filter(Boolean) as string[];

  // 상품
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('studio_id', id);

  const products = (productsData || []).map(transformProduct);

  // 이미지
  const { data: imagesData } = await supabase
    .from('studio_images')
    .select('image_url')
    .eq('studio_id', id)
    .order('sort_order');

  const images = (imagesData || []).map((img: { image_url: string }) => img.image_url);

  return transformStudio(studio as DbStudio, categories, facilities, products, images);
}

/**
 * 카테고리별 스튜디오 조회
 */
export async function getStudiosByCategory(categorySlug: string): Promise<Studio[]> {
  const studios = await getStudios();

  // 카테고리 이름 조회
  const supabase = createClient();
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', categorySlug)
    .single();

  if (!category) return studios;

  return studios.filter((s) => s.categories.includes(category.name));
}

/**
 * 검색어로 스튜디오 검색
 */
export async function searchStudios(query: string): Promise<Studio[]> {
  const studios = await getStudios();
  const lowerQuery = query.toLowerCase();

  return studios.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.location.address.toLowerCase().includes(lowerQuery) ||
      s.location.district.toLowerCase().includes(lowerQuery) ||
      s.categories.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 인기 스튜디오 조회 (리뷰 수 기준)
 */
export async function getPopularStudios(limit = 10): Promise<Studio[]> {
  const studios = await getStudios();
  return studios
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

/**
 * 평점 높은 스튜디오 조회
 */
export async function getHighRatedStudios(limit = 10): Promise<Studio[]> {
  const studios = await getStudios();
  return studios
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
