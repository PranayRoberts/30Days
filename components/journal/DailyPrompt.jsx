'use client'

import { useState } from 'react'
import { RefreshCw, Sparkles } from 'lucide-react'
import promptsData from '@/data/prompts.json'

function getTodayPrompt() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return promptsData[dayOfYear % promptsData.length]
}

export default function DailyPrompt({ onUse }) {
  const [promptIndex, setPromptIndex] = useState(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    return dayOfYear % promptsData.length
  })

  const prompt = promptsData[promptIndex]

  const cyclePrompt = () => {
    setPromptIndex(i => (i + 1) % promptsData.length)
  }

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Today's prompt</span>
        </div>
        <button
          onClick={cyclePrompt}
          className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
          aria-label="New prompt"
        >
          <RefreshCw size={12} />
          New prompt
        </button>
      </div>
      <p className="text-[#1C1917] italic leading-relaxed mb-3">"{prompt?.prompt}"</p>
      {onUse && (
        <button
          onClick={() => onUse(prompt?.prompt)}
          className="text-xs text-amber-700 font-medium underline hover:no-underline"
        >
          Use this prompt →
        </button>
      )}
    </div>
  )
}
