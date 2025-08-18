import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vera AI",
  description:
    "Discover eco-friendly and sustainable products with Vera AI. Smart recommendations, AI chat, and a greener shopping experience – all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
