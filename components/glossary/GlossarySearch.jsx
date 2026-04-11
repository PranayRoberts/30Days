'use client'

import SearchBar from '@/components/shared/SearchBar'

const CATEGORIES = ['All', 'Slang', 'Government', 'University', 'Housing', 'Transport']

export default function GlossarySearch({ query, onQuery, activeCategory, onCategory }) {
  return (
    <div className="space-y-4 mb-6">
      <SearchBar
        value={query}
        onChange={onQuery}
        placeholder="Search terms, e.g. TFN, arvo, bond..."
      />
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
              activeCategory === cat
                ? 'bg-[#0F766E] text-white'
                : 'bg-gray-100 text-[#78716C] hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
