'use client'

import { useState, useEffect, useCallback } from 'react'
import { CalendarCheck, Info } from 'lucide-react'
import timelineData from '@/data/timeline.json'
import TimelinePhase from '@/components/timeline/TimelinePhase'
import ProgressBar from '@/components/timeline/ProgressBar'
import TranslateButton from '@/components/shared/TranslateButton'
import { useAuth } from '@/context/AuthContext'
import { useUserPreferences } from '@/context/UserPreferencesContext'
import { getSupabaseClient } from '@/lib/supabase'

const CITIES = ['All Australia', 'Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth', 'Canberra', 'Hobart', 'Darwin']
const LS_KEY = 'timeline_progress'

const allItems = timelineData.phases.flatMap(p => p.items)
const totalItems = allItems.length

export default function TimelinePage() {
  const { user } = useAuth()
  const { prefs, updatePrefs } = useUserPreferences()
  const [completedIds, setCompletedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  const selectedCity = prefs.city || 'All Australia'

  // Load progress from Supabase or localStorage
  useEffect(() => {
    async function loadProgress() {
      if (user) {
        try {
          const supabase = getSupabaseClient()
          const { data } = await supabase
            .from('checklist_progress')
            .select('item_id, completed')
            .eq('user_id', user.id)
            .eq('completed', true)
          if (data) {
            setCompletedIds(new Set(data.map(r => r.item_id)))
          }
        } catch {
          // Fall back to localStorage
          loadFromLocalStorage()
        }
      } else {
        loadFromLocalStorage()
      }
      setLoading(false)
    }

    function loadFromLocalStorage() {
      try {
        const stored = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
        setCompletedIds(new Set(stored))
      } catch {}
    }

    loadProgress()
  }, [user])

  const handleToggle = useCallback(async (itemId, newCompleted) => {
    // Optimistic update
    setCompletedIds(prev => {
      const next = new Set(prev)
      if (newCompleted) next.add(itemId)
      else next.delete(itemId)
      // Save to localStorage always as backup
      try {
        localStorage.setItem(LS_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })

    // Sync to Supabase if logged in
    if (user) {
      setSyncing(true)
      try {
        const supabase = getSupabaseClient()
        await supabase.from('checklist_progress').upsert({
          user_id: user.id,
          item_id: itemId,
          completed: newCompleted,
          completed_at: newCompleted ? new Date().toISOString() : null,
        }, { onConflict: 'user_id,item_id' })
      } catch (err) {
        console.error('Sync failed:', err)
      } finally {
        setSyncing(false)
      }
    }
  }, [user])

  const completedCount = completedIds.size

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <CalendarCheck size={24} className="text-[#0F766E]" />
            <h1 className="text-2xl font-bold text-[#1C1917]">Your 30-Day Plan</h1>
          </div>
          <TranslateButton />
        </div>
        <p className="text-sm text-[#78716C]">
          Tick off tasks as you go — your progress saves automatically.
        </p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-[#1C1917]">Overall Progress</p>
          <p className="text-sm text-[#78716C]">{completedCount} of {totalItems} complete</p>
        </div>
        <ProgressBar value={completedCount} max={totalItems} size="lg" />
        {syncing && <p className="text-xs text-[#78716C] mt-2">Syncing...</p>}
        {!user && (
          <div className="flex items-start gap-2 mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
            <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Your progress is saved locally.{' '}
              <a href="/auth/signup" className="underline font-medium">Sign in</a> to sync across devices.
            </p>
          </div>
        )}
      </div>

      {/* City selector */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-[#1C1917] whitespace-nowrap">Your city:</label>
        <select
          value={selectedCity}
          onChange={e => updatePrefs({ city: e.target.value })}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
        >
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Phases */}
      {timelineData.phases.map(phase => (
        <TimelinePhase
          key={phase.id}
          phase={phase}
          completedIds={completedIds}
          onToggle={handleToggle}
          selectedCity={selectedCity}
        />
      ))}

      {/* Completion message */}
      {completedCount === totalItems && totalItems > 0 && (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-[#1C1917] mb-2">You've completed your 30-day plan!</h3>
          <p className="text-[#78716C]">You've got this. Welcome to Australia! 🦘</p>
        </div>
      )}
    </div>
  )
}
