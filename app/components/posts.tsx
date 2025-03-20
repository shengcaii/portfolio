'use client';

import Link from 'next/link';
import { usePosts } from '../hooks/usePosts';

export function BlogPosts() {
  const { posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return (
      // loading animation
      <div className="space-y-4 relative overflow-hidden">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 mb-3">Error loading posts.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-4">
        {posts
          .filter(post => new Date(post.publishedAt) <= new Date())
          .slice(0, 4)
          .map((post) => (
            <div key={post._id} className="border border-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-medium">
                <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mt-1">{post.excerpt}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
