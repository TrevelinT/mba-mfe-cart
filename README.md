# Cart MFE

Remote micro-frontend for the header cart (listens for `cart:add-item`).

## Federation

Exposes `./Cart` → `src/components/cart-container.tsx` as `cart/Cart` when consumed by the shell.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Standalone dev server (port 5003) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve built assets (port 5003) |
| `npm run test` | Unit tests (Vitest) |
| `npm run test-coverage` | Unit tests with coverage |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format-and-lint` | Biome check |
| `npm run report-build-artifacts` | CI build size summary (requires `dist/`) |

## Local development

**Standalone:** `npm ci && npm run dev`

**With shell:** `npm run build && npm run preview`, then start the shell (see `../README.md`).

## CI

Push/PR to `main` runs lint, build, artifact report and upload (`cart-dist`), type-check, and `test-coverage`. The workflow writes a build size table to the job summary.

## Contributor guidelines

Agent and contributor conventions: [`.cursor/rules/project-guidelines.mdc`](.cursor/rules/project-guidelines.mdc).
