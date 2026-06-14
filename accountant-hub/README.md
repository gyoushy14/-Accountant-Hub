# AccountantHUB

**GitHub**: https://github.com/gyoushy14/-Accountant-Hub  
**Live Demo**: https://accountant-hub-app.vercel.app  
**API Base URL**: https://accountant-hub-production-402f.up.railway.app/api/v1

---

## Test Credentials

| Name             | Email                   | Password  |
|------------------|-------------------------|-----------|
| Accountant One   | jo23@gmail.com          | jo23@gmail.com  |

Accountant Two has 3 sample bids already placed. Use these to log in and test bidding, My Bids, and other auth-protected features.

---

## Project Overview

AccountantHUB is a full-stack freelance marketplace connecting businesses with accounting professionals. Companies post accounting jobs (bookkeeping, tax prep, auditing, financial analysis, payroll); accountants browse listings, view details, and submit bids. The backend uses Laravel 11 with a Repository-Service-Controller pattern and SQLite for zero-config setup. The frontend is a Next.js 14 App Router application with Tailwind CSS, server-side rendering for job detail pages, and static generation for marketing pages.

### Main Features

- Job listing with search, category/budget/status filters, and pagination
- Job detail with required skills, client info, and bid status
- Bid submission and a personal "My Bids" dashboard
- Authentication (register, login, logout via Sanctum bearer tokens)
- 7 marketing/informational pages: How It Works, Pricing, Categories, Top Accountants, Success Stories, Resources, About, Careers, Contact

---

## Tech Stack

### Backend

- **Laravel 11** — PHP framework
- **PHP 8.2+**
- **SQLite** — Database (no external DB server required)
- **Laravel Sanctum** — Token-based API authentication
- **Repository-Service-Controller** pattern with Form Requests and API Resources

### Frontend

- **Next.js 14** — App Router, TypeScript
- **React 18**
- **Tailwind CSS 3** — Custom design tokens (brand colors, shadows, typography)
- **React Context API** — Auth state management

---

## Setup Instructions

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+
- npm

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd accountant-hub

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
copy .env.example .env

# 4. Configure .env — the defaults use SQLite, so no DB server is needed.
#    Key variables to review:
#
#    APP_NAME=AccountantHUB
#    APP_ENV=local
#    APP_KEY=           # will be generated in step 5
#    APP_DEBUG=true
#    APP_URL=http://localhost:8000
#
#    DB_CONNECTION=sqlite
#
#    SESSION_DRIVER=database
#    CACHE_STORE=database
#    QUEUE_CONNECTION=database
#
#    FRONTEND_URL=http://localhost:3000

# 5. Generate app key
php artisan key:generate

# 6. Create SQLite database file
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"

# 7. Run migrations and seeders (creates tables + demo data)
php artisan migrate --seed

# 8. Start the development server
php artisan serve

# The API will be available at http://localhost:8000/api/v1
```

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd accountant-hub/frontend

# 2. Install dependencies
npm install

# 3. Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# 4. Start dev server
npm run dev

# The app will be available at http://localhost:3000
```

### Environment Variables

#### Backend (`.env`)

| Variable             | Default                        | Description                          |
|----------------------|--------------------------------|--------------------------------------|
| `APP_NAME`           | `Laravel`                      | Application name                     |
| `APP_ENV`            | `local`                        | Environment (`local`, `production`)  |
| `APP_KEY`            | *(generated)*                  | Laravel app key (run `key:generate`) |
| `APP_DEBUG`          | `true`                         | Debug mode                           |
| `APP_URL`            | `http://localhost:8000`        | Application URL                      |
| `DB_CONNECTION`      | `sqlite`                       | Database driver                      |
| `SESSION_DRIVER`     | `database`                     | Session storage                      |
| `CACHE_STORE`        | `database`                     | Cache backend                        |
| `QUEUE_CONNECTION`   | `database`                     | Queue backend                        |
| `FRONTEND_URL`       | `http://localhost:3000`        | Allowed CORS origin (frontend URL)   |
| `LOG_CHANNEL`        | `stack`                        | Log channel                          |
| `LOG_LEVEL`          | `debug`                        | Log level                            |

#### Frontend (`.env.local`)

| Variable               | Default                          | Description            |
|------------------------|----------------------------------|------------------------|
| `NEXT_PUBLIC_API_URL`  | `http://localhost:8000/api/v1`   | Backend API base URL   |

---

## How to Run Locally

### Start the Backend

```bash
cd accountant-hub
php artisan serve
# → http://localhost:8000
```

### Run Migrations and Seeders (for demo data)

```bash
cd accountant-hub
php artisan migrate --seed
```

This creates:
- 2 test users (Accountant One, Accountant Two)
- 5 job categories
- 12 sample jobs
- 3 sample bids
- 6 accountant profiles
- 4 success stories
- 4 resource articles
- 3 career positions

### Start the Frontend

```bash
cd accountant-hub/frontend
npm run dev
# → http://localhost:3000
```

### Production Build

```bash
cd accountant-hub/frontend
npm run build
npm run start
```

---

## API Endpoints

All endpoints are prefixed with `/api/v1` and throttled at 60 requests per minute.  
Auth-protected endpoints require an `Authorization: Bearer {token}` header.

| Method | Route                         | Auth     | Description                       |
|--------|-------------------------------|----------|-----------------------------------|
| POST   | `/api/v1/auth/register`       | No       | Create a new account              |
| POST   | `/api/v1/auth/login`          | No       | Log in and receive a token        |
| POST   | `/api/v1/auth/logout`         | Yes      | Revoke current token              |
| GET    | `/api/v1/auth/me`             | Yes      | Get authenticated user info       |
| GET    | `/api/v1/categories`          | No       | List all job categories           |
| GET    | `/api/v1/jobs`                | No       | List jobs (paginated, filterable) |
| GET    | `/api/v1/jobs/{id}`           | Optional | Get job detail (+ has_applied)    |
| POST   | `/api/v1/jobs/{id}/bids`      | Yes      | Submit a bid on a job             |
| GET    | `/api/v1/my-bids`             | Yes      | List current user's bids          |
| GET    | `/api/v1/pricing`             | No       | Get pricing tiers                 |
| GET    | `/api/v1/accountants/top`     | No       | Get featured accountant profiles  |
| GET    | `/api/v1/success-stories`     | No       | Get client testimonials           |
| GET    | `/api/v1/resources`           | No       | Get resource articles             |
| GET    | `/api/v1/careers`             | No       | Get open job positions            |
| POST   | `/api/v1/contact`             | No       | Submit a contact message          |

### Query Parameters for `GET /api/v1/jobs`

| Param        | Type   | Description                          |
|--------------|--------|--------------------------------------|
| `search`     | string | Search by job title                  |
| `category_id`| int    | Filter by category ID                |
| `budget_min` | number | Minimum budget filter                |
| `budget_max` | number | Maximum budget filter                |
| `sort`       | string | `newest` (default) or `highest_budget` |
| `status`     | string | `open` or `closed`                   |
| `page`       | int    | Page number (12 items per page)      |

### Example: Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "accountant1@test.com",
    "password": "password"
}
```

Response `200`:
```json
{
    "success": true,
    "message": "Logged in successfully.",
    "data": {
        "user": { "id": 1, "name": "Accountant One", "email": "accountant1@test.com" },
        "token": "2|abc123..."
    }
}
```

### Example: Submit a Bid

```http
POST /api/v1/jobs/1/bids
Authorization: Bearer 2|abc123...
Content-Type: application/json

{
    "proposed_price": 950,
    "estimated_delivery_time": "Monthly",
    "cover_letter": "I have extensive experience in e-commerce bookkeeping...",
    "experience_summary": "5 years experience with QuickBooks..."
}
```

### Error Response Format

All errors return:
```json
{
    "success": false,
    "message": "Error description."
}
```

Common HTTP status codes: `201` (created), `409` (duplicate/conflict), `422` (validation), `401` (unauthenticated).

---

## Frontend Routes

| Route                     | Auth | Type     | Description                             |
|---------------------------|------|----------|-----------------------------------------|
| `/`                       | No   | Static   | Job listing with search, filters        |
| `/login`                  | No   | Static   | Login page (redirect support)           |
| `/register`               | No   | Static   | Registration page                       |
| `/my-bids`                | Yes  | Static   | Dashboard — bids with pagination        |
| `/jobs/[slug]`            | No   | Dynamic  | Job detail (skills, sidebar summary)    |
| `/jobs/[slug]/bid`        | Yes  | Dynamic  | Bid submission form                     |
| `/how-it-works`           | No   | Static   | Step-by-step platform guide             |
| `/pricing`                | No   | Static   | Three pricing tiers from API            |
| `/categories`             | No   | Static   | Category grid with job counts           |
| `/accountants`            | No   | Static   | Top accountant profiles with ratings    |
| `/success-stories`        | No   | Static   | Client testimonials with star ratings   |
| `/resources`              | No   | Static   | Articles and guides                     |
| `/about`                  | No   | Static   | Mission, stats, team                    |
| `/careers`                | No   | Static   | Open positions with descriptions        |
| `/contact`                | No   | Static   | Contact form with success state         |

---

## Project Structure

### Backend (`accountant-hub/`)

```
app/
├── Http/
│   ├── Controllers/Api/   # 10 controllers (Auth, Job, Bid, JobCategory, Pricing, Accountant, SuccessStory, Resource, Career, Contact)
│   ├── Requests/           # Form Request validation classes
│   └── Resources/         # API Resource response transformers
├── Models/                 # 9 Eloquent models (User, Job, Bid, JobCategory, Accountant, SuccessStory, Resource, Career, ContactMessage)
├── Providers/              # RepositoryServiceProvider (binds interfaces → implementations)
├── Repositories/
│   ├── Contracts/          # Repository interfaces
│   └── Eloquent/           # Repository implementations
└── Services/               # Business logic layer
database/
├── migrations/             # 10 migration files
└── seeders/                # 8 seeders (User, JobCategory, Job, Bid, Accountant, SuccessStory, Resource, Career)
routes/
└── api.php                 # All 15 API endpoint definitions
config/
├── cors.php                # CORS configuration (reads FRONTEND_URL env var)
└── sanctum.php             # Sanctum authentication settings
```

### Frontend (`accountant-hub/frontend/`)

```
app/                    # Next.js App Router (15 page routes)
components/             # 14 reusable UI components (Badge, Button, Input, Textarea, JobCard, EmptyState, FilterSidebar, SearchInput, Pagination, RangeSlider, ProjectSummaryCard, Navbar, Footer, BottomTabBar)
lib/
├── api.ts              # API client (fetch wrapper, auto-auth header, all endpoint functions)
└── auth-context.tsx    # Auth state via React Context (useAuth hook)
types/
└── index.ts            # TypeScript interfaces
```

---

## Deployment

### Backend (Railway)

The backend is deployed on Railway at https://accountant-hub-production-402f.up.railway.app.

1. Push to GitHub
2. Create a new Railway project → Deploy from GitHub
3. Set **Root Directory** to `accountant-hub`
4. Env vars to set:
   - `APP_KEY` — run `php artisan key:generate --show` locally
   - `APP_ENV` → `production`
   - `APP_DEBUG` → `false`
   - `FRONTEND_URL` → your Vercel URL (e.g. `https://accountant-hub-app.vercel.app`)
   - `SESSION_DRIVER` → `file`
   - `CACHE_STORE` → `file`
   - `QUEUE_CONNECTION` → `sync`
   - `LOG_CHANNEL` → `stderr`
   - `LOG_LEVEL` → `warning`

### Frontend (Vercel)

The frontend is deployed on Vercel at https://accountant-hub-app.vercel.app.

1. Push to GitHub
2. Import project in Vercel
3. Set **Root Directory** to `accountant-hub/frontend`
4. Env var: `NEXT_PUBLIC_API_URL` → `https://your-backend-url.com/api/v1`

---

## Assumptions

- No separate "role" column — the `users` table serves as accountants. Any registered user can browse jobs and submit bids.
- File attachments are placeholder JSON arrays (no file uploads for MVP).
- The Laravel queue `jobs` table was renamed to `queue_jobs` to avoid collision with the accounting jobs table.
- Pagination is 12 items per page for both job listings and bid listings.
- Jobs are sorted by `posted_at` descending by default.
- `has_applied` on job detail is `false` when the user is unauthenticated; it reflects actual bid status when logged in.
- Pricing tiers are hardcoded (no DB table) since they are static config, not user-managed content.
- `disputed` badge variant exists in the frontend but is not used by the API (job status is `open` or `closed`).
- Categories page computes job counts client-side by fetching all jobs, avoiding a dedicated count endpoint.
- The contact form sends to the `/api/v1/contact` endpoint and shows a success message on completion (no redirect).
- CORS is configured via the `FRONTEND_URL` environment variable and defaults to `http://localhost:3000`.
