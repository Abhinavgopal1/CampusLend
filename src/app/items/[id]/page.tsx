"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { ImageGallery } from "@/components/items/ImageGallery";
import { PricingBreakdown } from "@/components/items/PricingBreakdown";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { formatPrice } from "@/lib/utils";
import { MOCK_ITEMS, MOCK_REVIEWS } from "@/lib/mockData";
import { useItemStore } from "@/store/useItemStore";
import { useChatStore } from "@/store/useChatStore";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Tag,
  ArrowRight,
  Heart,
  Share2,
  Sparkles,
  Award,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { getItemById, savedItems, toggleSaved } = useItemStore();
  const { openChat } = useChatStore();

  const item = getItemById(id) || MOCK_ITEMS[0];
  const isSaved = savedItems.has(item.id);

  const [rentalDays, setRentalDays] = useState(3);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const itemReviews = MOCK_REVIEWS.filter(
    (r) => r.itemTitle.toLowerCase() === item.title.toLowerCase()
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs & Action Bar */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href={`/search?category=${item.category}`} className="capitalize hover:text-blue-600">
            {item.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-bold truncate max-w-[200px]">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-semibold transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
          <button
            onClick={() => toggleSaved(item.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-semibold transition-colors"
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Photos */}
          <ImageGallery images={item.images} title={item.title} />

          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="success" size="sm" dot>
                    {item.availability === "available" ? "Ready for Pickup" : "Currently Rented"}
                  </Badge>
                  <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase border border-blue-500/20">
                    {item.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-snug">
                  {item.title}
                </h1>
              </div>
            </div>

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-2xl bg-[var(--surface-hover)] p-3.5 border border-[var(--border)] text-xs">
              <div className="space-y-0.5">
                <span className="text-[var(--text-muted)] font-medium">Pickup Spot</span>
                <p className="font-bold text-[var(--text-primary)] flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[var(--text-muted)] font-medium">Condition</span>
                <p className="font-bold text-[var(--text-primary)] capitalize">
                  {item.condition}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[var(--text-muted)] font-medium">Late Fee</span>
                <p className="font-bold text-[var(--text-primary)]">
                  {formatPrice(item.hourlyLateFee)}/hr
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                About this Item
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* AI Safety Protection Banner */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-start gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shrink-0 shadow-md">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                  CampusLend AI Guarantee & Escrow
                </h4>
                <p className="text-xs text-emerald-800/90 dark:text-emerald-300/90 leading-snug">
                  Security deposits are held in smart escrow until return inspection. In case of accidental damage or missing items, our AI chatbot mediates fair compensation instantly.
                </p>
              </div>
            </div>

            {/* Owner Profile Card */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Lender Information
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Avatar
                    name={item.ownerName}
                    src={item.ownerAvatar}
                    size="lg"
                    verified={item.ownerVerified}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">
                        {item.ownerName}
                      </h4>
                      {item.ownerVerified && (
                        <Badge size="sm" variant="success">Verified Student</Badge>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      BML Munjal University • Response time: {item.ownerVerified ? "< 30 mins" : "< 2 hours"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <StarRating rating={item.ownerRating} size="md" showNumber />
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    12 rentals completed
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div id="review" className="space-y-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    Ratings & Reviews
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Feedback from students who rented this item
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-xs"
                >
                  {showReviewForm ? "Cancel" : "Write Review"}
                </Button>
              </div>

              {showReviewForm && (
                <ReviewForm
                  itemTitle={item.title}
                  onSubmit={() => setShowReviewForm(false)}
                />
              )}

              <div className="space-y-3">
                {(itemReviews.length > 0 ? itemReviews : MOCK_REVIEWS.slice(0, 2)).map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking & Bargain Box */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            {/* Main Booking Card */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl space-y-5">
              <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[var(--text-primary)]">
                      {formatPrice(item.dailyPrice)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-bold">/ day</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Weekly rate: {formatPrice(item.weeklyPrice)}/week (Save 20%)
                  </p>
                </div>

                <Badge variant="success" size="md">
                  ★ {item.ownerRating.toFixed(1)}
                </Badge>
              </div>

              {/* Price Calculation Widget */}
              <PricingBreakdown
                dailyPrice={item.dailyPrice}
                deposit={item.deposit}
                days={rentalDays}
                onDaysChange={setRentalDays}
              />

              {/* CTA Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href={`/items/${item.id}/book?days=${rentalDays}`}
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    variant="accent"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full text-base font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Rent Now ({rentalDays} {rentalDays === 1 ? "Day" : "Days"})
                  </Button>
                </Link>

                {/* Anonymous Bargain Button */}
                <Link
                  href={`/negotiate/${item.id}`}
                  className="block w-full"
                >
                  <Button
                    size="md"
                    variant="outline"
                    icon={Tag}
                    className="w-full text-xs font-bold border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                  >
                    Negotiate Price Anonymously
                  </Button>
                </Link>
              </div>

              {/* Security reassurance */}
              <div className="text-[11px] text-[var(--text-muted)] text-center space-y-1 pt-1">
                <p>🔒 100% Refundable deposit upon safe return</p>
                <p>🤝 Fast handoff on BML Munjal University campus</p>
              </div>
            </div>

            {/* AI Dispute Help Assistant Card */}
            <div className="rounded-3xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin-slow" />
                <div className="text-xs">
                  <p className="font-bold text-[var(--text-primary)]">Need advice before renting?</p>
                  <p className="text-[var(--text-muted)]">Ask AI for fair rate advice</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => openChat("general")}
                className="text-xs h-8"
              >
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
