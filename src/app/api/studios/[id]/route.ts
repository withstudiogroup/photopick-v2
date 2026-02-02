export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getStudioById } from '@/lib/supabase/queries';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const studio = await getStudioById(id);

    if (!studio) {
      return NextResponse.json({ error: 'Studio not found' }, { status: 404 });
    }

    return NextResponse.json(studio);
  } catch (error) {
    console.error('Error fetching studio:', error);
    return NextResponse.json({ error: 'Failed to fetch studio' }, { status: 500 });
  }
}
