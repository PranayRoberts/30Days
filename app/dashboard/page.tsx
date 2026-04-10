"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ResultCard from "@/components/ResultCard";
import Spinner from "@/components/Spinner";

type AnalysisItem = {
  id: string;
  input_text: string;
  result: string;
  created_at: string;
};

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        router.replace("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("analyses")
        .select("id, input_text, result, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
      } else if (data) {
        setAnalyses(data as AnalysisItem[]);
      }

      setSessionChecked(true);
      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 py-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Your workspace</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Dashboard</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Review your past analyses and keep your copy polished over time.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900">
            <Spinner />
          </div>
        ) : null}

        {!loading && sessionChecked ? (
          <div className="grid gap-6">
            {analyses.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm shadow-slate-200/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <p className="text-lg font-medium">No saved analyses yet.</p>
                <p className="mt-3">Go to Analyze and run your first text review.</p>
              </div>
            ) : (
              analyses.map((analysis) => (
                <ResultCard
                  key={analysis.id}
                  title={new Date(analysis.created_at).toLocaleString()}
                  subtitle={analysis.input_text}
                  result={analysis.result}
                />
              ))
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
