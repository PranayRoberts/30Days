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
    <nav
      className="mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-nav-gold safe-area-pb"
      style={{ background: 'linear-gradient(to right, var(--color-nav-from), var(--color-nav-via), var(--color-nav-to))' }}
    >
      <div className="grid grid-cols-5 w-full h-16">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname?.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-opacity !text-white ${
                active ? 'opacity-100' : 'opacity-60 hover:opacity-90'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-xs font-medium truncate">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
