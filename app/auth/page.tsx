"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const handler = mode === "sign-in" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const response = await handler({ email, password });

    setLoading(false);

    if (response.error) {
      setMessage(response.error.message);
      return;
    }

    const userId = response.data?.user?.id;
    if (userId) {
      await supabase.from("users").upsert({ id: userId, email, created_at: new Date().toISOString() });
    }

    setMessage(mode === "sign-in" ? "Welcome back! Redirecting..." : "Account created — please check your email for confirmation.");
    if (mode === "sign-in") {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 py-16 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 sm:px-8">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Secure workspace</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Login or sign up to save your analysis history.</h1>
          <p className="max-w-2xl mx-auto text-slate-300">
            Use email and password auth powered by Supabase. Your results are stored in a private dashboard and linked to your account.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Choose your path</p>
              <h2 className="text-2xl font-semibold">{mode === "sign-in" ? "Sign in" : "Create account"}</h2>
            </div>
            <button
              type="button"
              onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
            >
              {mode === "sign-in" ? "Switch to sign up" : "Switch to sign in"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-slate-500"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your password"
              />
            </label>

            {message ? <p className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">{message}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Working…" : mode === "sign-in" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
