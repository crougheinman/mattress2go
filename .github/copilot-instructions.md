## AI Agent Guidance for `mattress2go`

- This package is a React + TypeScript SPA built with Vite 8 and Tailwind CSS v4.
- The main entry point is `src/main.tsx`; routing is configured in `src/App.tsx` using `react-router-dom`.
- Pages live under `src/pages`; shared layout and navigation live under `src/Layout.tsx`, `src/components/HeaderNav.tsx`, and `src/components/Footer.tsx`.

## Key Architecture
- `src/App.tsx`: defines routes for `/`, `/shop`, `/shop-furniture`, `/products/:slug`, `/financing`, `/contact`, and `/privacy-policy`.
- `src/Layout.tsx`: wraps pages with `HeaderNav` and `Footer`, and updates `document.title` + meta description.
- `src/constants.ts`: contains site metadata, product/brand data, and dynamic filter definitions used throughout the app.
- `src/index.css`: imports Tailwind and includes manual utility fallback rules for custom blue variables.
- `tailwind.config.js`: extends Tailwind with a custom `mattress2go-blue` palette.

## Patterns to Follow
- Use `Link` from `react-router-dom` for internal navigation, not plain `<a>` where routes should stay client-side.
- Keep page content data-driven where possible, using `src/constants.ts` for repeated brand and product definitions.
- For new UI sections, prefer Tailwind utility classes in `className`; the project relies heavily on existing Tailwind patterns.
- If you add a new route, update both `src/App.tsx` and any navigation/footer links referencing it.

## Build / Run / Lint
- Install dependencies from `mattress2go` root: `npm install`
- Start dev server: `npm run dev`
- Build production output: `npm run build` (`tsc -b && vite build`)
- Static check: `npm run lint`

## Project-Specific Notes
- `src/App.tsx` is the canonical route map; changes to route paths must stay consistent with `Link` usage.
- The current Tailwind setup uses a custom color key `mattress2go-blue`; if classes do not appear, confirm `tailwind.config.js` and `src/index.css` custom utilities.
- This workspace is multi-project: do not edit `admin/` or `mattress2go/` unless the task explicitly targets those directories.

## Useful Files
- `src/Layout.tsx` — global page wrapper
- `src/components/Footer.tsx` — footer link rendering and route fallback logic
- `src/components/ShopPageFilters.tsx` / `src/components/ShopFurniturePageFilters.tsx` — filter-driven product listing patterns
- `src/constants.ts` — static content and product/furniture definitions
- `tailwind.config.js` / `src/index.css` — Tailwind customization and fallback utilities

Ask the user if any part of the page structure, route mapping, or Tailwind utility usage is unclear before making broad changes.
