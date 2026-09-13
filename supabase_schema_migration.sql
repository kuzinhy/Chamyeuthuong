-- ====================================================================
-- LUMI - LAN TỎA LÒNG TRẮC ẨN (CHẠM YÊU THƯƠNG)
-- SUPABASE POSTGRESQL COMPLETE DATABASE SCHEMA MIGRATION & RLS POLICIES
-- Target Runtime: Supabase PostgreSQL 15+
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MODERATOR', 'MEMBER', 'GUEST');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE story_status_type AS ENUM ('draft', 'pending', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE submission_status_type AS ENUM ('pending', 'approved', 'rejected', 'converted_to_story');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE moderation_status_type AS ENUM ('pending', 'approved', 'rejected', 'hidden');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE region_type AS ENUM ('north', 'central', 'south');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROVINCES TABLE (63 Tỉnh Thành Việt Nam)
CREATE TABLE IF NOT EXISTS provinces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    region region_type NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    story_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name VARCHAR(120) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
    role user_role_type DEFAULT 'MEMBER' NOT NULL,
    account_status VARCHAR(50) DEFAULT 'active' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. USER ROLES TABLE (Detailed role logs)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role_type NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role)
);

-- 6. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TAGS TABLE
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- 8. STORIES TABLE
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    message TEXT NOT NULL, -- Thông điệp trắc ẩn của LUMI
    cover_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
    region region_type NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    source_name VARCHAR(255) NOT NULL,
    source_url TEXT NOT NULL,
    source_publish_date DATE NOT NULL,
    author VARCHAR(150),
    status story_status_type DEFAULT 'published' NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    views INTEGER DEFAULT 0 NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. STORY TAGS RELATION
CREATE TABLE IF NOT EXISTS story_tags (
    story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (story_id, tag_id)
);

-- 10. LOVE LETTERS TABLE
CREATE TABLE IF NOT EXISTS love_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    display_name VARCHAR(120),
    recipient_name VARCHAR(120),
    content TEXT NOT NULL,
    letter_type VARCHAR(100) NOT NULL, -- Cảm ơn, Xin lỗi, Động viên, Yêu thương, Chúc
    is_anonymous BOOLEAN DEFAULT false NOT NULL,
    is_public BOOLEAN DEFAULT true NOT NULL,
    moderation_status moderation_status_type DEFAULT 'pending' NOT NULL,
    moderated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reply_from_lumi TEXT,
    color_theme VARCHAR(50) DEFAULT 'rose' NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMPTZ
);

-- 11. STORY SUBMISSIONS TABLE (KỂ LUMI NGHE)
CREATE TABLE IF NOT EXISTS story_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
    source_url TEXT,
    source_name VARCHAR(255),
    message TEXT,
    image_url TEXT,
    status submission_status_type DEFAULT 'pending' NOT NULL,
    feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- 12. MUSIC TRACKS TABLE
CREATE TABLE IF NOT EXISTS music_tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    artist VARCHAR(150) NOT NULL,
    composer VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    cover TEXT NOT NULL,
    audio_url TEXT,
    video_url TEXT,
    lyrics JSONB DEFAULT '[]'::jsonb,
    message TEXT,
    credits JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'published' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. ALBUMS & MEDIA ASSETS
CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    cover TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
    type VARCHAR(50) DEFAULT 'image' NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    title VARCHAR(255) NOT NULL,
    caption TEXT,
    alt_text TEXT,
    width INTEGER,
    height INTEGER,
    file_size VARCHAR(50),
    mime_type VARCHAR(100),
    storage_path TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    likes INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. BOOKMARKS & REACTIONS
CREATE TABLE IF NOT EXISTS story_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, story_id)
);

CREATE TABLE IF NOT EXISTS story_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    type VARCHAR(50) DEFAULT 'heart' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, story_id, type)
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target_url TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. RESEARCH RESULTS
CREATE TABLE IF NOT EXISTS research_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    value VARCHAR(50) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    chart_data JSONB DEFAULT '{}'::jsonb,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. SITE SETTINGS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE love_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Stories Policies
CREATE POLICY "Published stories are viewable by everyone" ON stories FOR SELECT USING (status = 'published');
CREATE POLICY "Staff can view all stories" ON stories FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MODERATOR'))
);
CREATE POLICY "Editors and Admins can insert stories" ON stories FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR'))
);
CREATE POLICY "Editors and Admins can update stories" ON stories FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR'))
);

-- Love Letters Policies
CREATE POLICY "Approved public letters are viewable by everyone" ON love_letters FOR SELECT USING (moderation_status = 'approved' AND is_public = true);
CREATE POLICY "Users can view own letters" ON love_letters FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can submit a love letter" ON love_letters FOR INSERT WITH CHECK (true);
CREATE POLICY "Moderators can update letters" ON love_letters FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'MODERATOR'))
);

-- Story Submissions Policies
CREATE POLICY "Users can view own submissions" ON story_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Staff can view all submissions" ON story_submissions FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'EDITOR'))
);
CREATE POLICY "Authenticated users can submit stories" ON story_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can review submissions" ON story_submissions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'EDITOR'))
);

-- Bookmarks & Reactions
CREATE POLICY "Users manage own bookmarks" ON story_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own reactions" ON story_reactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- ====================================================================
-- AUTOMATIC AUDIT LOG TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION log_story_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_value, new_value)
    VALUES (
        auth.uid(),
        TG_OP,
        'story',
        COALESCE(NEW.id, OLD.id)::text,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD)::jsonb ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_audit_stories ON stories;
CREATE TRIGGER trg_audit_stories
AFTER INSERT OR UPDATE OR DELETE ON stories
FOR EACH ROW EXECUTE FUNCTION log_story_changes();
