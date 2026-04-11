'use client'

import { useState, useEffect, useCallback } from 'react'
import { BookMarked, PenLine } from 'lucide-react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DailyPrompt from '@/components/journal/DailyPrompt'
import JournalEditor from '@/components/journal/JournalEditor'
import JournalEntry from '@/components/journal/JournalEntry'
import EmptyState from '@/components/shared/EmptyState'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { getSupabaseClient } from '@/lib/supabase'

function JournalContent() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [activePrompt, setActivePrompt] = useState('')
  const editorRef = { current: null }

  const loadEntries = useCallback(async () => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (!error && data) setEntries(data)
    } catch {}
    setLoading(false)
  }, [user])

  useEffect(() => { loadEntries() }, [loadEntries])

  const handleSave = async ({ content, prompt }) => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({ user_id: user.id, content, prompt: prompt || null })
      .select()
      .single()
    if (!error && data) {
      setEntries(prev => [data, ...prev])
    }
  }

  const handleDelete = async (id) => {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
    if (!error) {
      setEntries(prev => prev.filter(e => e.id !== id))
    }
  }

  const usePrompt = (prompt) => {
    setActivePrompt(prompt)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BookMarked size={24} className="text-[#0F766E]" />
        <h1 className="text-2xl font-bold text-[#1C1917]">My Journal</h1>
      </div>

      {/* Daily prompt */}
      <DailyPrompt onUse={usePrompt} />

      {/* Editor */}
      <JournalEditor onSave={handleSave} activePrompt={activePrompt} />

      {/* Past entries */}
      <div>
        <h2 className="text-base font-semibold text-[#1C1917] mb-3">Past entries</h2>
        {loading ? (
          <LoadingSpinner className="py-8" />
        ) : entries.length === 0 ? (
          <EmptyState
            icon={PenLine}
            title="No entries yet"
            description="Your journey starts with one reflection. Write your first entry above."
          />
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <JournalEntry key={entry.id} entry={entry} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function JournalPage() {
  return (
    <ProtectedRoute>
      <JournalContent />
    </ProtectedRoute>
  )
}
