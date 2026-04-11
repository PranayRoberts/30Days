import Link from 'next/link'
import TagPill from '@/components/shared/TagPill'

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-5"
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags?.map(tag => <TagPill key={tag} label={tag} />)}
      </div>
      <h2 className="font-bold text-[#1C1917] text-base leading-snug mb-2 line-clamp-2">{post.title}</h2>
      <p className="text-sm text-[#78716C] line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg">{post.authorFlag}</span>
        <div>
          <p className="text-xs font-medium text-[#1C1917]">{post.author}</p>
          <p className="text-xs text-[#78716C]">{post.readTime} · {new Date(post.date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
    </Link>
  )
}
