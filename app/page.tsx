import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-10 sm:px-8">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-slate-700/80">
              Language intelligence for Australian teams
            </p>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                30DaysAustralia helps teams build inclusive, polished language across products.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Upload or type interface text, marketing copy, or product content and get AI guidance for tone, clarity, and global-readiness.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Start building
              </Link>
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Try the analyzer
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-100 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Live AI feedback</p>
              <h2 className="mt-4 text-2xl font-semibold">Global copy review in a click</h2>
              <p className="mt-3 text-slate-300">
                Analyze content for readability, localization risk, and tone across international audiences. Save every result directly to your dashboard.
              </p>
              <div className="mt-8 space-y-4 rounded-3xl bg-slate-950/90 p-5 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-700 text-xs font-semibold text-white">1</span>
                  <div>
                    <p className="font-semibold text-white">Login with email</p>
                    <p>Secure workspace and saved analysis history.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-700 text-xs font-semibold text-white">2</span>
                  <div>
                    <p className="font-semibold text-white">Send text for AI review</p>
                    <p>Get structured AI guidance and rewrite suggestions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-700 text-xs font-semibold text-white">3</span>
                  <div>
                    <p className="font-semibold text-white">Access your dashboard</p>
                    <p>Review past analyses and keep your team aligned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
