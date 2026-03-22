# Mentora — Your Personal Aristotle

AI-powered Digital Mentors built from real people's knowledge, experiences, and values. Get personalized 1-on-1 guidance, anytime.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## What is Mentora?

Mentora is a mentorship platform where users can chat with AI-powered digital versions of real mentors — professors, tech CEOs, and legendary investors. Each mentor's responses are grounded in their published work, interviews, and public knowledge.

**Featured Mentors:**

| Category | Mentors |
|---|---|
| Dalhousie Faculty | Dr. Rita Orji, Prof. Stan Matwin, Dr. Srini Sampalli |
| Local Leaders | Jean-François Savard (Volta), Ulrike Bahr-Gedalia (Digital NS) |
| Big Tech | Satya Nadella, Jensen Huang, Sundar Pichai |
| Legends | Elon Musk, Warren Buffett, Sam Altman |

## Features

- **Mentor Discovery** — Browse, search, and filter mentors by category or expertise
- **1-on-1 Chat** — Conversational interface with typing indicators and source citations
- **User Profiling** — Onboarding modal to personalize mentorship advice
- **Freemium Paywall** — 3 free messages, then upgrade prompt (UI only, no payment backend)
- **Responsive Design** — Mobile-first layout with desktop sidebars for mentor info and context

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** — React framework with App Router
- **Tailwind CSS 3** — Utility-first styling
- **lucide-react** — Icon library

## Project Structure

```
app/
  page.jsx              # Home page — mentor grid
  chat/[id]/page.jsx    # Chat page — conversation UI
components/
  MentorCard.jsx        # Mentor card component
  Avatar.jsx            # Avatar with image/fallback
  ProfileModal.jsx      # User onboarding modal
  Paywall.jsx           # Freemium upgrade modal
lib/
  mentors.js            # Mentor data and categories
  chat-data.js          # Hardcoded chat responses
public/avatars/         # Mentor headshot images
```

## Current Status

This is a **frontend demo**. Chat responses are hardcoded (only Dr. Rita Orji has full responses). There is no backend API, no real AI inference, and no payment processing.

## License

MIT
