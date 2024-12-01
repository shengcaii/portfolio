import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  // output --> [ '---\n  title: "Hello World"\n  publishedAt: "2022
  let frontMatterBlock = match![1]
  // extract the content from the mdx file
  let content = fileContent.replace(frontmatterRegex, '').trim()
  // output --> [
  //   "title: 'Spaces vs. Tabs: The Indentation Debate Continues'",
  //   "publishedAt: '2024-04-08'",
  //   "summary: 'Explore the enduring debate between using spaces and tabs for code indentation, and why this choice matters more than you might think.'"
  // ]
  let frontMatterLines = frontMatterBlock.trim().split('\n')

  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    key = key.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })
  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
  // return a list of mdx files in the directory
  // output --> ['file1.mdx', 'file2.mdx', ...]
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    // path.join(dir, file) output --> /path/to/file.mdx
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  // output--> C:\Users\HP\blog\app\blog\posts
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
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
