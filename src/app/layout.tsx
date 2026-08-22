import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { AIChatbot } from "@/components/chat/AIChatbot";

export const metadata: Metadata = {
  title: "CampusLend AI — Buy, Sell & Rent on Campus",
  description:
    "A verified student marketplace to buy, sell, and rent campus essentials with anonymous chats and protected public handoffs.",
  keywords: [
    "campus rental",
    "student lending",
    "student marketplace",
    "campus buy and sell",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
      <body className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] antialiased selection:bg-blue-500/20 selection:text-blue-700">
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
