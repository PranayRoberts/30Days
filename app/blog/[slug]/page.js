import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import postsData from '@/data/posts.json'
import TagPill from '@/components/shared/TagPill'
import BlogCard from '@/components/blog/BlogCard'
import TranslateButton from '@/components/shared/TranslateButton'

export async function generateStaticParams() {
  return postsData.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = postsData.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | 30 Days in Australia`,
    description: post.excerpt,
  }
}

// Minimal markdown renderer — handles common patterns
function renderMarkdown(content) {
  if (!content) return []
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.slice(3), key: i })
    } else if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.slice(2), key: i })
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.slice(4), key: i })
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push({ type: 'ul', items, key: i })
      continue
    } else if (line.trim() !== '') {
      elements.push({ type: 'p', content: line, key: i })
    }

    i++
  }

  return elements
}

function applyInlineFormatting(text) {
  // Bold and italic (simplified)
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
}

function MarkdownContent({ content }) {
  const elements = renderMarkdown(content)
  return (
    <div className="prose-custom">
      {elements.map(el => {
        if (el.type === 'h1') return <h1 key={el.key} className="text-2xl font-bold text-[#1C1917] mt-6 mb-3">{el.content}</h1>
        if (el.type === 'h2') return <h2 key={el.key} className="text-xl font-bold text-[#1C1917] mt-6 mb-3">{el.content}</h2>
        if (el.type === 'h3') return <h3 key={el.key} className="text-lg font-semibold text-[#1C1917] mt-4 mb-2">{el.content}</h3>
        if (el.type === 'p') return <p key={el.key} className="text-[#1C1917] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: applyInlineFormatting(el.content) }} />
        if (el.type === 'ul') return (
          <ul key={el.key} className="list-disc list-inside space-y-1 mb-4 text-[#1C1917]">
            {el.items.map((item, j) => (
              <li key={j} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: applyInlineFormatting(item) }} />
            ))}
          </ul>
        )
        return null
      })}
    </div>
  )
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = postsData.find(p => p.slug === slug)
  if (!post) notFound()

  const related = postsData
    .filter(p => p.slug !== slug && p.tags?.some(t => post.tags?.includes(t)))
    .slice(0, 2)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#78716C] hover:text-[#1C1917]">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
        <TranslateButton />
      </div>

      {/* Title */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags?.map(tag => <TagPill key={tag} label={tag} />)}
      </div>
      <h1 className="text-3xl font-bold text-[#1C1917] mb-4 leading-tight">{post.title}</h1>

      {/* Author bar */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
        <span className="text-3xl">{post.authorFlag}</span>
        <div>
          <p className="font-medium text-[#1C1917]">{post.author}</p>
          <p className="text-sm text-[#78716C]">
            {new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{post.readTime}
          </p>
        </div>
      </div>

      {/* Content */}
      <MarkdownContent content={post.content} />

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-100">
          <h2 className="text-lg font-bold text-[#1C1917] mb-4">Related posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(p => <BlogCard key={p.id} post={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
