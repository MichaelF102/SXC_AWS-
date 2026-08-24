-- =================================================================
-- SXC AWS Club — Complete Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- =================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  full_details TEXT,
  date TIMESTAMPTZ NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  category TEXT DEFAULT 'WORKSHOP',
  status TEXT DEFAULT 'UPCOMING',
  is_featured BOOLEAN DEFAULT false,
  image_url TEXT,
  banner_url TEXT,
  speaker_names TEXT[] DEFAULT '{}',
  prerequisites TEXT[] DEFAULT '{}',
  agenda JSONB DEFAULT '[]'::jsonb,
  max_seats INTEGER DEFAULT 100,
  current_registrations INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EVENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  surname TEXT,
  uid TEXT NOT NULL,
  email TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  stream TEXT NOT NULL,
  college TEXT DEFAULT 'St. Xavier''s College',
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT DEFAULT 'GENERAL',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department_id TEXT REFERENCES public.departments(id) ON DELETE SET NULL,
  is_core BOOLEAN DEFAULT false,
  responsibilities TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events, departments, and team members
CREATE POLICY "Public events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public departments are viewable by everyone" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public team members are viewable by everyone" ON public.team_members FOR SELECT USING (true);

-- Allow public insert access for registrations and contact forms
CREATE POLICY "Allow public registration insert" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public contact message insert" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- =================================================================
-- INITIAL SEED DATA
-- =================================================================

INSERT INTO public.events (
  id, title, slug, description, full_details, date, time, venue, category, status, is_featured, image_url, banner_url, speaker_names, prerequisites, max_seats, current_registrations
) VALUES (
  'event-1',
  'AWS Foundations Event',
  'aws-foundations',
  'An introductory event to AWS and Cloud Computing.',
  'Learn the basics of cloud computing and AWS services with hands-on labs and real-world examples.',
  '2026-08-30T08:30:00Z',
  '02:00 PM - 04:00 PM IST',
  'Bonet Lab, St. Xavier''s College',
  'BOOTCAMP',
  'UPCOMING',
  true,
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Dr. Rajesh Kulkarni (AWS Principal Architect)', 'Aarav Sharma (SXC AWS Lead)', 'Sneha Mukherjee (AI Researcher)'],
  ARRAY['Basic understanding of programming', 'Laptop with modern web browser', 'AWS Free Tier account (optional)'],
  100,
  20
) ON CONFLICT (id) DO NOTHING;
