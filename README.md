# RedGreen Flags

RedGreen Flags is a static, mobile-first voting app for short **Green Flag** and **Red Flag** posts. The frontend is plain HTML/CSS/JavaScript built with Vite so it can be deployed directly to **GitHub Pages**, while persistence and realtime sync come from **Supabase**.

## Why the old project did not work

The original codebase had several architectural issues:

- `vite build` only transformed two modules because `index.html` never loaded `index.tsx`, so the React app was not actually bootstrapped.
- The app mixed Vite bundling with browser `importmap` CDN imports, which is fragile and unnecessary for GitHub Pages.
- The UI depended on Tailwind CDN classes and a React SPA structure, but the production build emitted essentially a mostly empty page.
- Moderation depended on `@google/genai` and environment-driven client-side AI calls, which are not appropriate for a simple GitHub Pages deployment.
- The data model in the UI did not match the requested backend model (`flags` table with `text`, `type`, `language`, `votes`, `created_at`).
- There was no real persistent database, no Supabase/Firebase integration, and no true realtime sync.

## Stack

- **Frontend:** HTML + CSS + vanilla JS
- **Build tool:** Vite
- **Backend:** Supabase
- **Realtime:** Supabase realtime on `public.flags`
- **Hosting:** GitHub Pages for frontend + Supabase for data

## Project structure

```text
.
├── index.html
├── styles.css
├── js/
│   └── main.js
├── supabase/
│   └── schema.sql
├── vite.config.ts
├── package.json
└── README.md
```

## Local development

```bash
npm install
npm run dev
```

If Supabase environment variables are not configured, the app still runs in **demo mode** with sample data so the UI stays functional.

## Environment variables

Create a `.env.local` file:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Vite exposes variables prefixed with `VITE_` to the browser.

## Supabase setup

### 1. Create a Supabase project

Create a new Supabase project from the Supabase dashboard.

### 2. Create the database schema

Open the SQL editor and run:

```sql
-- file: supabase/schema.sql
create extension if not exists pgcrypto;

create type flag_type as enum ('green', 'red');
create type flag_language as enum ('fr', 'en');

create table if not exists public.flags (
  id uuid primary key default gen_random_uuid(),
  text varchar(120) not null unique,
  type flag_type not null,
  language flag_language not null,
  votes integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists flags_type_votes_idx on public.flags (type, votes desc);
create index if not exists flags_created_at_idx on public.flags (created_at desc);

alter table public.flags enable row level security;

create policy "Public read flags"
  on public.flags for select
  using (true);

create policy "Public insert flags"
  on public.flags for insert
  with check (char_length(text) between 8 and 120);

create policy "Public update votes"
  on public.flags for update
  using (true)
  with check (votes between -999999 and 999999);
```

### 3. Enable realtime

In Supabase:

- Go to **Database** → **Replication**.
- Enable realtime for the `public.flags` table.

### 4. Get public credentials

Copy:

- `Project URL`
- `anon public key`

Add them to `.env.local` locally and to GitHub Actions secrets if you automate deployment.

## Moderation behavior

The app blocks submissions if they:

- are shorter than 8 characters
- are longer than 120 characters
- contain English or French bad words / insults / sexual terms
- duplicate an existing sentence already loaded in the feed

Language is auto-detected with lightweight heuristics, but users can manually override EN/FR before submitting.

## Voting behavior

- Each card has **upvote** and **downvote** controls.
- The app stores one local vote per user per item using `localStorage`.
- Vote totals are written back to Supabase by updating the `votes` integer.
- Cards can be sorted by **Trending**, **Top votes**, or **Recent**.

## Bonus features included

- **Trending algorithm**: boosts newer posts with good vote counts
- **Random flag button**
- **Share button** using Web Share API or clipboard fallback
- **Bilingual UI** with automatic locale detection
- **Demo mode** fallback when Supabase is not configured

## Deploy to GitHub Pages

### Option A — manual build

```bash
npm install
npm run build
```

Then deploy the generated `dist/` folder to GitHub Pages.

### Option B — GitHub Pages via Actions

1. Push this repository to GitHub.
2. In GitHub, enable **Pages** and choose **GitHub Actions** as the source.
3. Add a workflow similar to this:

```yaml
name: Deploy Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Notes for scaling later

If you need stricter anti-abuse later, add:

- a `flag_votes` table keyed by hashed anonymous user id
- Supabase Edge Functions for vote validation
- stronger multilingual moderation lists or a moderation API
- pagination / infinite loading for very large feeds

For the requested static GitHub Pages architecture, the current implementation keeps the stack intentionally simple while remaining deployable.
