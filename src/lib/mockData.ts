// ============================================================
// CampusLend AI — Mock Data
// ============================================================

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  department: string;
  rating: number;
  totalRentals: number;
  totalListings: number;
  totalEarnings: number;
  totalSpent: number;
  verified: boolean;
  joinedDate: string;
  responseTime: string;
}

export type ListingMode = "rent" | "sale" | "both";
export type SaleStatus = "available" | "reserved" | "sold";

export interface MockItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  dailyPrice: number;
  weeklyPrice: number;
  listingMode?: ListingMode;
  salePrice?: number;
  saleStatus?: SaleStatus;
  deposit: number;
  condition: string;
  location: string;
  availability: "available" | "rented" | "paused";
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRating: number;
  ownerVerified: boolean;
  createdAt: string;
  hourlyLateFee: number;
  views: number;
  savedCount: number;
}

export interface MockRental {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  borrowerId: string;
  lenderId: string;
  startDate: string;
  endDate: string;
  dailyRate: number;
  totalCost: number;
  deposit: number;
  status: "pending" | "active" | "completed" | "overdue" | "cancelled" | "disputed";
  hourlyLateFee: number;
}

export interface MockReview {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  communication: number;
  itemCondition: number;
  timeliness: number;
  comment: string;
  date: string;
  itemTitle: string;
}

export interface MockMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: "rental" | "negotiation" | "support";
  itemId?: string;
  itemTitle?: string;
}

export interface MockNegotiation {
  id: string;
  itemId: string;
  itemTitle: string;
  messages: {
    id: string;
    sender: "buyer" | "seller" | "ai";
    nickname: string;
    content: string;
    timestamp: string;
    type: "text" | "offer" | "suggestion";
    amount?: number;
    status?: "pending" | "accepted" | "declined";
  }[];
}

// ----------------------------------------------------------
// Users
// ----------------------------------------------------------
export const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "BluePanda42",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BluePanda42",
    college: "BML Munjal University",
    department: "Computer Science",
    rating: 4.8,
    totalRentals: 23,
    totalListings: 8,
    totalEarnings: 12450,
    totalSpent: 8200,
    verified: true,
    joinedDate: "2025-08-15",
    responseTime: "< 1 hour",
  },
  {
    id: "u2",
    name: "JadeOwl27",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadeOwl27",
    college: "BML Munjal University",
    department: "Electrical Engineering",
    rating: 4.9,
    totalRentals: 31,
    totalListings: 12,
    totalEarnings: 18900,
    totalSpent: 5600,
    verified: true,
    joinedDate: "2025-06-20",
    responseTime: "< 30 min",
  },
  {
    id: "u3",
    name: "AmberFox63",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=AmberFox63",
    college: "BML Munjal University",
    department: "Mechanical Engineering",
    rating: 4.5,
    totalRentals: 15,
    totalListings: 5,
    totalEarnings: 7800,
    totalSpent: 11200,
    verified: true,
    joinedDate: "2025-09-01",
    responseTime: "< 2 hours",
  },
  {
    id: "u4",
    name: "IndigoOtter51",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=IndigoOtter51",
    college: "BML Munjal University",
    department: "Design",
    rating: 4.7,
    totalRentals: 19,
    totalListings: 7,
    totalEarnings: 9400,
    totalSpent: 6800,
    verified: true,
    joinedDate: "2025-07-10",
    responseTime: "< 1 hour",
  },
  {
    id: "u5",
    name: "CoralLynx34",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=CoralLynx34",
    college: "BML Munjal University",
    department: "Civil Engineering",
    rating: 4.3,
    totalRentals: 8,
    totalListings: 3,
    totalEarnings: 3200,
    totalSpent: 4500,
    verified: false,
    joinedDate: "2026-01-15",
    responseTime: "< 3 hours",
  },
  {
    id: "u6",
    name: "SilverRaven76",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SilverRaven76",
    college: "BML Munjal University",
    department: "Biotechnology",
    rating: 4.6,
    totalRentals: 14,
    totalListings: 6,
    totalEarnings: 8100,
    totalSpent: 7200,
    verified: true,
    joinedDate: "2025-10-05",
    responseTime: "< 1 hour",
  },
  {
    id: "u7",
    name: "TealFalcon18",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TealFalcon18",
    college: "BML Munjal University",
    department: "Physics",
    rating: 4.4,
    totalRentals: 11,
    totalListings: 4,
    totalEarnings: 5600,
    totalSpent: 9800,
    verified: true,
    joinedDate: "2025-11-20",
    responseTime: "< 2 hours",
  },
  {
    id: "u8",
    name: "VioletDolphin84",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=VioletDolphin84",
    college: "BML Munjal University",
    department: "Mathematics",
    rating: 4.9,
    totalRentals: 27,
    totalListings: 10,
    totalEarnings: 15600,
    totalSpent: 4200,
    verified: true,
    joinedDate: "2025-05-01",
    responseTime: "< 15 min",
  },
  {
    id: "u9",
    name: "BlueOwl29",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BlueOwl29",
    college: "BML Munjal University",
    department: "Chemical Engineering",
    rating: 4.2,
    totalRentals: 6,
    totalListings: 2,
    totalEarnings: 2400,
    totalSpent: 3600,
    verified: false,
    joinedDate: "2026-03-10",
    responseTime: "< 4 hours",
  },
  {
    id: "u10",
    name: "JadePanda67",
    email: "",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadePanda67",
    college: "BML Munjal University",
    department: "Economics",
    rating: 4.7,
    totalRentals: 20,
    totalListings: 9,
    totalEarnings: 11200,
    totalSpent: 5800,
    verified: true,
    joinedDate: "2025-08-25",
    responseTime: "< 45 min",
  },
];

// ----------------------------------------------------------
// Items
// ----------------------------------------------------------
export const MOCK_ITEMS: MockItem[] = [
  {
    id: "i1",
    title: "MacBook Pro 14\" M3",
    description:
      "2024 MacBook Pro 14-inch with M3 chip, 16GB RAM, 512GB SSD. Perfect for coding assignments, video editing, or presentations. Comes with charger and protective sleeve. Battery health at 95%.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
    ],
    category: "electronics",
    dailyPrice: 500,
    weeklyPrice: 2800,
    deposit: 5000,
    condition: "like-new",
    location: "Main Library Entrance",
    availability: "available",
    ownerId: "u2",
    ownerName: "JadeOwl27",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadeOwl27",
    ownerRating: 4.9,
    ownerVerified: true,
    createdAt: "2026-08-10",
    hourlyLateFee: 50,
    views: 234,
    savedCount: 18,
  },
  {
    id: "i2",
    title: "Canon EOS R50 Camera Kit",
    description:
      "Mirrorless camera with 18-45mm lens. Great for photography projects, events, and content creation. Includes camera bag, extra battery, and 64GB SD card.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    ],
    category: "electronics",
    dailyPrice: 350,
    weeklyPrice: 2000,
    deposit: 8000,
    condition: "good",
    location: "Main Library Entrance",
    availability: "available",
    ownerId: "u1",
    ownerName: "BluePanda42",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BluePanda42",
    ownerRating: 4.8,
    ownerVerified: true,
    createdAt: "2026-08-05",
    hourlyLateFee: 40,
    views: 189,
    savedCount: 24,
  },
  {
    id: "i3",
    title: "Engineering Mathematics (Kreyszig) + Solutions",
    description:
      "Advanced Engineering Mathematics by Erwin Kreyszig, 10th Edition. Includes solutions manual. Perfect for MTH101/MTH201. Highlighted but in great condition.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    ],
    category: "books",
    dailyPrice: 30,
    weeklyPrice: 150,
    listingMode: "sale",
    salePrice: 850,
    saleStatus: "available",
    deposit: 200,
    condition: "good",
    location: "Academic Block A Reception",
    availability: "available",
    ownerId: "u8",
    ownerName: "VioletDolphin84",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=VioletDolphin84",
    ownerRating: 4.9,
    ownerVerified: true,
    createdAt: "2026-08-12",
    hourlyLateFee: 5,
    views: 312,
    savedCount: 45,
  },
  {
    id: "i4",
    title: "Badminton Racket Set (Yonex)",
    description:
      "Yonex Astrox 88D Pro racket set (2 rackets) with shuttlecocks (6 pack) and carrying case. Tournament grade. String tension: 24 lbs.",
    images: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      "https://images.unsplash.com/photo-1613918431703-aa50889e3be3?w=800",
    ],
    category: "sports",
    dailyPrice: 100,
    weeklyPrice: 500,
    listingMode: "both",
    salePrice: 3200,
    saleStatus: "available",
    deposit: 1000,
    condition: "good",
    location: "Sports Complex Gate",
    availability: "available",
    ownerId: "u3",
    ownerName: "AmberFox63",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=AmberFox63",
    ownerRating: 4.5,
    ownerVerified: true,
    createdAt: "2026-08-08",
    hourlyLateFee: 15,
    views: 156,
    savedCount: 12,
  },
  {
    id: "i5",
    title: "Formal Suit (Navy Blue, Size 40)",
    description:
      "Raymond Navy Blue formal suit set - blazer + trousers. Size 40 (M). Dry cleaned after each rental. Perfect for placements, presentations, and formal events.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
      "https://images.unsplash.com/photo-1507679799987-c73b1543f954?w=800",
    ],
    category: "fashion",
    dailyPrice: 200,
    weeklyPrice: 800,
    deposit: 2000,
    condition: "like-new",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u4",
    ownerName: "IndigoOtter51",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=IndigoOtter51",
    ownerRating: 4.7,
    ownerVerified: true,
    createdAt: "2026-08-01",
    hourlyLateFee: 25,
    views: 267,
    savedCount: 31,
  },
  {
    id: "i6",
    title: "Mini Fridge (45L)",
    description:
      "Compact 45-liter mini fridge, perfect for compact spaces. Energy efficient, quiet operation. Includes small freezer compartment. Clean and well-maintained.",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800",
    ],
    category: "hostel",
    dailyPrice: 80,
    weeklyPrice: 400,
    listingMode: "sale",
    salePrice: 3800,
    saleStatus: "available",
    deposit: 1500,
    condition: "good",
    location: "Student Centre Help Desk",
    availability: "rented",
    ownerId: "u6",
    ownerName: "SilverRaven76",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SilverRaven76",
    ownerRating: 4.6,
    ownerVerified: true,
    createdAt: "2026-07-20",
    hourlyLateFee: 10,
    views: 198,
    savedCount: 22,
  },
  {
    id: "i7",
    title: "Honda Activa 6G Scooter",
    description:
      "2024 Honda Activa 6G, well maintained. Full tank included. Helmet provided. Valid insurance and registration. Perfect for campus commute and city trips.",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    ],
    category: "vehicles",
    dailyPrice: 300,
    weeklyPrice: 1500,
    deposit: 3000,
    condition: "good",
    location: "Sports Complex Gate",
    availability: "available",
    ownerId: "u7",
    ownerName: "TealFalcon18",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TealFalcon18",
    ownerRating: 4.4,
    ownerVerified: true,
    createdAt: "2026-08-14",
    hourlyLateFee: 35,
    views: 412,
    savedCount: 38,
  },
  {
    id: "i8",
    title: "iPad Air M2 + Apple Pencil",
    description:
      "iPad Air M2 (2024) 11-inch, 256GB, Space Gray. Comes with Apple Pencil Pro and Smart Folio case. Great for note-taking, design work, and studying.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800",
    ],
    category: "electronics",
    dailyPrice: 400,
    weeklyPrice: 2200,
    deposit: 6000,
    condition: "like-new",
    location: "Main Library Entrance",
    availability: "available",
    ownerId: "u10",
    ownerName: "JadePanda67",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadePanda67",
    ownerRating: 4.7,
    ownerVerified: true,
    createdAt: "2026-08-15",
    hourlyLateFee: 45,
    views: 345,
    savedCount: 29,
  },
  {
    id: "i9",
    title: "Projector (Full HD, Portable)",
    description:
      "ViewSonic M2e portable Full HD projector. 1080p, built-in Harman Kardon speakers. Auto keystone correction. Great for movie nights, presentations, and group study sessions.",
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    ],
    category: "electronics",
    dailyPrice: 250,
    weeklyPrice: 1200,
    deposit: 4000,
    condition: "good",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u1",
    ownerName: "BluePanda42",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BluePanda42",
    ownerRating: 4.8,
    ownerVerified: true,
    createdAt: "2026-08-02",
    hourlyLateFee: 30,
    views: 178,
    savedCount: 15,
  },
  {
    id: "i10",
    title: "Guitar (Yamaha F310 Acoustic)",
    description:
      "Yamaha F310 acoustic guitar with gig bag, capo, picks, and tuner. Great for beginners and intermediate players. Well-maintained with no buzzing issues.",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800",
    ],
    category: "misc",
    dailyPrice: 70,
    weeklyPrice: 350,
    listingMode: "both",
    salePrice: 7200,
    saleStatus: "available",
    deposit: 800,
    condition: "good",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u4",
    ownerName: "IndigoOtter51",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=IndigoOtter51",
    ownerRating: 4.7,
    ownerVerified: true,
    createdAt: "2026-08-11",
    hourlyLateFee: 10,
    views: 203,
    savedCount: 27,
  },
  {
    id: "i11",
    title: "Sleeping Bag (Coleman)",
    description:
      "Coleman Breckenridge sleeping bag. Rated for 0°C. Lightweight and compact. Perfect for treks, overnight trips, or in chilly weather!",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    ],
    category: "hostel",
    dailyPrice: 50,
    weeklyPrice: 250,
    deposit: 500,
    condition: "good",
    location: "Main Library Entrance",
    availability: "available",
    ownerId: "u5",
    ownerName: "CoralLynx34",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=CoralLynx34",
    ownerRating: 4.3,
    ownerVerified: false,
    createdAt: "2026-08-13",
    hourlyLateFee: 8,
    views: 89,
    savedCount: 7,
  },
  {
    id: "i12",
    title: "TI-84 Plus CE Calculator",
    description:
      "Texas Instruments TI-84 Plus CE graphing calculator. Essential for math, physics, and engineering courses. Fully functional with fresh batteries.",
    images: [
      "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800",
    ],
    category: "electronics",
    dailyPrice: 40,
    weeklyPrice: 200,
    listingMode: "both",
    salePrice: 6800,
    saleStatus: "available",
    deposit: 500,
    condition: "good",
    location: "Academic Block A Reception",
    availability: "available",
    ownerId: "u8",
    ownerName: "VioletDolphin84",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=VioletDolphin84",
    ownerRating: 4.9,
    ownerVerified: true,
    createdAt: "2026-08-16",
    hourlyLateFee: 5,
    views: 145,
    savedCount: 11,
  },
  {
    id: "i13",
    title: "Cycling Kit (Decathlon Btwin)",
    description:
      "Complete cycling kit: Btwin Riverside 500 bicycle, helmet, lock, and pump. Perfect for campus commute. Recently serviced with new brake pads.",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
    ],
    category: "vehicles",
    dailyPrice: 120,
    weeklyPrice: 600,
    deposit: 2000,
    condition: "good",
    location: "Sports Complex Gate",
    availability: "available",
    ownerId: "u3",
    ownerName: "AmberFox63",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=AmberFox63",
    ownerRating: 4.5,
    ownerVerified: true,
    createdAt: "2026-08-09",
    hourlyLateFee: 15,
    views: 267,
    savedCount: 19,
  },
  {
    id: "i14",
    title: "JBL Flip 6 Bluetooth Speaker",
    description:
      "JBL Flip 6 portable Bluetooth speaker. IP67 waterproof. 12-hour battery life. PartyBoost enabled. Amazing sound quality for campus events and outdoor events.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    ],
    category: "electronics",
    dailyPrice: 100,
    weeklyPrice: 500,
    deposit: 1500,
    condition: "like-new",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u6",
    ownerName: "SilverRaven76",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SilverRaven76",
    ownerRating: 4.6,
    ownerVerified: true,
    createdAt: "2026-08-17",
    hourlyLateFee: 12,
    views: 156,
    savedCount: 14,
  },
  {
    id: "i15",
    title: "Tripod + Ring Light Kit",
    description:
      "Professional 72-inch tripod with 18-inch ring light. USB powered with 3 color modes. Phone holder included. Perfect for video calls, content creation, and photography.",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800",
    ],
    category: "electronics",
    dailyPrice: 80,
    weeklyPrice: 400,
    deposit: 1000,
    condition: "good",
    location: "Academic Block A Reception",
    availability: "rented",
    ownerId: "u2",
    ownerName: "JadeOwl27",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadeOwl27",
    ownerRating: 4.9,
    ownerVerified: true,
    createdAt: "2026-08-07",
    hourlyLateFee: 10,
    views: 201,
    savedCount: 16,
  },
  {
    id: "i16",
    title: "DSA & Algorithm Books Bundle",
    description:
      "Bundle of 3 essential CS books: CLRS Introduction to Algorithms, Cracking the Coding Interview, and Competitive Programming Handbook. All in great condition.",
    images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    ],
    category: "books",
    dailyPrice: 50,
    weeklyPrice: 250,
    listingMode: "sale",
    salePrice: 1100,
    saleStatus: "available",
    deposit: 400,
    condition: "good",
    location: "Main Library Entrance",
    availability: "available",
    ownerId: "u9",
    ownerName: "BlueOwl29",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BlueOwl29",
    ownerRating: 4.2,
    ownerVerified: false,
    createdAt: "2026-08-06",
    hourlyLateFee: 8,
    views: 378,
    savedCount: 52,
  },
  {
    id: "i17",
    title: "Table Tennis Set",
    description:
      "Butterfly table tennis set: 2 rackets (Timo Boll series), 6 3-star balls, and a carrying case. Professional quality for serious players.",
    images: [
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800",
    ],
    category: "sports",
    dailyPrice: 60,
    weeklyPrice: 300,
    listingMode: "both",
    salePrice: 1450,
    saleStatus: "available",
    deposit: 700,
    condition: "good",
    location: "Sports Complex Gate",
    availability: "available",
    ownerId: "u7",
    ownerName: "TealFalcon18",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TealFalcon18",
    ownerRating: 4.4,
    ownerVerified: true,
    createdAt: "2026-08-04",
    hourlyLateFee: 8,
    views: 123,
    savedCount: 9,
  },
  {
    id: "i18",
    title: "Electric Kettle + Coffee Maker",
    description:
      "Combo: 1.5L electric kettle with temperature control + pour-over coffee maker with filters. Useful for campus life. Makes perfect chai and coffee!",
    images: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
    ],
    category: "hostel",
    dailyPrice: 40,
    weeklyPrice: 180,
    listingMode: "sale",
    salePrice: 1650,
    saleStatus: "available",
    deposit: 400,
    condition: "good",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u10",
    ownerName: "JadePanda67",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadePanda67",
    ownerRating: 4.7,
    ownerVerified: true,
    createdAt: "2026-08-03",
    hourlyLateFee: 5,
    views: 167,
    savedCount: 20,
  },
  {
    id: "i19",
    title: "Arduino Uno Starter Kit",
    description:
      "Complete Arduino Uno R4 starter kit with breadboard, LEDs, sensors, motors, wires, and project book. Everything you need for embedded systems coursework.",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800",
    ],
    category: "electronics",
    dailyPrice: 60,
    weeklyPrice: 300,
    listingMode: "both",
    salePrice: 2350,
    saleStatus: "available",
    deposit: 800,
    condition: "good",
    location: "Academic Block A Reception",
    availability: "available",
    ownerId: "u1",
    ownerName: "BluePanda42",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BluePanda42",
    ownerRating: 4.8,
    ownerVerified: true,
    createdAt: "2026-08-18",
    hourlyLateFee: 8,
    views: 98,
    savedCount: 8,
  },
  {
    id: "i20",
    title: "Lehenga Choli Set (Designer)",
    description:
      "Beautiful designer lehenga choli in royal blue with gold embroidery. Size M/L (adjustable). Dry cleaned and ready. Perfect for freshers' party or cultural events.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    ],
    category: "fashion",
    dailyPrice: 300,
    weeklyPrice: 1200,
    deposit: 3000,
    condition: "like-new",
    location: "Student Centre Help Desk",
    availability: "available",
    ownerId: "u4",
    ownerName: "IndigoOtter51",
    ownerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=IndigoOtter51",
    ownerRating: 4.7,
    ownerVerified: true,
    createdAt: "2026-08-16",
    hourlyLateFee: 30,
    views: 445,
    savedCount: 56,
  },
];

// ----------------------------------------------------------
// Rentals
// ----------------------------------------------------------
const now = new Date();
const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString();
};

export const MOCK_RENTALS: MockRental[] = [
  {
    id: "r1",
    itemId: "i1",
    itemTitle: "MacBook Pro 14\" M3",
    itemImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    borrowerId: "u1",
    lenderId: "u2",
    startDate: addDays(now, -2),
    endDate: addDays(now, 3),
    dailyRate: 500,
    totalCost: 2625,
    deposit: 5000,
    status: "active",
    hourlyLateFee: 50,
  },
  {
    id: "r2",
    itemId: "i6",
    itemTitle: "Mini Fridge (45L)",
    itemImage: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
    borrowerId: "u3",
    lenderId: "u6",
    startDate: addDays(now, -10),
    endDate: addDays(now, -1),
    dailyRate: 80,
    totalCost: 840,
    deposit: 1500,
    status: "overdue",
    hourlyLateFee: 10,
  },
  {
    id: "r3",
    itemId: "i15",
    itemTitle: "Tripod + Ring Light Kit",
    itemImage: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400",
    borrowerId: "u1",
    lenderId: "u2",
    startDate: addDays(now, -5),
    endDate: addDays(now, -3),
    dailyRate: 80,
    totalCost: 168,
    deposit: 1000,
    status: "completed",
    hourlyLateFee: 10,
  },
  {
    id: "r4",
    itemId: "i8",
    itemTitle: "iPad Air M2 + Apple Pencil",
    itemImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    borrowerId: "u5",
    lenderId: "u10",
    startDate: addDays(now, 1),
    endDate: addDays(now, 5),
    dailyRate: 400,
    totalCost: 2100,
    deposit: 6000,
    status: "pending",
    hourlyLateFee: 45,
  },
  {
    id: "r5",
    itemId: "i4",
    itemTitle: "Badminton Racket Set (Yonex)",
    itemImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400",
    borrowerId: "u1",
    lenderId: "u3",
    startDate: addDays(now, -7),
    endDate: addDays(now, -5),
    dailyRate: 100,
    totalCost: 210,
    deposit: 1000,
    status: "completed",
    hourlyLateFee: 15,
  },
];

// ----------------------------------------------------------
// Reviews
// ----------------------------------------------------------
export const MOCK_REVIEWS: MockReview[] = [
  {
    id: "rev1",
    reviewerName: "BluePanda42",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=BluePanda42",
    rating: 5,
    communication: 5,
    itemCondition: 5,
    timeliness: 5,
    comment:
      "The lender's MacBook was in excellent condition. Super responsive to messages and flexible with pickup timing. Highly recommend!",
    date: "2026-08-15",
    itemTitle: "MacBook Pro 14\" M3",
  },
  {
    id: "rev2",
    reviewerName: "AmberFox63",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=AmberFox63",
    rating: 4,
    communication: 4,
    itemCondition: 4,
    timeliness: 5,
    comment:
      "Good camera, worked great for my project. Minor scratch on the lens cap but didn't affect photos. Would rent again.",
    date: "2026-08-10",
    itemTitle: "Canon EOS R50 Camera Kit",
  },
  {
    id: "rev3",
    reviewerName: "IndigoOtter51",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=IndigoOtter51",
    rating: 5,
    communication: 5,
    itemCondition: 5,
    timeliness: 4,
    comment:
      "The lender's book set was a lifesaver during exam prep. Clear highlights and the solutions manual was super helpful. Thank you!",
    date: "2026-08-12",
    itemTitle: "Engineering Mathematics (Kreyszig) + Solutions",
  },
  {
    id: "rev4",
    reviewerName: "SilverRaven76",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SilverRaven76",
    rating: 4.5,
    communication: 5,
    itemCondition: 4,
    timeliness: 5,
    comment:
      "The formal suit fit perfectly for my placement interview. Clean and well-maintained. The lender was super helpful with sizing advice!",
    date: "2026-08-08",
    itemTitle: "Formal Suit (Navy Blue, Size 40)",
  },
  {
    id: "rev5",
    reviewerName: "TealFalcon18",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TealFalcon18",
    rating: 4,
    communication: 3,
    itemCondition: 5,
    timeliness: 4,
    comment:
      "iPad was in pristine condition and the Apple Pencil worked flawlessly. Owner took a bit to respond but overall great experience.",
    date: "2026-08-14",
    itemTitle: "iPad Air M2 + Apple Pencil",
  },
  {
    id: "rev6",
    reviewerName: "JadePanda67",
    reviewerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JadePanda67",
    rating: 5,
    communication: 5,
    itemCondition: 5,
    timeliness: 5,
    comment:
      "The lender's projector was amazing for our campus movie night. Setup was easy and picture quality was brilliant. 10/10!",
    date: "2026-08-06",
    itemTitle: "Projector (Full HD, Portable)",
  },
];

// ----------------------------------------------------------
// Messages
// ----------------------------------------------------------
export const MOCK_MESSAGES: MockMessage[] = [
  {
    id: "msg1",
    senderId: "u2",
    senderName: "Campus Peer",
    senderAvatar: "https://api.dicebear.com/9.x/shapes/svg?seed=peer-u2",
    lastMessage: "The verified public handoff point works for me after 5 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    unread: 2,
    type: "rental",
    itemId: "i1",
    itemTitle: "MacBook Pro 14\" M3",
  },
  {
    id: "msg2",
    senderId: "u3",
    senderName: "Campus Peer",
    senderAvatar: "https://api.dicebear.com/9.x/shapes/svg?seed=peer-u3",
    lastMessage: "How about ₹80/day instead? I'll need it for a week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unread: 0,
    type: "negotiation",
    itemId: "i4",
    itemTitle: "Badminton Racket Set (Yonex)",
  },
  {
    id: "msg3",
    senderId: "system",
    senderName: "CampusLend AI Support",
    senderAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=AI",
    lastMessage: "Your refund of ₹500 has been processed successfully.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: 1,
    type: "support",
  },
  {
    id: "msg4",
    senderId: "u8",
    senderName: "Campus Peer",
    senderAvatar: "https://api.dicebear.com/9.x/shapes/svg?seed=peer-u8",
    lastMessage: "Thanks for returning the book on time! Left you a 5-star review 🌟",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    unread: 0,
    type: "rental",
    itemId: "i3",
    itemTitle: "Engineering Mathematics (Kreyszig) + Solutions",
  },
  {
    id: "msg5",
    senderId: "u4",
    senderName: "Campus Peer",
    senderAvatar: "https://api.dicebear.com/9.x/shapes/svg?seed=peer-u4",
    lastMessage: "I can do ₹250/day for the lehenga. Final offer!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    unread: 0,
    type: "negotiation",
    itemId: "i20",
    itemTitle: "Lehenga Choli Set (Designer)",
  },
];

// ----------------------------------------------------------
// Negotiation
// ----------------------------------------------------------
export const MOCK_NEGOTIATION: MockNegotiation = {
  id: "neg1",
  itemId: "i1",
  itemTitle: "MacBook Pro 14\" M3",
  messages: [
    {
      id: "n1",
      sender: "ai",
      nickname: "CampusLend AI",
      content:
        "Welcome to anonymous negotiation! Based on market data, the fair price for this MacBook Pro rental is ₹450-550/day. Current listed price: ₹500/day.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      type: "suggestion",
    },
    {
      id: "n2",
      sender: "buyer",
      nickname: "BluePanda42",
      content: "Hey! I need the MacBook for a week. Can we do a better rate?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      type: "text",
    },
    {
      id: "n3",
      sender: "seller",
      nickname: "GoldFalcon17",
      content: "Hi! For a full week, I can offer a small discount.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      type: "text",
    },
    {
      id: "n4",
      sender: "buyer",
      nickname: "BluePanda42",
      content: "How about this?",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      type: "offer",
      amount: 2500,
      status: "declined",
    },
    {
      id: "n5",
      sender: "seller",
      nickname: "GoldFalcon17",
      content: "That's a bit low. Counter offer:",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: "offer",
      amount: 2800,
      status: "pending",
    },
    {
      id: "n6",
      sender: "ai",
      nickname: "CampusLend AI",
      content:
        "💡 The seller's counter-offer of ₹2,800/week (₹400/day) is 6% below market rate. This is a good deal!",
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
      type: "suggestion",
    },
  ],
};

// ----------------------------------------------------------
// Current user (logged in)
// ----------------------------------------------------------
export const CURRENT_USER = MOCK_USERS[0]; // BluePanda42
