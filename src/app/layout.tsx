import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virtual CGO — Build Your Business Presence Online",
  description:
    "Professional websites, GMB setup, branding, logos, and landing pages — all in one affordable package. Starting at ₹7999.",
  keywords: [
    "website design",
    "GMB setup",
    "branding",
    "logo design",
    "landing pages",
    "affordable websites",
    "business presence",
    "Virtual CGO",
  ],
  openGraph: {
    title: "Virtual CGO — Build Your Business Presence Online",
    description:
      "Professional websites, GMB setup, branding, logos, and landing pages — all in one affordable package.",
    type: "website",
    siteName: "Virtual CGO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual CGO — Build Your Business Presence Online",
    description:
      "Professional websites, GMB setup, branding, logos, and landing pages — all in one affordable package.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
