'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarCheck, BookOpen, Wallet, FileText, MessageCircle } from 'lucide-react'

const tabs = [
  { href: '/timeline', label: 'Timeline', Icon: CalendarCheck },
  { href: '/resources', label: 'Resources', Icon: BookOpen },
  { href: '/budget', label: 'Budget', Icon: Wallet },
  { href: '/blog', label: 'Blog', Icon: FileText },
  { href: '/chat', label: 'Chat', Icon: MessageCircle },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname?.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 min-w-0 flex-1 ${
                active ? 'text-[#0F766E]' : 'text-[#78716C]'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-xs font-medium truncate ${active ? 'text-[#0F766E]' : 'text-[#78716C]'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
