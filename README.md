# Aswath Ramana

One-page portfolio for Aswath Ramana, Senior GenAI Engineer in Chennai. The page uses a light navy-and-gold theme: serif headlines, proof cards, grouped capabilities, and a direct contact panel.

Copy, employers, projects, dates, and figures come from the resume. They live in `lib/content.ts`.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123). The same command starts the profile chat API on port 43127.

A chat button in the lower-right answers questions about the profile, projects, and skills. It answers from the published profile without any API key. Set `GROQ_API_KEY` when you want those answers written by Groq (`openai/gpt-oss-20b` unless `GROQ_MODEL` is set). Copy `.env.example` to `.env.local` for local Groq calls. `.env.local` is not committed.

```bash
npm run lint
npm run build
```

## Deploy on Netlify

`netlify.toml` builds the site with `npm run build` and publishes the static `out` folder. In the Netlify site settings, clear any publish directory so it does not stay set to `.next`, then trigger a new deploy.

Add `GROQ_API_KEY` in Netlify’s environment variables so the chat button uses Groq in production. The function is `netlify/functions/chat.ts` and is served at `/api/chat`. Optional: set `GROQ_MODEL` (default `openai/gpt-oss-20b`).
