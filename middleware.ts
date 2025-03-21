import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define paths that need authentication
  const isAdminPath = path.startsWith('/admin');

  if (isAdminPath) {
    // Get the token from cookies
    const token = request.cookies.get('auth_token')?.value;
    console.log('Request path:', path);
    console.log('Token present:', !!token);

    if (!token) {
      console.log('No auth token found, redirecting to login');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    try {
      // Verify the JWT token using jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
      const { payload } = await jose.jwtVerify(token, secret) as unknown as {
        payload: {
          userId: string;
          username: string;
          isAdmin: boolean;
        }
      };
      // Check if user is admin
      if (!payload.isAdmin) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth_token');
        //console.log('Token deleted');
        return response;
      }

      // Valid token and admin user, allow access
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification error:', error);
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      console.log('Token deleted');
      return response;
    }
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths starting with /admin
    '/admin',
    '/admin/(.*)',
  ],
};