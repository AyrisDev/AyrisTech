-- Create technologies table
create table if not exists technologies (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  icon_url text, -- We will upload icons to Supabase Storage
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create join table for many-to-many relationship between projects and technologies
create table if not exists project_technologies (
  project_id uuid references projects(id) on delete cascade,
  technology_id uuid references technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

-- Enable RLS
alter table technologies enable row level security;
alter table project_technologies enable row level security;

-- Policies for technologies (public read, admin write)
create policy "Public technologies are viewable by everyone." on technologies
  for select using (true);

create policy "Users can insert technologies." on technologies
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update technologies." on technologies
  for update using (auth.role() = 'authenticated');

create policy "Users can delete technologies." on technologies
  for delete using (auth.role() = 'authenticated');

-- Policies for project_technologies
create policy "Public project_technologies are viewable by everyone." on project_technologies
  for select using (true);

create policy "Users can insert project_technologies." on project_technologies
  for insert with check (auth.role() = 'authenticated');

create policy "Users can delete project_technologies." on project_technologies
  for delete using (auth.role() = 'authenticated');
