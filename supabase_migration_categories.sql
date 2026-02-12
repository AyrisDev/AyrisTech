-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add existing categories (optional)
INSERT INTO categories (slug, name_en, name_tr) VALUES 
('fintech', 'Fintech', 'Finans Teknolojileri'),
('mobile', 'Mobile App', 'Mobil Uygulama'),
('web', 'Web Development', 'Web Geliştirme'),
('ai', 'Artificial Intelligence', 'Yapay Zeka'),
('ecommerce', 'E-Commerce', 'E-Ticaret')
ON CONFLICT (slug) DO NOTHING;

-- Security Policies (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated users (admins)" ON categories
    FOR ALL USING (auth.role() = 'authenticated');
