import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import resourcesData from '@/data/resources.json'
import ResourceCard from '@/components/resources/ResourceCard'
import TranslateButton from '@/components/shared/TranslateButton'

export async function generateStaticParams() {
  return resourcesData.categories.map(cat => ({ category: cat.id }))
}

export async function generateMetadata({ params }) {
  const { category: categoryId } = await params
  const cat = resourcesData.categories.find(c => c.id === categoryId)
  if (!cat) return {}
  return {
    title: `${cat.name} — Resource Hub | 30 Days in Australia`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }) {
  const { category: categoryId } = await params
  const category = resourcesData.categories.find(c => c.id === categoryId)

  if (!category) notFound()

  // Sort: essential first
  const sorted = [...category.resources].sort((a, b) =>
    (b.essential ? 1 : 0) - (a.essential ? 1 : 0)
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back */}
      <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm text-[#78716C] hover:text-[#1C1917] mb-6">
        <ArrowLeft size={16} />
        Back to Resource Hub
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.emoji}</span>
          <h1 className="text-2xl font-bold text-[#1C1917]">{category.name}</h1>
        </div>
        <TranslateButton />
      </div>
      <p className="text-[#78716C] mb-6">{category.description}</p>

      {/* Essential note */}
      {sorted.some(r => r.essential) && (
        <div className="flex items-center gap-1.5 mb-4 text-xs text-[#78716C]">
          <Star size={12} className="text-[#FBBF24] fill-[#FBBF24]" />
          Resources marked with a star are essential — start here.
        </div>
      )}

      {/* Resources */}
      <div className="space-y-3">
        {sorted.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}
