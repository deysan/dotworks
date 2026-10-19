# Dotworks

A little workspace for focus, notes, and CSS experiments.

[Open Dotworks](https://deysan.github.io/dotworks/)

Three circular buttons on a blue blueprint grid open lightweight tools in animated dialogs. Built with HTML, CSS, and vanilla JavaScript, with no dependencies or build step.

## Tools

- **Pomodoro** — 25-minute focus sessions, 5- and 15-minute breaks, pause/resume, reset, and a completion sound.
- **Notes** — a quick draft with automatic saving in this browser and a character count.
- **CSS Builder** — live controls for corner radius, gradient colors and angle, shadow blur and offset, plus copyable CSS.

## Interaction

- Buttons appear one after another on page load.
- Hover or keyboard focus reveals labels and a dashed ring.
- Click a button or activate it with Enter/Space to open its tool.
- Close dialogs with the close button, Escape, or a click on the backdrop.
- The timer keeps running while its dialog is closed, as long as the page stays open.
- Responsive layouts and reduced-motion preferences are supported.

## Run locally

Clone the repository, then serve its folder with any static web server. For example, with Python 3:

```sh
git clone https://github.com/deysan/dotworks.git
cd dotworks
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

## Project structure

```text
index.html                 Static page shell and module entry point
src/
  app.js                   Feature registration and startup
  styles/                  Base styles and stylesheet imports
  shared/ui/               Circular launchers, animated dialogs, shared buttons
  features/
    pomodoro/              View, styles, controller, countdown model, completion sound
    notes/                 View, styles, controller, local draft persistence
    css-builder/           View, styles, controller, CSS generation model
tests/                     Countdown and CSS generation regression tests
```

The app uses native ES modules. Each feature owns its markup in `view.js`, its scoped CSS in `styles.css`, and its behavior in `index.js`. Countdown calculations and CSS generation are separate from the DOM so they can be tested directly.

`src/app.js` registers the features and mounts each one once. Shared launchers and dialogs handle opening, animated closing, and keyboard focus. Widget state stays inside the feature and survives closing its dialog.

All asset and import paths are relative, so the same source works locally and under the `/dotworks/` GitHub Pages path. Use an HTTP server as shown above; ES modules do not load reliably from a `file://` URL.

## Tests

With Node.js 20 or later:

```sh
npm test
```

No dependency installation is needed. Tests use the built-in Node.js test runner and cover deadline-based timing, pause/resume, mode resets, completion, and CSS output.

## Add a tool

1. Create a folder under `src/features/` with `view.js`, `styles.css`, and `index.js`.
2. Export a feature definition with a unique `id`, a CSS `className`, `label`, `title`, `stamp`, `icon`, `content`, and an `init(root)` function. Query widget elements inside `root` rather than across the document.
3. Import and register it in the `features` array in `src/app.js`.
4. Import its stylesheet in `src/styles/index.css`, and add a launcher position and appearance delay in `src/shared/ui/launcher.css`.

Keep feature-specific state and helpers in the feature folder. Move code into `shared/` when it is used by multiple features. Preserve the existing Notes storage key when changing draft persistence.

## Data and browser behavior

Notes are stored in `localStorage` for the current browser and origin; they are not synced between devices. Reloading the page resets the timer. The completion sound requires browser audio support and permission to play; a suspended browser tab may delay the sound. Clipboard access requires a secure context such as HTTPS or localhost, with manual text selection as a fallback.

## Deployment

GitHub Pages serves the repository root from the `main` branch. Changes pushed to `main` are published automatically. The `.nojekyll` file keeps the site as plain static files.

## Inspiration

The blueprint background and circular launcher concept were inspired by [Circle links by dbenmore](https://codepen.io/dbenmore/pen/ExVxeyv).
