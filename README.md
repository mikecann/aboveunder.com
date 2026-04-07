# aboveunder.com

Above Under is a Vite SPA deployed on Netlify with Netlify Functions for a couple of backend endpoints.

## Development

```bash
npm install
npm run dev-src
```

If you want the TypeScript watchers and lambda tests running too:

```bash
npm run dev
```

## Build

```bash
npm run build
```

That runs:

- the SPA build into `build/`
- the tools TypeScript build into `dist/`
- the lambda TypeScript build into `functions/`

## Netlify

This repo is configured to deploy on Netlify from GitHub.

- Production URL: `https://aboveunder.com.au`
- Production branch: `master`
- Build command: `npm run deploy`
- Publish directory: `build`
- Functions directory: `functions`

The checked-in `netlify.toml` is the source of truth for the build settings so they do not drift in the Netlify UI.

## Environment Variables

- `VITE_GOOGLE_MAPS_API_KEY`

The app now degrades gracefully if the Maps key is missing. The site still renders, but the map shows a fallback message instead of crashing the whole page.
# Aboveunder.com

THe code for the website aboveunder.com created using react, hosted on the awesome Netlify