//@ts-nocheck

import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Orbitron } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Layer One IT Consultants",
  description: "Solutions for the modern world",
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "https://layeroneconsultants.com"
  ),
  openGraph: {
    images: [
      {
        url: "/OG-Image.png",
        alt: "Layer One IT Consultants",
      },
    ],
  },
  verification: {
    google: "538459a7aedf6cef",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Add any additional meta tags here */}
      </head>
      <body className={`${roboto.className} ${orbitron.variable} ${geistSans.variable} ${geistMono.variable} bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
