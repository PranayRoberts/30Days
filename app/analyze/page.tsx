import AnalysisForm from "@/components/AnalysisForm";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-slate-100 py-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">AI language analysis</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Run a quick translation and tone check.</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Paste interface text or copy and get a generated analysis, plus saved results when you are signed in.
          </p>
        </div>
        <AnalysisForm />
      </div>
    </main>
  );
}
