This is a Next.js project with Tailwind CSS installed. The existing code is just test/example code — ignore it and build on top of the project structure. There is a SQL schema file in the project — review it and flag any issues before proceeding. Here is the full project specification — follow it exactly.  

## Project Overview
 
Build a mobile-first web application called **"30 Days in Australia"** — the central hub for international students arriving in Australia. It guides them through their first 30 days with a step-by-step timeline, curated resources, AI-powered chat, budgeting tools, blog posts, and a private journal.
 
The app should feel warm, polished, and encouraging — like a helpful older student guiding someone through their first month, not a government website. Design quality is critical. This is a frontend-heavy project and the UI IS the product.
 
---
 
## Tech Stack
 
- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (for polished buttons, cards, modals, inputs)
- **Icons**: Lucide React
- **AI**: Google Gemini API (gemini-2.0-flash model) — FREE tier, used for chatbot
- **Auth + Database**: Supabase (PostgreSQL) — I will configure Supabase manually, see instructions below
- **Deployment**: Vercel
- **State Management**: React hooks (useState, useContext) — no Redux
 
---
## PRIORITY ORDER (VERY IMPORTANT)

If you run into token or complexity limits, prioritise in this order:

1. UI structure and layout (all pages must exist and render cleanly)
2. Component architecture and reusable components
3. Core functionality (timeline, chat, budget logic)
4. Supabase + API wiring (can be partially stubbed)
5. Data completeness (can be minimal but schema must be correct)

DO NOT skip pages. It is better to simplify content than omit features.
If anything becomes too large to fully implement in one pass:
- Prefer working pages over incomplete pages
- Stub complex logic with TODOs if needed
- Never delete a page or route
- UI completeness is more important than backend completeness

 
## Critical Instructions
 
### Supabase Integration
I will set up Supabase myself (tables, auth, RLS). Your job is to:
1. Install `@supabase/supabase-js` and `@supabase/ssr` (i may have done this)
2. Create `/lib/supabase.js` with a client that reads from environment variables
3. Create `/lib/supabase-server.js` for server-side client if needed
4. Build all auth pages (login, signup) that call Supabase Auth methods
5. Build all database read/write functions (journal CRUD, checklist progress, user profile) that call Supabase client methods
6. Use placeholder environment variables — I will fill in the real values:
 

**Remember:**All authentication and user identity is handled via Supabase Auth (auth.users). Do not implement custom auth systems.
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```
 
**For features that need auth (journal, checklist sync, onboarding profile):** Build the full UI and logic. Use Supabase client calls. If the user is not logged in, fall back to localStorage for checklist progress and hide journal/profile features behind a "Sign in to save your progress" prompt. This way the app works immediately even before I configure Supabase.
 
### Gemini API Integration
Use Google Gemini API (NOT OpenAI). The API route should call:
 
```javascript
// /app/api/chat/route.js
export async function POST(req) {
  const { messages } = await req.json();
 
  // Build conversation history for Gemini format
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
 
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{
            text: `You are a friendly, warm assistant for international students who have just arrived in Australia. Your name is Matey (a play on the Australian word "mate").
 
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
          }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    }
  );
 
  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Try again!";
 
  return Response.json({ role: 'assistant', content: reply });
}
```
 
### Language Translation — DO NOT IMPLEMENT YET
Translation is a future feature. However, **prepare the codebase** for it:
1. In the user profile schema and onboarding flow, include a `preferred_language` field (default: 'en')
2. Store the user's language preference in context (React Context) so it's accessible app-wide
3. Create an empty utility file `/lib/translate.js` with a placeholder function:
 
```javascript
// /lib/translate.js
// FUTURE: AI-powered translation using Gemini API
// Will translate page content to user's preferred language
 
export async function translateText(text, targetLanguage) {
  // TODO: Implement Gemini-based translation
  // POST to /api/translate with { text, targetLanguage }
  // Return translated text
  return text; // Pass-through for now
}
 
export function useTranslation() {
  // TODO: Hook that provides translation functions to components
  // Will read preferred_language from user context
  return {
    t: (text) => text, // Pass-through for now
    isTranslating: false,
    preferredLanguage: 'en'
  };
}
```
 
4. Create an empty API route at `/app/api/translate/route.js` with a comment explaining future implementation
5. On content-heavy pages (timeline, resources, blog posts), add a disabled/hidden "Translate" button component that can be enabled later
 
---
 
## Design System
 
### Colours
- **Primary**: Deep teal `#0F766E` (trust, calm)
- **Primary light**: `#14B8A6` (hover states, accents)
- **Secondary**: Warm coral `#F97316` (energy, CTAs)
- **Accent**: Soft gold `#FBBF24` (progress bars, badges, highlights)
- **Background**: White `#FFFFFF` main, warm stone `#F5F5F4` alternate sections
- **Text**: Charcoal `#1C1917` primary, `#78716C` secondary/muted
- **Success**: `#16A34A` (completed items)
- **Warning**: `#F59E0B` (tips, cautions — used in warning callout boxes)
- **Error/Danger**: `#DC2626` (scam alerts, critical warnings)
 
### Typography
- Font: Inter (import from Google Fonts)
- Headings: Bold, tracking tight
- Body: Regular, 16px base
- Scale: 14 / 16 / 18 / 24 / 32 / 40 / 48px
 
### Components Style
- Border radius: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons and inputs
- Shadows: `shadow-sm` for cards, `shadow-md` for elevated/hover, `shadow-lg` for modals
- Spacing: Generous whitespace everywhere — these users are stressed, don't overwhelm them
- Transitions: Smooth expand/collapse animations on cards, subtle hover effects
- Mobile: Touch targets minimum 44px, thumb-friendly layouts
 
### Tone of Copy
- Warm and encouraging: "You've got this" not "WARNING: You must..."
- Friendly: "Hey, welcome!" not "Welcome to the application"
- Practical: Short sentences, plain English, no jargon unless explaining it
- Inclusive: Content covers all of Australia, all backgrounds
 
---
 
## Project Structure
 
```
/30-days-australia
├── /app
│   ├── layout.js                    # Root layout — nav, footer, providers
│   ├── page.js                      # Landing page
│   ├── /timeline
│   │   └── page.js                  # 30-day timeline
│   ├── /resources
│   │   ├── page.js                  # Resource hub — category grid
│   │   └── /[category]
│   │       └── page.js              # Category detail page
│   ├── /chat
│   │   └── page.js                  # AI assistant
│   ├── /budget
│   │   └── page.js                  # Budget snapshot + calculator
│   ├── /blog
│   │   ├── page.js                  # Blog listing
│   │   └── /[slug]
│   │       └── page.js              # Individual post
│   ├── /journal
│   │   └── page.js                  # Private journal (auth required)
│   ├── /emergency
│   │   └── page.js                  # Emergency contacts + safety info
│   ├── /glossary
│   │   └── page.js                  # Aussie slang + acronym glossary
│   ├── /auth
│   │   ├── /login
│   │   │   └── page.js
│   │   └── /signup
│   │       └── page.js
│   ├── /onboarding
│   │   └── page.js                  # Post-signup onboarding flow
│   └── /api
│       ├── /chat
│       │   └── route.js             # Gemini chat proxy
│       └── /translate
│           └── route.js             # Future: translation endpoint
├── /components
│   ├── layout/
│   │   ├── Navbar.jsx               # Sticky top nav — logo, links, auth button
│   │   ├── MobileBottomNav.jsx      # Fixed bottom tab bar (mobile only)
│   │   └── Footer.jsx
│   ├── timeline/
│   │   ├── TimelinePhase.jsx        # Phase header + collapsible item group
│   │   ├── TimelineCard.jsx         # Individual task card — checkbox, expand
│   │   └── ProgressBar.jsx          # Overall + per-phase progress
│   ├── resources/
│   │   ├── CategoryCard.jsx         # Grid card for category selection
│   │   ├── ResourceCard.jsx         # Individual resource with expand
│   │   └── WarningCallout.jsx       # Amber warning/tip box
│   ├── chat/
│   │   ├── ChatInterface.jsx        # Full chat container
│   │   ├── ChatMessage.jsx          # Individual message bubble
│   │   └── SuggestedQuestions.jsx    # Tappable question chips
│   ├── budget/
│   │   ├── CostOverview.jsx         # Weekly cost stat cards
│   │   ├── SuburbCard.jsx           # Suburb comparison card
│   │   ├── BudgetCalculator.jsx     # Interactive income vs expenses calc
│   │   └── DiscountsList.jsx        # Student discounts
│   ├── blog/
│   │   ├── BlogCard.jsx             # Post preview card
│   │   └── TagFilter.jsx            # Horizontal tag filter bar
│   ├── journal/
│   │   ├── JournalEditor.jsx        # Write new entry
│   │   ├── JournalEntry.jsx         # Past entry card
│   │   └── DailyPrompt.jsx          # Rotating prompt display
│   ├── auth/
│   │   ├── AuthForm.jsx             # Reusable login/signup form
│   │   └── ProtectedRoute.jsx       # Redirect to login if not authed
│   ├── onboarding/
│   │   └── OnboardingWizard.jsx     # Multi-step onboarding
│   ├── emergency/
│   │   └── EmergencyCard.jsx        # Contact card with call/link actions
│   ├── glossary/
│   │   ├── GlossarySearch.jsx       # Search bar + filter
│   │   └── GlossaryItem.jsx         # Term + definition card
│   └── shared/
│       ├── TranslateButton.jsx      # Disabled for now — future translation
│       ├── SearchBar.jsx            # Reusable search input
│       ├── TagPill.jsx              # Coloured tag badge
│       ├── LoadingSpinner.jsx
│       └── EmptyState.jsx           # "Nothing here yet" placeholder
├── /context
│   ├── AuthContext.jsx              # User auth state provider
│   └── UserPreferencesContext.jsx   # Language, university, country prefs
├── /lib
│   ├── supabase.js                  # Supabase browser client
│   ├── supabase-server.js           # Supabase server client (if needed)
│   └── translate.js                 # Future: translation utilities
├── /data
│   ├── timeline.json                # 30-day timeline phases + items
│   ├── resources.json               # Curated resource library
│   ├── costs.json                   # Budget data — city averages + suburbs
│   ├── posts.json                   # Blog posts
│   ├── prompts.json                 # Journal prompts
│   ├── glossary.json                # Aussie terms + acronyms
│   ├── emergency.json               # Emergency contacts by state
│   ├── universities.json            # List of Australian universities (for onboarding dropdown)
│   └── discounts.json               # Student discounts + free services
├── /public
│   ├── favicon.ico
│   └── og-image.png                 # Social sharing image
├── tailwind.config.js
├── .env.local
├── package.json
└── README.md
```
 
---
 
## Data Files — Content Strategy (IMPORTANT)

There are two types of data:

FULL DATA FILES (must be complete):
- prompts.json (30 entries)
- emergency.json (complete)
- discounts.json (complete)

SAMPLE DATA FILES (ONLY 2–3 entries per section):
- timeline.json
- resources.json
- costs.json
- posts.json
- glossary.json
- universities.json

Rule:
- FULL files must be fully populated
- SAMPLE files must NEVER be fully expanded
- Use high-quality realistic data only
 
For every sample entry: use **real, high-quality content** — real URLs, real tips, real descriptions. These samples serve as the template I'll follow when adding more entries, so they need to be the gold standard.
 
### timeline.json
 
Create a complete 30-day timeline with 4 phases and at least 15–20 items total. Cover all of Australia, not just one city. Include state-specific notes where relevant.
 
**Phase 1: Day 1–3 — The Essentials**
Items should include:
- Activate your SIM card (compare providers: Telstra, Optus, Vodafone, budget MVNOs)
- Open a bank account (compare: CommBank, NAB, ANZ, Westpac — note which ones let you set up before arriving)
- Get your transport card (Myki in VIC, Opal in NSW, Go Card in QLD, MetroCard in SA, SmartRider in WA — explain each)
- Set up your student email and uni portal
- Explore your campus and find key buildings
 
**Phase 2: Day 4–7 — Getting Set Up**
- Apply for a Tax File Number (TFN) — step by step, link to ATO
- Understand your work rights (hour limits on student visa, what happens if you exceed them)
- Start looking for housing (where to search, what to avoid, red flags for scams)
- Register with a GP (explain Medicare vs OSHC for international students)
- Buy groceries — guide to cheap supermarkets (Aldi, Woolworths, Coles, local markets)
 
**Phase 3: Week 2 — Settling In**
- Attend orientation week events
- Set up your study space and routine
- Understand academic integrity and plagiarism rules (this is genuinely different across cultures)
- Open a savings account and set a budget
- Explore your suburb — find your local library, gym, park
 
**Phase 4: Week 3–4 — Thriving**
- Review your budget after 2 weeks of real spending
- Join a club or society at uni
- Find part-time work (where to look, how Australian resumes work, your rights as a worker)
- Connect with other students — social tips
- Reflect on your first month — journal prompt
 
Each item needs: id, day, title, summary (1 sentence), guide (2–3 paragraphs of genuinely helpful plain-English explanation), links (real URLs to official sources), tips (2–3 practical tips), and category.
 
### resources.json
 
Create 7 categories with 3–5 resources each. Every resource needs a real, substantive plain-English explainer (not just "click this link"). Include warnings where relevant.
 
**Categories**: Housing, Banking & Money, Transport, Health & Safety, Work Rights, University Life, Wellbeing
 
For each resource include: real external links to official Australian government sites, university resources, or trusted comparison sites. Add warning callouts for common scams or mistakes.
 
### costs.json
 
Structure:
 
```json
{
  "cities": [
    {
      "name": "Melbourne",
      "state": "VIC",
      "averages": {
        "rent_weekly": 350,
        "groceries_weekly": 80,
        "transport_weekly": 45,
        "utilities_weekly": 30,
        "phone_weekly": 10,
        "entertainment_weekly": 30,
        "total_weekly": 545
      },
      "suburbs": [
        {
          "name": "CBD",
          "rent_weekly": 420,
          "transport_weekly": 20,
          "vibe": "Walking distance to everything, but pricey",
          "best_for": "Students at RMIT, Melbourne Uni who want to be central"
        }
      ],
      "source": "Data based on average costs as of early 2026. Rent data sourced from Domain.com.au and Realestate.com.au.",
      "source_url": "https://www.domain.com.au"
    }
  ],
  "national_discounts": [
    {
      "name": "UNiDAYS",
      "description": "Free student discount platform — get discounts at hundreds of retailers",
      "url": "https://www.myunidays.com/AU/en-AU",
      "savings": "10-50% off fashion, tech, food"
    }
  ]
}
```
 
Include at least Melbourne, Sydney, and Brisbane with 4–5 suburbs each. Add a `national_discounts` section with 8–10 real student discounts (UNiDAYS, Student Edge, Myki/Opal concessions, OSHC, free museum days, uni gym, etc.).
 
### posts.json
 
Write **6 full blog posts** (not placeholders). Each post should be 300–500 words of genuinely useful, conversational content written from the perspective of an international student. Include markdown formatting.
 
Post topics:
1. "5 Things I Wish I Knew Before Moving to Australia"
2. "How I Found a Safe Place to Rent (and Avoided a Scam)"
3. "Aussie Classroom Culture: What Nobody Tells You"
4. "Eating Well on $60 a Week"
5. "Making Friends When You Don't Know Anyone"
6. "Understanding Your Work Rights as an International Student"
 
Each post needs: id, slug, title, author (fictional name + country), date, tags, excerpt, readTime, and full content in markdown.
 
### glossary.json
 
Create a searchable glossary of **40+ terms** covering:
- Australian slang (arvo, brekkie, servo, barbie, thongs, etc.)
- Government/admin acronyms (TFN, ABN, OSHC, HECS, Centrelink, Medicare, etc.)
- University terms (WAM, HD, D, CR, P, census date, special consideration, etc.)
- Transport terms (Myki, Opal, tap on/off, concession, etc.)
- Housing terms (bond, lease, inspection, real estate agent, flatmate, etc.)
 
Each entry: term, definition (plain English, 1–3 sentences), category tag, example sentence.
 
### emergency.json
 
Structure by state/territory. Include for each:
- Emergency: 000 (police, fire, ambulance)
- Non-emergency police
- Lifeline (13 11 14)
- Beyond Blue
- University counselling note ("Check your uni's website for free counselling")
- Legal aid
- Fair Work Ombudsman (workplace issues)
- Translating and Interpreting Service (TIS National): 131 450
- Relevant state consumer affairs body (for rental disputes)
- Nearest embassy/consulate note
 
### universities.json
 
A list of the major Australian universities (at least 30) with name, city, state, and website URL. Used in the onboarding dropdown. Include Group of Eight, ATN, IRU, and other well-known institutions.
 
### prompts.json
 
Create **30 journal prompts** (one for each day). Mix practical reflection with emotional check-ins:
- "What's one thing you figured out today that you didn't know yesterday?"
- "Did anything confuse you today? Write it down — you'll laugh about it later."
- "What's the biggest difference you've noticed between home and here?"
- "Who did you talk to today? How did it go?"
- "What food have you tried that surprised you?"
- "Are you taking care of yourself? What's one thing you can do for your wellbeing this week?"
- etc.
 
### discounts.json
 
A dedicated file with **15+ student discounts and free services** available across Australia. Include: name, description, how to access it, URL, and estimated savings. Cover: transport concessions, UNiDAYS, Student Edge, ISIC card, uni gym, library services, free museum/gallery days, student health services, etc.
 
---
 
## Page-by-Page Build Instructions
 
Build in this order. Each page should be fully styled, responsive, and functional before moving to the next.
 
### 1. Root Layout (`/app/layout.js`)
- Import Inter font from Google Fonts
- Set up metadata (title: "30 Days in Australia", description, og:image)
- Wrap children in AuthContext and UserPreferencesContext providers
- Include Navbar (sticky top, visible on all pages)
- Include MobileBottomNav (fixed bottom, visible only on mobile via Tailwind breakpoints)
- Include Footer (all pages)
 
**Navbar**: Logo text "30 Days" with a map pin or compass icon (use Lucide). Nav links: Timeline, Resources, Budget, Blog, Chat. Right side: Login/Sign Up button (or user avatar + dropdown if logged in). Mobile: hamburger menu that slides in.
 
**MobileBottomNav**: 5 icons — Timeline (CalendarCheck), Resources (BookOpen), Budget (Wallet), Blog (FileText), Chat (MessageCircle). Active state: teal icon + label. Appears only below `md` breakpoint. Hides when keyboard is open if possible.
 
**Footer**: Simple. Logo, tagline "Built by international students, for international students.", links to Emergency Contacts, Glossary, Privacy, and GitHub. Dark background (charcoal).
 
### 2. Landing Page (`/app/page.js`)
This is the first impression. Make it beautiful.
 
- **Hero**: Full-width section with subtle gradient (white → very light teal). Large heading: "Your first 30 days, sorted." Subheading: "The central hub for international students in Australia. Guides, resources, budgeting, AI help — everything you need to settle in." Two buttons: "Start Your Journey" (primary teal, links to /timeline) and "Explore Resources" (outlined). Consider a subtle animated illustration or icon arrangement (suitcase, passport, map pin, graduation cap) using Lucide icons arranged decoratively — not clip art.
- **How it works**: 3 steps in a horizontal row (stacked on mobile). Step 1: "Tell us about you" (icon: UserCircle), Step 2: "Follow your 30-day plan" (icon: CalendarCheck), Step 3: "Settle in with confidence" (icon: ThumbsUp). Connected by a subtle dotted line or arrow.
- **Feature grid**: 2x3 grid of feature cards. Each card has a Lucide icon, title, and one-sentence description. Features: 30-Day Timeline, Resource Hub, AI Assistant, Budget Snapshot, Blog & Tips, Private Journal. Cards should have hover lift effect.
- **Testimonial/social proof strip**: "Built by international students, for international students" with small circular avatar placeholders and country flag emojis. Keep it simple and warm.
- **Final CTA**: "Ready to start your journey?" with a sign-up button. Warm, not corporate.
 
### 3. Timeline Page (`/app/timeline/page.js`)
The core of the app. Make it satisfying to use.
 
- **Top section**: Page title "Your 30-Day Plan". Overall progress bar (teal fill on grey track, percentage + "X of Y complete"). If logged in, this syncs with Supabase. If not, uses localStorage.
- **City selector**: Small dropdown or toggle at the top that lets users pick their city (Melbourne, Sydney, Brisbane, etc.) to see city-specific tips within timeline items. Default to "All Australia" which shows generic content. Store selection in UserPreferencesContext.
- **Phase sections**: Each phase is a collapsible group. Phase header shows: title, description, mini progress bar, item count.
- **Timeline cards**: Vertical list within each phase. Left side: circular checkbox (empty → teal with checkmark animation when completed). Category colour dot. Title (bold). One-line summary. Chevron to expand. When expanded: full guide text, external links as teal buttons, tips in amber WarningCallout components, "Mark as done" button.
- **Visual connector**: Thin vertical line running down the left margin connecting cards. Completed segment = teal, upcoming = grey dashed.
- **Animations**: Smooth expand/collapse on cards. Checkbox fill animation. Progress bar animation on load and on completion.
 
### 4. Resource Hub (`/app/resources/page.js` + `/app/resources/[category]/page.js`)
 
**Main page**:
- Title: "Resource Hub". Subtitle: "Everything you need, in one place."
- SearchBar component — filters across all categories and resources in real time
- Category grid: 2x4 on desktop, 2-column on mobile. Each CategoryCard has: emoji icon (large), category name, resource count, subtle background tint matching category. Click navigates to `/resources/[category]`.
 
**Category detail page**:
- Back button + category title with icon
- List of ResourceCards. Each shows: title, summary, tags (TagPill components). Click expands to reveal: full content, external links (as buttons with ExternalLink icon), WarningCallout boxes for warnings/tips.
- "Essential" tagged resources pinned to top with a gold star badge.
 
### 5. AI Chat (`/app/chat/page.js`)
- Full-page chat interface (not a popup).
- Welcome message from "Matey" (the AI): "Hey! I'm Matey, your guide to life in Australia. Ask me anything — visa stuff, uni questions, Aussie slang, or just how things work here. No question is too basic. 🦘"
- SuggestedQuestions component: horizontal scrollable row of chips. Suggestions: "What is a TFN?", "Can I work more than 48 hours?", "What does 'arvo' mean?", "How does OSHC work?", "What's the cheapest way to eat?", "How do I make friends?". Tapping a chip sends it as a message.
- Chat messages: User (right, teal bg, white text, rounded bubble). AI (left, light grey bg, dark text, with small Matey avatar icon). Messages should have a subtle fade-in animation.
- Input bar: Fixed to bottom. Text input with placeholder "Ask anything...", send button (teal). Disable while loading, show typing indicator (three animated dots) while waiting for API response.
- Store conversation in React state. Clear on page reload (no persistence needed for MVP).
- Handle API errors gracefully — show a friendly "Hmm, something went wrong. Try again?" message.
 
### 6. Budget Snapshot (`/app/budget/page.js`)
- Title: "What does life actually cost?" Subtitle: "A realistic look at weekly expenses for students."
- **City selector**: Dropdown to pick a city. Defaults to Melbourne. Changes all data on the page.
- **CostOverview**: Row of stat cards (horizontal scroll on mobile). Each card: emoji icon, label (Rent, Groceries, Transport, Utilities, Phone, Fun), dollar amount per week. Final card = Total (larger, highlighted with accent border).
- **Suburb comparison**: Section title "Compare suburbs". Horizontal scrollable row of SuburbCards. Each card: suburb name, weekly rent (large number), vibe description, "best for" note, colour indicator (green/amber/red relative to city average).
- **BudgetCalculator**: Interactive card. Inputs: "Your weekly rent" ($), "Your weekly income" ($). Output: visual stacked bar showing rent + estimated other costs vs income. Remaining amount shown. Traffic light indicator: green ("Looking good!"), amber ("It'll be tight — check out our savings tips"), red ("This might be tough. Consider a more affordable suburb."). Include a note: "These are estimates based on average costs. Your actual spending may vary."
- **Student discounts section**: Grid of discount cards from discounts.json. Each card: name, description, estimated savings, link button.
- **Source attribution**: Small text at bottom: "Cost data based on averages as of early 2026. Sources: Domain.com.au, Numbeo, student surveys." Link to sources.
 
### 7. Blog (`/app/blog/page.js` + `/app/blog/[slug]/page.js`)
 
**Listing page**:
- Title: "Tips & Stories". Subtitle: "Real advice from students who've been there."
- TagFilter: horizontal scrollable pills (All, Culture, Housing, Food, Academic, Social, Money, Work). Active pill = teal fill.
- BlogCard grid: 2 columns desktop, 1 mobile. Each card: title (bold), author + country flag emoji, date, read time, 2-line excerpt, tag pills. Hover lift effect. Click → `/blog/[slug]`.
 
**Post page**:
- Back button
- Title (large)
- Author bar: name, country flag, date, read time
- Full content rendered from markdown (support: paragraphs, headings, bold, italic, lists, links)
- "Related posts" section at bottom (2–3 other posts with same tags)
 
### 8. Journal (`/app/journal/page.js`)
- **Protected**: Wrap in ProtectedRoute. If not logged in, show a clean page with: "Your journal is a private space to reflect on your journey." + "Sign in to start writing" button.
- **Daily prompt**: DailyPrompt component at top. Shows today's prompt from prompts.json (rotate by day of year % 30). Italic text, muted colour. Small "New prompt" button to cycle.
- **Editor**: JournalEditor — large textarea, placeholder "Start writing...", auto-dated. "Save Entry" button (teal). On save: POST to Supabase journal_entries table. Show success toast.
- **Past entries**: List of JournalEntry cards below. Each: date (bold), prompt used (italic, muted), content preview (first 100 chars). Click to expand full entry. Option to delete (with confirmation).
- **Empty state**: If no entries — centered EmptyState component with encouraging message: "No entries yet. Your journey starts with one reflection." and "Write your first entry" button that scrolls to editor.
 
### 9. Emergency Contacts (`/app/emergency/page.js`)
- Title: "Emergency Contacts". Subtitle: "Important numbers and services — save this page."
- **Critical contacts at top** (highlighted, red border):
  - 000 — Police, Fire, Ambulance
  - 131 450 — Translating and Interpreting Service
  - 13 11 14 — Lifeline (24/7 crisis support)
- **State-specific section**: Dropdown to select state. Shows relevant contacts (consumer affairs, legal aid, etc.)
- **General services**: Fair Work Ombudsman, Beyond Blue, university counselling reminder, embassy lookup note
- EmergencyCard components with: name, phone number (tappable on mobile), description, link button
- Add a "Save to phone" reminder note at the top
 
### 10. Glossary (`/app/glossary/page.js`)
- Title: "Aussie Glossary". Subtitle: "All the words and acronyms you'll need."
- GlossarySearch: search bar that filters terms in real time
- Category filter tabs: All, Slang, Government, University, Housing, Transport
- GlossaryItem cards: term (bold, large), category tag, definition, example sentence in italics
- Alphabetical grouping with letter headers
- This page should feel fun and browsable — students will come back to this
 
### 11. Auth Pages (`/app/auth/login/page.js` + `/app/auth/signup/page.js`)
- Centered card on subtle gradient background
- Logo at top
- AuthForm component (reusable for both):
  - Login: email + password fields, "Log in" button, "Don't have an account? Sign up" link
  - Signup: email + password + confirm password, "Create account" button, "Already have an account? Log in" link
- Call Supabase Auth methods (signInWithPassword, signUp)
- On successful signup: redirect to /onboarding
- On successful login: redirect to /timeline
- Show error messages inline (invalid email, wrong password, etc.)
- Footer text: "Your data is private and secure."
 
### 12. Onboarding (`/app/onboarding/page.js`)
- OnboardingWizard: multi-step flow (3 steps with progress dots)
- Step 1: "Welcome! Let's personalise your experience." Select university from dropdown (data from universities.json, searchable).
- Step 2: Select country of origin (standard country list, searchable dropdown).
- Step 3: "What city are you in?" (Melbourne, Sydney, Brisbane, Adelaide, Perth, Canberra, Hobart, Darwin, Other). This sets their default city for budget and timeline.
- "Skip" link on each step (all fields optional)
- On complete: save to Supabase user_profiles table, redirect to /timeline
- If Supabase not connected yet: save to localStorage, still redirect
 
---
 
## Supabase Database Schema
 
Create these tables in Supabase. The code should reference them but work gracefully if Supabase isn't configured yet (catch errors, fall back to localStorage where possible).
 
```sql
-- User profiles (extends Supabase Auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  university TEXT,
  country_of_origin TEXT,
  city TEXT DEFAULT 'melbourne',
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
 
-- Checklist progress
CREATE TABLE checklist_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, item_id)
);
 
-- Journal entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
 
---
 
## Important Build Notes
 
1. **Mobile-first**: Build every page for 375px width first, then scale up. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
 
2. **Performance**: Use Next.js Image component for any images. Lazy load below-the-fold content. Keep bundle size small — don't install unnecessary packages.
 
3. **Accessibility**: All interactive elements keyboard accessible. Proper heading hierarchy. Alt text on images. Focus visible outlines. Colour contrast meets WCAG AA.
 
4. **Error states**: Every form and API call needs error handling. Show friendly error messages, never raw error strings. If Gemini API fails, show "Matey is taking a nap. Try again in a moment!" not a stack trace.
 
5. **Loading states**: Show skeleton loaders or spinners while data loads. The chat should show a typing indicator while waiting for Gemini. Timeline checkbox should show a brief loading state while syncing to Supabase.
 
6. **localStorage fallback**: For timeline checklist progress, if user is not logged in OR Supabase is not configured, save to localStorage. When they later sign in, offer to sync their progress (nice-to-have, not required for MVP).
 
7. **SEO**: Add proper meta tags, og:title, og:description, og:image to all pages. This helps if they share the link.
 
8. **README.md**: Generate a professional README with: project name, description, screenshot placeholder, features list, tech stack, setup instructions (clone, install, env vars, run), deployment instructions, and a "Built by" section.
 
---
 
## Build Order
 
Execute in this sequence:
1. Project setup (create-next-app, install deps, configure Tailwind, set up project structure)
2. Design system setup (tailwind.config.js colours, fonts, global styles)
3. Layout (Navbar, Footer, MobileBottomNav, context providers)
4. Landing page
5. Data files (ALL JSON files — fully populated with real content)
6. Timeline page
7. Resource hub pages
8. Chat page + API route
9. Budget page
10. Blog pages
11. Auth pages + onboarding
12. Journal page
13. Emergency contacts page
14. Glossary page
15. Final polish — responsive check, animations, error states, loading states
At the end, ensure:
- The project compiles without errors
- All routes exist
- No missing imports
- No undefined variables




