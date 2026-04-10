# 30DaysAustralia

30DaysAustralia is a clean, mobile-responsive Next.js App Router project with Tailwind CSS and Supabase integration. It includes login/signup auth, AI-powered analysis, saved history, and a protected dashboard.

## Project structure

- `app/page.tsx` � Landing page with CTA
- `app/auth/page.tsx` � Login/signup auth page
- `app/analyze/page.tsx` � AI analysis input page
- `app/dashboard/page.tsx` � Protected results dashboard
- `app/api/analyze/route.ts` � API route for AI analysis and saving results
- `components/Navbar.tsx` � Navigation bar with auth controls
- `components/AnalysisForm.tsx` � Analysis input and submit form
- `components/ResultCard.tsx` � Result display card
- `components/Spinner.tsx` � Loading spinner component
- `lib/supabaseClient.ts` � Supabase client init
- `supabase/schema.sql` � Database schema for `users` and `analyses`
- `.env.example` � Example environment configuration

## Setup instructions

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file:

```bash
copy .env.example .env.local
```

3. Fill in your Supabase and OpenAI values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (optional)

4. Configure Supabase:

- Create a new Supabase project
- Enable email/password authentication
- Run the SQL in `supabase/schema.sql` inside the Supabase SQL editor

5. Start the app:

```bash
npm run dev
```

6. Open the app in your browser:

```bash
http://localhost:3000
```

## Supabase tables

### `users`

- `id` � uuid primary key
- `email` � email address
- `created_at` � timestamp

### `analyses`

- `id` � uuid primary key
- `user_id` � foreign key to `users.id`
- `input_text` � original text submitted for analysis
- `result` � AI response
- `created_at` � timestamp

## Notes

- The app uses a mock OpenAI analysis if `OPENAI_API_KEY` is not provided.
- The dashboard route is protected in the client and redirects to `/auth` if no user is signed in.
- Supabase auth state is managed in the Navbar and persisted across pages.

## Run commands

- `npm run dev` � start development server
- `npm run build` � build production app
- `npm run start` � run production server
- `npm run lint` � run ESLint
