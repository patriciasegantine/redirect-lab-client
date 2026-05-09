# 🚀 Brev.ly Client

Brev.ly Client is a React single-page application that provides the user interface for creating and managing shortened links.

It focuses on simplicity, responsiveness, and a smooth user experience when interacting with the Brev.ly API.

---

## 🧩 Overview

The application allows users to:

- create shortened links
- validate URLs before submission
- view and manage existing links
- delete links
- track access counts
- download CSV reports

---

## ⚙️ Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Zod

---

## ✨ Features

- Form validation with clear feedback
- Responsive UI for desktop and mobile
- Handling of loading and empty states
- Accessible and reusable components
- Integration with the back-end API
- Accessible placeholder styling for improved UX

---

## 🚀 Deploy

The client is automatically deployed to **AWS S3** on every push to the `main` branch via GitHub Actions.  
After upload, a **CloudFront cache invalidation** is triggered to ensure the latest version is served immediately.

The pipeline runs in order:
1. **Test** — runs the test suite
2. **Build** — compiles the production bundle
3. **Deploy** — syncs to S3 and invalidates CloudFront

---

## 📜 Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run format` — format code with Prettier
- `npm run typecheck` — run TypeScript checks

---

## 🔐 Environment variables

Create a `.env` file based on the required variables.

```dotenv
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```
---

## 📦  Getting started

1. Install the dependencies.
2. Configure the environment variables.
3. Start the server application.
4. Run the client in development mode.

## Related documentation

- [Root README](../README.md)
- [Server README](../server/README.md)

## ✅ Checklist

- [x] A link can be created
    - [x] A link with a badly formatted short URL must not be created
    - [x] A link with a duplicate short URL must not be created
- [x] A link can be deleted
- [x] The original URL can be retrieved via the short URL
- [x] All registered URLs can be listed
- [x] The access count of a link can be incremented
- [x] A CSV report of all links can be downloaded
- [x] React SPA built with Vite as the bundler
- [x] Good user experience elements (empty state, loading indicators, action blocking based on app state)
- [x] Responsive design: works well on both desktop and mobile

### ⭐ Extras

- [x] Infinite scroll with `IntersectionObserver` for paginated link loading
- [x] BroadcastChannel for real-time access count sync across browser tabs
- [x] Copy short link to clipboard
- [x] Confirmation dialog before deleting a link
- [x] Dark mode support
- [x] Automated CI/CD — deploy to AWS S3 + CloudFront via GitHub Actions
- [x] Automated tests (services and accessibility)

---
