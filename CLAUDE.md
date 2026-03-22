# Sage Demo — CLAUDE.md

## Project Overview

Sage is an AI-powered digital mentorship platform. Users browse mentor profiles and have 1-on-1 chat conversations with AI versions of real people (professors, tech leaders, investors). This is a **frontend demo** — no backend API or real AI inference.

## Tech Stack

- **Framework**: Next.js 14 (App Router, `app/` directory)
- **Language**: JavaScript (JSX), no TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: lucide-react
- **No backend**: Chat responses are hardcoded in `lib/chat-data.js`

## Project Structure

```
app/
  page.jsx            # Home — mentor grid with search & category filters
  layout.jsx          # Root layout (metadata, global styles)
  chat/[id]/page.jsx  # Chat page — conversation UI with paywall
  profile/            # (empty, placeholder)
components/
  MentorCard.jsx      # Card shown in home grid
  Avatar.jsx          # Mentor avatar (image or initials fallback)
  ProfileModal.jsx    # "Build Your Profile" onboarding modal
  Paywall.jsx         # Freemium paywall modal (Free vs Pro $9.99/mo)
lib/
  mentors.js          # Mentor data array + categories + getMentor()
  chat-data.js        # Hardcoded suggestions, responses, sources for Rita Orji
public/avatars/       # Mentor headshot images
```

## Key Patterns

- All pages are client components (`"use client"`)
- Mentor data is static in `lib/mentors.js` — no database
- Only Rita Orji (`rita-orji`) has full chat responses; other mentors get a generic response
- Paywall triggers after 3 messages (`msgCount >= 3`), no real payment flow
- Emerald/green is the primary brand color throughout

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run start  # Start production server
```

## Conventions

- Components are PascalCase `.jsx` files
- No TypeScript, no ESLint config, no tests
- Tailwind utility classes inline, no separate CSS modules
- All routing via Next.js App Router (file-based)
