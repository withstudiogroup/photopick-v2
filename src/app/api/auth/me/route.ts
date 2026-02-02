export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'photopick-secret-key-change-in-production'
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      user: {
        id: payload.id,
        username: payload.username,
        name: payload.name,
        role: payload.role,
        studioId: payload.studioId,
        studioName: payload.studioName,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: '세션이 만료되었습니다.' },
      { status: 401 }
    );
  }
}
