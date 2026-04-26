# Gemini Project Context: Portfolio Site

This document provides essential context and guidelines for interacting with the Portfolio Site codebase.

## Project Overview

A high-performance, visually rich portfolio website for Daniel Thomas, built with **Next.js** and **TypeScript**. The project emphasizes smooth animations and a modern UI using **Tailwind CSS 4**, **GSAP**, **Framer Motion**, and **PixiJS**.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (PostCSS)
- **Animations:** GSAP, Framer Motion, PixiJS
- **Testing:** Jest, React Testing Library
- **Linting/Formatting:** ESLint, Prettier

## Directory Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components.
  - `common/`: Layout-level components (Header, Footer, HeroPage).
  - `ui/`: Atomic UI components (Buttons, Containers, Cards).
  - `layouts/`: Page structure layouts.
  - `animation/`: Animation-specific wrappers and transitions.
- `src/features/`: Feature-specific logic and components.
  - `projects/`: Project showcase and data.
  - `skills/`: Skills gallery and data.
  - `navigation/`: Complex navigation logic (NavBar, HiddenMenu).
- `public/`: Static assets (Images, Icons, Resume).

## Building and Running

| Command          | Action                                        |
| :--------------- | :-------------------------------------------- |
| `npm run dev`    | Starts the development server with Turbopack. |
| `npm run build`  | Compiles the application for production.      |
| `npm run start`  | Starts the production server.                 |
| `npm run lint`   | Runs ESLint to check for code quality issues. |
| `npm run format` | Formats the codebase using Prettier.          |
| `npm run test`   | Executes the test suite with Jest.            |

## Development Conventions

### Coding Standards

- **TypeScript:** Use strict typing. Avoid `any` unless absolutely necessary (warned by ESLint).
- **Components:** Prefer functional components with Arrow Function syntax.
- **Props:** Use TypeScript interfaces or types for component props.
- **Naming:** Use PascalCase for components and camelCase for functions/variables.

### Styling & UI

- **Tailwind CSS 4:** Use utility classes for styling. Custom configurations are handled via `@tailwindcss/postcss`.
- **Responsive Design:** Always ensure components are mobile-friendly using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.).
- **Animations:** Use Framer Motion for simple transitions and GSAP/PixiJS for complex or high-performance animations.

### Content Management

- Project and Skill data are stored in `src/features/*/data/*.ts`.
- To update projects, modify `src/features/projects/data/projects.ts`.
- To update skills, modify `src/features/skills/data/skills.ts`.

### Testing

- Add tests for new features in `__tests__` folders or adjacent `.test.tsx` files.
- Ensure `npm run test` passes before proposing changes.

### Linting & Formatting

- Code is automatically formatted on save (if configured) or via `npm run format`.
- ESLint is configured with `next/core-web-vitals` and `prettier` compatibility.
