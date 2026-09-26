# dhruvgupta.me

Dhruv Gupta's personal website, rebuilt with Next.js and exported as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Where to edit things

- `content/profile.ts` contains the profile, contact links, and navigation.
- `content/resume.html` contains the original résumé content, preserved verbatim during the migration.
- `components/` contains reusable site behavior and layout.
- `app/globals.css` contains the design system and responsive styles.
- `public/media/` contains the existing images.

## Build and deploy

`npm run build` creates a fully static site in `out/`. The GitHub Actions workflow deploys that directory to GitHub Pages whenever `main` changes. Keep the repository's Pages source set to **GitHub Actions**.
