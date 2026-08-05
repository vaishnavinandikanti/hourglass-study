# Hourglass — a study space

A study timer with Pomodoro / Deep Focus / 52-17 / Ultradian / Custom techniques,
five animated background "atmospheres," and an embedded Spotify player. No
backend, no API keys, no login required — free to run and free to host.

## Run it locally (on your Mac)

```bash
cd study-timer
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Deploy for free — Vercel (recommended)

Vercel auto-detects Vite/React, builds it, and gives you a free `*.vercel.app`
URL with HTTPS. Easiest path from a Mac:

1. Push this folder to a new GitHub repo:
   ```bash
   cd study-timer
   git init
   git add .
   git commit -m "Hourglass study timer"
   gh repo create hourglass-study --public --source=. --push
   ```
   (No GitHub CLI? Create an empty repo on github.com, then
   `git remote add origin <your-repo-url> && git push -u origin main`.)

2. Go to https://vercel.com → **Add New → Project** → import that repo.
3. Vercel detects "Vite" automatically. Leave build command as `npm run build`
   and output directory as `dist`. Click **Deploy**.
4. Done — you get a live URL in about a minute, and every future `git push`
   auto-redeploys.

No credit card, no server to manage, generous free tier for personal projects.

### Alternative: Netlify
Same idea — netlify.com → "Add new site" → "Import an existing project" →
pick the repo → build command `npm run build`, publish directory `dist`.

### Alternative: GitHub Pages
Works too, but needs one extra step (a `base` path in `vite.config.js` matching
your repo name, and the `gh-pages` package or a GitHub Action) since Pages
serves from a sub-path rather than the domain root. Vercel/Netlify skip that
complexity, which is why they're recommended here.

## Customizing

- **Techniques**: edit `src/techniques.js` — add/change work & break minutes.
- **Backgrounds**: edit `src/components/Atmosphere.css` — each theme
  (`ember`, `aurora`, `tide`, `grove`, `midnight`) is a CSS gradient + a few
  blurred, animated blobs. Add a new theme by adding a new `.atmosphere--name`
  block and registering it in `Atmosphere.jsx`'s `ATMOSPHERES` list.
- **Spotify presets**: edit `PRESETS` in `src/components/SpotifyPanel.jsx`.
  To find a playlist's ID: open it in Spotify → Share → Copy link → the ID is
  the string after `/playlist/`. The embed needs no login for listening,
  but the listener does need free/Premium Spotify to actually hear audio
  (Spotify's embed requires an active Spotify session in another tab or the app).
