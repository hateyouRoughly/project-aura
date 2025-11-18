import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Project Aura | Your AI Web Co-Pilot";
const description = "Project Aura translates natural language into direct browser actions, automating web tasks intelligently.";
const imageUrl = "https://aura.deepakrajpurohit.com/og-image.png";
const siteUrl = "https://aura.deepakrajpurohit.com/";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: ['AI', 'Web Automation', 'Co-Pilot', 'Natural Language', 'Browser Actions'],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: 'Project Aura',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `A promotional image for ${title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [
      {
        url: imageUrl,
        alt: `A promotional image for ${title}`,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
  appleWebApp: {
    title: title,
    statusBarStyle: 'default',
    capable: true,
  },
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
