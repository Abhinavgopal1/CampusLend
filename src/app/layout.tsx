import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { AIChatbot } from "@/components/chat/AIChatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusLend AI — Peer-to-Peer Micro-Lending for Students",
  description:
    "The hyperlocal, AI-powered campus marketplace for college students. Rent laptops, books, sports gear, cameras, and hostel essentials with verified safety.",
  keywords: [
    "campus rental",
    "student lending",
    "peer to peer rental",
    "college marketplace",
    "AI damage assessment",
    "BML Munjal University campus lend",
    "BMU rental marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('campuslend-theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] antialiased selection:bg-blue-500/20 selection:text-blue-700">
        <div className="flex min-h-screen flex-col">
          <TopNav />
          <div className="flex-1 pb-20 lg:pb-10">{children}</div>
          <BottomNav />
          <AIChatbot />
        </div>
      </body>
    </html>
  );
}
