'use client'

import { useState, useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import glossaryData from '@/data/glossary.json'
import GlossarySearch from '@/components/glossary/GlossarySearch'
import GlossaryItem from '@/components/glossary/GlossaryItem'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return glossaryData.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesQuery = !query || (
        item.term.toLowerCase().includes(query.toLowerCase()) ||
        item.definition.toLowerCase().includes(query.toLowerCase())
      )
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  // Group alphabetically
  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(item => {
      const letter = item.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(item)
    })
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={24} className="text-[#0F766E]" />
        <h1 className="text-2xl font-bold text-[#1C1917]">Aussie Glossary</h1>
      </div>
      <p className="text-[#78716C] mb-6">All the words and acronyms you'll need — from slang to government jargon.</p>

      {/* Search + filter */}
      <GlossarySearch
        query={query}
        onQuery={setQuery}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
      />

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#78716C]">No terms found for "{query}". Try a different search.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, items]) => (
            <div key={letter}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-black text-[#0F766E]">{letter}</span>
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-[#78716C]">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <GlossaryItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Term count */}
      <p className="text-center text-xs text-[#78716C] mt-8">
        {filtered.length} of {glossaryData.length} terms
      </p>
    </div>
  )
}
