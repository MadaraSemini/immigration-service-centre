# Immigration Consulting Service (ICS) Website

A modern, production-ready static website for Immigration Consulting Service, a Sri Lanka-based visa consultancy.

**Stack:** React + Vite + Tailwind CSS v4 + Framer Motion

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

The compiled site will be in the `dist/` folder.

---

## Customization Guide

### Add real feedback screenshots

1. Drop your screenshot files into `public/images/feedbacks/` (e.g., `fb3.jpg`)
2. Open `src/data/feedbacks.js` and add an entry to the `screenshotFeedbacks` array:

```js
{
  id: 3,
  src: '/images/feedbacks/fb3.jpg',
  caption: 'Google Review — Happy Client, 2024',
}
```

### Update contact numbers / WhatsApp / Telegram links

Search for `wa.me/` and `t.me/` in the following files and replace the numbers:

- `src/components/FloatingButtons.jsx`
- `src/components/ContactUs.jsx`
- `src/components/Footer.jsx`

Current numbers:
- WhatsApp: `wa.me/94772744628` → format: country code + number, no spaces
- Telegram: `t.me/+94772744628`

### Add or edit services

Edit `src/data/services.js`. The icon name must match a valid icon from `react-icons/fa`.

### Change colors or fonts

Edit `tailwind.config.js` → `theme.extend.colors` and `theme.extend.fontFamily`.

---

## Deployment

### Option 1 — Netlify (Recommended, Free)

```bash
npm run build
```

1. Go to [netlify.com](https://netlify.com) and sign in
2. Drag and drop the `dist/` folder onto the Netlify dashboard
3. Your site is live instantly
4. Add a custom domain in Netlify → Site settings → Domain management

### Option 2 — GitHub Pages

Install the deployment package:

```bash
npm install --save-dev gh-pages
```

The `predeploy` and `deploy` scripts are already in `package.json`.

Add `base` to `vite.config.js` if your repo is not at the root:

```js
export default defineConfig({
  base: '/ics-website/',  // replace with your repo name
  plugins: [react(), tailwindcss()],
})
```

Then deploy:

```bash
npm run deploy
```

---

## Business Info

| Field | Value |
|-------|-------|
| Business | Immigration Consulting Service (ICS) |
| Address | 51/E Galle Road, Kamburugamuwa, Sri Lanka |
| Phone 1 | 077 274 4628 |
| Phone 2 | 076 369 6592 |
| Email | krishalvidushka97@gmail.com |
| Hours | Mon–Sat: 8:00 AM – 6:00 PM |
