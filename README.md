# component-lab

A personal learning project. I am building a small **authentication UI kit** with React, TypeScript and Storybook, to learn how product teams develop, document and test UI components.

**Live Storybook:** `https://<your-github-username>.github.io/component-lab/`

> This is a practice project. The visual style was inspired by a login screen I studied, but it contains no company names, logos, data or code. Social sign-in buttons have no brand logos; a real app would add the official ones.

## What is inside

| Section in Storybook | What it shows |
| --- | --- |
| **Foundations** | Color tokens and the type scale |
| **Components** | Button, TextField, Divider, TextLink, IconBadge, BackButton |
| **Screens** | Two login steps and a full clickable login flow |

Every component has:

- **Stories** for each state: default, loading, disabled, error, long text, dark theme
- **Interaction tests** (stories named `Test…`) that click and type automatically
- **Accessibility checks** in the Accessibility panel
- A **Docs page** generated from the TypeScript types and comments

## Run it locally

You need **Node.js 20 or newer** (`node -v` to check).

```bash
npm install
npm run storybook
```

Storybook opens at **http://localhost:6006**.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build-storybook` | Builds the static site into `storybook-static/` |
| `npm run test:unit` | Runs unit tests (fast, no browser) |
| `npm run test:stories` | Runs every story as a test in Chromium (run `npx playwright install chromium` once first) |
| `npm run typecheck` | Checks TypeScript types |

## Try the login flow

Open **Screens → Login → Full Flow**. Nothing is sent to a server; a fake service answers.

- Any valid email moves you to the password step.
- Any password with 8–50 characters signs you in.
- Type `wrong-password` to see the error state.

## Project structure

```text
.storybook/            Storybook settings: theme switch, fonts, screen sizes
src/
  tokens/tokens.css    Design tokens (colors, fonts, sizes) — the only place with raw values
  icons/               A small hand-made icon set
  components/          Small reusable parts, each with .tsx, .module.css, .stories.tsx
  patterns/            Page frames (AuthLayout)
  screens/Login/       Login steps + LoginFlow (the "smart" container)
.github/workflows/     CI and GitHub Pages deploy
docs/GLOSSARY.md       Storybook words explained in plain English
```

## How I built it

1. **Tokens first.** I picked colors, fonts and sizes from the reference screen and stored them as CSS variables. Components use names like `var(--color-ink)`, never raw hex values. The dark theme only changes token values.
2. **Presentational components.** Each component only receives props. None of them calls an API. This is why every state can be shown in Storybook without a backend.
3. **One story per state.** If a user can see it, it has a story: loading, disabled, error, long translation, dark theme, phone width.
4. **Tests inside stories.** `play` functions click and type like a user and check the result. The same stories run as tests in CI.
5. **Screens from parts.** The login screens are built only from the kit's components. `LoginFlow` holds the state; the step components stay simple.

## Deploy

Every push to `main` builds Storybook and publishes it to GitHub Pages (`.github/workflows/deploy-storybook.yml`).
One-time setup: **Settings → Pages → Source → GitHub Actions**.

## Notes

- Hover, pressed, disabled and error colors were not visible on the reference screen. They are my own choices and are marked `estimate` in `tokens.css`.
- Fonts are Figtree (body) and Source Serif 4 (headings) from Google Fonts.

## License

MIT
