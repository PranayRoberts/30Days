export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[#F5F5F4] flex items-center justify-center mb-4">
          <Icon size={28} className="text-[#78716C]" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#1C1917] mb-2">{title}</h3>
      {description && <p className="text-[#78716C] text-sm max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  )
}
