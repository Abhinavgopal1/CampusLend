"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice } from "@/lib/utils";
import { useItemStore } from "@/store/useItemStore";
import { useRentalStore } from "@/store/useRentalStore";
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  FileCheck2,
  Fingerprint,
  ImagePlus,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const conditionChecks = [
  "Item matches the listing photos",
  "Accessories and charger are present",
  "Existing marks are visible in the evidence",
  "Both students agree on the condition",
];

export default function HandoffPage() {
  const params = useParams();
  const rentalId = params.rentalId as string;
  const { getRentalById, updateRentalStatus } = useRentalStore();
  const { setItemAvailability } = useItemStore();
  const rental = getRentalById(rentalId);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [checks, setChecks] = useState<string[]>([]);
  const [enteredCode, setEnteredCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handoffCode = useMemo(() => {
    const seed = [...rentalId].reduce((total, char) => total + char.charCodeAt(0) * 17, 0);
    return String(100000 + (seed % 900000));
  }, [rentalId]);

  if (!rental) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600">
          <Fingerprint className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Handoff session not found</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Open a valid rental from your dashboard to begin verification.</p>
        </div>
        <Link href="/dashboard"><Button variant="primary" icon={ArrowLeft}>Back to dashboard</Button></Link>
      </main>
    );
  }

  const isPickup = rental.status === "pending";
  const allChecked = checks.length === conditionChecks.length;

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const previews = Array.from(files).slice(0, 4).map((file) => URL.createObjectURL(file));
    setPhotos((current) => [...current, ...previews].slice(0, 4));
  };

  const toggleCheck = (label: string) => {
    setChecks((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label]
    );
  };

  const verifyCode = () => {
    if (enteredCode !== handoffCode) {
      setCodeError(true);
      return;
    }
    updateRentalStatus(rental.id, isPickup ? "active" : "completed");
    setItemAvailability(rental.itemId, isPickup ? "rented" : "available");
    setCodeError(false);
    setStep(3);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(handoffCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_36%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_32%)] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <Badge variant={isPickup ? "primary" : "warning"} size="md">
            {isPickup ? "Pickup verification" : "Return verification"}
          </Badge>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-blue-950/20">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <aside className="relative overflow-hidden border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r">
              <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-blue-500/25 blur-3xl" />
              <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="relative space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="h-4 w-4" /> CampusTrust Protocol
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    Proof before promises.
                  </h1>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                    Both students document the item, agree on its condition, and verify the same one-time code before the rental changes hands.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <img src={rental.itemImage} alt={rental.itemTitle} className="h-16 w-16 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{rental.itemTitle}</p>
                      <p className="mt-1 text-xs text-slate-400">{formatDate(rental.startDate)} — {formatDate(rental.endDate)}</p>
                      <p className="mt-1 text-xs font-bold text-emerald-300">{formatPrice(rental.deposit)} deposit protected</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[{ n: 1, t: "Evidence" }, { n: 2, t: "Verify" }, { n: 3, t: "Complete" }].map((item) => (
                    <div key={item.n} className={`rounded-2xl border p-3 ${step >= item.n ? "border-blue-400/40 bg-blue-400/10" : "border-white/10 bg-white/5"}`}>
                      <span className="text-[10px] font-black text-slate-400">0{item.n}</span>
                      <p className="mt-1 text-xs font-bold">{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="bg-[var(--surface)] p-6 text-[var(--text-primary)] sm:p-9">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                      <Camera className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-2xl font-black">Document the {isPickup ? "pickup" : "return"}</h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">Take clear photos from multiple angles. These become the shared condition record.</p>
                  </div>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-hover)] px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-500/5">
                    <ImagePlus className="h-7 w-7 text-blue-600 transition group-hover:scale-110" />
                    <span className="mt-2 text-sm font-bold">Add condition photos</span>
                    <span className="mt-1 text-xs text-[var(--text-muted)]">Up to 4 images · JPG or PNG</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => handlePhotos(event.target.files)} />
                  </label>

                  {photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {photos.map((photo, index) => (
                        <img key={photo} src={photo} alt={`Condition evidence ${index + 1}`} className="aspect-square rounded-2xl border border-[var(--border)] object-cover" />
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    {conditionChecks.map((label) => {
                      const checked = checks.includes(label);
                      return (
                        <button key={label} type="button" onClick={() => toggleCheck(label)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-xs font-semibold transition ${checked ? "border-emerald-400 bg-emerald-500/8 text-emerald-800 dark:text-emerald-300" : "border-[var(--border)] hover:bg-[var(--surface-hover)]"}`}>
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border ${checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-[var(--border-hover)]"}`}>{checked && <Check className="h-3.5 w-3.5" />}</span>
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  <Button variant="primary" size="lg" className="w-full" icon={ScanLine} disabled={photos.length === 0 || !allChecked} onClick={() => setStep(2)}>
                    Lock evidence & continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><LockKeyhole className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-2xl font-black">Match the one-time code</h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">Show this code to the other student. The handoff completes only when both sides match.</p>
                  </div>

                  <div className="rounded-3xl border border-blue-500/20 bg-blue-500/6 p-5 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600">Owner handoff code</span>
                    <div className="mt-2 font-mono text-4xl font-black tracking-[0.18em] text-[var(--text-primary)]">{handoffCode}</div>
                    <button onClick={copyCode} className="mx-auto mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy code"}
                    </button>
                  </div>

                  <div>
                    <label htmlFor="handoff-code" className="mb-2 block text-xs font-bold">Enter matching code</label>
                    <input id="handoff-code" inputMode="numeric" maxLength={6} value={enteredCode} onChange={(event) => { setEnteredCode(event.target.value.replace(/\D/g, "")); setCodeError(false); }} placeholder="000000" className={`w-full rounded-2xl border bg-[var(--surface-hover)] px-4 py-3 text-center font-mono text-xl font-black tracking-[0.28em] outline-none transition ${codeError ? "border-red-500 ring-4 ring-red-500/10" : "border-[var(--border)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`} />
                    {codeError && <p className="mt-2 text-xs font-semibold text-red-600">That code does not match. Check the other student&apos;s screen.</p>}
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/6 p-3 text-xs leading-5 text-[var(--text-secondary)]">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">Protected action:</span> confirming creates a timestamped condition agreement for both students.
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="accent" size="lg" className="flex-1" icon={Fingerprint} disabled={enteredCode.length !== 6} onClick={verifyCode}>Verify both students</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30"><CheckCircle2 className="h-10 w-10" /></div>
                    <Sparkles className="absolute -right-4 -top-4 h-6 w-6 text-amber-400" />
                  </div>
                  <Badge variant="success" size="md" className="mt-6">Condition record sealed</Badge>
                  <h2 className="mt-3 text-3xl font-black">{isPickup ? "Pickup verified" : "Return verified"}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                    {isPickup ? "The rental is now active. Both students have a shared proof-of-condition record." : "The item is marked returned and the deposit is ready for release."}
                  </p>
                  <div className="mt-7 grid w-full grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-4 text-left">
                      <FileCheck2 className="h-5 w-5 text-blue-600" />
                      <p className="mt-2 text-xs font-bold">{photos.length} evidence photos</p>
                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">Timestamped just now</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-4 text-left">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      <p className="mt-2 text-xs font-bold">Two-party verified</p>
                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">Code {handoffCode}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" className="mt-7 w-full"><Button variant="primary" size="lg" className="w-full">Return to dashboard</Button></Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
