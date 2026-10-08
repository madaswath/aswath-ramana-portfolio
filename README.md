# Aswath Ramana

One-page portfolio for Aswath Ramana, Senior GenAI Engineer in Chennai. The page uses a light navy-and-gold theme: serif headlines, proof cards, grouped capabilities, and a direct contact panel.

Copy, employers, projects, dates, and figures come from the resume. They live in `lib/content.ts`.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run lint
npm run build
```

## Deploy on Netlify

`netlify.toml` builds the site with `npm run build` and publishes the static `out` folder. In the Netlify site settings, clear any publish directory so it does not stay set to `.next`, then trigger a new deploy.
