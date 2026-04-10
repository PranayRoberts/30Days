"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [session, setSession] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(Boolean(data.session));
    };

    loadSession();

    const { data: sub } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      setSession(Boolean(session));
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(false);
    router.push("/");
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/analyze", label: "Analyze" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="font-semibold text-slate-950 dark:text-white">
          30DaysAustralia
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${pathname === item.href ? "text-slate-950 font-semibold dark:text-white" : "text-slate-600 hover:text-slate-950 dark:text-slate-300"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
