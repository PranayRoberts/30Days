'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Star } from 'lucide-react'
import TagPill from '@/components/shared/TagPill'
import WarningCallout from './WarningCallout'

export default function ResourceCard({ resource }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all ${
      resource.essential ? 'border-[#FBBF24]/40' : 'border-gray-100'
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-5 text-left"
      >
        {resource.essential && (
          <Star size={16} className="text-[#FBBF24] fill-[#FBBF24] flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {resource.tags?.map(tag => <TagPill key={tag} label={tag} />)}
              </div>
              <h3 className="font-semibold text-[#1C1917] text-base leading-snug">{resource.title}</h3>
              <p className="text-sm text-[#78716C] mt-1">{resource.summary}</p>
            </div>
            <div className="text-[#78716C] flex-shrink-0 mt-1">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {/* Content */}
          <div className="mt-4 text-sm text-[#1C1917] leading-relaxed space-y-3">
            {resource.content?.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Warnings */}
          {resource.warnings?.length > 0 && (
            <div className="mt-4 space-y-2">
              {resource.warnings.map((warning, i) => (
                <WarningCallout key={i} type="warning">{warning}</WarningCallout>
              ))}
            </div>
          )}

          {/* Links */}
          {resource.links?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.links.map((link, i) => (
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
        </div>
      )}
    </div>
  )
}
