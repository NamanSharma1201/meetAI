// modules/home/ui/components/pricing-section.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Lock, Users, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const PricingSection = () => {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  if (isPending) {
    return (
      <section
        id="pricing"
        className="py-24 flex justify-center items-center min-h-[400px]"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Loading pricing...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-chart-1/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {isLoggedIn ? (
          /* Logged in users - Upgrade section */
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-8">
              <Sparkles className="mr-2 h-4 w-4" />
              Subscription Management
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Manage Your{" "}
              <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                AI Plan
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              View your current subscription, upgrade to unlock more AI agents,
              or manage your billing preferences seamlessly.
            </p>

            <div className="max-w-md mx-auto">
              <Link
                href="/upgrade"
                className="group relative w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-3 h-5 w-5" />
                  View & Upgrade Plan
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-chart-1/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  Current Plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  View your active subscription details
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center hover:shadow-lg transition-shadow">
                <Sparkles className="h-8 w-8 text-chart-1 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  Upgrade Options
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore premium features and AI agents
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center hover:shadow-lg transition-shadow">
                <Lock className="h-8 w-8 text-chart-2 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Manage payment methods and history
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Non-logged in users - Sign-in prompt */
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-8">
                  <Lock className="mr-2 h-4 w-4" />
                  Premium Plans Available
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                  Unlock{" "}
                  <span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent animate-gradient">
                    Premium AI
                  </span>{" "}
                  Features
                </h2>

                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Sign in to explore our transparent pricing plans and discover
                  advanced AI agents tailored to your needs.
                </p>
              </div>

              <div className="animate-fade-in-up [animation-delay:200ms]">
                <div className="relative p-12 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-chart-1/20 to-chart-2/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Multiple Plans
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Choose from flexible pricing options
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chart-1/10 flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-chart-1" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Premium AI Agents
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Access to specialized AI personalities
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-chart-2/10 flex items-center justify-center">
                          <Zap className="h-8 w-8 text-chart-2" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Advanced Features
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          HD video, recordings, and more
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/sign-in"
                        className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-chart-1 px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          Sign In to View Plans
                          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </Link>

                      <Link
                        href="/sign-up"
                        className="group inline-flex items-center justify-center rounded-xl border-2 border-foreground/20 px-8 py-4 text-lg font-semibold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                      >
                        Create Account
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        ✨ <strong>Free plan available</strong> • No credit card
                        required to start
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
