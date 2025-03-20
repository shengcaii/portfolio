import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Delete the auth cookie
  cookies().delete('auth_token');

  // Return success response
  return NextResponse.json({ success: true });
}