# LocalJobs — Hyderabad

A simple, self-contained local job hunt web app. No frameworks, no build tools, no backend required to get started.

---

## File Structure

```
localjobs/
├── index.html   ← Page structure & markup
├── style.css    ← All styles
├── app.js       ← All logic (data, filtering, rendering, forms)
└── README.md    ← This file
```

---

## How to run locally

Just open `index.html` in any browser. No server needed.

```
Double-click index.html  →  Opens in your browser  →  Done
```

User-posted jobs are saved in `localStorage` so they persist between sessions.

---

## How to make it LIVE (free hosting options)

### Option 1 — Netlify Drop (easiest, 2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag and drop your `localjobs/` folder onto the page
3. Netlify gives you a live URL like `https://random-name.netlify.app`
4. (Optional) Go to Site settings → Change site name → set it to `hydjobs` etc.
5. Share the link — done!

To update: drag and drop the folder again.

---

### Option 2 — GitHub Pages (free, version-controlled)

1. Create a free account at https://github.com
2. Click "New repository" → name it `localjobs` → set to Public → Create
3. Upload your 3 files (index.html, style.css, app.js) via the GitHub web UI
4. Go to repository Settings → Pages → Source → select `main` branch → Save
5. Your site goes live at: `https://YOUR-USERNAME.github.io/localjobs`

To update: edit files directly on GitHub or push changes via Git.

---

### Option 3 — Vercel (fast, global CDN)

1. Install Node.js from https://nodejs.org
2. Run in terminal:
   ```
   npm install -g vercel
   cd localjobs
   vercel
   ```
3. Follow the prompts (create free account if needed)
4. Your site is live at `https://localjobs.vercel.app` (or similar)

---

### Option 4 — Custom Domain (professional)

After deploying to Netlify or Vercel:

1. Buy a `.in` domain from GoDaddy, Namecheap, or Google Domains (~₹700/yr)
   Example: `hydjobs.in` or `localworkshyd.in`
2. In Netlify/Vercel → Domain settings → Add custom domain
3. Follow their DNS instructions (takes ~10 minutes to go live)

---

## Next steps to grow the app

| Feature              | How to add it                                      |
|----------------------|----------------------------------------------------|
| Persistent database  | Use Firebase Firestore (free tier) or Supabase     |
| User login           | Add Firebase Auth or Supabase Auth                 |
| WhatsApp alerts      | Use Twilio or WhatsApp Business API                |
| Resume upload        | Use Cloudinary or Supabase Storage                 |
| Admin panel          | Password-protect a separate `admin.html` page      |
| SEO                  | Add `<meta>` tags and a sitemap                    |

---

## Customisation tips

- Change city name: search for "Hyderabad" in all 3 files and replace
- Change accent color: edit `--green` in `style.css`
- Add more seed jobs: edit the `SEED_JOBS` array in `app.js`
- Add more job types: add `<option>` tags in both `index.html` selects
