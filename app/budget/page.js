'use client'

import { useState } from 'react'
import { Wallet } from 'lucide-react'
import costsData from '@/data/costs.json'
import discountsData from '@/data/discounts.json'
import CostOverview from '@/components/budget/CostOverview'
import SuburbCard from '@/components/budget/SuburbCard'
import BudgetCalculator from '@/components/budget/BudgetCalculator'
import DiscountsList from '@/components/budget/DiscountsList'

export default function BudgetPage() {
  const cityNames = costsData.cities.map(c => c.name)
  const [selectedCity, setSelectedCity] = useState(costsData.cities[0].name)

  const city = costsData.cities.find(c => c.name === selectedCity) || costsData.cities[0]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Wallet size={24} className="text-[#0F766E]" />
          <h1 className="text-2xl font-bold text-[#1C1917]">What does life actually cost?</h1>
        </div>
        <p className="text-[#78716C]">A realistic look at weekly expenses for students in Australia.</p>
      </div>

      {/* City selector */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-[#1C1917] whitespace-nowrap">Your city:</label>
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className="flex-1 max-w-xs px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
        >
          {cityNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Cost overview */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-[#1C1917] mb-4">Estimated weekly costs — {selectedCity}</h2>
        <CostOverview averages={city.averages} />
      </div>

      {/* Suburb comparison */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-[#1C1917] mb-2">Compare suburbs</h2>
        <p className="text-sm text-[#78716C] mb-4">Weekly rent and transport costs by suburb in {selectedCity}.</p>
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-3 min-w-max pb-2">
            {city.suburbs.map(suburb => (
              <SuburbCard key={suburb.name} suburb={suburb} cityAvgRent={city.averages.rent_weekly} />
            ))}
          </div>
        </div>
      </div>

      {/* Budget calculator */}
      <div className="mb-8">
        <BudgetCalculator cityAverages={city.averages} />
      </div>

      {/* Student discounts */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-[#1C1917] mb-2">Student discounts & free services</h2>
        <p className="text-sm text-[#78716C] mb-4">Save money with these student perks available across Australia.</p>
        <DiscountsList discounts={discountsData} />
      </div>

      {/* Source attribution */}
      <div className="text-xs text-[#78716C] text-center border-t border-gray-100 pt-4">
        Cost data based on averages as of early 2026. Sources:{' '}
        <a href="https://www.domain.com.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0F766E]">Domain.com.au</a>,{' '}
        <a href="https://www.numbeo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0F766E]">Numbeo</a>, student surveys.
        <br />
        {city.source && <span className="mt-1 block">{city.source}</span>}
      </div>
    </div>
  )
}
