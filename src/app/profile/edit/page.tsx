"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, CheckCircle2, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();

  const [name, setName] = useState(user?.name || "BluePanda42");
  const [college, setCollege] = useState(user?.college || "BML Munjal University");
  const [department, setDepartment] = useState(user?.department || "Computer Science");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, college, department });
    setIsSaved(true);
    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <Link href="/profile">
          <Button size="sm" variant="ghost" icon={ArrowLeft}>
            Back to Profile
          </Button>
        </Link>
        <h1 className="text-lg font-black text-[var(--text-primary)]">
          Edit Profile & Verification
        </h1>
        <div className="w-16" />
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <Avatar name={name} src={user?.avatar} size="lg" verified={user?.verified} />
          <div>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Profile Photo</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Avatar generated from student ID</p>
          </div>
        </div>

        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="College / University"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          required
        />

        <Input
          label="Academic Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        {/* Student Verification Box */}
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-4 border border-emerald-300 dark:border-emerald-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Student Verification Status: VERIFIED</span>
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
            Your university email ({user?.email}) is verified and linked to your hostel locker.
          </p>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          icon={isSaved ? CheckCircle2 : Save}
          className="w-full"
        >
          {isSaved ? "Saved!" : "Save Profile Changes"}
        </Button>
      </form>
    </main>
  );
}
