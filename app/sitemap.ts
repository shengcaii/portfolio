import { getBlogPosts } from 'app/(pages)/blog/utils'

type SitemapEntry = {
  url: string
  lastModified: string
}

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap(): Promise<SitemapEntry[]> {
  try {
    const blogs = (await getBlogPosts()).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt).toISOString().split('T')[0],
    }))

    const routes = ['', '/blog'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogs]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}
