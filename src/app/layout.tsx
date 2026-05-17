import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual CGO — Build Your Business Presence Online",
  description:
    "Professional websites, GMB setup, branding, logos, and landing pages — all in one affordable package. Starting at ₹499.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
