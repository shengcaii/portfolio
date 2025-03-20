import rateLimit from 'express-rate-limit';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

export { limiter };

// Middleware for API routes
export async function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  
  try {
    // Implement your rate limiting logic here
    // This is a simplified example
    const key = `rate-limit:${ip}`;
    
    // In a real implementation, you'd use Redis or another store
    // to track request counts across serverless functions
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
}