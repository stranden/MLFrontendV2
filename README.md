# Megalink Frontend V2

Megalink frontend for broadcast graphics – a modern Vue.js application for shooting sports broadcasts and web interfaces.

## Features

- Real-time graphics and scoreboards for live broadcasting (10m shooting competitions)
- Timer displays
- Individual, team, and mixed finals support
- Broadcast-optimized and public web layouts
- Responsive design
- Real-time updates via socket service

## Project Structure

```
src/
├── assets/        # Images, static media, CSS, flags, etc.
├── components/    # Reusable Vue components (buttons, timers, scorecards, etc.)
├── composables/   # Vue 3 composition API logic (hooks, utilities)
├── layouts/       # High-level UI layouts (BroadcastLayout.vue, WebLayout.vue)
├── router/        # Vue Router configuration (index.js, routes)
├── services/      # API clients (REST, socket services, etc.)
├── views/
│   ├── broadcast/ # Broadcast-focused views (scoreboards, graphics)
│   │   └── 10m/   # Views for 10m shooting competitions
│   └── web/       # Web interface views (public pages, info)
```

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** Vue Router
- **State Management:** Vue Composables
- **Real-time:** Socket.js service

## Setup & Development

Install dependencies:

```sh
npm install
```

Start a development server with hot reload:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the built project:

```sh
npm run preview
```

## Configuration

For advanced customization see the [Vite Configuration Reference](https://vite.dev/config/).

## Recommended Tools

- **IDE:** Visual Studio Code with the [Vue Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- **Devtools:** Vue.js Devtools for Chrome or Firefox

## Contributing

Contributions and feedback are welcome! Please open issues or pull requests.
