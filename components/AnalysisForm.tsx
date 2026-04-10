"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Spinner from "./Spinner";
import ResultCard from "./ResultCard";

type AnalysisResponse = {
  result: string;
  saved?: boolean;
  error?: string;
};

export default function AnalysisForm() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id ?? null);
    };
    loadSession();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!inputText.trim()) {
      setError("Please enter a phrase or sentence to analyze.");
      return;
    }

    if (!userId) {
      setError("Please log in to analyze text and save results.");
      return;
    }

    setIsLoading(true);

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_text: inputText.trim(), user_id: userId }),
    });

    const data: AnalysisResponse = await response.json();
    setIsLoading(false);

    if (!response.ok || data.error) {
      setError(data.error ?? "Unable to analyze text. Please try again.");
      return;
    }

    setResult(data.result);
    setInputText("");
  };

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-6 flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Analyze your text</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Paste a sentence, paragraph, or interface text and 30DaysAustralia will provide a clean, polished analysis and recommendation.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Input text
          <textarea
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            rows={8}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-slate-800"
            placeholder="Enter text for analysis, translation guidance, or cultural polish."
          />
        </label>
        {error ? <p className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/20 dark:text-rose-300">{error}</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Analyzing…" : "Run analysis"}
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {userId ? "Your analysis history saves automatically." : "Login to store your analysis history."}
          </p>
        </div>
      </form>

      {isLoading ? <Spinner /> : null}
      {result ? <ResultCard title="AI analysis result" subtitle="Stored in your dashboard" result={result} /> : null}
    </section>
  );
}
