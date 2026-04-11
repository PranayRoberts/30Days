import Link from 'next/link'
import { MapPin } from 'lucide-react'
import AuthForm from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Log in | 30 Days in Australia',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-[#0F766E]">
            <MapPin size={24} className="text-[#F97316]" />
            30 Days
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#1C1917]">Welcome back</h1>
          <p className="text-sm text-[#78716C] mt-1">Log in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <AuthForm mode="login" />
        </div>

        <p className="text-center text-xs text-[#78716C] mt-6">
          🔒 Your data is private and secure.
        </p>
      </div>
    </div>
  )
}
