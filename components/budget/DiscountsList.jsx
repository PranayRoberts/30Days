import { ExternalLink } from 'lucide-react'

export default function DiscountsList({ discounts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {discounts.map(discount => (
        <div key={discount.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          {/* Orange header with savings info */}
          <div className="bg-amber-50 border-b border-amber-200 p-3 min-h-[50px]">
            <p className="text-xs text-amber-700 font-medium line-clamp-2">{discount.savings}</p>
          </div>
          
          {/* Content area */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-[#1C1917] text-sm mb-2">{discount.name}</h3>
            <p className="text-xs text-[#78716C] mb-3 leading-relaxed line-clamp-3 flex-1">{discount.description}</p>
            {discount.url && (
              <a
                href={discount.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#0F766E] font-medium hover:underline mt-auto"
              >
                Learn more <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
