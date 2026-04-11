// FUTURE: AI-powered translation using Gemini API
// Will translate page content to user's preferred language

export async function translateText(text, targetLanguage) {
  // TODO: Implement Gemini-based translation
  // POST to /api/translate with { text, targetLanguage }
  // Return translated text
  return text // Pass-through for now
}

export function useTranslation() {
  // TODO: Hook that provides translation functions to components
  // Will read preferred_language from user context
  return {
    t: (text) => text, // Pass-through for now
    isTranslating: false,
    preferredLanguage: 'en'
  }
}
