'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import postsData from '@/data/posts.json'
import BlogCard from '@/components/blog/BlogCard'
import TagFilter from '@/components/blog/TagFilter'
import TranslateButton from '@/components/shared/TranslateButton'

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? postsData
    : postsData.filter(post => post.tags?.includes(activeTag))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-[#0F766E]" />
            <h1 className="text-2xl font-bold text-[#1C1917]">Tips &amp; Stories</h1>
          </div>
          <TranslateButton />
        </div>
        <p className="text-[#78716C]">Real advice from students who've been there.</p>
      </div>

      {/* Tag filter */}
      <div className="mb-6">
        <TagFilter activeTag={activeTag} onSelect={setActiveTag} />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#78716C]">No posts found for this tag.</p>
        </div>
      )}
    </div>
  )
}
