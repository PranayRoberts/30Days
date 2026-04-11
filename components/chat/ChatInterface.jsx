'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import ChatMessage from './ChatMessage'
import SuggestedQuestions from './SuggestedQuestions'

const WELCOME = {
  role: 'assistant',
  content: "Hey! I'm Matey, your guide to life in Australia. Ask me anything — visa stuff, uni questions, Aussie slang, or just how things work here. No question is too basic. 🦘"
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">M</div>
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-[#78716C]" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#78716C]" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#78716C]" />
      </div>
    </div>
  )
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return

    const userMsg = { role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages.slice(1), userMsg] // skip welcome
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, data])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Hmm, something went wrong. Try again? 🦘"
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white">
        <SuggestedQuestions onSelect={(q) => sendMessage(q)} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything..."
            rows={1}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] disabled:opacity-50 max-h-32"
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="w-11 h-11 rounded-xl bg-[#0F766E] text-white flex items-center justify-center hover:bg-[#0a5c56] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
