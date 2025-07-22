import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Optimized font loading with display swap for better performance
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport configuration for responsive design and PWA
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

// Comprehensive SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://meet-ai.com"), // Replace with your actual domain

  // Title configuration with template
  title: {
    template: "%s | meet-ai",
    default:
      "meet-ai - Revolutionary AI Video Chat Platform | Talk Face-to-Face with AI Agents",
  },

  // Rich description for search engines
  description:
    "Experience the future of AI interaction with meet-ai. Engage in natural, face-to-face video conversations with custom AI agents. HD video quality, intelligent responses, and personalized AI assistance for developers, teams, and enterprises.",

  // Targeted keywords for AI video chat niche
  keywords: [
    "AI video chat",
    "AI agents",
    "video call AI",
    "artificial intelligence chat",
    "AI conversation platform",
    "video AI assistant",
    "custom AI agents",
    "face-to-face AI",
    "AI video calling",
    "intelligent AI chat",
    "AI chatbot video",
    "virtual AI assistant",
    "AI video conference",
    "conversational AI platform",
    "AI video interaction",
  ],

  // Author and creator information
  authors: [{ name: "Naman Sharma", url: "https://github.com/namansharma" }],
  creator: "Naman Sharma",
  publisher: "meet-ai",

  // Technical metadata
  generator: "Next.js",
  applicationName: "meet-ai",
  referrer: "origin-when-cross-origin",
  category: "Technology",

  // Format detection settings
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Canonical URL configuration
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meet-ai.com",
    siteName: "meet-ai",
    title: "meet-ai - Revolutionary AI Video Chat Platform",
    description:
      "Experience the future of AI interaction with face-to-face video conversations. Connect with specialized AI agents through high-quality video calls.",
    images: [
      {
        url: "/og-image.png", // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "meet-ai - AI Video Chat Platform Interface",
        type: "image/png",
      },
      {
        url: "/og-image-square.png", // Create this image (1200x1200px)
        width: 1200,
        height: 1200,
        alt: "meet-ai Logo",
        type: "image/png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@meetai", // Replace with your Twitter handle
    creator: "@namansharma", // Replace with your Twitter handle
    title: "meet-ai - Revolutionary AI Video Chat Platform",
    description:
      "Experience face-to-face AI conversations through HD video calls. Custom AI agents, intelligent responses, enterprise security.",
    images: ["/twitter-image.png"], // Create this image (1200x630px)
  },

  // App-specific metadata
  appLinks: {
    web: {
      url: "https://meet-ai.com",
      should_fallback: true,
    },
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",

  // Robot indexing instructions
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification codes (replace with actual codes)
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-site-explorer-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect to important third-party origins */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://meet-ai.com/#webapp",
                  name: "meet-ai",
                  description:
                    "Revolutionary AI interaction platform enabling face-to-face video conversations with custom AI agents",
                  url: "https://meet-ai.com",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web Browser",
                  browserRequirements: "Requires JavaScript. Requires HTML5.",
                  softwareVersion: "1.0",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    validFrom: "2025-01-01",
                  },
                  featureList: [
                    "HD Video Conversations with AI Agents",
                    "Custom AI Personalities",
                    "Real-time Intelligent Responses",
                    "Enterprise-grade Security",
                    "Team Collaboration Features",
                    "Multi-platform Support",
                  ],
                  screenshot: "https://meet-ai.com/screenshot.png",
                },
                {
                  "@type": "Organization",
                  "@id": "https://meet-ai.com/#organization",
                  name: "meet-ai",
                  url: "https://meet-ai.com",
                  logo: "https://meet-ai.com/logo.svg",
                  founder: {
                    "@type": "Person",
                    name: "Naman Sharma",
                    sameAs: [
                      "https://github.com/namansharma",
                      "https://linkedin.com/in/namansharma",
                    ],
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    url: "https://meet-ai.com/contact",
                  },
                  sameAs: [
                    "https://github.com/namansharma",
                    "https://linkedin.com/in/namansharma",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://meet-ai.com/#website",
                  url: "https://meet-ai.com",
                  name: "meet-ai",
                  description: "Revolutionary AI Video Chat Platform",
                  publisher: {
                    "@id": "https://meet-ai.com/#organization",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate:
                          "https://meet-ai.com/search?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <Toaster />
            {children}
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
