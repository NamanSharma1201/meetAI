// modules/home/ui/components/features-section.tsx
"use client";

import { Video, Users, Zap, MessageCircle, Brain, Shield } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "HD Video Conversations",
    description:
      "Experience crystal-clear, face-to-face interactions with AI agents through premium video quality that adapts to your connection.",
    bgGradient: "from-primary/20 to-primary/5",
    iconGradient: "from-primary to-primary/80",
    borderColor: "border-primary/20",
    accentColor: "text-primary",
    delay: "0ms",
  },
  {
    icon: Brain,
    title: "Intelligent AI Agents",
    description:
      "Choose from specialized AI personalities trained for different expertise areas - from coding mentors to creative consultants.",
    bgGradient: "from-chart-1/20 to-chart-1/5",
    iconGradient: "from-chart-1 to-chart-1/80",
    borderColor: "border-chart-1/20",
    accentColor: "text-chart-1",
    delay: "200ms",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description:
      "Get real-time AI assistance with lightning-fast processing and natural conversation flows that feel genuinely human.",
    bgGradient: "from-chart-2/20 to-chart-2/5",
    iconGradient: "from-chart-2 to-chart-2/80",
    borderColor: "border-chart-2/20",
    accentColor: "text-chart-2",
    delay: "400ms",
  },
  {
    icon: MessageCircle,
    title: "Natural Dialogue",
    description:
      "Engage in flowing conversations with context-aware AI that remembers your preferences and adapts to your communication style.",
    bgGradient: "from-chart-3/20 to-chart-3/5",
    iconGradient: "from-chart-3 to-chart-3/80",
    borderColor: "border-chart-3/20",
    accentColor: "text-chart-3",
    delay: "600ms",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite team members to AI sessions, share insights, and collaborate on projects with multi-user video support.",
    bgGradient: "from-chart-4/20 to-chart-4/5",
    iconGradient: "from-chart-4 to-chart-4/80",
    borderColor: "border-chart-4/20",
    accentColor: "text-chart-4",
    delay: "800ms",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, secure data handling, and compliance with privacy regulations ensure your conversations stay private.",
    bgGradient: "from-chart-5/20 to-chart-5/5",
    iconGradient: "from-chart-5 to-chart-5/80",
    borderColor: "border-chart-5/20",
    accentColor: "text-chart-5",
    delay: "1000ms",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-accent/10 pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-chart-2/10 to-chart-3/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/5 to-muted/5 rounded-full blur-3xl animate-pulse [animation-delay:4s]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            <Zap className="mr-2 h-4 w-4" />
            Revolutionary AI Experience
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent animate-gradient">
              meet-ai?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform how you interact with AI through immersive video
            conversations that feel natural, intelligent, and surprisingly
            human.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-2xl border transition-all duration-700 hover:scale-105 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm ${feature.borderColor} hover:shadow-2xl hover:shadow-current/10 animate-fade-in-up cursor-pointer`}
              style={{
                animationDelay: feature.delay,
              }}
            >
              {/* Animated border glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.iconGradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              ></div>

              {/* Icon container with floating animation */}
              <div className="relative mb-6">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconGradient} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 `}
                >
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                {/* Icon glow effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.iconGradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover overlay effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.iconGradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-20 text-center animate-fade-in-up [animation-delay:1200ms]">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/50 shadow-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of users already transforming their AI interactions
              with meet-ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-chart-1 px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                <Video className="mr-2 h-4 w-4" />
                Start Video Chat
              </button>
              <button className="group inline-flex items-center justify-center rounded-xl border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent/80 transition-all duration-300 hover:scale-105">
                <Users className="mr-2 h-4 w-4" />
                View AI Agents
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
