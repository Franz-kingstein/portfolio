# 🚀 Franz Kingstein — Interactive Portfolio Website

A high-fidelity, interactive, and modern single-page portfolio website built with **React 19 + TypeScript**. This site integrates 3D interactive graphics, framer-motion animations, custom cursors, a local admin panel, live GitHub/LeetCode developer statistics, and a secure contact system.

🌐 **Live Website:** [franzkingstein.me](https://franzkingstein.me)

---

## 📖 Table of Contents
1. [✨ Key Features](#-key-features)
2. [📁 Project Architecture & Directory Map](#-project-architecture--directory-map)
3. [🧱 Tech Stack & Dependencies](#-tech-stack--dependencies)
4. [🛠 Detailed System Walkthrough](#-detailed-system-walkthrough)
   - [A. Theme & Style System](#a-theme--style-system)
   - [B. Dynamic Custom Cursor](#b-dynamic-custom-cursor)
   - [C. Content Management (Admin Panel)](#c-content-management-admin-panel)
   - [D. Analytics & Integration Services (statsService)](#d-analytics--integration-services-statsservice)
   - [E. Secure Contact System](#e-secure-contact-system)
5. [⚙️ Environment Variables](#%EF%B8%8F-environment-variables)
6. [🚀 Deployment Guides](#-deployment-guides)
7. [🧪 Local Development Workflow](#-local-development-workflow)
8. [🛡 Security Best Practices](#-security-best-practices)
9. [📄 License & Attribution](#-license--attribution)

---

## ✨ Key Features

### 🎨 UI & Animations
* **Spline 3D Integration:** Interactive 3D scene rendered on the landing page via `@splinetool/react-spline`. Includes a soft purple radial glow and a custom background configuration.
* **Framer Motion Animations:** Smooth page entries, hover-state expansions, scale microinteractions, and timeline-based slide transitions.
* **Scroll-Driven Animations:** View-timeline reveals that trigger component entries smoothly as the user scrolls, with fallback options for users with `prefers-reduced-motion` enabled.
* **Persistent Dark/Light Mode:** Toggle theme with instantaneous variable swap and persistent `localStorage` saving.

### 🖱️ Custom Robot Cursor
* Custom SVG-rendered cursor tracking that adapts dynamically:
  - **Default State:** A futuristic purple robot face.
  - **Pointer State:** A smiling robot with a glowing antenna on hoverable/clickable elements (buttons, inputs, cards, links).

### ⚙️ Local Content Editor (Hidden Admin Panel)
* Key combination trigger `Ctrl + Shift + #` opens an in-page **Content Editor overlay**.
* Allows live-editing of Hero Titles, Subtitles, About texts, Contact information, and Social URLs.
* Local state management updates the layout immediately across all components.

### 📊 Real-Time GitHub & LeetCode Analytics
* **GitHub Integration:** Fetches profile statistics, repositories count, total stars, follower ratios, top projects, and languages breakdown.
* **LeetCode API Integration:** Fetches ranking metadata, easy/medium/hard problem counts, and overall acceptance rates.
* **Safe Fallbacks:** Offline/API-limit fallback mode with hardcoded mock statistics for offline development or API outages.
* **Visual Graph Elements:** SVG circular progress rings and dynamically animated percent bars representing language profiles.

### 📬 Smart Contact Form
* **EmailJS Browser SDK Integration:** Sends messages directly to the owner without a backend.
* **Automated Fallback:** Converts inputs to preformatted `mailto:` headers in case environment variables for EmailJS are not loaded.
* **Form Verification:** Built-in semantic element checks and validation fields.

---

## 📁 Project Architecture & Directory Map

```
portfolio-main/
├── .github/                   # GitHub action definitions and issue templates
├── public/                    # Static public assets
│   ├── index.html            # Entry HTML document (configured with security and SEO tags)
│   ├── letter-f.png          # Favicon asset
│   ├── cursor-default.svg    # Default custom robot cursor
│   ├── cursor-pointer.svg    # Pointer custom robot cursor (smiling robot)
│   ├── me.jpg                # Profile photo (rendered in About section)
│   ├── manifest.json         # PWA Manifest
│   ├── robots.txt            # Web crawler configuration
│   └── 404.html              # Fallback router page for Single Page Application routing
├── src/                       # Application source root
│   ├── assets/               # Local asset folder
│   │   └── projects/         # Project screenshots and illustrations
│   ├── components/           # Reusable UI elements and helper views
│   │   ├── AdminPanel.tsx    # Content editor overlay
│   │   ├── AdminPanel.css    # Styling for content editor
│   │   ├── Navbar.tsx        # Responsive navigation with IntersectionObserver Spy
│   │   ├── Navbar.css        # Navbar positioning and theme styling
│   │   ├── ProjectCard.tsx   # Individual flip-card project elements
│   │   ├── ProjectCard.css   # Flip-card animation, 3D perspective, and colors
│   │   ├── ThemeToggle.tsx   # Theme toggling action button
│   │   └── ThemeToggle.css   # Icon rotation and theme styling
│   ├── contexts/             # Global Context providers for State Management
│   │   ├── AdminContext.tsx  # Centralized editable portfolio data and state
│   │   └── ThemeContext.tsx  # Dark/Light mode management with system preference listeners
│   ├── pages/                # Sequential portfolio pages (SPA layout)
│   │   ├── Home.tsx          # Landing section with Spline 3D and typing effects
│   │   ├── Home.css          # Spline placement, glow effects, and typography
│   │   ├── About.tsx         # Profile text, highlights, and quick stats
│   │   ├── About.css         # Photo wrapper styling with bracket highlights
│   │   ├── Projects.tsx      # Main project display, category filter tabs, and grids
│   │   ├── Projects.css      # Custom scrollbars, responsive grids, and featured layouts
│   │   ├── Features.tsx      # Live stats dashboard (GitHub, LeetCode, Skill meters)
│   │   ├── Features.css      # Dashboard grids, progress ring animation, and calendars
│   │   ├── Skills.tsx        # Categorized lists of technical capabilities
│   │   ├── Skills.css        # Grid design with icon positioning
│   │   ├── Contact.tsx       # Contact information cards and form
│   │   └── Contact.css       # Form inputs layout and submit transitions
│   ├── services/             # API layer
│   │   └── statsService.ts   # GitHub & LeetCode query hooks, fallback constants
│   ├── App.tsx               # Application core setup wrapping contexts and sections
│   ├── App.css               # Global variables, CSS resets, and global animations
│   ├── index.tsx             # React DOM injection point
│   ├── react-app-env.d.ts    # React-scripts TypeScript definitions
│   └── reportWebVitals.ts    # Performance analysis tools
├── render.yaml               # Blueprint for Render Static Site Deployment
├── package.json              # Script runners and package configurations
└── tsconfig.json             # TypeScript project compiler rules
```

---

## 🧱 Tech Stack & Dependencies

| Category | Technology | Version | Description |
|---|---|---|---|
| **Core** | React | `^19.1.1` | Main frontend component framework |
| | TypeScript | `^4.9.5` | Type-safety and compilation |
| **Styling & Icons** | Vanilla CSS | CSS3 | Native Variables and Animations |
| | Lucide React | `^0.541.0` | Modern, lightweight SVG icon packs |
| **Animations** | Framer Motion | `^12.23.12` | Production-grade animations |
| **3D Rendering** | Spline | `^4.1.0` | `@splinetool/react-spline` 3D Canvas integration |
| **Routing** | React Router DOM | `^7.8.2` | Single Page navigation |
| **Integrations** | EmailJS | `^4.4.1` | `@emailjs/browser` SMTP API connection |
| **Build System** | React Scripts | `5.0.1` | Create React App build utility wrapper |

---

## 🛠 Detailed System Walkthrough

### A. Theme & Style System
Global style declarations are managed in [App.css](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/App.css). Key configuration rules include:
1. **Design Tokens:** CSS variables defined in `:root` specify background tokens (`--bg-primary: #0A0A0F`, `--bg-secondary: #111118`), text colors (`--text-primary: #E8E8F0`), and accents (`--accent-primary: #7F77DD`, `--accent-secondary: #1D9E75`).
2. **Smooth Transitions:** High-performance transition durations are applied globally (`--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`).
3. **Scroll-Driven Animation:** Sections and inner grids utilize native CSS `@keyframes reveal-in` linked with `animation-timeline: view()` to animate elements automatically as they enter the screen.

### B. Dynamic Custom Cursor
Configured in [index.css](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/index.css), the custom cursor dynamically transforms between two SVGs:
* All base items (`*, *::before, *::after`) render the default robot cursor (`cursor-default.svg`).
* All interactive items (links, buttons, inputs, cards, dropdowns) automatically switch cursor class (`cursor-pointer.svg` 24px coordinates) to show a smiling robot face.

### C. Content Management (Admin Panel)
* **Trigger:** Pressing `Ctrl + Shift + #` triggers a key listener inside [AdminContext.tsx](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/contexts/AdminContext.tsx).
* **State Sync:** Changes made within the [AdminPanel.tsx](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/components/AdminPanel.tsx) form are piped directly into the `portfolioData` state object.
* **Scope:** Instantly alters titles, subtitles, description details, contact coordinates, and social media links site-wide.

### D. Analytics & Integration Services (statsService)
The [statsService.ts](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/services/statsService.ts) queries public endpoints asynchronously:
* **GitHub Stats:** Evaluates public repositories count, aggregates stargazers, parses programming language metrics, and returns top repositories sorted by stars. If a Personal Access Token (`REACT_APP_GITHUB_TOKEN`) is provided, it is appended to request headers; otherwise, anonymous public request headers are utilized.
* **LeetCode Stats:** Connects to the public LeetCode stats API to retrieve dynamic counts.
* **Offline Mockups:** If the request returns a non-200 code or rate limits are reached, the service gracefully serves local constants (e.g. 93 LeetCode solved problems, 118 GitHub repositories) to ensure page visual stability.

### E. Secure Contact System
Form fields are processed inside [Contact.tsx](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/src/pages/Contact.tsx):
* Checks if `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID`, and `REACT_APP_EMAILJS_PUBLIC_KEY` environment variables are active.
* If configured, it triggers an AJAX POST request using the `@emailjs/browser` SDK.
* If variables are missing, the form safely opens a client-side mail draft (`window.location.href = mailto:...`) containing preformatted Subject, Name, and Body fields.

---

## ⚙️ Environment Variables

For live integrations, declare these variables on your hosting provider (e.g., Render, Vercel) or create a local `.env` file in the root directory:

| Variable | Type | Description | Required |
|---|---|---|---|
| `REACT_APP_GITHUB_USERNAME` | String | Target profile handle (e.g. `Franz-kingstein`) | Optional (defaults to Franz-kingstein) |
| `REACT_APP_GITHUB_TOKEN` | String | GitHub Personal Access Token (PAT) with `read:user` | Optional (improves API limits) |
| `REACT_APP_EMAILJS_SERVICE_ID` | String | EmailJS Service ID | Yes (for contact form API) |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | String | EmailJS Template ID | Yes (for contact form API) |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | String | EmailJS Public API Key | Yes (for contact form API) |

---

## 🚀 Deployment Guides

### Deploying to Render (Blueprint Deployment)
The repository is configured with a [render.yaml](file:///home/franz/Documents/portfolio/portfolio/portfolio-main/render.yaml) file, making it ready for a **Static Site Blueprint** deployment.
1. Connect your repository to [Render](https://render.com).
2. Go to **Blueprint** in the Render Dashboard and click **New Blueprint Instance**.
3. Select your repository.
4. Render will automatically parse the config:
   * **Build Command:** `cd portfolio-main && npm install && npm run build`
   * **Publish Directory:** `portfolio-main/build`
5. Input your Environment variables in the Render settings panel.
6. Trigger the build.

---

## 🧪 Local Development Workflow

To set up the project locally, run the following commands in the `portfolio-main` subdirectory:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (starts on http://localhost:3000)
npm start

# 3. Build optimized static package for production
npm run build

# 4. Execute test suite (Jest + React Testing Library)
npm test
```

---

## 🛡 Security Best Practices

The codebase is hardened using modern secure coding standards:
* **Frame Protections & Resource Restraints:** `public/index.html` implements strict meta tags defining Referrer-Policy, frame-ancestors control, and disabled sensor policies.
* **Safe External Anchors:** All links declaring `target="_blank"` include `rel="noopener noreferrer"` attributes to prevent tab-nabbing vulnerabilities.
* **No Eval / Danger Contexts:** Components avoid using `dangerouslySetInnerHTML` or `eval()` inputs to eliminate XSS (Cross-Site Scripting) vectors.
* **Secure Token Handlers:** Auth variables are handled solely server-side or via injected build-time environment files, and are never committed to version control.

---

## 📄 License & Attribution

* **License:** Private project. All rights reserved.
* **Favicon Credit:** Letter F icon created by *Md Tanvirul Haque* via [Flaticon](https://www.flaticon.com/free-icons/letter-f).
* **UI Design Inspiration:** Formats inspired by premium single-page visual flow designs.

---
Created with ❤️ by [Franz Kingstein](https://franzkingstein.me)
