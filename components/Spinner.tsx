export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-950 dark:border-slate-700 dark:border-t-white" />
    </div>
  );
}
