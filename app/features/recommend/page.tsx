"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Leaf, Search, Link as LinkIcon } from "lucide-react";
import ProductCard from "./product-card";
import SuggestChip from "./suggest-chip";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  badge?: string;
};

export default function RecommendPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSuggest = (text: string) => {
    setQuery(text);
    void getRecs(text);
  };

  const getRecs = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setRecs([]);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to fetch");

      // Expecting: { recommendations: Product[] }
      setRecs(
        (data?.recommendations || []).map((p: any) => ({
          name: p.name,
          description: p.description,
          url: p.url,
          image:
            p.image ||
            "/eco-placeholder.jpg", // put a nice placeholder image in /public
          price: p.price,
          badge: p.badge,
        }))
      );
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void getRecs(query);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* soft floating glow blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-green-200/50 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-96 h-96 bg-green-300/40 blur-3xl rounded-full" />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-green-100">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" />
            <h1 className="text-xl md:text-2xl font-extrabold text-green-700">
              Vera AI — Product Recommender
            </h1>
          </div>
          <a
            href="https://veraindia.co.in" // <-- replace with your store root
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
          >
            Visit Store <LinkIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero card */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100 p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Find the perfect <span className="text-green-600">eco-friendly</span> product
              </h2>
              <p className="text-gray-600 mt-2">
                Describe what you need (gift idea, daily use, office, travel, kitchen),
                and Vera AI will suggest sustainable picks from our store.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl px-4 py-2 bg-green-600 text-white font-medium inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </div>
          </div>

          {/* Search / query */}
          <form onSubmit={onSubmit} className="mt-6">
            <div className="flex items-center gap-3 bg-white border border-green-200 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500">
              <Search className="text-green-600" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. eco-friendly bottle for gym, plastic-free bathroom kit, sustainable office set…"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 font-medium transition"
              >
                Find
              </button>
            </div>
          </form>

          {/* Suggest chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Gift under $30 for an eco-conscious friend",
              "Sustainable travel essentials",
              "Plastic-free bathroom kit",
              "Reusable options for office desk",
            ].map((t) => (
              <SuggestChip key={t} text={t} onClick={() => onSuggest(t)} />
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <section className="mt-10 min-h-[280px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5"
              >
                {error}
              </motion.div>
            ) : recs.length ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {recs.map((p, i) => (
                  <ProductCard key={i} product={p} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 mt-10"
              >
                Start with a query or choose a suggestion above.
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-green-100 bg-white/70 backdrop-blur p-4 shadow">
      <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mt-4 animate-pulse" />
      <div className="h-3 w-full bg-gray-200 rounded mt-2 animate-pulse" />
      <div className="h-3 w-5/6 bg-gray-200 rounded mt-2 animate-pulse" />
      <div className="mt-4 h-9 w-28 bg-gray-200 rounded-full animate-pulse" />
    </div>
  );
}
