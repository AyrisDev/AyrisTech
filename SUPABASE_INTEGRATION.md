# Ayris Tech - Supabase & Admin Panel Entegrasyon Planı

Bu belge, mevcut frontend yapısının dinamik bir altyapıya taşınması için gerekli olan veritabanı şemasını, Supabase entegrasyon adımlarını ve Admin Paneli stratejisini kapsamaktadır.

## **CRITICAL: RLS Policies & Storage Setup**

**Hata Alıyorsanız (RLS Error):** Veritabanı ve Storage işlemleri için Güvenlik Politikalarını (RLS) tanımlamanız gerekmektedir. Aşağıdaki SQL komutlarını Supabase "SQL Editor" bölümünde çalıştırın.

### 1. Storage Politikaları (Resim Yükleme İçin)
Önce `portfolio-images` adında bir Public Bucket oluşturun, ardından:

```sql
-- Storage'daki portfolio-images bucket'ı için politikalar
BEGIN;

-- Herkesin resimleri görmesine izin ver
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio-images' );

-- Sadece giriş yapmış adminlerin resim yüklemesine izin ver
CREATE POLICY "Admin Insert"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

-- Sadece giriş yapmış adminlerin resim silmesine/güncellemesine izin ver
CREATE POLICY "Admin Update Delete"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

COMMIT;
```

### 2. Tablo Politikaları (Veri Yönetimi İçin)

```sql
-- Projects Tablosu
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin All Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Posts Tablosu
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Admin All Posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

-- Services Tablosu
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin All Services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Contact Submissions Tablosu (Önemli: Anonim gönderime izin ver)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin Read Contacts" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public Insert Contacts" ON contact_submissions FOR INSERT WITH CHECK (true);
-- Alternatif güncelleme (Okundu/Arşivlendi) sadece admin için
CREATE POLICY "Admin Update Contacts" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');
```

---

## 1. Veritabanı Mimarisi (SQL)

Tüm dil destekli alanlar için `jsonb` kullanılacaktır. Örnek yapı: `title: { "en": "Project Name", "tr": "Proje Adı" }`.

### A. Blog Yazıları (`posts`)
```sql
create table posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title jsonb not null, -- {en, tr}
  excerpt jsonb,
  content jsonb, -- Zengin metin veya HTML
  featured_image text,
  category text, -- engineering, design, strategy, etc.
  author_id uuid references auth.users(id),
  read_time text,
  published_at timestamp with time zone default now(),
  is_published boolean default false,
  metadata jsonb -- SEO başlık ve açıklamaları için
);
```

### B. Portfolyo Projeleri (`projects`)
```sql
create table projects (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title jsonb not null,
  description jsonb,
  main_image text,
  category text,
  client text,
  role jsonb,
  sector jsonb,
  year text,
  overview jsonb,
  challenge jsonb,
  solution jsonb,
  visuals jsonb, -- Resim listesi: ["url1", "url2"]
  impact_stats jsonb, -- [{label: {en, tr}, value: "+300%"}]
  testimonial jsonb, -- {quote: {en, tr}, author: "Name", role: "Role"}
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);
```

### C. Hizmetler (`services`)
```sql
create table services (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title jsonb not null,
  description jsonb,
  icon text, -- Emoji or SVG path
  features jsonb, -- [{tr: "...", en: "..."}]
  order_index int default 0,
  created_at timestamp with time zone default now()
);
```

### D. İletişim Formu & Bülten
```sql
create table contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  full_name text,
  email text,
  subject text,
  message text,
  status text default 'new', -- new, read, archived
  created_at timestamp with time zone default now()
);

create table newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  status text default 'active',
  created_at timestamp with time zone default now()
);
```
