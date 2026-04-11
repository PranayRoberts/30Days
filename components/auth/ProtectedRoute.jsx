'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { BookMarked, Lock } from 'lucide-react'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default function ProtectedRoute({ children, featureName = 'this feature' }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner className="min-h-64 flex items-center justify-center" />
  }

  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
          <Lock size={28} className="text-[#0F766E]" />
        </div>
        <h2 className="text-xl font-bold text-[#1C1917] mb-2">Sign in to access your journal</h2>
        <p className="text-[#78716C] text-sm mb-6 leading-relaxed">
          Your journal is a private space to reflect on your journey in Australia.
          Create a free account to start writing.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/auth/signup" className="w-full py-3 rounded-lg bg-[#0F766E] text-white font-semibold text-sm text-center hover:bg-[#0a5c56]">
            Create free account
          </Link>
          <Link href="/auth/login" className="w-full py-3 rounded-lg border border-gray-200 text-[#1C1917] font-medium text-sm text-center hover:bg-gray-50">
            Log in
          </Link>
        </div>
        <p className="text-xs text-[#78716C] mt-4">No credit card required.</p>
      </div>
    )
  }

  return children
}
