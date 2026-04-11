import TagPill from '@/components/shared/TagPill'

export default function GlossaryItem({ item }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-[#1C1917]">{item.term}</h3>
        <TagPill label={item.category} className="flex-shrink-0" />
      </div>
      <p className="text-sm text-[#1C1917] leading-relaxed mb-2">{item.definition}</p>
      {item.example && (
        <p className="text-sm text-[#78716C] italic">
          e.g. {item.example}
        </p>
      )}
    </div>
  )
}
