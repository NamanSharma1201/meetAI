// modules/home/ui/components/hero-section.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-6 animate-pulse-subtle">
              <span className="mr-2">🎉</span>
              New: HD Video Chat with AI Agents
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Chat with{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent animate-gradient">
                  AI Agents
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-chart-1/20 to-chart-2/20 blur-lg opacity-30 animate-pulse"></div>
              </span>{" "}
              via Video Call
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Experience the future of AI interaction with face-to-face video
              conversations. Get personalized help from custom AI agents
              designed for your specific needs.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up [animation-delay:200ms]">
            <Link
              href="/meetings"
              className="group relative inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              Start Video Chat
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Link>
          </div>

          <div className="mt-12 animate-fade-in-up [animation-delay:400ms]">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by developers worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-2xl font-bold">Users</div>
              <div className="w-px h-6 bg-border"></div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-2xl font-bold">AI Agents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float [animation-delay:1s]" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-chart-1/10 rounded-full animate-float [animation-delay:2s]" />
      <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-chart-2/10 rounded-full animate-float [animation-delay:3s]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
    </section>
  );
};
