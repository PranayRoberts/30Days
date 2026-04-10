-- Supabase schema for 30DaysAustralia

create table if not exists users (
  id uuid primary key,
  email text not null,
  created_at timestamptz default now()
);

create table if not exists analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  input_text text not null,
  result text not null,
  created_at timestamptz default now()
);

create index if not exists idx_analyses_user_id on analyses(user_id);
create index if not exists idx_analyses_created_at on analyses(created_at desc);
