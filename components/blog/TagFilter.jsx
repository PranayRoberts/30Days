'use client'

const tags = ['All', 'Culture', 'Housing', 'Food', 'Academic', 'Social', 'Money', 'Work']

export default function TagFilter({ activeTag, onSelect }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 pb-1">
      <div className="flex gap-2 min-w-max">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTag === tag
                ? 'bg-[#0F766E] text-white'
                : 'bg-gray-100 text-[#78716C] hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
