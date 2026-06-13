#!/bin/bash

# Run migrations
php artisan migrate --force

# Seed the database
php artisan db:seed --class=DatabaseSeeder --force

# Start the Laravel development server
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
