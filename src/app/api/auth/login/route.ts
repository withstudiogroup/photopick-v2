import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'photopick-secret-key-change-in-production'
);

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. SuperAdmin 확인
    const { data: superAdmin } = await supabase
      .from('super_admins')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (superAdmin) {
      const isValid = await bcrypt.compare(password, superAdmin.password_hash);
      if (isValid) {
        // 마지막 로그인 시간 업데이트
        await supabase
          .from('super_admins')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', superAdmin.id);

        // JWT 토큰 생성
        const token = await new SignJWT({
          id: superAdmin.id,
          username: superAdmin.username,
          name: superAdmin.name,
          role: 'superadmin',
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(JWT_SECRET);

        // 쿠키에 토큰 저장
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24시간
          path: '/',
        });

        return NextResponse.json({
          success: true,
          user: {
            id: superAdmin.id,
            username: superAdmin.username,
            name: superAdmin.name,
            role: 'superadmin',
          },
          redirectTo: '/superadmin',
        });
      }
    }

    // 2. Studio Admin 확인
    const { data: studioAdmin } = await supabase
      .from('studio_admins')
      .select(`
        *,
        studios (id, name)
      `)
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (studioAdmin) {
      const isValid = await bcrypt.compare(password, studioAdmin.password_hash);
      if (isValid) {
        // 마지막 로그인 시간 업데이트
        await supabase
          .from('studio_admins')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', studioAdmin.id);

        // JWT 토큰 생성
        const token = await new SignJWT({
          id: studioAdmin.id,
          username: studioAdmin.username,
          name: studioAdmin.name,
          role: 'admin',
          studioId: studioAdmin.studio_id,
          studioName: studioAdmin.studios?.name,
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(JWT_SECRET);

        // 쿠키에 토큰 저장
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24시간
          path: '/',
        });

        return NextResponse.json({
          success: true,
          user: {
            id: studioAdmin.id,
            username: studioAdmin.username,
            name: studioAdmin.name,
            role: 'admin',
            studioId: studioAdmin.studio_id,
            studioName: studioAdmin.studios?.name,
          },
          redirectTo: '/admin',
        });
      }
    }

    // 아이디 또는 비밀번호 불일치
    return NextResponse.json(
      { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
