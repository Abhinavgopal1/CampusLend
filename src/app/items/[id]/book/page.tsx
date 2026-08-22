"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PricingBreakdown } from "@/components/items/PricingBreakdown";
import { calculateRentalCost, formatDate, formatPrice } from "@/lib/utils";
import { MOCK_ITEMS } from "@/lib/mockData";
import { useItemStore } from "@/store/useItemStore";
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;

  const { getItemById } = useItemStore();
  const item = getItemById(id) || MOCK_ITEMS[0];

  const initialDays = Number(searchParams.get("days")) || 3;
  const discountedPrice = Number(searchParams.get("discountedPrice"));

  const dailyPrice = discountedPrice || item.dailyPrice;
  const [days, setDays] = useState(initialDays);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const { subtotal, platformFee, deposit, total } = calculateRentalCost(
    dailyPrice,
    days,
    item.deposit
  );

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

  const handlePayAndConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(3);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            1
          </div>
          <span className="text-xs font-semibold text-[var(--text-primary)]">Dates</span>
        </div>
        <div className="h-0.5 flex-1 mx-3 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            2
          </div>
          <span className="text-xs font-semibold text-[var(--text-primary)]">Payment</span>
        </div>
        <div className="h-0.5 flex-1 mx-3 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step === 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            3
          </div>
          <span className="text-xs font-semibold text-[var(--text-primary)]">Confirmed</span>
        </div>
      </div>

      {/* Step 1 & 2 Container */}
      {step < 3 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Booking Form */}
          <div className="md:col-span-7 space-y-6">
            {step === 1 && (
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-lg font-black text-[var(--text-primary)]">
                    Choose Rental Duration
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Select how many days you'll need the item
                  </p>
                </div>

                {/* Duration Picker */}
                <div className="grid grid-cols-4 gap-2.5">
                  {[1, 3, 7, 14].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        days === d
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/20"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <span className="block text-base font-extrabold">{d}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {d === 1 ? "Day" : "Days"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom days slider */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Custom Days:</span>
                    <span className="text-blue-600">{days} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Schedule Summary Box */}
                <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Pickup Time:</span>
                    <span className="font-bold text-[var(--text-primary)]">
                      Today, {formatDate(startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Return Deadline:</span>
                    <span className="font-bold text-blue-600">
                      {formatDate(endDate)} (Before 10 PM)
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[var(--border)]">
                    <span className="text-[var(--text-muted)]">Pickup Location:</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {item.location}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-[var(--text-primary)]">
                      Payment Method
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      Secure escrow powered by Razorpay & Stripe
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex w-full items-center justify-between p-4 rounded-2xl border transition-all ${
                      paymentMethod === "upi"
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20"
                        : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        UPI
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-[var(--text-primary)]">
                          Instant UPI / QR Code
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          Google Pay, PhonePe, Paytm, BHIM
                        </p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Fastest</Badge>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex w-full items-center justify-between p-4 rounded-2xl border transition-all ${
                      paymentMethod === "card"
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20"
                        : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-[var(--text-primary)]">
                          Credit / Debit Card
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 border border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                  <Lock className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Your payment of <span className="font-bold text-[var(--text-primary)]">{formatPrice(total)}</span> includes <span className="font-bold text-emerald-600">{formatPrice(deposit)}</span> security deposit which will be returned automatically upon item check-in.
                  </p>
                </div>

                <Button
                  size="lg"
                  variant="accent"
                  isLoading={isProcessing}
                  onClick={handlePayAndConfirm}
                  className="w-full text-base font-bold shadow-lg shadow-emerald-500/20"
                >
                  Pay {formatPrice(total)} & Confirm Rental
                </Button>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Rental Summary
              </h3>

              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-16 w-16 rounded-2xl object-cover border border-[var(--border)]"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {item.location}
                  </p>
                  <p className="text-xs font-bold text-blue-600 mt-1">
                    {formatPrice(dailyPrice)}/day
                  </p>
                </div>
              </div>

              {/* Price breakdown */}
              <PricingBreakdown
                dailyPrice={dailyPrice}
                deposit={item.deposit}
                days={days}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Success Confirmation Screen */}
      {step === 3 && (
        <div className="max-w-xl mx-auto rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-[var(--surface)] p-8 text-center space-y-6 shadow-2xl animate-scale-in">
          <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce-in">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-1.5">
            <Badge variant="success" size="md">Payment Escrowed</Badge>
            <h2 className="text-2xl font-black text-[var(--text-primary)]">
              Rental Booked Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Your rental for <span className="font-bold text-[var(--text-primary)]">{item.title}</span> is confirmed.
            </p>
          </div>

          {/* Rental Card preview */}
          <div className="rounded-2xl bg-[var(--surface-hover)] p-4 text-left border border-[var(--border)] space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Booking Reference:</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">
                #CL-{Math.floor(Math.random() * 900000 + 100000)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Pickup Handoff:</span>
              <span className="font-bold text-[var(--text-primary)]">{item.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Return Deadline:</span>
              <span className="font-bold text-blue-600">{formatDate(endDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Security Deposit Escrow:</span>
              <span className="font-bold text-emerald-600">{formatPrice(item.deposit)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/dashboard" className="flex-1">
              <Button size="md" variant="accent" className="w-full text-xs font-bold">
                View in Rental Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button size="md" variant="outline" className="w-full text-xs font-bold">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
