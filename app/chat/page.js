import ChatInterface from '@/components/chat/ChatInterface'

export const metadata = {
  title: 'Chat with Matey | 30 Days in Australia',
  description: 'Ask Matey anything about life in Australia — visa questions, uni life, slang, budgeting, and more.',
}

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem-4rem)] md:h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div>
            <h1 className="font-bold text-[#1C1917]">Matey</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <p className="text-xs text-[#78716C]">Your AI guide to Australia</p>
            </div>
          </div>
        </div>
      </div>

      <ChatInterface />
    </div>
  )
}
