import { Phone, ExternalLink } from 'lucide-react'

export default function EmergencyCard({ contact, variant = 'default' }) {
  const isCritical = variant === 'critical'

  return (
    <div className={`rounded-xl border p-4 flex items-start gap-4 ${
      isCritical
        ? 'bg-red-50 border-red-200'
        : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isCritical ? 'bg-red-100' : 'bg-teal-50'
      }`}>
        <Phone size={18} className={isCritical ? 'text-[#DC2626]' : 'text-[#0F766E]'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#1C1917] text-sm">{contact.name}</p>
        <a
          href={`tel:${contact.number?.replace(/\s/g, '')}`}
          className={`text-xl font-bold tracking-wide block mt-0.5 hover:underline ${
            isCritical ? 'text-[#DC2626]' : 'text-[#0F766E]'
          }`}
        >
          {contact.number}
        </a>
        {contact.description && (
          <p className="text-xs text-[#78716C] mt-1 leading-relaxed">{contact.description}</p>
        )}
        {contact.available && (
          <p className="text-xs text-[#16A34A] font-medium mt-1">{contact.available}</p>
        )}
        {contact.url && (
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#0F766E] mt-1.5 hover:underline font-medium"
          >
            Website <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  )
}
