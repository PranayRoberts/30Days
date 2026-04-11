import { ExternalLink } from 'lucide-react'

export default function DiscountsList({ discounts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {discounts.map(discount => (
        <div key={discount.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-[#1C1917] text-sm">{discount.name}</h3>
            <span className="text-xs bg-[#FBBF24]/20 text-amber-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
              {discount.savings}
            </span>
          </div>
          <p className="text-xs text-[#78716C] mb-3 leading-relaxed">{discount.description}</p>
          {discount.url && (
            <a
              href={discount.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#0F766E] font-medium hover:underline"
            >
              Learn more <ExternalLink size={10} />
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
