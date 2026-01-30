import { NextResponse } from 'next/server';
import { getStudios, searchStudios, getStudiosByCategory } from '@/lib/supabase/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  try {
    let studios;

    if (query) {
      studios = await searchStudios(query);
    } else if (category) {
      studios = await getStudiosByCategory(category);
    } else {
      studios = await getStudios();
    }

    return NextResponse.json(studios);
  } catch (error) {
    console.error('Error fetching studios:', error);
    return NextResponse.json({ error: 'Failed to fetch studios' }, { status: 500 });
  }
}
