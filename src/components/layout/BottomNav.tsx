"use client";

import { BOTTOM_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  // Don't show bottom nav on full-screen admin or auth pages if desired, or keep consistent
  const hideOnPaths = ["/login", "/register", "/forgot-password"];
  if (hideOnPaths.includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-lg safe-bottom">
      <div className="flex h-16 items-center justify-around px-2">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const isCenter = item.id === "list";
          const Icon = item.icon;

          if (isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative -top-4 flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-110 active:scale-95">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-bold scale-105"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                {item.id === "messages" && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[var(--surface)]" />
                )}
              </div>
              <span className="mt-1 text-[10px] tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
