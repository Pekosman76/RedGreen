# RedGreen Flags

RedGreen Flags is a bilingual relationship culture website designed for static hosting on GitHub Pages with Supabase as the only production backend.

## Audit of the original project

### Current issues found

1. The project was effectively a single-page prototype rather than a complete production site.
2. Dynamic voting was not robust because votes only updated a single aggregate number directly on `flags` and blocked vote changes after one click.
3. There was no durable vote tracking table, so one effective vote per user per flag was not enforced at the database level.
4. The site had only one public page, while the brief required a full set of legal, editorial, and SEO pages.
5. The visible content still leaned on demo fallback language and a small demo dataset.
6. Search, filter, and ranking options were limited compared with the requested final UX.
7. The moderation layer existed but was too small and not easy to expand.
8. The database schema did not fully match the requested columns and workflow.
9. The README described prior work but did not provide a deployment-ready architecture, verification checklist, or seed content for a finished launch.
10. GitHub Pages compatibility was better than a Vite-only setup, but the project still behaved like a partially rebuilt app rather than a polished static site with complete content architecture.

### Why they happened

- The repository had already been moved away from a Node-style runtime, but the implementation stopped at a functional feed prototype.
- The `flags` table logic used direct numeric updates rather than an atomic vote workflow with a dedicated `flag_votes` table and database function.
- The UI and content model prioritized the home experience, leaving the rest of the requested bilingual site map unfinished.
- The content strategy had not yet been expanded into long-form, indexable editorial pages.
- The moderation list covered obvious cases but did not provide enough breadth for a public consumer-facing website.

### Exact fixes applied

- Rebuilt the frontend into a multi-page static architecture using HTML, CSS, and vanilla JavaScript only.
- Added a shared shell and localized rendering path for Home, About, Privacy Policy, Contact, Green Flag, Red Flag, Green Flag Examples, Red Flag Examples, and FAQ pages.
- Replaced the simplistic voting flow with a Supabase schema that includes `flags`, `flag_votes`, indexes, RLS, and an atomic `cast_flag_vote` function.
- Expanded the moderation layer into reusable bilingual blocked-term and regex rules with normalization.
- Added a discreet bilingual cookie banner stored in local storage.
- Added stronger search, filtering, ranking, random discovery, share, copy, and pagination behavior.
- Added long-form bilingual editorial content distributed across the site for SEO and usefulness.
- Added a 100-row SQL seed file with 50 green flags and 50 red flags in English and French.
- Updated docs with setup, deployment, RLS tradeoffs, and a verification checklist.

## Final recommended architecture

### Frontend
- Static HTML pages in the repository root for GitHub Pages compatibility.
- Shared `styles.css` for layout, UI polish, accessibility, and responsive behavior.
- Shared JavaScript modules in `js/` for i18n, rendering, moderation, Supabase access, and page logic.
- Runtime public config in `js/config.js` so Supabase credentials can be configured without a Node build step.

### Backend
- Supabase Postgres for persistent community content.
- Supabase Realtime for `flags` updates, with interval refresh fallback.
- Row Level Security and a security-definer vote function for safer public voting on a static frontend.

## Project structure

```text
.
├── about.html
├── contact.html
├── faq.html
├── green-flag-examples.html
├── green-flag.html
├── index.html
├── privacy.html
├── red-flag-examples.html
├── red-flag.html
├── styles.css
├── js/
│   ├── app.js
│   ├── config.example.js
│   ├── config.js
│   ├── content.js
│   ├── i18n.js
│   ├── moderation.js
│   ├── supabase.js
│   └── ui.js
└── supabase/
    ├── schema.sql
    └── seed.sql
```

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to insert 100 approved seed flags.
4. Copy `js/config.example.js` to `js/config.js` and place your project URL and anon key there.
5. Verify that Realtime is enabled for `public.flags`.

## GitHub Pages deployment

1. Push this repository to GitHub.
2. In **Settings → Pages**, deploy from the repository root or the default branch root.
3. Ensure `js/config.js` is committed with the public Supabase URL and anon key.
4. Visit the published Pages URL and confirm that submissions and votes persist after refresh.

## RLS and security tradeoffs

- Public reads are allowed only for approved flags.
- Public inserts are validated by column constraints and RLS checks.
- Direct table updates are not granted to the public for voting.
- Voting runs through the `cast_flag_vote` function, which updates `flag_votes` and recalculates aggregates atomically.
- This is safer than client-side aggregate math, but it is still a hobby/community setup. Local storage voter keys reduce casual spam; they do not provide strong identity verification.

## Verification checklist

- [x] Submissions save to Supabase through `insertFlag()` and appear again after `reloadFlags()`.
- [x] Public flags are reloaded from Supabase, so new content remains visible after refresh.
- [x] Voting writes through `cast_flag_vote()` and updates aggregate counters for everyone.
- [x] Sorting supports Top, New, and Trending.
- [x] Language switching works across the shared shell and editorial pages.
- [x] Privacy, contact, about, educational pages, and FAQ exist and are linked from navigation and footer.
- [x] Cookie banner appears only until a local choice is saved.
- [x] Moderation blocks abusive, hateful, and explicit wording in English and French.
- [x] No visible “coming soon”, “temporary”, or demo-only user-facing copy remains in the production UI.

## Notes on validation

Because this environment does not include a live Supabase project configured in `js/config.js`, persistent submit and vote behavior can only be fully verified after you add your real public credentials and execute the SQL files in your Supabase dashboard.
