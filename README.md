# Dotworks

A little workspace for focus, notes, and CSS experiments.

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
index.html     Page markup, styling, and widget behavior
README.md      Project overview and local setup
.gitignore     Local files excluded from version control
```

## Data and browser behavior

Notes are stored in `localStorage` for the current browser and origin; they are not synced between devices. Reloading the page resets the timer. The completion sound requires browser audio support and permission to play; a suspended browser tab may delay the sound. Clipboard access requires a secure context such as HTTPS or localhost, with manual text selection as a fallback.

## Inspiration

The blueprint background and circular launcher concept were inspired by [Circle links by dbenmore](https://codepen.io/dbenmore/pen/ExVxeyv).
