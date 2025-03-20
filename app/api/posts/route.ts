import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Post from '../../../models/Post';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        await connectDB();
        const posts = await Post.find({}).sort({ publishedAt: -1 });
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        interface PostBody {
            title: string;
            content: string;
        }

        const body: PostBody = await request.json();
        // Validate required fields
        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Sanitize and validate input lengths
        const title = body.title.trim().slice(0, 200);
        const content = body.content.trim();
        if (content.length > 50000) {
            return NextResponse.json(
                { error: 'Content exceeds maximum length of 50000 characters' },
                { status: 400 }
            );
        }

        await connectDB();
        const post = await Post.create({
            ...body,
            title,
            content,
            publishedAt: new Date()
        });
        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/posts:', error);
        return NextResponse.json(
            { error: 'Failed to create post', details: error.message },
            { status: 500 }
        );
    }
}
export async function DELETE(request: Request) {
    try {
        // Check if user is authenticated and is admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        // Verify admin token - implement your actual token verification logic here
        const isAdmin = await verifyAdminToken(token);
        if (!isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE /api/posts:', error);
        return NextResponse.json(
            { error: 'Failed to delete post', details: error.message },
            { status: 500 }
        );
    }
}

// Helper function to verify admin token
async function verifyAdminToken(token: string): Promise<boolean> {
    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
            userId: string;
            username: string;
            isAdmin: boolean;
            exp?: number;
        };

        // Check if token is expired
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return false;
        }

        // Check if user has admin privileges
        return decoded.isAdmin === true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
}