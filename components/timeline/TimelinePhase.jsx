'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TimelineCard from './TimelineCard'
import ProgressBar from './ProgressBar'

export default function TimelinePhase({ phase, completedIds, onToggle, selectedCity }) {
  const [collapsed, setCollapsed] = useState(false)
  const completedCount = phase.items.filter(item => completedIds.has(item.id)).length

  return (
    <div className="mb-8">
      {/* Phase header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#F5F5F4] hover:bg-gray-100 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-[#1C1917]">{phase.title}</h2>
            <span className="text-xs text-[#78716C] bg-white px-2 py-0.5 rounded-full border border-gray-200">
              {phase.subtitle}
            </span>
            <span className="text-xs text-[#0F766E] font-medium">
              {completedCount}/{phase.items.length} done
            </span>
          </div>
          <p className="text-sm text-[#78716C] mt-1">{phase.description}</p>
          <ProgressBar value={completedCount} max={phase.items.length} size="sm" className="mt-2 max-w-xs" />
        </div>
        <div className="text-[#78716C] flex-shrink-0">
          {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </button>

      {/* Items */}
      {!collapsed && (
        <div className="mt-3 ml-4 pl-4 border-l-2 border-dashed border-gray-200 space-y-3">
          {phase.items.map(item => (
            <TimelineCard
              key={item.id}
              item={item}
              completed={completedIds.has(item.id)}
              onToggle={onToggle}
              selectedCity={selectedCity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
