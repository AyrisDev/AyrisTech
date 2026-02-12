
-- Create contact_info table
create table if not exists contact_info (
  id uuid default gen_random_uuid() primary key,
  email text,
  phone text,
  address jsonb default '{"en": "", "tr": ""}'::jsonb,
  hours jsonb default '{"en": "", "tr": ""}'::jsonb,
  social_links jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default row if not exists
insert into contact_info (email, phone, address, hours, social_links)
select 
  'hello@ayristech.com',
  '+90 (212) 555 0123',
  '{"en": "Levent, Istanbul / Turkey", "tr": "Levent, İstanbul / Türkiye"}'::jsonb,
  '{"en": "Mon - Fri: 09:00 - 18:00", "tr": "Pzt - Cum: 09:00 - 18:00"}'::jsonb,
  '{"twitter": "https://twitter.com/ayristech", "linkedin": "https://linkedin.com/company/ayristech", "instagram": "https://instagram.com/ayristech"}'::jsonb
where not exists (select 1 from contact_info);

-- Enable RLS
alter table contact_info enable row level security;

-- Policies
create policy "Public contact info access" on contact_info
  for select using (true);

create policy "Admin update contact info" on contact_info
  for update using (auth.role() = 'authenticated');
