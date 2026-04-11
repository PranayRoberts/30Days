'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MapPin, Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { href: '/timeline', label: 'Timeline' },
  { href: '/resources', label: 'Resources' },
  { href: '/budget', label: 'Budget' },
  { href: '/blog', label: 'Blog' },
  { href: '/chat', label: 'Chat' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#0F766E]">
          <MapPin size={22} className="text-[#F97316]" />
          <span>30 Days</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'text-[#0F766E] bg-teal-50'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-gray-50 border border-gray-200"
              >
                <div className="w-7 h-7 rounded-full bg-[#0F766E] flex items-center justify-center text-white text-xs font-bold">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <ChevronDown size={14} className="text-[#78716C]" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    href="/journal"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#1C1917] hover:bg-gray-50"
                  >
                    <User size={15} />
                    My Journal
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#DC2626] hover:bg-red-50 w-full"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="px-3 py-2 text-sm font-medium text-[#78716C] hover:text-[#1C1917]">
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0F766E] text-white hover:bg-[#0a5c56] shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-[#78716C] hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-3 rounded-lg text-sm font-medium ${
                pathname?.startsWith(link.href)
                  ? 'text-[#0F766E] bg-teal-50'
                  : 'text-[#1C1917] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2 flex gap-2">
            {user ? (
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false) }}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-[#DC2626]"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-center text-[#1C1917]"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-[#0F766E] text-white text-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
