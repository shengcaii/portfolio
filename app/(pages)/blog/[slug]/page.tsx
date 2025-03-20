import { getBlogPostBySlug, getBlogPosts } from '../utils';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Get the slug from params
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert">
      <h1 className="font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-200">
        {new Date(post.metadata.publishedAt).toLocaleDateString()}
      </p>
      <div className="mt-8">
        <CustomMDX source={post.content} />
      </div>
    </article>
  );
}
