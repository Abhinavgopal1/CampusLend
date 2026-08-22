"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/useAuthStore";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "BML Munjal University",
    department: "Computer Science",
  });

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
    router.push("/");
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-lg mb-2">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">
            Create Student Account
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Join verified students renting safely at BML Munjal University
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Step 1: Account credentials */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. Arjun Mehta"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={User}
                required
              />
              <Input
                label="College Email (@bmu.edu.in)"
                type="email"
                placeholder="student@bmu.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={Mail}
                required
              />
              <Input
                label="Create Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                icon={Lock}
                required
              />
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => setStep(2)}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full"
              >
                Continue to College Details
              </Button>
            </div>
          )}

          {/* Step 2: College Info */}
          {step === 2 && (
            <div className="space-y-4">
              <Input
                label="College / Institute"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                icon={Building}
                required
              />
              <Input
                label="Department / Course"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => setStep(3)}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full"
              >
                Continue to Verification
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1 font-semibold w-full"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>
          )}

          {/* Step 3: ID Verification upload */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-6 text-center space-y-2 hover:bg-[var(--surface-hover)] cursor-pointer">
                <Upload className="h-8 w-8 text-blue-600 mx-auto" />
                <p className="text-xs font-bold text-[var(--text-primary)]">Upload College Student ID Card</p>
                <p className="text-[10px] text-[var(--text-muted)]">PNG, JPG or PDF under 5MB</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-3.5 border border-emerald-300 dark:border-emerald-800 flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>AI auto-verifies your student credentials instantly without manual wait times.</p>
              </div>

              <Button
                type="button"
                variant="accent"
                size="lg"
                isLoading={isLoading}
                onClick={handleFinish}
                icon={CheckCircle2}
                className="w-full text-sm font-bold shadow-lg shadow-emerald-500/20"
              >
                Verify & Create Account
              </Button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1 font-semibold w-full"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
