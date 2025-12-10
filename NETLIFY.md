# Deploying CampusGuard to Netlify

This project is a Vite + React TypeScript SPA. These files and steps make it Netlify-ready.

What I added

- `netlify.toml` — sets `npm run build` as the build command and `dist` as the publish folder. Also includes a fallback redirect rule.
- `public/_redirects` — ensures SPA client-side routing works on Netlify by redirecting all routes to `index.html`.

Required environment variables

Set the following environment variables in the Netlify site settings (Site settings → Build & deploy → Environment):

- `VITE_SUPABASE_URL` — your Supabase project URL (or `SUPABASE_URL` if you prefer; your code may reference `import.meta.env.VITE_*` variables).
- `VITE_SUPABASE_ANON_KEY` — your Supabase public anon key (or `SUPABASE_ANON_KEY`).

Note: This repo uses Vite. Vite exposes environment variables that start with `VITE_` to client-side code. If your code currently reads `process.env.SUPABASE_URL`, update it to use `import.meta.env.VITE_SUPABASE_URL` or set those exact names in Netlify and map them using Netlify's build environment.

Netlify deploy steps (UI)

1. Login to Netlify and click "New site from Git".
2. Connect your Git provider and pick this repository.
3. For the build command, Netlify will read `netlify.toml` — it will use `npm run build` by default. Publish directory: `dist`.
4. Add environment variables in Site settings → Build & deploy → Environment → Edit variables.
5. Trigger deploy.

Netlify CLI (optional)

If you prefer to test a deploy locally or use CLI-based deploys, install the Netlify CLI and run:

```powershell
# Install netlify-cli globally (one-time)
npm install -g netlify-cli

# Build locally
npm run build

# Serve locally with Netlify dev (handles env)
netlify dev

# Or deploy a production build
netlify deploy --prod --dir=dist
```

Testing after deploy

- Open your site URL from Netlify and verify SPA routes load correctly (e.g., /add-device, /add-log).
- Ensure Supabase calls work; if not, double-check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set.

Optional improvements

- Add a `netlify` deploy badge to `README.md` once the site is connected.
- If you want server-side secrets (not exposed to client), use Netlify Functions or a backend service.

If you'd like, I can:

- Update your code to use `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if it's not already.
- Add a sample `.env.example` showing variable names to keep in repository (do NOT commit real secrets).
