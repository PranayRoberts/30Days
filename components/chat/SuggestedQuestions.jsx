const suggestions = [
  "What is a TFN and how do I apply?",
  "Can I work more than 48 hours per fortnight?",
  "What does 'arvo' mean?",
  "How does OSHC work?",
  "What's the cheapest way to eat in Australia?",
  "How do I make friends at uni?",
  "What's a bond and how do I get it back?",
  "How do I get a Myki / Opal card?",
]

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="overflow-x-auto pb-2 -mx-1 px-1">
      <div className="flex gap-2 min-w-max">
        {suggestions.map(q => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="flex-shrink-0 px-3 py-2 rounded-full bg-teal-50 border border-teal-100 text-[#0F766E] text-sm hover:bg-teal-100 font-medium whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
