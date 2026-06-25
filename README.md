# Dragons of Mugloar

Implemented by Magnus Teekivi using the API https://dragonsofmugloar.com/doc/.

Highlights:

- The implementation uses Nuxt and Tailwind CSS.
- Responsiveness: on wider screens the tasks and shop items sections are shown side-by-side. On smaller screens tabs are shown.
- Both manual play and autoplay are supported.
- During an active game, autoplay can be started and stopped at any time, allowing to mix autoplay and manual play.
- The actions of backend-side autoplay are shown in realtime by utilizing a WebSocket.

## Introduction

## Setup

It is recommended to use latest version of Node v24.

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Run Tests

Run unit tests:

```bash
npm run test
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
