'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Loader2 } from 'lucide-react'
import universitiesData from '@/data/universities.json'
import { getSupabaseClient } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useUserPreferences } from '@/context/UserPreferencesContext'

const COUNTRIES = [
  'China', 'India', 'Nepal', 'Colombia', 'Brazil', 'Vietnam', 'Philippines', 'Indonesia',
  'Malaysia', 'Thailand', 'South Korea', 'Japan', 'Bangladesh', 'Sri Lanka', 'Pakistan',
  'Saudi Arabia', 'UAE', 'Nigeria', 'Kenya', 'South Africa', 'Iran', 'Mexico', 'Germany',
  'France', 'Italy', 'Spain', 'United Kingdom', 'United States', 'Canada', 'Other'
]

const CITIES = ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth', 'Canberra', 'Hobart', 'Darwin', 'Gold Coast', 'Other']

export default function OnboardingWizard() {
  const router = useRouter()
  const { user } = useAuth()
  const { updatePrefs } = useUserPreferences()

  const [step, setStep] = useState(1)
  const [university, setUniversity] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [uniSearch, setUniSearch] = useState('')
  const [saving, setSaving] = useState(false)

  const filteredUnis = universitiesData.filter(u =>
    u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
    u.city.toLowerCase().includes(uniSearch.toLowerCase())
  )

  const saveAndContinue = async () => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Save preferences
    setSaving(true)
    const prefs = { university, countryOfOrigin: country, city: city.toLowerCase() }
    updatePrefs(prefs)

    if (user) {
      try {
        const supabase = getSupabaseClient()
        await supabase.from('user_profiles').upsert({
          id: user.id,
          university,
          country_of_origin: country,
          city: city.toLowerCase(),
          preferred_language: 'en',
        })
      } catch (err) {
        console.error('Profile save failed:', err)
      }
    }

    setSaving(false)
    router.push('/timeline')
  }

  const skip = () => {
    if (step < 3) setStep(step + 1)
    else router.push('/timeline')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              s === step ? 'bg-[#0F766E] w-6' : s < step ? 'bg-[#0F766E]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: University */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-[#1C1917] mb-2">Welcome! Let's personalise your experience.</h2>
          <p className="text-[#78716C] mb-6">Which university are you attending?</p>
          <input
            type="text"
            value={uniSearch}
            onChange={e => setUniSearch(e.target.value)}
            placeholder="Search universities..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white">
            {filteredUnis.map(uni => (
              <button
                key={uni.id}
                onClick={() => { setUniversity(uni.name); setUniSearch(uni.name) }}
                className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-0 hover:bg-teal-50 ${
                  university === uni.name ? 'bg-teal-50 text-[#0F766E] font-medium' : 'text-[#1C1917]'
                }`}
              >
                <span className="font-medium">{uni.name}</span>
                <span className="text-[#78716C] ml-2 text-xs">{uni.city}, {uni.state}</span>
              </button>
            ))}
            {filteredUnis.length === 0 && (
              <div className="px-4 py-3 text-sm text-[#78716C]">No results. Try a different search.</div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Country */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-[#1C1917] mb-2">Where are you from?</h2>
          <p className="text-[#78716C] mb-6">Select your country of origin.</p>
          <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white">
            {COUNTRIES.map(c => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-0 hover:bg-teal-50 ${
                  country === c ? 'bg-teal-50 text-[#0F766E] font-medium' : 'text-[#1C1917]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: City */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-[#1C1917] mb-2">What city are you in?</h2>
          <p className="text-[#78716C] mb-6">We'll show you city-specific information on the timeline and budget pages.</p>
          <div className="grid grid-cols-2 gap-2">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                  city === c
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-white text-[#1C1917] border-gray-200 hover:border-[#0F766E]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={skip}
          className="px-4 py-2.5 text-sm text-[#78716C] hover:text-[#1C1917]"
        >
          Skip
        </button>
        <button
          onClick={saveAndContinue}
          disabled={saving}
          className="flex-1 py-3.5 rounded-lg bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0a5c56] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saving...</>
          ) : (
            <>{step === 3 ? 'Get started!' : 'Next'} <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  )
}
