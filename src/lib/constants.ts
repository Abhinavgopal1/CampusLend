// ============================================================
// CampusLend AI — Application Constants
// ============================================================

import {
  Laptop,
  BookOpen,
  Dumbbell,
  Shirt,
  Bed,
  Car,
  Package,
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
  type LucideIcon,
} from "lucide-react";

// ----------------------------------------------------------
// Categories
// ----------------------------------------------------------
export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  gradient: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop,
    gradient: "from-blue-500 to-indigo-600",
    itemCount: 124,
  },
  {
    id: "books",
    name: "Books",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-600",
    itemCount: 89,
  },
  {
    id: "sports",
    name: "Sports Equipment",
    icon: Dumbbell,
    gradient: "from-emerald-500 to-teal-600",
    itemCount: 56,
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    gradient: "from-pink-500 to-rose-600",
    itemCount: 73,
  },
  {
    id: "hostel",
    name: "Hostel Essentials",
    icon: Bed,
    gradient: "from-purple-500 to-violet-600",
    itemCount: 41,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    icon: Car,
    gradient: "from-cyan-500 to-blue-600",
    itemCount: 28,
  },
  {
    id: "misc",
    name: "Miscellaneous",
    icon: Package,
    gradient: "from-gray-500 to-slate-600",
    itemCount: 67,
  },
];

// ----------------------------------------------------------
// Navigation
// ----------------------------------------------------------
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "search", label: "Search", href: "/search", icon: Search },
  { id: "list", label: "Sell / Rent", href: "/list-item", icon: PlusCircle },
  { id: "messages", label: "Messages", href: "/messages", icon: MessageCircle },
  { id: "profile", label: "Profile", href: "/profile", icon: User },
];

// ----------------------------------------------------------
// Rental Statuses
// ----------------------------------------------------------
export type RentalStatus =
  | "pending"
  | "active"
  | "completed"
  | "overdue"
  | "cancelled"
  | "disputed";

export const RENTAL_STATUS_CONFIG: Record<
  RentalStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
  active: {
    label: "Active",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  completed: {
    label: "Completed",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  overdue: {
    label: "Overdue",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-950/30",
  },
  disputed: {
    label: "Disputed",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
};

// ----------------------------------------------------------
// Item Conditions
// ----------------------------------------------------------
export const ITEM_CONDITIONS = [
  { value: "new", label: "Brand New", description: "Never used, in original packaging" },
  { value: "like-new", label: "Like New", description: "Used once or twice, mint condition" },
  { value: "good", label: "Good", description: "Minor wear, fully functional" },
  { value: "fair", label: "Fair", description: "Visible wear, works perfectly" },
  { value: "worn", label: "Well Used", description: "Significant wear, still functional" },
] as const;

// ----------------------------------------------------------
// Platform Config
// ----------------------------------------------------------
export const PLATFORM_FEE_PERCENT = 5;
export const BUYER_PROTECTION_FEE_PERCENT = 2;
export const MAX_IMAGES_PER_LISTING = 8;
export const MAX_REVIEW_LENGTH = 500;
export const MIN_RENTAL_DAYS = 1;
export const MAX_RENTAL_DAYS = 30;

export const PUBLIC_HANDOFF_SPOTS = [
  "Central Library entrance",
  "Student Activity Centre help desk",
  "Academic Block 1 security desk",
  "Sports Complex reception",
  "Main Gate security kiosk",
] as const;

// ----------------------------------------------------------
// Rating Labels
// ----------------------------------------------------------
export const RATING_CATEGORIES = [
  { id: "communication", label: "Communication" },
  { id: "itemCondition", label: "Item Condition" },
  { id: "timeliness", label: "Timeliness" },
  { id: "overall", label: "Overall Experience" },
] as const;

// ----------------------------------------------------------
// Nicknames for Anonymous Negotiation
// ----------------------------------------------------------
export const ANIMAL_NAMES = [
  "Panda", "Fox", "Owl", "Wolf", "Eagle", "Dolphin", "Tiger",
  "Hawk", "Bear", "Falcon", "Lynx", "Raven", "Otter", "Cobra",
  "Phoenix", "Dragon", "Panther", "Jaguar", "Sparrow", "Shark",
];

export const COLOR_NAMES = [
  "Blue", "Red", "Green", "Purple", "Gold", "Silver", "Crimson",
  "Azure", "Jade", "Amber", "Ruby", "Onyx", "Coral", "Teal",
  "Indigo", "Violet", "Scarlet", "Sage", "Copper", "Ivory",
];

export const generateNickname = (): string => {
  const color = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
  const animal = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${color}${animal}${num}`;
};
