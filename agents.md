# Antigravity Agent Guidelines: Next.js & Sanity CMS Optimization

## Technology Stack Environment
- Runtime: Node.js 20+
- Framework: Next.js 14/15 (App Router with TSX)
- Data Content Layer: Sanity Headless CMS (`next-sanity`)
- Deployment Platform Target: Vercel Production Environment

## Codebase Modification Constraints
- Enforce granular workspace changes. Avoid blanket file overwrites.
- Ensure all content fetching models explicitly map out structural field filters.
- Prevent raw, unoptimized HTML elements from handling runtime assets.
- For all backend metadata, routing utilities, and validation workflows, enforce `stega: false`.

## Automation and Validation Routines
- Validate all route parameters locally by simulating an optimal production build.
- Every endpoint file layout must present dedicated metadata configurations.
