'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import resourcesData from '@/data/resources.json'
import CategoryCard from '@/components/resources/CategoryCard'
import SearchBar from '@/components/shared/SearchBar'
import TranslateButton from '@/components/shared/TranslateButton'

export default function ResourcesPage() {
  const [query, setQuery] = useState('')

  const filtered = query
    ? resourcesData.categories.filter(cat =>
        cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.resources.some(r =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.summary.toLowerCase().includes(query.toLowerCase())
        )
      )
    : resourcesData.categories

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <BookOpen size={24} className="text-[#0F766E]" />
            <h1 className="text-2xl font-bold text-[#1C1917]">Resource Hub</h1>
          </div>
          <TranslateButton />
        </div>
        <p className="text-[#78716C]">Everything you need, in one place.</p>
      </div>

      {/* Search */}
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search resources..."
        className="mb-8"
      />

      {/* Category grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#78716C]">No resources found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
