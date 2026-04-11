'use client'

import { useState } from 'react'

export default function BudgetCalculator({ cityAverages }) {
  const [rent, setRent] = useState('')
  const [income, setIncome] = useState('')

  const rentNum = parseFloat(rent) || 0
  const incomeNum = parseFloat(income) || 0
  const otherCosts = (cityAverages.total_weekly || 545) - (cityAverages.rent_weekly || 350)
  const totalExpenses = rentNum + otherCosts
  const remaining = incomeNum - totalExpenses
  const hasValues = rentNum > 0 || incomeNum > 0

  let status = 'neutral'
  if (incomeNum > 0) {
    if (remaining >= 100) status = 'green'
    else if (remaining >= 0) status = 'amber'
    else status = 'red'
  }

  const statusConfig = {
    green: { label: 'Looking good! 🎉', bg: 'bg-green-50 border-green-200', text: 'text-green-800' },
    amber: { label: "It'll be tight — check out our savings tips below.", bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
    red: { label: 'This might be tough. Consider a more affordable suburb or share house.', bg: 'bg-red-50 border-red-200', text: 'text-red-800' },
    neutral: { label: '', bg: '', text: '' },
  }

  const totalPct = incomeNum > 0 ? Math.min(100, (totalExpenses / incomeNum) * 100) : 0
  const rentPct = incomeNum > 0 ? Math.min(100, (rentNum / incomeNum) * 100) : 0

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-bold text-[#1C1917] mb-1">Budget Calculator</h2>
      <p className="text-sm text-[#78716C] mb-6">Plug in your numbers to see if it adds up.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#1C1917] mb-1.5">
            Your weekly rent ($)
          </label>
          <input
            type="number"
            value={rent}
            onChange={e => setRent(e.target.value)}
            placeholder={`e.g. ${cityAverages.rent_weekly || 350}`}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1917] mb-1.5">
            Your weekly income ($)
          </label>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(e.target.value)}
            placeholder="e.g. 400"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
        </div>
      </div>

      {hasValues && (
        <>
          {/* Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#78716C] mb-1.5">
              <span>Expenses vs income</span>
              {incomeNum > 0 && <span>{Math.round(totalPct)}% of income</span>}
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="bg-[#0F766E] h-full rounded-l-full" style={{ width: `${Math.min(100, rentPct)}%` }} title="Rent" />
              <div className="bg-amber-400 h-full" style={{ width: `${Math.min(100 - rentPct, totalPct - rentPct)}%` }} title="Other costs" />
            </div>
            <div className="flex gap-4 mt-1.5 text-xs text-[#78716C]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#0F766E]" />Rent</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />Other costs</span>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[#78716C]">Rent</p>
              <p className="font-bold text-[#1C1917]">${rentNum}/wk</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-[#78716C]">Other costs</p>
              <p className="font-bold text-[#1C1917]">${otherCosts}/wk</p>
            </div>
            <div className={`rounded-lg p-3 ${remaining >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-xs text-[#78716C]">Left over</p>
              <p className={`font-bold ${remaining >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                ${Math.round(remaining)}/wk
              </p>
            </div>
          </div>

          {/* Status message */}
          {status !== 'neutral' && (
            <div className={`p-3 rounded-lg border ${statusConfig[status].bg}`}>
              <p className={`text-sm font-medium ${statusConfig[status].text}`}>
                {statusConfig[status].label}
              </p>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-[#78716C] mt-4">
        These are estimates based on city averages. Your actual spending may vary.
      </p>
    </div>
  )
}
