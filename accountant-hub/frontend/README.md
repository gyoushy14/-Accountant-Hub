# AccountantHUB — Frontend

A Next.js 14 freelance marketplace frontend for accountants. Browse accounting jobs, submit bids, and manage proposals.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** (custom design tokens)
- **React 18** (Context API for auth)
- **Laravel backend** at `http://localhost:8000/api/v1`

## Prerequisites

- Node.js 18+
- npm
- Backend running (see root `README.md`)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
#    Create .env.local with:
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

## Build

```bash
npm run build    # production build
npm run start    # start production server
npm run lint     # run ESLint
```

## Environment Variables

| Variable               | Default                          | Description            |
|------------------------|----------------------------------|------------------------|
| `NEXT_PUBLIC_API_URL`  | `http://localhost:8000/api/v1`   | Backend API base URL   |

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar, Footer, BottomTabBar, AuthProvider)
│   ├── page.tsx            # Home — job listing with search, filters, pagination
│   ├── globals.css         # Tailwind + custom design tokens
│   ├── login/              # Login page (Suspense-wrapped useSearchParams)
│   ├── register/           # Registration page
│   ├── my-bids/            # Dashboard — authenticated user's bids with pagination
│   └── jobs/
│       └── [slug]/
│           ├── page.tsx    # Job detail (breadcrumb, skills, sidebar summary)
│           └── bid/        # Bid submission form (auth-guarded, validates)
├── components/             # 14 reusable UI components
│   ├── Badge.tsx           # Status badges: open/closed/disputed/category
│   ├── Button.tsx          # Variants: primary/accent/outline/ghost + loading
│   ├── EmptyState.tsx      # Empty/error state with icon + action button
│   ├── FilterSidebar.tsx   # Category checkboxes, budget range, sort, Pro upsell
│   ├── JobCard.tsx         # Job card for listing pages
│   ├── Pagination.tsx      # Page numbers, prev/next, results count
│   ├── ProjectSummaryCard.tsx # Sticky sidebar for job detail
│   ├── SearchInput.tsx     # Search bar with "Find Jobs" button
│   ├── Input.tsx           # Form input with label/error
│   ├── Textarea.tsx        # Form textarea with label/error
│   ├── RangeSlider.tsx     # Dual-handle budget range slider
│   ├── Navbar.tsx          # Sticky nav with auth-aware menu
│   ├── Footer.tsx          # Multi-column footer
│   └── BottomTabBar.tsx    # Mobile bottom navigation
├── lib/
│   ├── api.ts              # API client (fetch wrapper, auth header, all endpoints)
│   └── auth-context.tsx     # Auth state (Context + localStorage)
└── types/
    └── index.ts            # TypeScript interfaces (User, Job, Bid, PaginationMeta)
```

## Pages

| Route              | Auth | Description                                  |
|--------------------|------|----------------------------------------------|
| `/`                | No   | Job listing with search, filter, pagination |
| `/jobs/[id]`       | No   | Job detail, skills, sidebar summary          |
| `/jobs/[id]/bid`   | Yes  | Submit a bid with validation                 |
| `/login`           | No   | Login with redirect support                  |
| `/register`        | No   | Registration                                 |
| `/my-bids`         | Yes  | Dashboard — my submitted bids + pagination   |

## Demo Accounts

See backend README for seeded test accounts:
- `accountant1@test.com` / `password`
- `accountant2@test.com` / `password` (has 3 sample bids)
