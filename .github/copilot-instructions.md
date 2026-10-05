# Repository guidance

## Commands

Run these from the repository root:

```sh
npm run dev
npm run build
npm run lint
npx eslint src/components/NoteForm.jsx
npm run preview
```

The repository does not currently define a test script or include test files, so there is no single-test command. The `npx eslint <file>` command runs lint on one file.

## Application structure

This is a client-rendered React 19 app built with Vite. `src/main.jsx` mounts `src/App.jsx`; `App` owns the selected page, birthday-card state, audio playback, and page-level interactions. Navigation is an in-app tab switch, not a URL router: the tab names in `src/data/config.js` must match the values `App` checks when rendering sections.

Page content is separated from presentation. `src/data/messages.js`, `songs.js`, and `memories.js` export arrays that `App` maps into the corresponding card components under `src/components/`. `src/data/config.js` contains shared site copy, audio URLs, contact links, and navigation items. Keep repeated content edits in these data modules rather than duplicating card markup in `App`.

`src/index.css` contains global theme tokens, reset/base styles, and the site-wide layout; `src/App.css` is not imported by the app entry point. Component/page styles are maintained in the stylesheet that is imported by the running app, `src/index.css`.

The optional note form is the only backend integration. `src/lib/supabase.js` creates a browser client only when both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are present. `src/components/NoteForm.jsx` requires visitor consent and submits only `name` and `message`; `supabase/schema.sql` defines the matching table constraints and anonymous insert-only RLS policy. Keep the no-configuration path usable, and never put a Supabase `service_role` or other secret key in this Vite client.

`src/utils/youtube.js` validates supported YouTube URL formats and video IDs before building privacy-enhanced embed URLs; `SongCard` uses it to decide between an embed and the invalid/missing-link placeholder.

## Codebase-specific conventions

- Keep tab identifiers synchronized among `navItems`, the `activeTab` branches in `App`, and the navigation UI. `Navbar` supports both desktop navigation and a mobile “More” menu.
- The content lists are rendered using each entry’s `title` as the React key. Preserve unique titles within each list when editing content.
- Audio playback is centralized in `App` through one audio element. Navigation away from “Little Messages” stops playback, and the playback request counter prevents stale play failures from replacing current status.
- Keep the note form’s client-side name/message limits aligned with the `name` and `message` constraints and insert policy in `supabase/schema.sql` (100 and 1,000 characters respectively).
