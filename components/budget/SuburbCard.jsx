export default function SuburbCard({ suburb, cityAvgRent }) {
  const diff = suburb.rent_weekly - cityAvgRent
  const indicator = diff > 50 ? 'red' : diff < -30 ? 'green' : 'amber'
  const labels = { red: '💸 Above average', green: '✅ Great value', amber: '⚖️ Average' }
  const colors = {
    red: 'border-red-200 bg-red-50',
    green: 'border-green-200 bg-green-50',
    amber: 'border-amber-200 bg-amber-50',
  }

  return (
    <div className={`rounded-xl border p-4 min-w-[200px] ${colors[indicator]}`}>
      <p className="font-semibold text-[#1C1917] text-base mb-1">{suburb.name}</p>
      <p className="text-2xl font-bold text-[#1C1917] mb-1">${suburb.rent_weekly}<span className="text-sm font-normal text-[#78716C]">/wk</span></p>
      <span className="text-xs font-medium">{labels[indicator]}</span>
      {suburb.transport_weekly !== undefined && (
        <p className="text-xs text-[#78716C] mt-1.5">🚌 Transport: ${suburb.transport_weekly}/wk</p>
      )}
      <p className="text-xs text-[#78716C] mt-1 italic">{suburb.vibe}</p>
      <p className="text-xs text-[#1C1917] mt-1.5 font-medium">Best for: <span className="font-normal text-[#78716C]">{suburb.best_for}</span></p>
    </div>
  )
}
