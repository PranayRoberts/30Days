const costItems = [
  { key: 'rent_weekly', label: 'Rent', emoji: '🏠' },
  { key: 'groceries_weekly', label: 'Groceries', emoji: '🛒' },
  { key: 'transport_weekly', label: 'Transport', emoji: '🚌' },
  { key: 'utilities_weekly', label: 'Utilities', emoji: '💡' },
  { key: 'phone_weekly', label: 'Phone', emoji: '📱' },
  { key: 'entertainment_weekly', label: 'Fun', emoji: '🎉' },
]

export default function CostOverview({ averages }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-3 min-w-max pb-2">
        {costItems.map(({ key, label, emoji }) => (
          <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 min-w-[120px]">
            <div className="text-2xl mb-2">{emoji}</div>
            <p className="text-xs text-[#78716C] mb-1">{label}</p>
            <p className="text-xl font-bold text-[#1C1917]">${averages[key]}</p>
            <p className="text-xs text-[#78716C]">/week</p>
          </div>
        ))}
        {/* Total card */}
        <div className="bg-[#0F766E] rounded-xl p-4 min-w-[140px] text-white border-2 border-[#0F766E]">
          <div className="text-2xl mb-2">💰</div>
          <p className="text-xs text-teal-100 mb-1">Total estimated</p>
          <p className="text-2xl font-bold">${averages.total_weekly}</p>
          <p className="text-xs text-teal-100">/week</p>
        </div>
      </div>
    </div>
  )
}
