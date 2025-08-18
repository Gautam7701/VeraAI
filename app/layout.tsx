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
export const metadata: Metadata = {
  title: "Vera AI – Your Eco-Friendly AI Shopping Assistant 🌱",
  description:
    "Discover eco-friendly and sustainable products with Vera AI. Smart recommendations, AI chat, and a greener shopping experience – all in one place.",
  keywords: [
    "Vera AI",
    "eco-friendly products",
    "sustainable shopping",
    "AI shopping assistant",
    "green living",
    "recommendations",
  ],
  openGraph: {
    title: "Vera AI – Your Eco-Friendly AI Shopping Assistant 🌱",
    description:
      "Explore sustainable products, get smart AI-powered recommendations, and shop greener with Vera AI.",
    url: "https:veraidia.co.in", // replace with your actual domain
    siteName: "Vera AI",
    images: [
      {
        url: "/Verahero.png", // should be an absolute URL in production
        width: 1200,
        height: 630,
        alt: "Vera AI Eco-Friendly Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vera AI – Eco-Friendly AI Shopping Assistant 🌱",
    description:
      "Discover sustainable products and AI-powered recommendations with Vera AI.",
    images: ["/Verahero.png"], // absolute URL in production
  },
};


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
        {children}
      </body>
    </html>
  );
}
