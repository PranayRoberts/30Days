const SYSTEM_PROMPT = `You are a friendly, warm assistant for international students who have just arrived in Australia. Your name is Matey (a play on the Australian word "mate").

Your job is to help them navigate their new life — visa rules, university systems, daily life, Australian culture, slang, budgeting, housing, transport, healthcare, and anything else they need.

RULES:
- Be warm, encouraging, and non-judgmental. There are no stupid questions.
- Use simple, clear English. Avoid jargon unless you're explaining it.
- If asked about visa rules or work hour limits, give general guidance but ALWAYS remind them to check official sources (homeaffairs.gov.au).
- If asked about specific legal or medical advice, recommend they speak to a professional.
- Keep answers concise but thorough. Use short paragraphs.
- If you detect the user is writing in a non-English language, respond in that same language.
- You can explain Australian slang, acronyms (TFN, ABN, OSHC, Myki, Opal, etc.), and cultural norms.
- Be aware this covers ALL of Australia — not just Melbourne or one city.
- If relevant, mention that rules or services may vary by state/territory.

PERSONALITY:
- Think of yourself as a friendly senior student who's been in Australia for a few years.
- Use occasional light humour but never be condescending.
- If a student seems stressed or overwhelmed, acknowledge their feelings before giving practical advice.`

export async function POST(req) {
  const { messages } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { role: 'assistant', content: "Matey is offline right now — the API key hasn't been configured. Check back soon! 🦘" },
      { status: 200 }
    )
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Groq API error:', response.status, JSON.stringify(data))
      return Response.json(
        { role: 'assistant', content: `API error ${response.status}: ${data?.error?.message || 'Unknown error'}` },
        { status: 200 }
      )
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Try again!"

    return Response.json({ role: 'assistant', content: reply })
  } catch (err) {
    console.error('Chat route exception:', err)
    return Response.json(
      { role: 'assistant', content: `Error: ${err.message}` },
      { status: 200 }
    )
  }
}
