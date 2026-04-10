import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

async function analyzeText(inputText: string) {
  if (!process.env.OPENAI_API_KEY) {
    return `Mock analysis: This text is clear, with strong international tone and a polished structure. We recommend simplifying any jargon and ensuring translation-friendly phrasing for global audiences.`;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please analyze the following text for tone, clarity, and international readability. Give a concise summary and suggested improvements:\n\n${inputText}`,
        },
      ],
      max_tokens: 350,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed: ${body}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "The AI response could not be parsed.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputText = String(body.input_text ?? "").trim();
    const userId = String(body.user_id ?? "").trim();

    if (!inputText || !userId) {
      return NextResponse.json({ error: "Missing input_text or user_id." }, { status: 400 });
    }

    const result = await analyzeText(inputText);
    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase admin configuration is missing." }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("analyses").insert([
      {
        user_id: userId,
        input_text: inputText,
        result,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ result, saved: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message ?? "Unexpected error." }, { status: 500 });
  }
}
