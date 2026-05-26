# Job Tracker

A job application tracking app built with React, TypeScript, Vite and Tailwind CSS.

The project is designed for two purposes:

1. A private job tracker that I can use myself.
2. A portfolio project that recruiters can open and try without creating an account.

## Current status

The project currently has a frontend demo mode.

Demo mode uses sample data and saves changes only in the visitor's browser with localStorage. It does not connect to a backend or show real private job applications.

Private mode, authentication and backend storage will be added later.

## Features

- Landing page with demo entry point
- Demo dashboard
- Add job applications
- Edit job applications
- Delete job applications
- Save job posting URLs
- Filter jobs by status
- Dashboard stats
- Reset demo data
- Browser-only demo persistence with localStorage

## Job statuses

- Interested
- Applied
- Interview Scheduled
- Rejected
- Accepted

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions for CI

## CI

The project uses GitHub Actions to automatically install frontend dependencies and run a production build check when changes are pushed or opened in a pull request.

Planned later:

- Node.js / Express backend
- Database for private job data
- Simple private admin login
- Deployment
