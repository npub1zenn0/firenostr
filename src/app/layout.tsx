import clsx from "clsx";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FireNostr",
  description: "Nostr Firehose - Stream of Nostr Events",
  keywords: "Nostr, social network, social media protocol",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "FireNostr",
    description: "Stream of Nostr Events",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-base-100")}>{children}</body>
    </html>
  );
}
