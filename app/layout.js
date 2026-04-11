import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { UserPreferencesProvider } from '@/context/UserPreferencesContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: '30 Days in Australia',
  description: 'The central hub for international students arriving in Australia. Guides, resources, budgeting, AI help — everything you need for your first 30 days.',
  openGraph: {
    title: '30 Days in Australia',
    description: 'Your first 30 days in Australia, sorted.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '30 Days in Australia',
    description: 'Your first 30 days in Australia, sorted.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#1C1917]">
        <AuthProvider>
          <UserPreferencesProvider>
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </UserPreferencesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
