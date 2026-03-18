# RedGreen Flags

RedGreen Flags is now a **fully static viral voting web app** built with **HTML + CSS + vanilla JavaScript**. It is designed to run directly on **GitHub Pages** while using **Supabase only** for persistence and realtime updates.

---

## 1. Analysis of the original project issues

The current repository already contained a partial rebuild, but it still had several issues that blocked the architecture requested in your brief.

### Why it did not fully match the goal

1. **It still depended on Vite-only env injection.**
   - The previous `js/main.js` read `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
   - That works only after a Vite build step.
   - A plain GitHub Pages deployment cannot read those values at runtime from static files.

2. **It was not truly “pure static” at runtime.**
   - The UI itself was vanilla JS, but configuration relied on bundler behavior.
   - That made deployment more fragile than necessary.

3. **The Supabase schema was close but not fully aligned with the brief.**
   - The SQL used `gen_random_uuid()` instead of the requested `uuid_generate_v4()`.
   - The policy intent said “allow UPDATE votes only”, but the database also needs column-level privileges to make that real for the `anon` role.

4. **Infinite scroll was missing.**
   - The feed loaded all records at once and did not progressively reveal more content.

5. **The moderation layer was too simple.**
   - It only checked a small word list with plain substring matching.
   - It did not combine regex patterns and broader offensive/sexual vocabulary coverage.

6. **Deployment instructions still assumed a build pipeline first.**
   - The new target is simpler: direct static hosting on GitHub Pages plus Supabase.
   - Build tooling should be optional, not required.

7. **The project structure in documentation did not match the actual runtime needs.**
   - There was no static runtime config file for GitHub Pages.
   - That meant there was no clean path to configure Supabase without editing source code or bundling.

---

## 2. Final architecture

### Frontend
- Pure **HTML / CSS / Vanilla JS**
- Static files only
- Directly compatible with **GitHub Pages**
- No Node.js required in production
- No custom backend server

### Backend
- **Supabase only**
- Database table: `public.flags`
- Realtime updates via Supabase realtime
- Public insert/select and restricted vote updates

---

## 3. Final project structure

```text
.
├── assets/
├── index.html
├── styles.css
├── js/
│   ├── config.example.js
│   ├── config.js
│   └── main.js
├── supabase/
│   └── schema.sql
├── package.json
└── README.md
```

---

## 4. File overview

### `index.html`
- Static shell
- SEO meta tags
- Loads `js/config.js` first
- Loads `js/main.js` as an ES module

### `styles.css`
- Clean mobile-first UI
- Modern cards, badges, sticky panel, animations
- Responsive layout

### `js/config.js`
- Runtime config file for GitHub Pages
- Holds public Supabase URL and anon key
- Safe for public deployment because Supabase anon keys are designed to be public

### `js/config.example.js`
- Copy/paste template for configuration

### `js/main.js`
Implements:
- bilingual UI (EN/FR)
- browser language detection
- Supabase connection
- loading flags
- inserting flags
- local anti-spam voting
- realtime subscriptions
- trending sort
- random flag button
- share button
- infinite scroll
- bad-word filtering

### `supabase/schema.sql`
Contains:
- enum creation
- `flags` table
- RLS
- column-level vote update permissions
- realtime publication registration

---

## 5. Supabase SQL setup

Run this SQL in the Supabase SQL editor:

```sql
create extension if not exists "uuid-ossp";

create type public.flag_type as enum ('green', 'red');
create type public.flag_language as enum ('fr', 'en');

create table if not exists public.flags (
  id uuid primary key default uuid_generate_v4(),
  text varchar(120) not null unique,
  type public.flag_type not null,
  language public.flag_language not null,
  votes integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists flags_type_votes_idx on public.flags (type, votes desc);
create index if not exists flags_created_at_idx on public.flags (created_at desc);

alter table public.flags enable row level security;

revoke all on public.flags from anon, authenticated;
grant select, insert on public.flags to anon, authenticated;
grant update (votes) on public.flags to anon, authenticated;

create policy "Public read flags"
  on public.flags
  for select
  using (true);

create policy "Public insert flags"
  on public.flags
  for insert
  with check (
    char_length(trim(text)) between 8 and 120
    and type in ('green', 'red')
    and language in ('fr', 'en')
  );

create policy "Public update votes only"
  on public.flags
  for update
  using (true)
  with check (votes between -999999 and 999999);

alter publication supabase_realtime add table public.flags;
```

### Important security note
Postgres RLS policies do **not** by themselves restrict updates to only one column.
To enforce **“update votes only”**, this project uses both:
- **RLS policy** for row access
- **column-level `GRANT UPDATE (votes)`** permissions for `anon` and `authenticated`

That is the correct Supabase/Postgres approach for this requirement.

---

## 6. Bad word filter behavior

The frontend rejects content if it contains:
- insults in English
- insults in French
- sexual content terms
- offensive slurs

Implementation uses:
- predefined lists
- simple regex patterns
- normalized comparison (lowercase + accent removal)

### Examples blocked
- English insults/slurs
- French insults/slurs
- sexual vocabulary like `porn`, `xxx`, `blowjob`, `branlette`, etc.

---

## 7. App features included

### User-generated content
Users can:
- add a **Green Flag** or **Red Flag**
- write short text up to **120 characters**
- auto-detect EN/FR or force the language manually

### Voting system
Each card has:
- 👍 upvote
- 👎 downvote

Rules:
- one vote per user per flag
- vote state stored in `localStorage`
- optimistic UI updates
- Supabase vote total updated remotely

### Realtime
Using Supabase realtime:
- new flags appear instantly
- vote changes refresh live

### Multi-language
- browser language detection
- EN/FR switcher
- stored locale in `localStorage`
- language stored in the database

### UI / UX
- mobile-first layout
- trending/top/recent sorting
- infinite scroll behavior
- smooth card reveal animation
- sticky submission panel on desktop

### Bonus features
- trending algorithm based on **votes + recency**
- random flag button
- share button with Web Share API / clipboard fallback
- SEO tags in `index.html`
- demo mode if Supabase is not configured yet

---

## 8. Configuration

Because GitHub Pages serves static files, browser JavaScript cannot read raw environment variables directly at runtime.
So the recommended pattern is:

- keep config in `js/config.js` locally
- generate that file from environment variables in GitHub Actions for deployment

### Local development config

Copy:

```bash
cp js/config.example.js js/config.js
```

Then edit `js/config.js`:

```js
window.REDGREEN_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY'
};
```

### Local dev run
You do **not** need Node for production, but for local preview you can use any static server.
Example:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

---

## 9. GitHub Pages deployment

### Simplest option
Push these files directly and serve the repository root with GitHub Pages.

### Recommended secure automation with GitHub Actions
Use GitHub secrets:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Then create a Pages workflow that writes `js/config.js` during deployment:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - name: Create runtime config
        run: |
          cat > js/config.js <<EOF
          window.REDGREEN_CONFIG = {
            SUPABASE_URL: '${{ secrets.SUPABASE_URL }}',
            SUPABASE_ANON_KEY: '${{ secrets.SUPABASE_ANON_KEY }}'
          };
          EOF
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Why this works
- GitHub Pages serves static assets only
- `js/config.js` is generated before publishing
- Supabase anon key is public-safe for client usage
- No server runtime is needed

---

## 10. Notes on vote security

This implementation follows your requirement of:
- one vote per user in `localStorage`
- direct public Supabase updates
- no custom backend server

That is simple and deployable, but **not perfectly tamper-proof**, because users control their browsers.

If you want stronger abuse protection later, add:
- a `flag_votes` table
- hashed anonymous voter ids
- RPC or Edge Function validation
- rate limiting

For your requested architecture, the current version keeps things intentionally simple.

---

## 11. How to use

1. Configure Supabase.
2. Run the SQL in `supabase/schema.sql`.
3. Enable realtime for `public.flags` if needed in Supabase.
4. Add your `SUPABASE_URL` and `SUPABASE_ANON_KEY` into `js/config.js` or generate it during deploy.
5. Publish to GitHub Pages.

Done: fully static frontend, Supabase backend, no custom server.
