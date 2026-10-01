# Raster & Vector Academy (demo)

A minimal demo of a learning site about raster vs. vector graphics, built with plain HTML, a little CSS and a little JavaScript.

## How to open
Open the folder in VS Code and either:
- double-click `index.html` to open it in a browser, or
- right-click `index.html` → **Open with Live Server** (Live Server extension).

## User flow
1. `index.html`: sign in with your name (an HTML form, no JavaScript).
2. `path.html`: welcome message and the learning path. Lesson 1 is open.
3. `lesson-1.html`: the lesson.

## Media in Lesson 1
| Requirement | Where |
|---|---|
| Text content | Headings and paragraphs (`<h1>`–`<h2>`, `<p>`) |
| Inline SVG | Diagram with a CSS-only hover effect |
| Raster image | `assets/landscape-32.png` (32 × 32 PNG, 182 bytes) |
| Audio | Native `<audio controls>` playing `assets/chime.wav` |
| Interactive JS | Zoom slider comparing the raster and vector versions |

The quiz uses answer buttons: each one stores its own explanation in a `data-explain` attribute, and `js/main.js` shows "Correct" or "Wrong" with that explanation.

## Files
```
index.html      sign-in
path.html       welcome + learning path
lesson-1.html   lesson content
css/style.css   all styles (typography: Nunito, line-height 1.5, font-kerning, letter-spacing)
js/main.js      remembers the name, checks quiz answers, runs the zoom slider
assets/         PNG image and WAV audio
```
