// Optimistic checks with Middleware (Optional) from
// https://nextjs.org/docs/pages/building-your-application/authentication
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/profile', '/editQuote'];
const publicRoutes = ['/', '/signin', '/signup'];

// ! This is just template code. You should replace this with your own encryption/decryption logic
function decrypt(cookie: string | undefined) {
  if (cookie) {
    // Decrypt the cookie
    return JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8'));
  } else {
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
