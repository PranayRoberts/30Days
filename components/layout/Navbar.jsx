'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MapPin, Menu, X, User, LogOut, ChevronDown, BookMarked, Phone, GraduationCap } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { href: '/timeline', label: 'Timeline' },
  { href: '/resources', label: 'Resources' },
  { href: '/budget', label: 'Budget' },
  { href: '/blog', label: 'Blog' },
  { href: '/chat', label: 'Chat' },
]

const moreLinks = [
  { href: '/journal', label: 'My Journal', Icon: BookMarked },
  { href: '/emergency', label: 'Emergency Contacts', Icon: Phone },
  { href: '/glossary', label: 'Aussie Glossary', Icon: GraduationCap },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#1E293B] shadow-lg border-b-2 border-[#F97316]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <MapPin size={22} className="text-[#F97316]" />
          <span className="tracking-tight">30 Days</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'bg-[#F97316] text-white'
                  : 'text-white hover:text-slate-100 hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                moreLinks.some(l => pathname?.startsWith(l.href))
                  ? 'bg-[#F97316] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              More
              <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50">
                {moreLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      pathname?.startsWith(href)
                        ? 'text-[#0F766E] bg-teal-50'
                        : 'text-[#18181B] hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} className={pathname?.startsWith(href) ? 'text-[#0F766E]' : 'text-[#52525B]'} />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side — auth */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 border border-white/20 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-bold">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50">
                  <Link
                    href="/journal"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[#18181B] hover:bg-teal-50 transition-colors"
                  >
                    <User size={15} className="text-[#52525B]" />
                    My Journal
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[#DC2626] hover:bg-red-50 w-full transition-colors"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg text-sm font-bold bg-[#F97316] text-white hover:bg-[#EA6C0C] shadow-sm transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'bg-[#F97316] text-white'
                  : 'text-white hover:text-slate-100 hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-1 border-t border-white/10 mt-1 space-y-1">
            <p className="px-4 pt-2 pb-1 text-xs font-bold text-slate-500 uppercase tracking-widest">More</p>
            {moreLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  pathname?.startsWith(href)
                    ? 'bg-[#F97316] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            ))}
          </div>

          <div className="pt-1 border-t border-white/20 mt-1 flex gap-2">
            {user ? (
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false) }}
                className="flex-1 px-4 py-3 rounded-lg text-sm font-semibold border border-red-300/50 text-red-200 hover:bg-white/10 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-3 rounded-lg text-sm font-semibold border border-white/30 text-center text-white hover:bg-white/20 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-3 rounded-lg text-sm font-bold bg-white text-[#0F766E] text-center hover:bg-gray-100 transition-colors"
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
