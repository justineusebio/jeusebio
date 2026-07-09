# euseb.io

Personal site for Justin Eusebio. Static HTML — no build step, no dependencies.

## Structure

```
index.html          → homepage
about/index.html    → /about/
blog/index.html     → /blog/ (field notes)
blog/<slug>/        → individual posts (placeholder scaffolds, noindex until ready)
blog/_template/     → copyable template for new posts (not linked anywhere)
weddings/index.html → /weddings/ (hidden easter-egg page, noindex)
404.html            → custom 404
assets/style.css    → shared stylesheet (incl. light mode)
assets/headshot.jpg → headshot (done)
CNAME               → custom domain (euseb.io)
.nojekyll           → disables Jekyll processing
```

## Easter eggs

- **/weddings** — hidden page, linked only via the dotted "occasionally doing something you wouldn't expect" in the about copy.
- **Konami Code** — type ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the site to unleash GeoCities mode (Comic Sans, starfield, marquee, visitor counter, sparkle cursor, guestbook). It follows the visitor between pages for the rest of their session; entering the code again returns them to 2026. Logic in `assets/geocities.js`, styles in the GEOCITIES MODE section of `assets/style.css`. Desktop/keyboard only.

## Light / dark mode

Dark is the default (it's the brand). The sun/moon button in the nav switches themes and the choice is remembered per visitor (localStorage). All colors are CSS variables at the top of `assets/style.css` — the `html[data-theme="light"]` block holds the light palette.

## Writing a blog post

Every field-notes entry already has a placeholder page at `blog/<slug>/index.html` with scaffold headings to write into. To finish a post:

1. Write the content in the post's `index.html` (plain HTML: `<p>`, `<h2>`, `<ul>`, `<img>` — styles are ready).
2. Delete the `post-placeholder` note and the `<meta name="robots" content="noindex" />` line.
3. Link it up: in `blog/index.html`, change that entry from
   `<div class="post-entry post-entry--soon">` to `<a href="/blog/<slug>/" class="post-entry">`
   (and `</div>` → `</a>`). Same idea for the homepage list if featured there.
4. Commit + push — GitHub Pages redeploys in about a minute.

For a brand-new post: `cp -r blog/_template blog/my-new-post`, edit away, then add an entry to `blog/index.html`.
Post images: drop them in the post's own folder and reference like `<img src="photo.jpg" alt="...">`.
Once all posts are live, remove the "archive is moving over" intro note on `blog/index.html`.

## Deploy to GitHub Pages

Repo: `justineusebio/jeusebio` · Final address: **https://euseb.io** (DNS on Hover)

1. Push this folder's contents to the repo root on the `main` branch:
   ```bash
   cd euseb.io-site
   git init && git add -A && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/justineusebio/jeusebio.git
   git push -u origin main
   ```
   (Public repo required on the GitHub free plan.)
2. In the repo: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save.**
3. Don't test at `justineusebio.github.io/jeusebio/` — because the repo contains a `CNAME` file, GitHub immediately redirects that URL to `euseb.io`, so it only works once DNS (below) is set up. That's expected, not broken.

## Custom domain (euseb.io via Hover)

The `CNAME` file is already in place. Three steps, in this order:

1. **Switch nameservers back to Hover** (as of July 2026 the domain still points at Bluehost's nameservers — `ns1/ns2.bluehost.com` — so Hover's DNS tab shows "records added here won't have an effect").
   In Hover: `euseb.io` → **Overview** tab → Nameservers → Edit → set to:
   ```
   ns1.hover.com
   ns2.hover.com
   ns3.hover.com
   ```
   Nameserver changes can take a few hours (occasionally up to 24–48h) to propagate.

2. **Fix the records in Hover's DNS tab** (these take effect once the nameservers switch):
   - **Delete** the two parking records: `A @ → 216.40.34.41` and `A * → 216.40.34.41`.
   - **Keep** the MX and `mail` CNAME rows (Hover's email defaults).
   - **Add:**

   | Type  | Hostname | Target |
   |-------|----------|----------------------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | justineusebio.github.io |

   > Verify GitHub's current IPs at: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

3. **In GitHub:** Settings → Pages → Custom domain → enter `euseb.io` → Save. Check **Enforce HTTPS** once the certificate is issued (can take up to an hour after DNS resolves).

**Email note:** the current Bluehost zone routes @euseb.io email through Bluehost. If you have any @euseb.io mailboxes there you still use, they'll stop receiving after the nameserver switch. If all your email is Gmail, ignore this.

## Before going live

- [x] `assets/headshot.jpg` (done, July 2026)
- [x] YouTube link → https://www.youtube.com/@JustinEusebio (done, July 2026)
- [x] Blog posts → "coming soon" archive list + placeholder post pages ready to build out (done, July 2026)
- [x] Light/dark mode toggle (done, July 2026)

**Nothing blocking — ready to deploy.**

## After launch (whenever you're ready)

- Write out the placeholder posts (see "Writing a blog post" above).
- Update streak counters occasionally: photo-a-day (4,200+ as of July 2026) and 1SE clips (3,830+ as of July 2026) on `index.html` and `about/index.html`.

## Editing

Everything visual lives in `assets/style.css`. Design tokens are CSS variables at the top:
blue `#2ea3f2`, bright blue `#38b6ff`, background `#0a0a09`, max width 780px,
Syne 800 for headings, DM Sans 300–500 for body.
