# Background Changer

A small React app to change the main preview background: open a right-hand sheet, describe a background idea (with undo/redo), generate a new background, pick from a grid (generated + default + regular), and apply.

**Stack:** React 19, TypeScript, Vite 7, Redux Toolkit, Tailwind CSS 4, Radix UI (Sheet), Vitest.

---

## What you can do

- **Main preview** — Shows the currently applied background. A “Change background” button opens the sheet.
- **Right sheet** — Background idea textarea (with Cmd/Ctrl+Z undo/redo), “Regenerate” and “Generate BG for 1 credit” actions, error banner on failed generation, grid of background cards, “Apply” to close and apply the selected background.
- **Background grid** — Generated image first, then default, then regular set. Click to select (draft); “Apply” commits the selection. Generating state shows a progress circle and “X sec left”.

---

## How to run

**Requirements:** Node 22 (see [.nvmrc](.nvmrc)). Use `nvm use` if you use nvm.

```bash
# Install dependencies
npm install

# Development (with HMR)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## How to test

Tests live in the `tests/` folder and mirror `src/`. Vitest uses the same `@/` alias as the app (resolves to `src/`).

```bash
# Single run
npm run test

# Watch mode
npm run test:watch
```

**Node:** Vitest 4 needs Node 20+. Use Node 22 (`nvm use`) if tests fail with a Node version error.

---

## How to write code and tests

### Conventions

- **Path alias:** Use `@/` for `src/` (e.g. `@/components/Backgrounds/BackgroundGrid`, `@/lib/store`, `@/hooks`).
- **Components:** Feature folders under `src/components/` use PascalCase (`Backgrounds/`, `BackgroundSheet/`); `ui/` is for design-system primitives.
- **State:** Redux in `src/lib/` (store, slices, selectors). Actions/thunks are re-exported from `@/lib/store`; slices (and their actions) are also exported from `src/lib/slices/index.ts`.
- **Hooks:** In `src/hooks/`; re-exported from `@/hooks` via `hooks/index.ts`.

### Where to add tests

- **Lib (reducers, utils, shortcuts):** `tests/lib/` mirroring `src/lib/`, e.g. `tests/lib/slices/backgroundIdeaSlice.test.ts`, `tests/lib/keyboardShortcuts.test.ts`.
- **Components:** `tests/components/` mirroring `src/components/`, e.g. `tests/components/Backgrounds/BackgroundGrid.test.tsx`. See `tests/components/README.md`.
- **Hooks:** `tests/hooks/` mirroring `src/hooks/`, e.g. `tests/hooks/useBackgroundSheet.test.ts`. See `tests/hooks/README.md`.

Name test files `*.test.ts` or `*.test.tsx` (or `*.spec.ts` / `*.spec.tsx`). Vitest picks up `tests/**/*.{test,spec}.{ts,tsx}`.

### Lint and type-check

```bash
npm run lint
npx tsc --noEmit
```

---

## Folder structure

```
test-task/
├── .nvmrc                    # Node 22.20.0
├── config/                   # Optional: extra tool configs (e.g. Playwright)
│   └── README.md
├── docs/                     # Notes, refactoring, structure (if present)
├── public/                   # Static assets (fonts, icons, images)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Backgrounds/      # BackgroundCard, BackgroundGrid, ProgressCircle
│   │   ├── BackgroundSheet/   # Sheet UI: idea, generate, grid, footer
│   │   ├── ui/               # Design-system primitives (Radix, etc.)
│   │   ├── DefaultBadge.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── MainPreview.tsx
│   ├── hooks/                # useBackgroundSheet, useBackgroundIdeaUndoRedo, etc.
│   │   └── index.ts          # Re-exports for @/hooks
│   └── lib/
│       ├── constants.ts
│       ├── keyboardShortcuts.ts
│       ├── selectors.ts
│       ├── store.ts
│       ├── utils.ts
│       └── slices/           # Redux slices; barrel in index.ts
├── tests/                    # Vitest; mirrors src, imports from @/
│   ├── components/           # Component tests (see README)
│   ├── hooks/                # Hook tests (see README)
│   └── lib/                  # Slice, selector, shortcut tests
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── eslint.config.js
```