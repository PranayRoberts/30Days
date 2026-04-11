import { Bot } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0 text-white text-sm">
          <Bot size={16} />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#0F766E] text-white rounded-tr-sm'
            : 'bg-gray-100 text-[#1C1917] rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
