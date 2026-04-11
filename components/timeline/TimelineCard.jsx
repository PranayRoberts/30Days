'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Check, ExternalLink, AlertTriangle } from 'lucide-react'
import TagPill from '@/components/shared/TagPill'

const categoryColors = {
  Setup: 'bg-blue-500',
  Finance: 'bg-green-500',
  Transport: 'bg-purple-500',
  Health: 'bg-red-500',
  Housing: 'bg-orange-500',
  University: 'bg-teal-500',
  Work: 'bg-amber-500',
  Social: 'bg-pink-500',
  default: 'bg-gray-400',
}

export default function TimelineCard({ item, completed, onToggle, selectedCity }) {
  const [expanded, setExpanded] = useState(false)
  const [toggling, setToggling] = useState(false)

  const dotColor = categoryColors[item.category] || categoryColors.default
  const stateNote = selectedCity && item.stateNotes
    ? Object.entries(item.stateNotes).find(([state]) =>
        selectedCity.toLowerCase().includes(state.toLowerCase())
      )?.[1]
    : null

  const handleToggle = async () => {
    if (toggling) return
    setToggling(true)
    await onToggle(item.id, !completed)
    setToggling(false)
  }

  return (
    <div className={`relative bg-white rounded-xl border transition-all ${
      completed ? 'border-[#0F766E]/30 bg-teal-50/30' : 'border-gray-100 shadow-sm hover:shadow-md'
    }`}>
      {/* Card header */}
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          aria-label={completed ? 'Mark as not done' : 'Mark as done'}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
            completed
              ? 'bg-[#0F766E] border-[#0F766E] text-white'
              : 'border-gray-300 hover:border-[#0F766E]'
          } ${toggling ? 'opacity-50' : ''}`}
        >
          {completed && <Check size={12} strokeWidth={3} className="check-animate" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
            <span className="text-xs text-[#78716C] font-medium">Day {item.day}</span>
            <TagPill label={item.category} />
          </div>
          <h3 className={`font-semibold text-base leading-tight ${completed ? 'text-[#78716C] line-through' : 'text-[#1C1917]'}`}>
            {item.title}
          </h3>
          {!expanded && (
            <p className="text-sm text-[#78716C] mt-1 leading-relaxed">{item.summary}</p>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-[#78716C]"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 mt-1">
          {/* State note */}
          {stateNote && (
            <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800">
              <span className="font-medium">📍 Local tip: </span>{stateNote}
            </div>
          )}

          {/* Guide text */}
          <div className="mt-4 text-sm text-[#1C1917] leading-relaxed space-y-2">
            {item.guide.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Tips */}
          {item.tips?.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} className="text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Tips</span>
              </div>
              <ul className="space-y-1">
                {item.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-amber-800 flex gap-2">
                    <span className="text-amber-500 flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {item.links?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-medium hover:bg-[#0a5c56]"
                >
                  {link.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          )}

          {/* Mark done button */}
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`mt-4 w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
              completed
                ? 'bg-gray-100 text-[#78716C] hover:bg-gray-200'
                : 'bg-[#0F766E] text-white hover:bg-[#0a5c56]'
            }`}
          >
            {toggling ? 'Saving...' : completed ? '✓ Done! Tap to undo' : 'Mark as done'}
          </button>
        </div>
      )}
    </div>
  )
}
