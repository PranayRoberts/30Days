const tagColors = {
  Housing: 'bg-blue-100 text-blue-700',
  Banking: 'bg-green-100 text-green-700',
  Money: 'bg-green-100 text-green-700',
  Transport: 'bg-purple-100 text-purple-700',
  Health: 'bg-red-100 text-red-700',
  Work: 'bg-orange-100 text-orange-700',
  University: 'bg-teal-100 text-teal-700',
  Wellbeing: 'bg-pink-100 text-pink-700',
  Culture: 'bg-yellow-100 text-yellow-700',
  Food: 'bg-lime-100 text-lime-700',
  Academic: 'bg-indigo-100 text-indigo-700',
  Social: 'bg-fuchsia-100 text-fuchsia-700',
  Slang: 'bg-amber-100 text-amber-700',
  Government: 'bg-sky-100 text-sky-700',
  default: 'bg-gray-100 text-gray-600',
}

export default function TagPill({ label, className = '' }) {
  const colorClass = tagColors[label] || tagColors.default
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      {label}
    </span>
  )
}
