# 30 Days in Australia

The central hub for international students arriving in Australia. A mobile-first web app that guides students through their first 30 days with a step-by-step timeline, curated resources, AI-powered chat, budgeting tools, blog posts, and a private journal.

---

Live Deployment

The project is deployed on Vercel:

Live App: https://30-days-dwwn.vercel.app/

---

## Features

- **30-Day Timeline** — Tick off tasks day by day, synced to Supabase (or localStorage if not logged in)
- **Resource Hub** — 7 categories of curated guides: Housing, Banking, Transport, Health, Work Rights, University Life, Wellbeing
- **AI Chat (Matey)** — Originally built with Google Gemini, but switched to Groq due to session token limitations, resulting in more stable and reliable responses
- **Budget Snapshot** — Weekly cost estimates by city + suburb, and an interactive budget calculator
- **Blog & Stories** — 6 full posts
- **Private Journal** — Daily prompts + entry editor, stored securely in Supabase
- **Emergency Contacts** — Critical numbers and state-specific services
- **Aussie Glossary** — terms: slang, government acronyms, uni jargon, transport, housing
- **Auth + Onboarding** — Supabase Auth with personalisation wizard (university, city, country)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI | Google Gemini API (gemini-2.0-flash) |
| Auth + DB | Supabase (PostgreSQL + Auth) |
| Deployment | Vercel |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example and fill in your values:

```bash
cp env.example.txt .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

- **Supabase**: Create a project at [supabase.com](https://supabase.com), then find your URL and anon key under **Settings → API**
- **Gemini**: Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 3. Set up Supabase

In your Supabase project, go to **SQL Editor** and run the contents of `supabase/schema.sql`. This creates:

- `user_profiles` — university, city, country, language preference
- `checklist_progress` — timeline task completion, synced per user
- `journal_entries` — private journal entries

Enable **Email/Password** authentication under **Authentication → Providers**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/app
  layout.js              # Root layout — providers, nav, footer
  page.js                # Landing page
  /timeline/page.js      # 30-day checklist
  /resources/            # Resource hub + category pages
  /chat/page.js          # AI chat (Matey)
  /budget/page.js        # Budget calculator
  /blog/                 # Blog listing + individual posts
  /journal/page.js       # Private journal (auth required)
  /emergency/page.js     # Emergency contacts
  /glossary/page.js      # Aussie glossary
  /auth/                 # Login + signup pages
  /onboarding/page.js    # Post-signup personalisation wizard
  /api/chat/route.js     # Gemini API proxy
  /api/translate/route.js # Future: translation endpoint
/components              # All UI components, organised by feature
/context                 # AuthContext, UserPreferencesContext
/data                    # JSON data files (timeline, resources, costs, posts, etc.)
/lib                     # supabase.js, supabase-server.js, translate.js
/supabase/schema.sql     # Database schema + RLS policies
```



