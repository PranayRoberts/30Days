export default function ProgressBar({ value, max, label, size = 'md', className = '' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3' }

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-[#78716C]">{label}</span>
          <span className="text-sm font-semibold text-[#0F766E]">{pct}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className="bg-[#0F766E] rounded-full progress-animate h-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
