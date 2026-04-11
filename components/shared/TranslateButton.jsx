// FUTURE: Translation button — disabled until Gemini translation is implemented
import { Languages } from 'lucide-react'

export default function TranslateButton() {
  return (
    <button
      disabled
      aria-label="Translate page (coming soon)"
      title="Translation coming soon"
      className="hidden items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#78716C] border border-gray-200 opacity-50 cursor-not-allowed"
    >
      <Languages size={14} />
      Translate
    </button>
  )
}
