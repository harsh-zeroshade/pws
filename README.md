# Pacific World School — Official Website

> A modern, full-stack school website built with Next.js 16, featuring a complete CMS-powered admin panel, dynamic content management, and a premium dark-themed design.

**Live:** [pacificworldschool.vercel.app](https://pacificworldschool.vercel.app) &nbsp;|&nbsp; **Stack:** Next.js · MongoDB · NextAuth · Tailwind CSS · Framer Motion

---

## What's Inside

This is the official website for **Pacific World School**, Greater Noida West — a premier CBSE & Cambridge International school. The project ships with:

- A fully animated public-facing website with 25+ pages
- A secure, hidden admin panel at `/admin` (no public link)
- A MongoDB-backed CMS — every piece of text, image, and video is editable without touching code
- Media library for uploading and managing images and videos
- Dark/light toggle admin UI built on the reference CodingNepal sidebar design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + custom CSS modules |
| Animations | Framer Motion |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | NextAuth.js v4 (JWT strategy) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Icons | Material Symbols Rounded (Google CDN) |
| Deploy | Vercel (recommended) |

---

## Project Structure

```
src/
├── app/
│   ├── (public pages)         # 25+ school pages
│   │   ├── about/
│   │   ├── academics/
│   │   ├── admission/
│   │   ├── beyond-academics/
│   │   ├── committee/
│   │   ├── contact/
│   │   ├── gallery/
│   │   └── achievements/
│   │
│   ├── admin/                 # Hidden CMS (no public link)
│   │   ├── login/             # Secure login page
│   │   ├── dashboard/         # Overview + quick access
│   │   ├── pages/             # Per-page content editors
│   │   ├── media/             # File upload & management
│   │   └── settings/          # School info & contact
│   │
│   └── api/
│       ├── auth/[...nextauth]/ # NextAuth handler
│       ├── content/           # GET/POST/DELETE content
│       ├── media/             # GET/DELETE media
│       └── upload/            # File upload handler
│
├── components/
│   ├── admin/                 # AdminShell, AdminGuard, ContentEditor
│   ├── ui/                    # Skiper UI primitives
│   └── (shared components)    # Navbar, Footer, PageLayout, etc.
│
├── hooks/
│   └── useContent.js          # useContent + usePublicContent hooks
│
├── lib/
│   ├── authOptions.js         # NextAuth config
│   ├── mongodb.js             # Mongoose connection with Atlas
│   └── utils.js               # Shared utilities
│
└── models/
    ├── Content.js             # CMS content schema
    └── Media.js               # Uploaded media schema
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/harsh-zeroshade/pws.git
cd pws
npm install
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas connection string
# Get from: cloud.mongodb.com → Connect → Drivers
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pws_cms?retryWrites=true&w=majority

# NextAuth — use a long random string in production
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

> **Note:** If your password contains `@`, encode it as `%40` in the URI.

### 3. Set up MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create database `pws_cms` with collection `contents`
3. Add a database user with read/write access
4. In **Network Access**, add `0.0.0.0/0` (or your server IP)
5. Paste the connection string into `MONGODB_URI`

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 5. Access the admin panel

Navigate to **`http://localhost:3000/admin`** — there is no link to it anywhere on the public site.

Use the credentials set in your `.env.local`:
- Username: `admin` (or whatever you set)
- Password: `your-secure-password`

---

## Admin Panel Features

The admin panel lives at `/admin` and is fully protected by JWT sessions. Everything is editable without touching code.

### Content Editors

| Section | What you can edit |
|---|---|
| **Home Hero** | Headline, subtitle, CTA button text |
| **Hero Video** | Upload or replace the full-screen background video |
| **Stats Bar** | The 4 numbers shown on the hero (10+ Acres, 250+ Faculty, etc.) |
| **Announcements** | Ticker items shown in the top bar |
| **Partners** | Logos in the scrolling marquee |
| **About School** | Hero image, mission, vision text |
| **Chairperson / Vice Chair / Principal** | Portrait photo, message paragraphs |
| **Leadership Team** | Add/edit/remove leader cards |
| **Differentiating Factors** | The 10 pillars with titles and descriptions |
| **Our Faculty** | Full 200+ faculty table (modal editor per row) |
| **Amenities** | Campus facility cards with images |
| **CBSE / Cambridge** | Page hero, highlights, description |
| **Topper Details** | Board exam toppers with photos and scores |
| **Registration** | Steps, required documents, fees |
| **Contact Info** | Phone, email, address, social media links |

### Media Library

Upload images and videos via drag-and-drop or file picker. Copy URLs directly into any content field. Delete unused files to free space.

### Settings

Edit school codes (CBSE, Cambridge), phone numbers, and site-wide information that appears across multiple pages.

---

## How Dynamic Content Works

1. **Admin saves** → `POST /api/content` writes `{ page, section, data }` to MongoDB
2. **Public page loads** → `usePublicContent(page, section, defaultData)` fetches from `GET /api/content`
3. If the DB has content, it overrides the hardcoded default. If not, the default shows — so the site always has content even before the admin has edited anything.

This means you can deploy with zero DB content and the site looks perfect with the built-in defaults.

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set these environment variables in your Vercel project dashboard:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your production domain, e.g. `https://pws.vercel.app`)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

> The `/admin` route is protected by middleware + JWT. It returns a 401/redirect for unauthenticated requests. The route itself is not linked anywhere on the public site — access it by navigating directly.

---

## Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing (min 32 chars) |
| `NEXTAUTH_URL` | ✅ | Full URL of your site (with `https://` in prod) |
| `ADMIN_USERNAME` | ✅ | Admin login username |
| `ADMIN_PASSWORD` | ✅ | Admin login password |

---

## Security Notes

- The admin panel has no public link — access only via direct URL
- All admin API routes validate the JWT token on every request using `getToken()` from NextAuth
- The middleware at `src/middleware.js` redirects unauthenticated requests to `/admin/login`
- Never commit `.env.local` — it's in `.gitignore`
- Change `NEXTAUTH_SECRET` and `ADMIN_PASSWORD` before deploying to production

---

## License

Private — All rights reserved. Pacific World School, Greater Noida West.
