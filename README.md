# KoinX Tax Loss Harvesting

Responsive React + TypeScript dashboard for the KoinX tax loss harvesting assignment. The UI mirrors the provided Figma, updates the After Harvesting card in real time, and supports dark/light mode with a minimal toggle.

## Highlights

- Pixel-aligned header, notes accordion, gains cards, and holdings table.
- Real-time After Harvesting updates from row selection (including select-all).
- Loading and error states with retry.
- Dark/light theme toggle with persisted preference.
- View All / View Less for the holdings table.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Redux Toolkit

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Data Flow Overview

1. `App` dispatches `loadTaxDashboard` on first load.
2. `taxSlice` loads `capitalGains` + `holdings` from the mock API.
3. Selected holdings are derived from Redux state.
4. Post-harvesting gains are computed in `utils/capitalGains`.
5. `GainsCard` renders pre/post summaries and the savings line.

## Business Logic

- **Pre-harvesting summary**
	- `stcgNet = stcg.profits - stcg.losses`
	- `ltcgNet = ltcg.profits - ltcg.losses`
	- `realised = stcgNet + ltcgNet`
- **After harvesting update**
	- For each selected holding:
		- If gain > 0, add to `profits`.
		- If gain < 0, add absolute value to `losses`.
- **Savings line** shows only if pre-realised > post-realised.

## Mock API

- API layer: `src/api/taxApi.ts`
- Mock payloads: `src/mockData.ts`
- Error state: visit `/?mockError=1`

## Theming

- Tailwind v4 class-based dark mode via `.dark` on `html`.
- Theme preference stored in `localStorage` and applied on boot in `src/main.tsx`.

## UI Components

- `Header` (brand logo + theme toggle)
- `NotesDropdown` (accordion with key disclaimers)
- `HowItWorksTooltip` (hover/focus tooltip)
- `GainsCard` (pre/post cards + savings line)
- `HoldingsTable` (select rows, select-all, View All)

## Formatting Utilities

- INR currency formatting with adaptive precision.
- Compact number formatting for balances.

## Project Structure

```text
public/
	favicon.svg
	KoinX Favicon/
		favicon.ico
		favicon-16x16.png
		favicon-32x32.png
		apple-touch-icon.png
		site.webmanifest
src/
	api/            # mock API calls
	app/            # redux store + hooks
	assets/         # images
	components/     # UI components
	features/       # redux slices
	utils/          # business logic + formatting helpers
	App.tsx         # page layout + orchestration
	main.tsx        # app bootstrap + theme init
	index.css       # Tailwind v4 + theme tokens
```

## Assumptions

- Currency displayed in INR.
- Holdings default to first 5 rows with View All expansion.

## Screenshots

Add screenshots before submission.

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to Vercel or Netlify.

