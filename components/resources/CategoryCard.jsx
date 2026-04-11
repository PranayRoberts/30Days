import Link from 'next/link'

const categoryBgs = {
  Housing: 'bg-blue-50 hover:bg-blue-100',
  'Banking & Money': 'bg-green-50 hover:bg-green-100',
  Transport: 'bg-purple-50 hover:bg-purple-100',
  'Health & Safety': 'bg-red-50 hover:bg-red-100',
  'Work Rights': 'bg-orange-50 hover:bg-orange-100',
  'University Life': 'bg-teal-50 hover:bg-teal-100',
  Wellbeing: 'bg-pink-50 hover:bg-pink-100',
}

export default function CategoryCard({ category }) {
  const bg = categoryBgs[category.name] || 'bg-gray-50 hover:bg-gray-100'

  return (
    <Link
      href={`/resources/${category.id}`}
      className={`block p-6 rounded-xl ${bg} border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
    >
      <div className="text-3xl mb-3">{category.emoji}</div>
      <h3 className="font-semibold text-[#1C1917] text-base mb-1">{category.name}</h3>
      <p className="text-sm text-[#78716C] mb-2">{category.description}</p>
      <p className="text-xs text-[#0F766E] font-medium">{category.resources.length} resources →</p>
    </Link>
  )
}
