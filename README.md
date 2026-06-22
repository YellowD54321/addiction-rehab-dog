# Addiction Rehab Dog

## Overview

Addiction Rehab Dog is a web app for breaking addictions. After opening the site, users make a promise to themselves and record each day whether they kept it. Through consistent tracking and review, they gradually break the addiction.

> Only the project scaffold is complete so far. Upcoming features (user authentication, promise management, check-in system, statistics dashboard) will be developed in their own PRDs.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode, path alias `@/` → `src/`)
- **Tailwind CSS v4**
- **ESLint 9** (flat config) + **Prettier**
- **Jest** + **Testing Library** (unit tests)

## Setup

- **Node.js**: requires `>= 20` (24 recommended)
- Install dependencies:

```bash
npm install
```

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server at http://localhost:3000 |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server (build first) |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format the `src` code with Prettier |
| `npm run typecheck` | TypeScript type checking (`tsc --noEmit`) |

## Project Structure

```
addiction-rehab-dog/
├── eslint.config.mjs      # ESLint flat config (with Prettier integration)
├── jest.config.ts         # Jest config (next/jest)
├── jest.setup.ts          # Test setup (jest-dom matchers)
├── next.config.ts
├── postcss.config.mjs     # Tailwind v4 PostCSS
├── tsconfig.json          # strict + @/ path alias
├── .prettierrc
├── public/                # Static assets
├── src/
│   └── app/               # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       ├── globals.css
│       └── __tests__/     # Unit tests
└── docs/
    └── prd/               # Product requirement documents
```

## Conventions

This project follows **TDD (Test-Driven Development)**: write a failing test first (red) → write the minimum code to pass (green) → refactor. Test files are co-located with source as `__tests__/<name>.test.ts(x)`.
