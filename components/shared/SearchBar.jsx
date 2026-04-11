'use client'

import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" size={18} />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent text-sm"
      />
    </div>
  )
}
