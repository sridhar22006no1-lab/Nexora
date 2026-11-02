# Nexora 🚀

> **Production-Ready Student Career Discovery & Developer Portfolio Platform**  
> *"Show Your Skills. Land Your Dream Role."*

---

## 🌟 Overview

**Nexora** is a student career ecosystem and verified proof-of-work platform engineered for engineering undergraduates and tech freshers across India. 

Rather than relying solely on passive paper resumes, Nexora elevates **working code proofs**, **live interactive deployments**, and **verified GitHub repositories**, while providing students with a transparent, anti-spam directory of corporate internships and fresher openings with explicit INR stipends.

### Key Capabilities:
1. **Verified Fresher & Intern Vacancies**: Filter by workplace mode (Remote, Hybrid, Onsite), Indian tech hubs (Chennai, Bengaluru, Gurugram, Hyderabad, Pune), employment type, and target engineering batch (`2025`, `2026`, `2027`). 100% direct corporate portal links.
2. **Student Mini-Project Showcase**: Discover verified projects built by students across Web Development, AI & ML, UI/UX, and PWAs with live demo buttons and GitHub repositories.
3. **Sridhar's Flagship Portfolio**:
   - Creator profile (B.Tech IT, Jaya Engineering College, Chennai, Batch 2026).
   - Recruiter readiness score (92% profile strength).
   - Direct links to GitHub (`sridhar22006no1-lab`) and LinkedIn.
   - Live flagship projects: **AU Study Hub** and **Nexora**.
   - Direct contact form wired into Supabase database.
4. **Engineering Career Playbook**: Tactical guide for engineering students on resume mistakes, project selection, and GitHub/LinkedIn recruiter optimization.
5. **Supabase PostgreSQL & Hybrid Fallback**: Real-time cloud sync with built-in fallback to LocalStorage for zero-dependency local evaluation and offline viva presentations.

---

## 🏗️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite 5, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL 15), Row Level Security (RLS)
- **Local Persistence**: HTML5 LocalStorage Hybrid Fallback Engine
- **Font & Styling**: Plus Jakarta Sans, Custom Slim Scrollbars, Glassmorphism

---

## 🗄️ Supabase Database Schema

To connect your own Supabase project, execute these SQL queries in your [Supabase SQL Editor](https://supabase.com/dashboard):

```sql
-- 1. Student Projects Table
create table public.projects (
  id text primary key,
  title text not null,
  tagline text not null,
  category text not null,
  author_name text not null,
  author_college text not null,
  technologies text[] default '{}',
  github_url text not null,
  live_demo_url text not null,
  stars int default 0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Verified Job Openings Table
create table public.jobs (
  id text primary key,
  title text not null,
  company_name text not null,
  company_logo text,
  location text not null,
  workplace_type text not null,
  employment_type text not null,
  graduation_batch text[] default '{}',
  compensation text not null,
  required_skills text[] default '{}',
  description text not null,
  apply_url text not null,
  verified boolean default true,
  verified_date text not null,
  status text default 'published',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Inquiries & Contact Messages Table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.jobs enable row level security;
alter table public.messages enable row level security;

-- Public Read & Insert Policies
create policy "Allow public read on projects" on public.projects for select using (true);
create policy "Allow public insert on projects" on public.projects for insert with check (true);

create policy "Allow public read on jobs" on public.jobs for select using (true);

create policy "Allow public insert on messages" on public.messages for insert with check (true);
```

---

## 🚀 Quick Start (Development)

```bash
# 1. Navigate to project directory
cd C:\Users\SYS8\.gemini\antigravity\scratch\nexora

# 2. Start Vite Development Server
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 👨‍💻 Developer & Maintainer

- **Developer**: Sridhar (B.Tech Information Technology, Jaya Engineering College, Chennai, Batch 2026)
- **GitHub**: [github.com/sridhar22006no1-lab](https://github.com/sridhar22006no1-lab)
- **Email**: sridhar22006no1@gmail.com
