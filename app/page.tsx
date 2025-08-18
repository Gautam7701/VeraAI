"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 flex flex-col">
      {/* Navbar */}
    <header className="w-full flex items-center justify-between px-8 py-4">
  {/* Logo */}
  <div className="flex items-center gap-2">
    <Image src="/Veralogo.png" alt="Vera AI Logo" width={80} height={80} />
  </div>

  {/* Navigation + Button */}
  <div className="flex items-center gap-6">
    <nav className="flex gap-6 text-gray-700 font-medium">
      <Link href="#features" className="hover:text-green-700 transition">
        Features
      </Link>
      <Link href="#about" className="hover:text-green-700 transition">
        About
      </Link>
      <Link href="#contact" className="hover:text-green-700 transition">
        Contact
      </Link>
    </nav>

    {/* Recommendation Button */}
    <Link
      href="/features/recommend"
      className="ml-4 px-5 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 shadow-md transition"
    >
      🌱 Recommendations
    </Link>
  </div>
</header>


      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Meet <span className="text-green-600">Vera AI</span> 🌱
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Your AI-powered companion for exploring <span className="font-semibold text-green-700">eco-friendly</span> 
          and <span className="font-semibold text-green-700">sustainable</span> products.  
          Smart, fast, and designed for a greener future.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/features/chat"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 shadow-lg transition"
          >
            Try Vera AI Chat <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 rounded-full border border-green-600 text-green-700 font-medium hover:bg-green-50 transition"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-12 relative w-full max-w-4xl">
          <Image
            src="/Verahero.png"
            alt="Eco friendly illustration"
            width={1200}
            height={600}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Why Choose <span className="text-green-600">Vera AI</span>?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Smart Chat</h3>
              <p className="text-gray-600">
                Ask Vera AI about eco-friendly products, tips, and sustainable alternatives instantly.
              </p>
            </div>
              {/* <Link
        href="/features/recommend"
        className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg transition block hover:bg-green-100"
      >
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          Eco Recommendations
        </h3>
        <p className="text-gray-600">
          Get tailored product suggestions that help you live a greener lifestyle.
        </p>
        <span className="mt-3 inline-block text-green-600 font-medium">
          Explore →
        </span>
      </Link> */}
            <div className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Eco Recommendations</h3>
              <p className="text-gray-600">
                Get tailored product suggestions that help you live a greener lifestyle.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Seamless Experience</h3>
              <p className="text-gray-600">
                Enjoy a clean, modern UI built for speed, accessibility, and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-600 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Vera AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://linkedin.com" target="_blank" className="hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" className="hover:underline">
              GitHub
            </a>
            <a href="mailto:contact@veraai.com" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
