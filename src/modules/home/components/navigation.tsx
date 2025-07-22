// modules/home/ui/components/navigation.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import DashboardUserButton from "@/modules/dashboard/ui/components/dashboard-user-button";

export const Navigation = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="meet-ai"
                width={32}
                height={32}
                className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground via-primary to-chart-1 bg-clip-text text-transparent group-hover:from-primary group-hover:to-chart-2 transition-all duration-300">
              meet-ai
            </span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            {isPending ? (
              <div className="flex items-center space-x-4">
                <div className="h-8 w-16 bg-muted/50 rounded animate-pulse"></div>
                <div className="h-9 w-24 bg-muted/50 rounded animate-pulse"></div>
              </div>
            ) : session?.user ? (
              <DashboardUserButton />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  Sign In
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-chart-1 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </Link>
                {/* <Link
                  href="/sign-up"
                  className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/90 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-chart-1/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link> */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
