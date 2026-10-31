---
title: "Rebuilding My Portfolio with a DevOps Mindset"
excerpt: "How I refactored my personal portfolio from a static site into a data-driven Next.js app with Supabase, automated deployments, and a design system."
cover: ""
tags: ["Next.js", "Supabase", "DevOps", "Design System"]
date: "2026-10-30"
---

## Overview

This case study covers the end-to-end redesign and engineering of my personal portfolio — from a basic static page to a fully data-driven Next.js application.

## The Problem

My old portfolio was a single HTML page with hardcoded content. Every update required manual editing, there was no consistent design language, and deploying changes was a drag-and-drop process.

## Goals

- Move all content (projects, skills, experience) to a database
- Establish a reusable component library with a consistent design system
- Automate deployments with CI/CD pipelines
- Keep the site fast and SEO-friendly

## Technology Choices

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Next.js 16 (App Router) | Server components, ISR, great DX |
| Database | Supabase (PostgreSQL) | Realtime, easy auth, generous free tier |
| Styling | CSS Modules | Scoped styles, no runtime overhead |
| Email | Resend | Simple API, good deliverability |
| Bot Protection | Cloudflare Turnstile | Privacy-friendly, free |

## Key Decisions

### Emerald Design System

Instead of using a third-party UI library, I built a bespoke design token set around an emerald palette. This gave me full control over every hover state, spacing, and radius — and made the portfolio feel personal rather than templated.

### Data-Driven Everything

Projects, skills, work experience, and education all live in Supabase tables. Adding a new project is a database insert, not a code change and redeploy.

### Server Components + Suspense

Expensive data fetches (skills carousels, experience timeline) run in server components with `Suspense` boundaries, giving instant shell rendering with streamed data.

## Outcome

- **Build time:** ~45s on Vercel
- **Lighthouse score:** 98 Performance, 100 Accessibility
- **Zero downtime deployments** via GitHub Actions → Vercel

## Lessons Learned

1. Design tokens pay off immediately — changing the primary color site-wide is a single CSS variable update.
2. Server components simplify data fetching enormously but require careful thinking about where interactivity lives.
3. Cloudflare Turnstile is far less intrusive than reCAPTCHA and equally effective for spam prevention.

