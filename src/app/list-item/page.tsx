"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES, ITEM_CONDITIONS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useItemStore } from "@/store/useItemStore";
import {
  Upload,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  MapPin,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ListItemPage() {
  const { user } = useAuthStore();
  const { addItem } = useItemStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "electronics",
    description: "",
    condition: "good",
    dailyPrice: 150,
    weeklyPrice: 800,
    deposit: 1000,
    hourlyLateFee: 20,
    location: "Hostel Block A, Room 210",
  });

  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
  ]);

  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedItemId, setPublishedItemId] = useState<string | null>(null);

  const samplePhotoPresets = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
  ];

  const handleAddSamplePhoto = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.description.trim() || images.length === 0) {
      setStep(formData.title.trim() && formData.description.trim() ? 1 : 2);
      return;
    }
    setIsPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    const item = addItem({
      ...formData,
      images,
      availability: "available",
      ownerId: user?.id || "demo-user",
      ownerName: user?.name || "CampusLend Student",
      ownerAvatar: user?.avatar || "",
      ownerRating: user?.rating || 5,
      ownerVerified: user?.verified ?? true,
    });
    setPublishedItemId(item.id);
    setIsPublishing(false);
    setIsPublished(true);
  };

  if (isPublished) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce-in">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <Badge variant="success" size="md">Listing Active</Badge>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Your Item is Live on Campus!
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Verified students at BML Munjal University can now discover and request to rent <span className="font-bold text-[var(--text-primary)]">{formData.title || "your item"}</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href={publishedItemId ? `/items/${publishedItemId}` : "/dashboard"} className="flex-1">
            <Button size="md" variant="accent" className="w-full text-xs font-bold">
              View Live Listing
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button size="md" variant="outline" className="w-full text-xs font-bold">
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-md mx-auto space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Earn Passive Campus Income</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
          List an Item for Rent
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          Rent your unused electronics, gear, or books safely to campus peers
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {[
          { num: 1, label: "Photos & Category" },
          { num: 2, label: "Item Details" },
          { num: 3, label: "Pricing & Deposit" },
          { num: 4, label: "Location & Review" },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step >= s.num
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              }`}
            >
              {s.num}
            </div>
            <span className="text-[10px] font-semibold text-[var(--text-muted)] hidden sm:block">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Forms */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
        {/* Step 1: Category & Photos */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                1. Select Category & Add Photos
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Choose the best category and upload clear photos of your item
              </p>
            </div>

            {/* Category selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-blue-500" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Photos upload area */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Photos ({images.length}/5)
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group">
                    <img src={img} alt={`Upload ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {images.length < 5 && (
                  <div className="border-2 border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center p-4 text-center hover:bg-[var(--surface-hover)] cursor-pointer transition-colors aspect-square">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">Upload Photo</span>
                  </div>
                )}
              </div>

              {/* Sample presets for quick testing */}
              <div className="pt-2">
                <span className="text-[11px] text-[var(--text-muted)] font-medium mr-2">Or add demo gear:</span>
                <div className="inline-flex gap-1.5 mt-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleAddSamplePhoto(samplePhotoPresets[1])}
                    className="px-2 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] font-semibold text-[var(--text-secondary)] hover:border-blue-500"
                  >
                    + Camera Kit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSamplePhoto(samplePhotoPresets[2])}
                    className="px-2 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] font-semibold text-[var(--text-secondary)] hover:border-blue-500"
                  >
                    + Textbook
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSamplePhoto(samplePhotoPresets[3])}
                    className="px-2 py-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] font-semibold text-[var(--text-secondary)] hover:border-blue-500"
                  >
                    + Sports Racket
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setStep(2)}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full"
            >
              Continue to Details
            </Button>
          </div>
        )}

        {/* Step 2: Item Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  2. Item Information
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Give your listing an accurate title and condition
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>

            <Input
              label="Listing Title"
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            {/* Condition Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ITEM_CONDITIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: c.value })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      formData.condition === c.value
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20"
                        : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <p className="text-xs font-bold">{c.label}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{c.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Description & Inclusions
              </label>
              <textarea
                rows={4}
                placeholder="Describe accessories included (chargers, cases), battery condition, and usage guidelines..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setStep(3)}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full"
            >
              Continue to Pricing
            </Button>
          </div>
        )}

        {/* Step 3: Pricing & Deposit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  3. Rental Rates & Security Deposit
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Set fair rates and refundable security deposit
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Daily Rental Rate (₹)"
                type="number"
                value={formData.dailyPrice}
                onChange={(e) => setFormData({ ...formData, dailyPrice: Number(e.target.value) })}
                required
              />
              <Input
                label="Weekly Rental Rate (₹)"
                type="number"
                value={formData.weeklyPrice}
                onChange={(e) => setFormData({ ...formData, weeklyPrice: Number(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Security Deposit (₹ Refundable)"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                hint="Held in escrow to protect against damage or loss"
                required
              />
              <Input
                label="Hourly Overdue Late Fee (₹/hr)"
                type="number"
                value={formData.hourlyLateFee}
                onChange={(e) => setFormData({ ...formData, hourlyLateFee: Number(e.target.value) })}
                hint="Charged per hour if not returned before deadline"
                required
              />
            </div>

            {/* AI Fair Price Tip */}
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3.5 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-bold">AI Pricing Suggestion:</span> Listings with ₹100-300 daily rate and ₹1,000 deposit rent 3.4x faster on BMU campus.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setStep(4)}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full"
            >
              Continue to Location & Review
            </Button>
          </div>
        )}

        {/* Step 4: Location & Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  4. Campus Handoff Spot & Publish
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Review your listing before publishing to verified students
                </p>
              </div>
              <button
                onClick={() => setStep(3)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
            </div>

            <Input
              label="Campus Pickup Location"
              placeholder="e.g. Hostel Block A, Central Library, or SAC Gate"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              icon={MapPin}
              required
            />

            {/* Review Summary Card */}
            <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)] space-y-3 text-xs">
              <h4 className="font-bold text-sm text-[var(--text-primary)]">
                Listing Preview
              </h4>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Item:</span>
                <span className="font-bold text-[var(--text-primary)]">{formData.title || "MacBook Pro 14"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Category:</span>
                <span className="capitalize font-semibold text-[var(--text-primary)]">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Daily / Weekly Rate:</span>
                <span className="font-bold text-blue-600">{formatPrice(formData.dailyPrice)}/day • {formatPrice(formData.weeklyPrice)}/wk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Refundable Deposit:</span>
                <span className="font-bold text-emerald-600">{formatPrice(formData.deposit)}</span>
              </div>
            </div>

            <Button
              type="button"
              variant="accent"
              size="lg"
              isLoading={isPublishing}
              onClick={handlePublish}
              icon={CheckCircle2}
              className="w-full text-base font-bold shadow-lg shadow-emerald-500/20"
            >
              Publish Listing on Campus
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
