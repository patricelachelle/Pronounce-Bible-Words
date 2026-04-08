# Bible Word Pronunciation Web App

A modern responsive React app to help users search difficult Bible names and hear pronunciation audio.

## Features

- Clean homepage with search bar and word list
- 50+ difficult Bible words with phonetic spellings
- Click a word to show details and audio player
- Responsive UI for desktop and mobile
- Beginner-friendly component structure

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components
    │   ├── SearchBar.jsx
    │   ├── WordDetail.jsx
    │   └── WordList.jsx
    └── data
        └── bibleWords.js
```

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview production build:

   ```bash
   npm run preview
   ```

## Notes

- Audio URLs are placeholder links for now and can be replaced with real pronunciation clips.
