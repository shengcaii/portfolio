import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from 'lib/db';
import { compare } from 'bcrypt';
import User from 'models/User';
import jwt from 'jsonwebtoken';

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Simple in-memory store for rate limiting only
const loginAttempts = new Map();

// Clean up expired attempts periodically
setInterval(() => {
    const now = Date.now();
    Array.from(loginAttempts.entries()).forEach(([key, data]) => {
        if (now > data.resetTime) {
            loginAttempts.delete(key);
        }
    });
}, 5 * 60 * 1000); // Clean up every 5 minutes

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        // Rate limiting check
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const attemptData = loginAttempts.get(ip) || { count: 0, resetTime: Date.now() + WINDOW_MS };

        if (attemptData.count >= MAX_ATTEMPTS) {
            return NextResponse.json(
                { message: 'Too many login attempts. Please try again later.' },
                { status: 429 }
            );
        }

        await connectDB();

        const user = await User.findOne({ username });
        if (!user) {
            // Increment failed attempts
            attemptData.count++;
            loginAttempts.set(ip, attemptData);
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            // Increment failed attempts
            attemptData.count++;
            loginAttempts.set(ip, attemptData);
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Reset attempts on successful login
        loginAttempts.delete(ip);

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        // Set the JWT token as a cookie
        cookies().set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}