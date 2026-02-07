# 🚀 Franz Kingstein — Portfolio

A modern, interactive portfolio website built with **React + TypeScript**, featuring 3D animations, flip-card projects, custom cursors, and EmailJS-powered contact form.

🌐 **Live:** [franzkingstein.me](https://franzkingstein.me)

---

## ✨ Features

### 🎨 UI & Animations
- **Spline 3D Integration** — Interactive 3D scene on the homepage via `@splinetool/react-spline`
- **Framer Motion Animations** — Smooth page transitions and element animations
- **Flip-Card Projects Grid** — Click-to-flip cards with horizontal scroll on desktop and mobile (with scroll hints)
- **Custom Robot Cursor** — SVG robot face cursor that changes expression on hover/click
- **Dark/Light Theme Toggle** — Persistent theme switching with CSS variables
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile

### 📬 Contact Form
- **EmailJS Integration** — Sends messages directly from the browser (no backend needed)
- **Mailto Fallback** — Falls back to `mailto:` link if EmailJS is not configured
- **Form Validation** — Required field validation with accessible labels

### 📊 GitHub Stats
- **Live GitHub Stats** — Fetches repos, stars, forks, and language breakdown via GitHub API
- **Secure Token Handling** — Auth header only sent when token is configured (no empty tokens leaked)

### �� Features Section
- Certifications & achievements with image gallery
- Hackathon wins and course completions

### 🛠 Skills Section
- Visual skill breakdown with categorized tech stack

### 🔒 Security
- **Referrer Policy** — `strict-origin-when-cross-origin` meta tag
- **Content-Type Sniffing Protection** — `X-Content-Type-Options: nosniff`
- **Permissions Policy** — Camera, microphone, geolocation disabled
- **External Links** — All `target="_blank"` links use `rel="noopener noreferrer"`
- **No Secrets in Code** — All API keys/tokens via environment variables
- **`.env` in `.gitignore`** — Prevents accidental secret commits
- **No `dangerouslySetInnerHTML` or `eval()`** — Clean, XSS-safe rendering

---

## 🧱 Tech Stack

| Category       | Technology                                      |
|----------------|--------------------------------------------------|
| Framework      | React 19 + TypeScript                            |
| Build Tool     | Create React App (Webpack)                       |
| 3D             | Spline (`@splinetool/react-spline`)              |
| Animations     | Framer Motion                                    |
| Icons          | Lucide React                                     |
| Routing        | React Router DOM v7                              |
| Email          | EmailJS (`@emailjs/browser`)                     |
| Hosting        | Render (Static Site)                             |
| Domain         | franzkingstein.me                                |

---

## 📁 Project Structure

```
portfolio-main/
├── public/
│   ├── index.html            # Main HTML with security meta tags
│   ├── letter-f.png          # Custom favicon (F icon)
│   ├── cursor-default.svg    # Robot cursor (default)
│   ├── cursor-pointer.svg    # Robot cursor (hover/pointer)
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # Search engine crawling rules
│   └── 404.html              # SPA fallback for client-side routing
├── src/
│   ├── assets/               # Images, certificates, project screenshots
│   ├── components/           # Navbar, ThemeToggle, AdminPanel, ProjectCard
│   ├── contexts/             # ThemeContext, AdminContext
│   ├── pages/                # Home, About, Projects, Features, Skills, Contact
│   ├── services/             # statsService (GitHub/LeetCode API)
│   ├── App.tsx               # Root component
│   └── index.tsx             # Entry point
├── render.yaml               # Render deployment config
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

Set these in your **Render dashboard** → Service → **Environment**:

| Variable                           | Required | Description                        |
|------------------------------------|----------|------------------------------------|
| `REACT_APP_GITHUB_TOKEN`          | Optional | GitHub PAT for stats (read:user)   |
| `REACT_APP_GITHUB_USERNAME`       | Optional | GitHub username (default: Franz-kingstein) |
| `REACT_APP_EMAILJS_SERVICE_ID`    | Yes*     | EmailJS service ID                 |
| `REACT_APP_EMAILJS_TEMPLATE_ID`   | Yes*     | EmailJS template ID                |
| `REACT_APP_EMAILJS_PUBLIC_KEY`    | Yes*     | EmailJS public key                 |

> *Required for the contact form to send emails. Without these, it falls back to `mailto:`.

---

## 🚀 Deployment (Render — Static Site)

1. Connect your GitHub repo to [Render](https://render.com)
2. Create a **Static Site** service
3. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add environment variables (see above)
5. Deploy!

The `render.yaml` in the repo also supports Blueprint deploys.

---

## 🖱️ Custom Cursor

The portfolio uses SVG robot cursors:
- **Default** — Purple robot face with grid mouth
- **Pointer** — Robot with glowing antenna and smile (on links/buttons)

Cursors are 48×48px SVGs in `src/assets/`, bundled by Webpack.

---

## 📝 Icon Attribution

- Favicon: [Letter f icons created by Md Tanvirul Haque — Flaticon](https://www.flaticon.com/free-icons/letter-f)

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 📄 License

This project is private. All rights reserved.

---

Built with ❤️ by [Franz Kingstein](https://franzkingstein.me)
