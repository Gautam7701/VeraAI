"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Product = {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  badge?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-green-100 bg-white/80 backdrop-blur shadow hover:shadow-xl transition overflow-hidden flex flex-col"
    >
      <div className="relative">
        <Image
          src={product.image || "/eco-placeholder.jpg"}
          alt={product.name}
          width={800}
          height={450}
          className="w-full h-auto aspect-video object-cover"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold bg-green-700 text-white px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-1 line-clamp-3">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-green-700 font-semibold">
            {product.price ? product.price : ""}
          </div>
          <a
            href={product.url}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            View Product
          </a>
        </div>
      </div>
    </motion.article>
  );
}
