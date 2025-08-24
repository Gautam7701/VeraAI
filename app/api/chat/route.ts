// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { message } = await req.json();

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: `You are Vera AI, a friendly assistant that helps customers learn about eco-friendly, sustainable products. 
// Always end your reply with this line: 🌿 Learn more at https://www.veraindia.co.in`,
//         },
//         { role: "user", content: message },
//       ],
//     });

//     return NextResponse.json({ reply: response.choices[0].message?.content });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
  role: "system",
  content: `You are Vera AI, a friendly assistant that helps customers learn about eco-friendly, sustainable products. 
Only answer questions specifically related to Vera and its eco-friendly products. 
If the user asks anything unrelated, politely respond: "I'm here to answer questions only about Vera and its products." 
Always end your reply with this line: 🌿 Learn more at https://www.veraindia.co.in`
},
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({ reply: response.choices[0].message?.content });
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
