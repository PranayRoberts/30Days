'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const UserPreferencesContext = createContext(null)

const DEFAULT_PREFS = {
  city: 'melbourne',
  university: '',
  countryOfOrigin: '',
  preferredLanguage: 'en',
}

export function UserPreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userPreferences')
      if (stored) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) })
    } catch {}
  }, [])

  const updatePrefs = (updates) => {
    setPrefs(prev => {
      const next = { ...prev, ...updates }
      try {
        localStorage.setItem('userPreferences', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  return (
    <UserPreferencesContext.Provider value={{ prefs, updatePrefs }}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

const DEFAULT_CTX = { prefs: DEFAULT_PREFS, updatePrefs: () => {} }

export function useUserPreferences() {
  const ctx = useContext(UserPreferencesContext)
  return ctx ?? DEFAULT_CTX
}
