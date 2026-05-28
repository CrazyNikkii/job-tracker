# Job Tracker

A small job application tracker built as a personal tool and portfolio project.

The app has a public demo for recruiters and a private version for my own job search tracking.

## Status

The main app structure is working:

- `/demo` uses sample data and localStorage
- `/app` uses a backend API and PostgreSQL
- private access uses a simple password flow
- CI checks frontend build, backend tests and backend build

The app is not deployed yet.

## Features

- Track job applications with company, role, status and job posting URL
- Add, edit, delete and filter applications
- Dashboard stats
- Public demo mode
- Private backend-connected mode

## Tech stack

- React, TypeScript, Vite, Tailwind CSS
- Node.js, Express, PostgreSQL
- Supabase
- Vitest, Supertest
- GitHub Actions

## Deployment plan

The plan is to deploy the full app on Render, with Express serving both the backend API and the built React frontend.

The app will later be connected to a subdomain such as:

`jobtracker.niklasfalck.fi`
