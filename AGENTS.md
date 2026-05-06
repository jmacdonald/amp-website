# Project Guide

This is the static website for Amp. It is a small Vite app with plain authored CSS and a Docker-first development workflow.

## Runtime And Tooling

- Use Docker Compose for Node, npm, Vite, builds, and screenshots.
- Do not install or run `node_modules` on the host. Dependencies live in the Docker `node_modules` volume.
- Do not mount host credentials, `$HOME`, SSH agents, npm tokens, or other private host state into containers.
- The app does not use Tailwind, Ruby, Middleman, or a frontend framework.
- Static deploy output is written to `dist/`.

## Commands

Use the `Justfile` as the public interface:

```sh
just setup
just serve
just build
just capture
just verify
```

- `just setup` builds the Docker image and runs `npm ci --ignore-scripts` in the container.
- `just serve` starts the Vite dev server through Docker Compose on `http://localhost:5173`.
- `just build` builds the static site into `dist/`.
- `just capture` writes screenshots to `screenshots/desktop.png` and `screenshots/mobile.png`.
- `just verify` runs build plus screenshot capture.

The `package.json` scripts are container-internal implementation details. Prefer `just` commands in docs, automation, and agent work.

## Dependencies

- Use `npm ci` from the committed `package-lock.json`.
- The setup service uses `npm ci --ignore-scripts`; keep that default unless a future dependency genuinely requires install scripts.
- If dependencies change, update `package.json` and regenerate `package-lock.json` through Docker Compose.
- Chromium for screenshots is supplied by the Docker image, not by Playwright install scripts.

## Files

- `index.html`: page markup and inline SVG icons.
- `src/styles.css`: all site styling, including responsive layout and editor preview styling.
- `src/main.js`: small progressive behavior only, currently latest-release install label fetching.
- `public/`: static assets copied into `dist/`, including `logo.svg`, `favicon.ico`, and `CNAME`.
- `scripts/capture.mjs`: Vite plus Playwright screenshot workflow.
- `Dockerfile`, `compose.yaml`, `Justfile`: Docker-first development interface.

## Design Notes

- Keep the site single-page, static, and deployable from `dist/`.
- Preserve the Amp editor preview as a terminal/editor surface, not a native GUI editor mockup.
- Keep the status bar and editor content aligned like terminal cells.
- Keep the logo as the visible brand mark in the hero; do not add a second adjacent "Amp" wordmark.
- Use plain CSS for layout and presentation. Avoid adding Tailwind back unless the project direction changes.

## Verification

Before handing off changes that affect markup, styling, assets, dependencies, or build behavior, run:

```sh
just verify
```

Then inspect the generated screenshots when visual behavior may have changed:

- `screenshots/desktop.png` at 1440x1000.
- `screenshots/mobile.png` at 390x844.

Check that text and controls do not overlap, the editor content remains readable, CTA links are intact, and the static install label remains usable if latest-release fetching fails.
