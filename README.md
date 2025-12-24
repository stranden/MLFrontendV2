# Megalink Frontend V2

Megalink frontend for broadcast graphics - A modern Vue.js application designed for shooting sports broadcast and web interfaces.

## Project Overview

This project is split into **two main parts**:

### 🎥 Broadcast Part

- **Purpose**: Real-time graphics and scoreboards for live broadcasting
- **Features**: Timer displays, individual/team/mixed final scoreboards for 10m shooting competitions
- **Location**: `/src/views/broadcast/`
- **Layout**: Uses `BroadcastLayout.vue` for broadcast-optimized UI

### 🌐 Web Part

- **Purpose**: Public-facing web interface for general users
- **Features**: Home page, about information, and general navigation
- **Location**: `/src/views/web/`
- **Layout**: Uses `WebLayout.vue` for standard web experience

## 🚧 Development Status

**Note**: This project is in early development stage. Much of the functionality is still being implemented.

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: Vue Router
- **State Management**: Vue Composables
- **Real-time**: Socket.js service integration

## Project Structure

```
src/
├── components/          # Reusable UI components
├── composables/         # Vue composition functions
├── layouts/            # Layout components (Broadcast/Web)
├── views/
│   ├── broadcast/      # Broadcast graphics views
│   │   └── 10m/        # 10m shooting competition views
│   └── web/           # Public web interface views
├── services/          # API and Socket services
├── router/            # Vue Router configuration
└── assets/            # Static assets (CSS, images, flags)
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Configuration

See [Vite Configuration Reference](https://vite.dev/config/) for customization options.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
