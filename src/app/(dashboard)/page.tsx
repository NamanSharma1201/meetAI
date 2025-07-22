import { HomeView } from "@/modules/home/ui/views/home-view";
import { Metadata } from "next";

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: "meet-ai - AI Video Chat Platform | Talk Face-to-Face with AI Agents",
  description:
    "Revolutionary AI interaction platform enabling natural face-to-face video conversations with custom AI agents. Experience HD video calls, intelligent responses, and personalized AI assistance.",
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
  ],
  authors: [{ name: "Naman Sharma" }],
  creator: "Naman Sharma",
  publisher: "meet-ai",
  metadataBase: new URL("https://meet-ai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "meet-ai - AI Video Chat Platform",
    description:
      "Experience the future of AI interaction with face-to-face video conversations. Connect with specialized AI agents through high-quality video calls.",
    url: "https://meet-ai.com",
    siteName: "meet-ai",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "meet-ai - AI Video Chat Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "meet-ai - AI Video Chat Platform",
    description:
      "Revolutionary AI interaction through immersive video conversations with custom AI agents.",
    images: ["/twitter-image.png"],
    creator: "@namansharma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  category: "technology",
};

const Page = async () => {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "meet-ai",
            description:
              "Revolutionary AI interaction platform enabling face-to-face video conversations with custom AI agents",
            url: "https://meet-ai.com",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            creator: {
              "@type": "Person",
              name: "Naman Sharma",
              sameAs: [
                "https://github.com/namansharma",
                "https://linkedin.com/in/namansharma",
              ],
            },
            featureList: [
              "HD Video Conversations with AI",
              "Custom AI Agents",
              "Real-time Responses",
              "Enterprise Security",
              "Team Collaboration",
            ],
          }),
        }}
      />
      <HomeView />
    </>
  );
};

export default Page;
