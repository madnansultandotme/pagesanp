# PageSnap

PageSnap (code name: snappage) is a privacy-first PDF to image converter that runs entirely in the browser. Upload a PDF, adjust export settings, and download high-quality PNG or JPEG images without ever sending your files to a server.

## Features

- 100% client-side processing using PDF.js and the Canvas API
- Adjustable resolution with presets up to 216 DPI
- Bulk download support with automatic ZIP packaging
- Per-page selection for targeted exports
- Responsive UI built with shadcn/ui components and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.0.0 or newer (recommend installing via [nvm](https://github.com/nvm-sh/nvm))
- npm 9+ (ships with Node.js)

### Installation

```sh
git clone https://github.com/madnansultandotme/snappage.git
cd snappage
npm install
```

### Development

```sh
npm run dev
```

This starts Vite on the default port (usually http://localhost:5173) with hot module replacement enabled.

### Production Build

```sh
npm run build
npm run preview
```

`npm run build` outputs the production bundle to `dist/`. `npm run preview` serves the built assets locally to verify the optimized build.

### Quality Checks

```sh
npm run lint    # ESLint
npm run test    # Vitest (runs once)
npm run test:watch
```

## Project Structure

```
src/
	components/     # UI building blocks, including PDF workflow pieces
	hooks/          # Custom React hooks (eg. PDF conversion state machine)
	pages/          # Top-level routes for landing, convert, about, and 404 views
	utils/          # Download helpers and other shared utilities
	types/          # TypeScript type definitions
```

## Key Concepts

- **Local-first privacy** – Files are read with the File API and never uploaded.
- **Progressive rendering** – Pages render sequentially to provide instant feedback during long conversions.
- **Flexible exports** – Users can save individual pages or aggregate selections as ZIP archives.

## Tech Stack

- React 18 + TypeScript
- Vite for tooling and lightning-fast builds
- Tailwind CSS with shadcn/ui for styling
- PDF.js for PDF parsing and rendering
- JSZip and FileSaver for download handling

## Contributing

Issues and pull requests are welcome. Please run linting and tests before submitting changes to keep the project healthy.
