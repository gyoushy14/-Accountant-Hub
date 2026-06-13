# Accountant Hub API

A RESTful API backend for a freelance marketplace where companies post accounting jobs and accountants browse, view details, and submit bids.

## Tech Stack

- **Laravel 11** — PHP framework
- **MySQL** — Database
- **Laravel Sanctum** — Token-based API authentication
- **PHP 8.2+**

## Architecture

Clean **Repository-Service-Controller** pattern:

- `app/Models/` — Eloquent models
- `app/Repositories/{Entity}RepositoryInterface.php` + `app/Repositories/Eloquent/{Entity}Repository.php`
- `app/Services/{Entity}Service.php` — business logic
- `app/Http/Controllers/Api/{Entity}Controller.php` — thin request/response handling
- `app/Http/Requests/` — Form Request validation
- `app/Http/Resources/` — API Resource response formatting
- `app/Providers/RepositoryServiceProvider.php` — binds interfaces to implementations

## Setup & Local Run

### Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL server
- Node.js (optional, for frontend)

### Installation

```bash
# 1. Clone the repository
cd accountant-hub

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
copy .env.example .env

# 4. Configure .env — set your database credentials
#    DB_CONNECTION=mysql
#    DB_HOST=127.0.0.1
#    DB_PORT=3306
#    DB_DATABASE=accountant_hub
#    DB_USERNAME=root
#    DB_PASSWORD=

# 5. Create the database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS accountant_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 6. Generate app key
php artisan key:generate

# 7. Run migrations and seeders
php artisan migrate --seed

# 8. Start the development server
php artisan serve

# The API will be available at http://localhost:8000/api/v1
```

## API Endpoints

All endpoints are prefixed with `/api/v1` and throttled at 60 requests per minute.

### Authentication

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "password_confirmation": "password"
}
```
Response `201`:
```json
{
    "success": true,
    "message": "Account created successfully.",
    "data": {
        "user": { "id": 1, "name": "John Doe", "email": "john@example.com" },
        "token": "1|abc123..."
    }
}
```

#### Login
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
        "token": "2|xyz789..."
    }
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```
Response `200`:
```json
{ "success": true, "message": "Logged out successfully." }
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```
Response `200`:
```json
{
    "success": true,
    "message": "Current user retrieved.",
    "data": { "id": 1, "name": "Accountant One", "email": "accountant1@test.com" }
}
```

### Job Categories

```http
GET /api/v1/categories
```
Response `200`:
```json
{
    "success": true,
    "message": "Categories retrieved.",
    "data": [
        { "id": 1, "name": "Bookkeeping", "slug": "bookkeeping" },
        { "id": 2, "name": "Tax Preparation", "slug": "tax-preparation" },
        { "id": 3, "name": "Auditing", "slug": "auditing" },
        { "id": 4, "name": "Financial Analysis", "slug": "financial-analysis" },
        { "id": 5, "name": "Payroll Management", "slug": "payroll-management" }
    ]
}
```

### Jobs

#### List Jobs
```http
GET /api/v1/jobs?page=1&search=bookkeeping&category_id=1&budget_min=500&budget_max=5000&sort=newest&status=open
```

| Query Param   | Type   | Description                          |
|---------------|--------|--------------------------------------|
| search        | string | Search by job title                  |
| category_id   | int    | Filter by category                   |
| budget_min    | number | Minimum budget                       |
| budget_max    | number | Maximum budget                       |
| sort          | string | `newest` (default) or `highest_budget` |
| status        | string | `open` or `closed`                   |
| page          | int    | Page number for pagination           |

Response `200`:
```json
{
    "success": true,
    "message": "Jobs retrieved.",
    "data": [
        {
            "id": 1,
            "title": "Monthly Bookkeeping for E-commerce Store",
            "client_name": "Shopify Solutions Inc.",
            "short_description": "Handle monthly bookkeeping for a fast-growing e-commerce business.",
            "budget_min": 800,
            "budget_max": 1500,
            "deadline": "2026-07-15",
            "category": { "id": 1, "name": "Bookkeeping" },
            "bids_count": 1,
            "posted_at": "2 weeks ago",
            "status": "open"
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 12,
        "total": 1
    }
}
```

#### Get Job Detail
```http
GET /api/v1/jobs/{id}
Authorization: Bearer {token} (optional)
```
Response `200`:
```json
{
    "success": true,
    "message": "Job details retrieved.",
    "data": {
        "id": 1,
        "title": "Monthly Bookkeeping for E-commerce Store",
        "client_name": "Shopify Solutions Inc.",
        "description": "We need a detail-oriented accountant...",
        "short_description": "Handle monthly bookkeeping...",
        "budget_min": 800,
        "budget_max": 1500,
        "deadline": "2026-07-15",
        "required_skills": ["QuickBooks", "Bank Reconciliation", "Accounts Payable", "Excel"],
        "delivery_time": "Monthly recurring",
        "category": { "id": 1, "name": "Bookkeeping" },
        "bids_count": 1,
        "attachments": null,
        "posted_at": "2 weeks ago",
        "status": "open",
        "has_applied": false,
        "user_bid": null
    }
}
```

### Bids

#### Submit a Bid
```http
POST /api/v1/jobs/{id}/bids
Authorization: Bearer {token}
Content-Type: application/json

{
    "proposed_price": 950,
    "estimated_delivery_time": "Monthly",
    "cover_letter": "I have extensive experience in e-commerce bookkeeping...",
    "experience_summary": "5 years experience with QuickBooks..."
}
```
Response `201`:
```json
{
    "success": true,
    "message": "Bid submitted successfully.",
    "data": {
        "id": 4,
        "proposed_price": 950,
        "estimated_delivery_time": "Monthly",
        "cover_letter": "I have extensive experience...",
        "experience_summary": "5 years experience...",
        "created_at": "2026-06-13T14:45:00.000000Z",
        "job": { "id": 1, "title": "Monthly Bookkeeping...", "status": "open", "client_name": "Shopify Solutions Inc." },
        "user": { "id": 1, "name": "Accountant One" }
    }
}
```

Error responses:
- `409` — Duplicate bid (`"You have already submitted a bid for this job."`)
- `409` — Closed job (`"This job is closed for bidding."`)
- `422` — Validation errors

#### My Bids
```http
GET /api/v1/my-bids
Authorization: Bearer {token}
```
Response `200`:
```json
{
    "success": true,
    "message": "Your bids retrieved.",
    "data": [
        {
            "id": 1,
            "proposed_price": 1100,
            "estimated_delivery_time": "Monthly recurring",
            "cover_letter": "I have 5 years of experience...",
            "experience_summary": "5 years of bookkeeping experience...",
            "created_at": "2026-06-13T14:30:00.000000Z",
            "job": {
                "id": 1,
                "title": "Monthly Bookkeeping for E-commerce Store",
                "status": "open",
                "client_name": "Shopify Solutions Inc."
            }
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 12,
        "total": 3
    }
}
```

## Test Accountants

| Name             | Email                   | Password  |
|------------------|-------------------------|-----------|
| Accountant One   | accountant1@test.com    | password  |
| Accountant Two   | accountant2@test.com    | password  |

Accountant Two has 3 sample bids already placed.

## Assumptions

- No separate "role" or "accountant" model — the built-in `users` table serves as accountants.
- File attachments are represented as placeholder JSON arrays (no actual file uploads for MVP).
- The queue `jobs` table was renamed to `queue_jobs` to avoid conflict with the accounting jobs table.
- Pagination is set to 12 items per page.
- Jobs are sorted by `posted_at` descending by default.
- The `has_applied` field on job detail only works when the user is authenticated (otherwise `false`).
- CORS allows the origin defined in `FRONTEND_URL` env variable (default `http://localhost:3000`).
