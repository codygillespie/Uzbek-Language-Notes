# Uzbek Language Notes 📘

A minimal, static single-page site for keeping Uzbek language notes and a reference of the Uzbek Latin alphabet. Notes are written by hand in HTML (no uploads or server required). The UI uses Bootstrap for basic layout and a small JS search to filter sections.

---

## Features ✅
- Static, hand-editable notes organized in **semantic sections** (`<details>` + `<summary>`).
- **Two-column** alphabet tables with Letter / Name / Example / Audio placeholder.
- Live **search** that filters sections and auto-opens matches (`js/search.js`).
- Small, compact styling in `style/styles.css` (easy to tweak).

---

## Quick start ▶️
1. Open `index.html` in your browser (double-click) or serve locally for correct MIME handling:

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000/
```

2. Use the search box to filter notes (Escape clears search).

---

## How the content is organized 🔧
- `index.html` — main document. Edit this file to add or change notes.
  - Add a section by copying a `section.note-section` block. Each section uses `<details>` and a `.note-summary` + `.note-content` structure.
  - The alphabet is inside the "Uzbek alphabet — Alfabit" section. It's split into two small tables for compact display.
  - **Audio placeholders**: currently each alphabet row contains `<span class="audio-placeholder">No audio</span>`.
    - To link audio later replace the placeholder with either:

```html
<!-- simple link -->
<a href="audio/A.mp3">Play</a>

<!-- or HTML5 player -->
<audio controls src="audio/A.mp3">Your browser does not support audio</audio>
```

- `style/styles.css` — custom styling. Tweak spacing, colors, or container width here.
- `js/search.js` — search/filter logic (looks for matches in section summary and content, opens matching `<details>`).
- `js/app.js` — leftover notes app (not used in current static layout). Safe to remove if unwanted.

---

## Editing tips ✍️
- To add a new note section: copy a `section.note-section` block and change the `<summary>` text and contents of `.note-content`.
- Keep content concise; the page is optimized for a compact, printable-friendly layout.
- Use `<code>...</code>` for short inline examples or IPA, and use `<strong>` for small highlights.

---

## Accessibility & behavior ♿
- Uses native `<details>` elements for keyboard-accessible collapsing.
- Search auto-opens the first matching section to make results easy to read.

---

## Ideas / Next steps 💡
- Add IPA column or example audio files linked into the Audio column.
- Add CSV/JSON export-import for notes if you later want programmatic editing.
- Replace Bootstrap with a custom minimal CSS for a lighter page.

---

## License
This project contains simple static content — use or adapt as you like.

---

