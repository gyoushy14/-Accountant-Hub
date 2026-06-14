# AccountantHUB — Frontend

A Next.js 14 freelance marketplace frontend for accountants. Browse accounting jobs, submit bids, and manage proposals.

**Live**: https://accountant-hub-app.vercel.app  
**Full project README**: [../README.md](../README.md)

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** (custom design tokens)
- **React 18** (Context API for auth)

## Quick Start

```bash
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local
npm run dev
```

## Build

```bash
npm run build    # production build
npm run start    # start production server
```

## Pages

| Route                     | Auth | Description                          |
|---------------------------|------|--------------------------------------|
| `/`                       | No   | Job listing with search/filters      |
| `/login`                  | No   | Login                                |
| `/register`               | No   | Registration                         |
| `/my-bids`                | Yes  | My submitted bids                    |
| `/jobs/[slug]`            | No   | Job detail                           |
| `/jobs/[slug]/bid`        | Yes  | Submit a bid                         |
| `/how-it-works`           | No   | Platform guide                       |
| `/pricing`                | No   | Pricing tiers                        |
| `/categories`             | No   | Category grid                        |
| `/accountants`            | No   | Top accountants                      |
| `/success-stories`        | No   | Client testimonials                  |
| `/resources`              | No   | Articles & guides                    |
| `/about`                  | No   | About us                             |
| `/careers`                | No   | Open positions                       |
| `/contact`                | No   | Contact form                         |

## Demo Accounts

- `jo23@gmail.com` / `jo23@gmail.com` (email / password)
