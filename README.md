# Wallet App (Test Task)

A **mobile-first** wallet UI built with **React**, **TypeScript**, and **Vite**. The app loads transaction test data from a **local JSON file**, uses **TanStack Router** for file-based routes, and **Font Awesome** (solid + brands) for icons. UI styling uses **Tailwind CSS** and **shadcn/ui**-style primitives.

This README summarizes what was implemented and how to run and review the submission.

---

## Screenshots

### Transactions list (dashboard + latest transactions)

![Transactions list showing card balance, daily points, no payment due, and latest transactions](<./public/Screenshot 2026-04-01 203621.png>)

### Latest transactions (list rows)

![Latest transactions rows with icons, truncated descriptions, amounts, and chevrons](<./public/Screenshot 2026-04-01 203635.png>)

### Transaction detail

![Transaction detail screen with amount, merchant, timestamp, and detail card](<./public/Screenshot 2026-04-01 203645.png>)

---

## Requirements coverage

| Requirement | Implementation |
|-------------|------------------|
| React + TypeScript | Yes — `src/` is fully TypeScript |
| Test data in JSON, loaded by the app | [`src/lib/data/transactions.json`](./src/lib/data/transactions.json) imported in [`src/lib/transactions.ts`](./src/lib/transactions.ts) |
| Font Awesome for icons | `@fortawesome/react-fontawesome` with `@fortawesome/free-solid-svg-icons` and `@fortawesome/free-brands-svg-icons` (e.g. Apple logo on list rows) |
| Mobile layout only | Centered column (`max-w-[420px]`), touch-friendly spacing |
| Two screens: TransactionsList, TransactionDetail | Route `/` and `/transaction/$transactionId` |
| Card balance (limit $1500), random balance, available | Implemented on the list screen; balance is randomized on each full page load |
| No Payment Due + Daily Points | Dashboard cards; points use the season-day formula (see below) |
| Latest 10 transactions | Sorted by date (newest first), limited to 10 |
| Transaction fields (type, amount, name, description, date rules, pending, authorized user, icon) | Modeled in [`src/lib/types.ts`](./src/lib/types.ts) and rendered in list + detail |

---

## How to run

Prerequisites: **Node.js** and **pnpm** (or adapt commands for npm/yarn).

```bash
pnpm install
pnpm dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

Other useful commands:

```bash
pnpm typecheck   # TypeScript check
pnpm lint        # ESLint
pnpm build       # Production build
pnpm preview     # Preview production build
```

---

## Routes (file-based)

TanStack Router is configured with the Vite plugin; route files live under [`src/routes/`](./src/routes/). The generated route tree is [`src/routeTree.gen.ts`](./src/routeTree.gen.ts) (do not hand-edit; it regenerates when routes change).

| Path | Route file | Screen |
|------|------------|--------|
| `/` | [`src/routes/index.lazy.ts`](./src/routes/index.lazy.ts) | Transactions list |
| `/transaction/$transactionId` | [`src/routes/transaction.$transactionId.lazy.ts`](./src/routes/transaction.$transactionId.lazy.ts) | Transaction detail |

Tapping a row on the list navigates to `/transaction/<id>` with the transaction `id` from JSON.

---

## Project structure (high level)

```
src/
  components/          # Shared UI (theme, shadcn-style primitives)
  features/
    transaction-list/    # List screen UI + sections
    transaction-detail/  # Detail screen UI + sections
  lib/
    data/transactions.json   # Test data
    transactions.ts          # Loaders: latest N, by id
    dailyPoints.ts           # Season + daily points math
    types.ts                 # Transaction types
  routes/                # File-based route definitions (lazy)
  router.ts
  main.tsx
```

Feature UI lives under **`src/features/**`**; **route entrypoints** live under **`src/routes/**`**, matching the task instructions.

---

## Data model

Each transaction in JSON includes at least:

- **`id`** — stable string used in the URL  
- **`type`** — `"payment"` (top-up, amount shown with `+`) or `"credit"` (expense)  
- **`amount`** — number  
- **`name`** — merchant or label (e.g. Apple, Payment, IKEA)  
- **`description`** — secondary line (long text is truncated with ellipsis on the list)  
- **`date`** — ISO date string  
- **`pending`** — if true, list shows `Pending - …` before the description  
- **`authorizedUser`** — optional; when set, shown with the date line (e.g. `Diana – Tuesday`)  
- **`iconKey`** — maps to a Font Awesome icon in the list row badge  

---

## Daily Points

Points depend on the **calendar day within the current meteorological season**:

- **Spring** from March 1  
- **Summer** from June 1  
- **Autumn** from September 1  
- **Winter** from December 1  

January–February are treated as part of **winter** that began December 1 of the **previous** year (so “day of season” stays consistent).

For day index \(n\) within the season (1 = first day):

- Day 1 → **2** points  
- Day 2 → **3** points  
- Day \(n \ge 3\) → `round(points[n-2] + 0.6 * points[n-1])`  
  (i.e. 100% of two days ago + 60% of yesterday, rounded)

Display: if points **exceed 1000**, show a compact **K** form (e.g. `28745` → `29K`), per the task spec. Implemented in [`src/lib/dailyPoints.ts`](./src/lib/dailyPoints.ts).

---

## List row UI (Latest Transactions)

Rows follow a **three-column** layout: **icon** (left), **stacked text** (center, `min-w-0` for truncation), **amount + chevron** (right). The **description** line uses CSS **`truncate`** (ellipsis) for long strings such as bank names. The trailing control uses **`faChevronRight`** (not a forward arrow). Apple rows use the **brand** Apple icon where applicable.

---

## Transaction detail

The detail screen reads **`transactionId`** from the route, loads the transaction from the same JSON-backed store, and shows **all** fields in a card: status (Approved vs Pending), payment method text (from `description`), transaction type, authorized user, and total. A **Back** link returns to `/`.

---

## Tech stack

- **React 19**, **TypeScript**, **Vite 7**  
- **TanStack Router** (+ file-route generation)  
- **TanStack Query** (provider present; data is static JSON for this task)  
- **Tailwind CSS v4**  
- **Font Awesome** (React + SVG)  
- **shadcn/ui**-style components under `src/components/ui/`  

---

## Author / submission notes

This repository was prepared as a **take-home / test task** submission. For reviewers: run `pnpm dev`, confirm the list and detail screens against the screenshots in `public/`, and optionally run `pnpm build` to verify a production build.
