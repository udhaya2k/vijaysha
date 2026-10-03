# A Little Birthday Surprise

A small, responsive birthday microsite built with React and Vite. The site is open to everyone; the optional note form never gates the birthday surprise and does not require a login.

## Run locally

```sh
npm install
npm run dev
```

## Optional Supabase notes

The optional note form stores a name (or `Anonymous` if left blank), the submitted message, and a server-generated submission time. A visitor must explicitly consent before sending. Notes are not displayed on the site; read them in the Supabase dashboard under **Table Editor → notes**. The public browser key can insert notes only; it cannot read or change stored notes. Do not put private or sensitive information in notes.

To enable submissions:

1. Create a Supabase project.
2. Open its **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql). The app inserts `name` and `message` into `public.notes`; this script creates or updates the table with row-level security and anonymous insert-only access. If your existing table uses different types or column constraints, confirm they accept `name` (text, up to 100 characters) and `message` (text, up to 1,000 characters).
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the Supabase project's API settings. A publishable/anon key is intended for browser use with RLS enabled. Never use a `service_role` or secret key in this Vite app.
4. Restart the dev server after changing `.env.local`.
5. For deployment, set the same two environment variables in the hosting provider's project settings, then redeploy.

If the variables are missing, the surprise continues to work normally and the note form displays a setup message instead.

## Build and lint

```sh
npm run build
npm run lint
```
