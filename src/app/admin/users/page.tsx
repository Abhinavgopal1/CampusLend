"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { MOCK_USERS } from "@/lib/mockData";
import { ArrowLeft, CheckCircle2, ShieldCheck, UserX, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleVerify = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u))
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button size="sm" variant="ghost" icon={ArrowLeft}>
              Back to Overview
            </Button>
          </Link>
          <h1 className="text-xl font-black text-[var(--text-primary)]">
            Student ID Verifications & Directory
          </h1>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter students by name, email, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((u) => (
            <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar name={u.name} src={u.avatar} size="md" verified={u.verified} />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{u.name}</h4>
                    <Badge variant={u.verified ? "success" : "warning"} size="sm">
                      {u.verified ? "Verified ID" : "Pending Approval"}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {u.email} • {u.college} ({u.department})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  size="sm"
                  variant={u.verified ? "outline" : "accent"}
                  onClick={() => toggleVerify(u.id)}
                  className="text-xs h-8"
                >
                  {u.verified ? "Revoke ID" : "Approve Student ID"}
                </Button>
                <Button size="sm" variant="danger" icon={UserX} className="text-xs h-8">
                  Suspend
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
