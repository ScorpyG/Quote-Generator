// Optimistic checks with Middleware (Optional) from
// https://nextjs.org/docs/pages/building-your-application/authentication
import { NextRequest, NextResponse } from 'next/server';

const protectedPageRoutes = ['/profile', '/edit'];

const isGetAllPostsApiRoute = (path: string) => {
  return path.startsWith('/api/blog/getAll');
};

const isProtectPageRoute = (path: string) => {
  return protectedPageRoutes.some((protectedPageRoute) => path.startsWith(protectedPageRoute));
};

const isPageRoute = (path: string) => {
  return !path.startsWith('/api');
};

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isPageRoute(path)) {
    if (isProtectPageRoute(path) && !request.cookies.has('token')) {
      const url = request.nextUrl.clone();
      url.pathname = '/signin';

      return NextResponse.redirect(url);
    }
  } else if (!isPageRoute(path)) {
    if (isGetAllPostsApiRoute(path)) {
      return NextResponse.next();
    } else {
      if (request.cookies.has('token')) {
        const token = request.cookies.get('token')?.value;

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Authorization', `Bearer ${token}`);

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT for the ones starting with:
     * - api/auth/signin (sign in route)
     * - api/auth/register (register route)
     * - api/auth/signout (sign out route)
     *
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth/signin|api/auth/register|api/auth/signout|_next/static|_next/image|.*\\.png$).*)',
    // Protected API routes
    '/api/blog/delete',
    '/api/blog/edit',
    '/api/blog/create',
    '/api/blog/userPosts',
  ],
};
