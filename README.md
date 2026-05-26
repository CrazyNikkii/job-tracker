# Job Tracker

A simple job application tracker built with React, TypeScript, Vite and Tailwind CSS.

The idea is pretty straightforward: I wanted a small app where I can keep track of jobs I am interested in, jobs I have applied to, and where each application currently stands.

It is also meant to work as a portfolio project, so recruiters can open it and try the demo without creating an account.

## Current status

The app currently has a frontend demo version.

The demo uses sample data and saves changes only in the browser with localStorage. It does not use a backend, and it does not show any real private job applications.

There is also a small private access placeholder on the landing page. Later, that will be used for my own private tracker.

## Features so far

- Landing page
- Demo dashboard at `/demo`
- Add job applications
- Edit job applications
- Delete job applications
- Save job posting URLs
- Filter jobs by status
- Dashboard stats
- Reset demo data
- Demo data saved in browser localStorage
- GitHub Actions CI build check

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
- React Router
- GitHub Actions

## CI

The project uses GitHub Actions to check that the frontend still builds successfully when changes are pushed or opened in a pull request.

At the moment, the workflow installs the client dependencies and runs the production build.

## Planned later

- Private tracker view
- Simple private/admin password access
- Backend API
- Database for real job data
- Deployment
