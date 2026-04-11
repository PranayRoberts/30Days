'use client'

import { useState } from 'react'
import { PhoneCall, Info } from 'lucide-react'
import emergencyData from '@/data/emergency.json'
import EmergencyCard from '@/components/emergency/EmergencyCard'

const STATE_LABELS = {
  vic: 'Victoria',
  nsw: 'New South Wales',
  qld: 'Queensland',
  sa: 'South Australia',
  wa: 'Western Australia',
  act: 'ACT',
  tas: 'Tasmania',
  nt: 'Northern Territory',
}

export default function EmergencyPage() {
  const [selectedState, setSelectedState] = useState('vic')
  const stateData = emergencyData.states?.[selectedState]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <PhoneCall size={24} className="text-[#DC2626]" />
        <h1 className="text-2xl font-bold text-[#1C1917]">Emergency Contacts</h1>
      </div>
      <p className="text-[#78716C] mb-2">Important numbers and services — save this page.</p>

      {/* Save reminder */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100 mb-6">
        <Info size={14} className="text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-700">
          <strong>Tip:</strong> Screenshot this page or save it to your phone now — so you have it when you need it most.
        </p>
      </div>

      {/* Critical contacts */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[#DC2626] uppercase tracking-wide mb-3">Critical numbers — memorise these</h2>
        <div className="space-y-3">
          {emergencyData.critical?.map((contact, i) => (
            <EmergencyCard key={i} contact={contact} variant="critical" />
          ))}
        </div>
      </div>

      {/* State selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1C1917] mb-2">Your state or territory</label>
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
        >
          {Object.entries(STATE_LABELS).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      {/* State-specific contacts */}
      {stateData && (
        <div className="mb-8 space-y-3">
          <h2 className="text-base font-semibold text-[#1C1917] mb-3">
            State services — {STATE_LABELS[selectedState]}
          </h2>

          {stateData.police_non_emergency && (
            <EmergencyCard contact={{
              name: 'Police (non-emergency)',
              number: stateData.police_non_emergency,
              description: 'For non-urgent police matters. Do NOT use for emergencies — call 000.',
            }} />
          )}

          {stateData.legal_aid && (
            <EmergencyCard contact={{
              name: stateData.legal_aid.name,
              number: stateData.legal_aid.number,
              description: 'Free legal advice for people who can\'t afford a lawyer.',
              url: stateData.legal_aid.url,
            }} />
          )}

          {stateData.consumer_affairs && (
            <EmergencyCard contact={{
              name: stateData.consumer_affairs.name,
              number: stateData.consumer_affairs.number,
              description: stateData.consumer_affairs.description,
              url: stateData.consumer_affairs.url,
            }} />
          )}

          {stateData.uni_counselling && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
              <p className="text-sm font-semibold text-[#1C1917] mb-1">🎓 University Counselling</p>
              <p className="text-sm text-[#78716C]">{stateData.uni_counselling}</p>
            </div>
          )}
        </div>
      )}

      {/* General services */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-[#1C1917] mb-3">General services</h2>
        <div className="space-y-3">
          {emergencyData.general?.map((contact, i) => (
            <EmergencyCard key={i} contact={contact} />
          ))}
        </div>
      </div>

      {/* Embassy note */}
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-sm font-semibold text-[#1C1917] mb-1">🏛️ Your country's embassy or consulate</p>
        <p className="text-sm text-[#78716C]">
          If you have a serious legal issue, lose your passport, or need emergency assistance from your home government,
          contact your country's embassy or consulate in Australia.
        </p>
        <a
          href="https://protocol.dfat.gov.au/Public/MissionsInAustralia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#0F766E] font-medium mt-2 hover:underline"
        >
          Find your embassy in Australia →
        </a>
      </div>
    </div>
  )
}
