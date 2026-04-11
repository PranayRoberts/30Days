'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

export default function JournalEditor({ onSave, activePrompt }) {
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) return
    setSaving(true)
    try {
      await onSave({ content, prompt: activePrompt })
      setContent('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-[#78716C]">{today}</p>
        {saved && (
          <div className="flex items-center gap-1 text-xs text-[#16A34A] font-medium">
            <CheckCircle size={13} />
            Saved!
          </div>
        )}
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={activePrompt ? `Reflect on: ${activePrompt}` : 'Start writing... what happened today?'}
        rows={6}
        className="w-full text-sm text-[#1C1917] leading-relaxed resize-none focus:outline-none placeholder-[#78716C]/60"
        style={{ minHeight: '160px' }}
      />
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-[#78716C]">{content.length} characters</p>
        <button
          onClick={handleSave}
          disabled={!content.trim() || saving}
          className="px-5 py-2 rounded-lg bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0a5c56] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Entry'}
        </button>
      </div>
    </div>
  )
}
