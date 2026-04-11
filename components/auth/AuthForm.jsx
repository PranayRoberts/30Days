'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase'

export default function AuthForm({ mode }) {
  const router = useRouter()
  const isLogin = mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      const supabase = getSupabaseClient()

      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
        router.push('/timeline')
      } else {
        const { error: authError } = await supabase.auth.signUp({ email, password })
        if (authError) throw authError
        router.push('/onboarding')
      }
    } catch (err) {
      const messages = {
        'Invalid login credentials': 'Incorrect email or password. Please try again.',
        'Email already registered': 'This email is already registered. Try logging in.',
        'User already registered': 'This email is already registered. Try logging in.',
      }
      setError(messages[err.message] || err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0a5c56] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> {isLogin ? 'Logging in...' : 'Creating account...'}</>
        ) : (
          isLogin ? 'Log in' : 'Create account'
        )}
      </button>

      <p className="text-center text-sm text-[#78716C]">
        {isLogin ? (
          <>Don't have an account?{' '}<Link href="/auth/signup" className="text-[#0F766E] font-medium hover:underline">Sign up</Link></>
        ) : (
          <>Already have an account?{' '}<Link href="/auth/login" className="text-[#0F766E] font-medium hover:underline">Log in</Link></>
        )}
      </p>
    </form>
  )
}
