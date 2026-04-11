'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

export default function JournalEntry({ entry, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const date = new Date(entry.created_at).toLocaleDateString('en-AU', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#78716C] mb-0.5">{date}</p>
          {entry.prompt && (
            <p className="text-xs text-[#78716C] italic mb-1 line-clamp-1">"{entry.prompt}"</p>
          )}
          <p className="text-sm text-[#1C1917] line-clamp-2 leading-relaxed">
            {expanded ? entry.content : entry.content.slice(0, 100) + (entry.content.length > 100 ? '...' : '')}
          </p>
        </div>
        <div className="text-[#78716C] flex-shrink-0 mt-0.5">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-sm text-[#1C1917] leading-relaxed mt-3 whitespace-pre-wrap">{entry.content}</p>
          <div className="flex justify-end mt-4">
            {confirmDelete ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#78716C]">Delete this entry?</span>
                <button onClick={() => onDelete(entry.id)} className="text-[#DC2626] font-medium hover:underline">Yes, delete</button>
                <button onClick={() => setConfirmDelete(false)} className="text-[#78716C] hover:underline">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1 text-xs text-[#78716C] hover:text-[#DC2626]"
              >
                <Trash2 size={13} />
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
