import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "On-Chain Bitcoin Analytics | @samdevrel",
  description: "Interactive dashboard for Bitcoin on-chain metrics. MVRV, Realized Price, SOPR, Holder Distribution, and Network Activity. Built with Newhedge-style analytics.",
  keywords: ["Bitcoin", "on-chain", "analytics", "MVRV", "SOPR", "cryptocurrency", "market intelligence"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
  openGraph: {
    title: "On-Chain Bitcoin Analytics",
    description: "Structured Bitcoin metrics for market intelligence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@samdevrel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
