# Willow

Willow is a mobile-first PWA for finding the right words in conversations.

It supports:

- Five AI-generated reply options from a pasted message, written context or a chat screenshot
- Reply goals such as Reply naturally, Keep it going, Apologise, Flirt, Reassure, Explain myself, Say no politely, Comfort and Resolve argument
- Openers for when you are stuck on what to say, tailored by who you are talking to and opener style
- Nigerian-focused conversation starters
- Opener audiences: New person, Crush, Dating and Friend
- Opener categories with an All option, including Casual, Funny, Flirty, Deep, Playful, Check in, Reconnect, Late night, School, Work, Nigerian life, Music, Food, Weekend, Ambition and Travel
- Fresh opener sets of 5, 10, 15, 25, 30 or 50
- Browse and personalised starter modes
- Normal conversation categories and conversation-game categories, each with an All option
- Fresh starter sets of 5, 10, 15, 25, 30 or 50
- Pass-the-phone Party Games
- Local history and texting-style preferences
- Light and dark themes
- PWA installation and fixed mobile scale

## Brand

- Warm cream: `#F6EFE4`
- Light sage: `#B7CC9F`
- Mid sage: `#6E8F63`
- Dusty blush: `#E8B4A0`
- Warm brown-black: `#5B4A3F`

Tagline: `the right words, gently`

## Gemini setup

Willow keeps the Gemini API key on the server. Do not add the key to the frontend.

In Vercel, add one of these Production environment variables:

```text
GEMINI_API_KEY=your_key_here
```

`GOOGLE_AI_API_KEY` and `GOOGLE_API_KEY` also work as fallbacks.

The API route tries stable Gemini Flash models in sequence so a temporary quota or availability issue on one model does not immediately break the app.

## Deploy to Vercel

Import this repository into Vercel, add `GEMINI_API_KEY`, then deploy. The project uses `vercel.json` to configure the API function and no-store headers for the app shell and service worker.

## Local development

A static server works for the frontend. AI generation needs a serverless environment compatible with `api/reply.js`.

Run the smoke tests with:

```bash
npm test
```
