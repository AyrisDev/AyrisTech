
-- Create posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  
  -- Internationalized fields stored as JSONB
  title jsonb not null,
  excerpt jsonb,
  content jsonb,
  
  featured_image text,
  category text, -- Can be linked to categories table if needed, currently string based on interface
  author_id uuid, -- Optional, can link to auth.users if needed
  
  read_time text,
  
  is_published boolean default false,
  published_at timestamp with time zone,
  
  metadata jsonb default '{}'::jsonb,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table posts enable row level security;

-- Policies
create policy "Public posts are viewable by everyone." on posts
  for select using (is_published = true);

-- Allow admins (authenticated users for now) to see all posts including drafts
create policy "Admins can view all posts." on posts
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert posts." on posts
  for insert with check (auth.role() = 'authenticated');

create policy "Admins can update posts." on posts
  for update using (auth.role() = 'authenticated');

create policy "Admins can delete posts." on posts
  for delete using (auth.role() = 'authenticated');

-- Create generic trigger to update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_posts_updated_at
before update on posts
for each row
execute function update_updated_at_column();
