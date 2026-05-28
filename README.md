# Job Tracker

A full-stack job application tracker built as a personal tool and portfolio project.

The app has a public demo for recruiters and a private version for my own job search tracking.

Live app:

`https://jobtracker.niklasfalck.fi`

## Overview

Job Tracker helps keep job applications organized by saving the company, role, status and job posting URL in one place.

The project has two modes:

- `/demo` is a public demo using sample data and localStorage
- `/app` is the private tracker using a backend API and PostgreSQL

## Features

- Public demo mode
- Private job tracker mode
- Add, edit, delete and filter job applications
- Dashboard stats
- Job posting URL support
- Password-protected private access
- PostgreSQL-backed private data

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Node.js
- Express
- PostgreSQL
- Supabase
- Render
- Vitest
- Supertest
- GitHub Actions

## CI/CD

GitHub Actions runs build and backend API tests, and Render automatically deploys the main branch.

## Deployment

The app is deployed on Render as a full-stack web service.

Express serves both the backend API and the built React frontend. PostgreSQL is hosted on Supabase.

The app is available at:

`https://jobtracker.niklasfalck.fi`
