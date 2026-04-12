import Link from 'next/link'
import {
  CalendarCheck, BookOpen, MessageCircle, Wallet, FileText, BookMarked,
  UserCircle, ThumbsUp, MapPin, Compass, GraduationCap, Briefcase, ArrowRight
} from 'lucide-react'

const features = [
  { icon: CalendarCheck, title: '30-Day Timeline', description: 'A step-by-step plan covering everything from SIM cards to finding work.', href: '/timeline', color: 'text-teal-600 bg-teal-50' },
  { icon: BookOpen, title: 'Resource Hub', description: 'Curated guides on housing, banking, transport, health, and more.', href: '/resources', color: 'text-blue-600 bg-blue-50' },
  { icon: MessageCircle, title: 'AI Assistant', description: 'Chat with Matey — your friendly AI guide who knows Australia inside out.', href: '/chat', color: 'text-purple-600 bg-purple-50' },
  { icon: Wallet, title: 'Budget Snapshot', description: 'Real weekly cost estimates by city and suburb, plus a budget calculator.', href: '/budget', color: 'text-orange-600 bg-orange-50' },
  { icon: FileText, title: 'Blog & Tips', description: 'Real stories and advice from international students who\'ve been there.', href: '/blog', color: 'text-pink-600 bg-pink-50' },
  { icon: BookMarked, title: 'Private Journal', description: 'A safe space to reflect on your journey, with daily prompts to guide you.', href: '/journal', color: 'text-amber-600 bg-amber-50' },
]

const steps = [
  { icon: UserCircle, step: '01', title: 'Tell us about you', description: 'Share your university, home country, and city so we can personalise your experience.' },
  { icon: CalendarCheck, step: '02', title: 'Follow your 30-day plan', description: 'Tick off tasks day by day. Your progress saves automatically.' },
  { icon: ThumbsUp, step: '03', title: 'Settle in with confidence', description: 'Use our resources, budget tools, and AI chat whenever you need help.' },
]

const flagItems = [
  { code: 'in', label: 'India' },
  { code: 'cn', label: 'China' },
  { code: 'us', label: 'United States' },
  { code: 'gb', label: 'United Kingdom' },
  { code: 'fr', label: 'France' },
  { code: 'de', label: 'Germany' },
  { code: 'br', label: 'Brazil' },
  { code: 'jp', label: 'Japan' },
  { code: 'sa', label: 'Saudi Arabia' },
  { code: 'vn', label: 'Vietnam' },
  { code: 'ca', label: 'Canada' },
  { code: 'ru', label: 'Russia' },
]

export const metadata = {
  title: '30 Days in Australia — Your Settlement Guide',
  description: 'The central hub for international students arriving in Australia. Guides, resources, budgeting, AI help — everything you need to settle in.',
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#7C1D1D] via-[#9A3412] to-[#B45309] py-24 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-[#FCD34D] blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#F97316] blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Decorative icons */}
          <div className="flex justify-center items-center gap-6 mb-8 opacity-80">
            <Briefcase size={28} className="text-white/60" />
            <MapPin size={36} className="text-[#FCD34D]" />
            <GraduationCap size={32} className="text-white/60" />
            <Compass size={28} className="text-[#FDE68A]" />
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
            <span>🦘</span> For international students across Australia
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Your first 30 days,{' '}
            <span className="text-[#FCD34D]">sorted.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            The central hub for international students in Australia. Guides, resources, budgeting, AI help — everything you need to settle in.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/timeline"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#FCD34D] !text-[#7C1D1D] font-bold text-base shadow-lg hover:bg-[#FDE68A] hover:-translate-y-0.5"
            >
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white !text-[#7C1D1D] font-semibold text-base hover:bg-amber-50"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-[#FEF7ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1917] mb-3">How it works</h2>
            <p className="text-[#78716C]">Three steps to settling in with confidence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 border-t-2 border-dashed border-[#0F766E]/30" />

            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 border border-gray-100">
                    <Icon size={32} className="text-[#0F766E]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0F766E] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1C1917] mb-2">{title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1917] mb-3">Everything you need, in one place</h2>
            <p className="text-[#78716C]">Built specifically for your first month in Australia</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, description, href, color }) => (
              <Link
                key={href}
                href={href}
                className="group p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 block"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-[#1C1917] mb-2 group-hover:text-[#C2410C]">{title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-4 bg-[#7C1D1D] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/80 text-sm uppercase tracking-wide font-medium mb-4">Our community</p>
          <h2 className="text-2xl font-bold text-white mb-12">Built by international students, for international students</h2>
          
          {/* Scrolling flag marquee */}
          <div className="overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .flag-marquee { animation: marquee 20s linear infinite; }
            `}</style>
            <div className="flag-marquee flex gap-4 w-max">
              {[...flagItems, ...flagItems].map(({ code, label }, idx) => (
                <div key={`${code}-${idx}`} className="flex-shrink-0">
                  <img
                    src={`https://flagcdn.com/w80/${code}.png`}
                    alt={label}
                    width={80}
                    height={53}
                    className="rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🇦🇺</div>
          <h2 className="text-3xl font-bold text-[#1C1917] mb-4">Ready to start your journey?</h2>
          <p className="text-[#78716C] mb-8 text-lg">
            Create a free account to save your progress, sync your checklist, and keep a private journal of your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#C2410C] !text-white font-bold text-base shadow-md hover:bg-[#9A3412] hover:-translate-y-0.5"
            >
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link
              href="/timeline"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-gray-200 text-[#1C1917] font-semibold text-base hover:bg-gray-50"
            >
              Browse without signing up
            </Link>
          </div>
          <p className="text-xs text-[#78716C] mt-4">No credit card required. Works without an account too.</p>
        </div>
      </section>
    </div>
  )
}
