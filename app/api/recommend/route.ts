
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Example: You can connect this to Shopify later instead of hardcoding
const ecoProducts = [
  {
    name: "Stainless Steel Reusable Bottle",
    description: "Keeps drinks cold for 24h. Durable & eco-friendly.",
    url: "https://yourshopify.com/products/bottle",
  },
  {
    name: "Organic Cotton Tote Bag",
    description: "Washable, stylish, and reduces plastic waste.",
    url: "https://yourshopify.com/products/tote",
  },
  {
    name: "Bamboo Toothbrush Pack",
    description: "Biodegradable toothbrushes with soft bristles.",
    url: "https://yourshopify.com/products/brush",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    // Use OpenAI to pick recommendations (later we can filter ecoProducts dynamically)
    await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Vera AI, recommend eco-friendly products from the list provided. Always include name, short description, and link.",
        },
        { role: "user", content: query },
      ],
    });

    // Currently returning all products (replace with filtering logic later)
    return NextResponse.json({
      recommendations: ecoProducts,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
