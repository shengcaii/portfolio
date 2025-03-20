import connectDB from '../../../lib/db'
import Post from '../../../models/Post'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

// This function converts a MongoDB post to the format expected by the existing code
function convertPostToMDXFormat(post: InstanceType<typeof Post>) {
  return {
    metadata: {
      title: post.title,
      publishedAt: post.publishedAt.toISOString().split('T')[0],
      summary: post.excerpt,
    },
    slug: post.slug,
    content: post.content,
  }
}

// This function fetches all blog posts from MongoDB
export async function getBlogPosts() {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ publishedAt: -1 });

    // Convert MongoDB posts to the format expected by the existing code
    return posts.map(post => convertPostToMDXFormat(post));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// This function gets a single blog post by slug from MongoDB
export async function getBlogPostBySlug(slug: string) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug });

    if (!post) {
      return null;
    }

    return convertPostToMDXFormat(post);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()
  let formattedDate = ''
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
