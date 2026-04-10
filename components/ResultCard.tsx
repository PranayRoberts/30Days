interface ResultCardProps {
  title: string;
  subtitle?: string;
  result: string;
}

export default function ResultCard({ title, subtitle, result }: ResultCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
      </div>
      <p className="mt-4 whitespace-pre-wrap rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-inner dark:bg-slate-950 dark:text-slate-200">
        {result}
      </p>
    </article>
  );
}
