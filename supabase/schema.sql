
-- USER PROFILES


create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,

  university text,
  country_of_origin text,
  city text default 'melbourne',
  preferred_language text default 'en',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp on user_profiles;

create trigger set_timestamp
before update on user_profiles
for each row
execute procedure update_updated_at_column();



-- CHECKLIST PROGRESS

create table if not exists checklist_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  item_id text not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),

  unique(user_id, item_id)
);

create index if not exists idx_checklist_user on checklist_progress(user_id);



-- JOURNAL ENTRIES


create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,

  content text not null,
  prompt text,

  created_at timestamptz default now()
);

create index if not exists idx_journal_user on journal_entries(user_id);



-- RLS ENABLE


alter table user_profiles enable row level security;
alter table checklist_progress enable row level security;
alter table journal_entries enable row level security;

-- USER PROFILES POLICIES


create policy "Users can view own profile"
on user_profiles for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on user_profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on user_profiles for update
using (auth.uid() = id);



-- CHECKLIST POLICIES


create policy "Users can manage own checklist"
on checklist_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);



-- JOURNAL POLICIES


create policy "Users can manage own journal"
on journal_entries
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);