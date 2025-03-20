import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/(pages)/blog/utils'

// Define a type for blog post structure
type BlogPost = {
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
  }
  slug: string
  content: string
}

export async function GET() {
  try {
    // Fetch blog posts with error handling
    const allBlogs = await getBlogPosts()

    const itemsXml = allBlogs
      .sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
          return -1
        }
        return 1
      })
      .map(
        (post: BlogPost) => {
          // Ensure we have valid data with fallbacks
          const title = post.metadata.title ? post.metadata.title.trim() : 'Untitled Post'
          const link = `${baseUrl}/blog/${post.slug}`
          const description = post.metadata.summary ? post.metadata.summary.trim() : 'No description available'
          const pubDate = new Date(post.metadata.publishedAt).toUTCString()

          return `<item>
          <title>${escapeXml(title)}</title>
          <link>${link}</link>
          <description>${escapeXml(description)}</description>
          <pubDate>${pubDate}</pubDate>
          <guid isPermaLink="true">${link}</guid>
        </item>`
        }
      )
      .join('\n')

    // Function to escape XML special characters
    const escapeXml = (unsafe: string): string => {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    }

    const currentDate = new Date().toUTCString()
    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        <language>en-us</language>
        <lastBuildDate>${currentDate}</lastBuildDate>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        <ttl>60</ttl>
        ${itemsXml}
    </channel>
  </rss>`

    // Set cache control headers for better performance
    return new Response(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}
