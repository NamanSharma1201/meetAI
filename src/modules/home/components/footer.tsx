// modules/home/ui/components/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Image
                  src="/logo.svg"
                  alt="meet-ai"
                  width={20}
                  height={20}
                  className="text-primary-foreground"
                />
              </div>
              <span className="text-xl font-bold">meet-ai</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Revolutionary AI interaction platform enabling face-to-face
              conversations with custom AI agents through high-quality video
              calls.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">
                Follow Naman:
              </span>
              <div className="flex space-x-3">
                <Link
                  href="https://github.com/NamanSharma1201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/namansharma12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  Features
                  <ExternalLink className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  Pricing
                  <ExternalLink className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/agents"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  AI Agents
                  <ExternalLink className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 meet-ai. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by{" "}
              <Link
                href="https://github.com/NamanSharma1201"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                Naman Sharma
              </Link>
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
