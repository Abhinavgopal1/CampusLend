"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/useAuthStore";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("arjun.mehta@bmu.edu.in");
  const [password, setPassword] = useState("password123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.push("/");
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-xl shadow-blue-500/20 mb-2">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Welcome to CampusLend AI
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Sign in with your verified BML Munjal University email
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-5 shadow-xl"
        >
          <Input
            label="College Email Address"
            type="email"
            placeholder="student@bmu.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            hint="Use your @bmu.edu.in university email"
            required
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />
            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-[11px] text-blue-600 hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full text-sm font-bold shadow-lg shadow-emerald-500/20"
          >
            Sign In to Campus
          </Button>

          {/* Social / Demo One-Click */}
          <div className="pt-2 border-t border-[var(--border)] text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs text-[var(--text-secondary)] hover:text-blue-600 font-semibold"
            >
              🚀 Click to Quick Login with Demo Student Account
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Register with College ID
          </Link>
        </p>
      </div>
    </main>
  );
}
