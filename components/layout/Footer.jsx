import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white mt-auto pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-2">
              <MapPin size={20} className="text-[#F97316]" />
              30 Days in Australia
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Built by international students, for international students.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-white mb-2">Quick Links</p>
              <div className="space-y-1">
                <Link href="/timeline" className="block hover:text-white">Timeline</Link>
                <Link href="/resources" className="block hover:text-white">Resources</Link>
                <Link href="/budget" className="block hover:text-white">Budget</Link>
                <Link href="/chat" className="block hover:text-white">Chat with Matey</Link>
              </div>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Help</p>
              <div className="space-y-1">
                <Link href="/emergency" className="block hover:text-white">Emergency Contacts</Link>
                <Link href="/glossary" className="block hover:text-white">Glossary</Link>
                <Link href="/blog" className="block hover:text-white">Blog</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} | 30 Days in Australia.</p>
          <div className="flex gap-4">
            <Link href="https://github.com/PranayRoberts/30Days/blob/master/README.md" className="hover:text-white">Privacy</Link>
            <a href="https://github.com/PranayRoberts/30Days" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
