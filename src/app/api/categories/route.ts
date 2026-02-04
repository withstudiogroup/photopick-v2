export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Debug: Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        debug: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        }
      }, { status: 500 });
    }

    // Import Supabase dynamically to catch import errors
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (error) {
      return NextResponse.json({
        error: 'Supabase query failed',
        details: error.message
      }, { status: 500 });
    }

    const categories = (data || []).map((cat: { id: string; name: string; slug: string; icon: string | null }) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || 'camera',
      slug: cat.slug,
    }));

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({
      error: 'Unexpected error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
