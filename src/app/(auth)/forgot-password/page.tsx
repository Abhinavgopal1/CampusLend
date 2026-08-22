"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[var(--text-primary)]">
            Reset Password
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Enter your college email address to receive reset instructions
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-6 shadow-xl">
          {isSent ? (
            <div className="text-center space-y-3 py-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Reset Link Sent!
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                We&apos;ve sent a password reset link to <span className="font-bold">{email}</span>.
              </p>
              <Link href="/login" className="block pt-2">
                <Button size="md" variant="primary" className="w-full text-xs">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="College Email Address"
                type="email"
                placeholder="student@bmu.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />
              <Button type="submit" variant="accent" size="lg" className="w-full text-xs font-bold">
                Send Reset Link
              </Button>
              <Link href="/login" className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline pt-2 font-semibold">
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
