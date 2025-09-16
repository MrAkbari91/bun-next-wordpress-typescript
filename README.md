Here is a **beautified, markdown-optimized version** of your project README with improved formatting, consistent spacing, clearer section separation, and polished typography — all while preserving your original content:

---

# 📝 WP Blog – Modern WordPress Frontend

A modern, production-ready blog frontend built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, seamlessly integrated with the **WordPress REST API**.

> ✨ Features include SEO optimization, responsive design, dark/light theme support, and robust error handling.

---

## 🏗️ Architecture & Tech Stack

* ⚛ **Next.js 14** – App Router, Server & Client Components
* 🧠 **TypeScript** – Static typing and IDE support
* 🎨 **Tailwind CSS** – Utility-first styling with dark/light themes
* 🌐 **WordPress REST API** – Full blog data integration
* 🧩 **Radix UI** & **shadcn/ui** – Accessible and customizable UI components
* 🖼 **Lucide Icons** – Modern, consistent icon set
* 🌗 **next-themes** – Toggle between dark and light modes
* 📊 **Recharts** – Data visualization with charts
* 🔔 **Sonner** – Elegant toast notifications

---

## 📁 Project Structure

```
.
├── app/                   # App Router pages (home, blog, etc.)
│   └── page.tsx           # Home page with hero, latest posts, categories
├── components/            # Reusable UI and feature components
│   ├── blog-card.tsx      # BlogCard component
│   ├── loading-skeleton.tsx  # Loading skeletons
│   ├── ui/                # UI primitives (button, card, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # API wrappers and utilities
│   └── wordpress-api.ts   # WordPress API integration
├── public/                # Static assets
├── styles/                # Tailwind and global CSS
├── types/                 # TypeScript types
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── postcss.config.mjs     # PostCSS configuration
├── package.json           # Dependencies and scripts
└── ...
```

---

## 📄 Pages Implemented

* **Home** (`/`) – Hero, latest posts, top categories
* **Blog** (`/blog`) – All posts with filtering + pagination
* **Category** (`/category/[slug]`) – Category-specific posts
* **Post Detail** (`/blog/[slug]`) – Full content with related posts
* **Author** (`/author/[slug]`) – Author bio and their posts
* **Categories** (`/categories`) – All categories list
* **404 Page** – Custom not-found view

---

## 🧩 Core Components

* **BlogCard** – Optimized card with image, author, and tags
* **Header/Footer** – Navigation, branding, and theme toggle
* **Breadcrumb** – Dynamic, SEO-friendly breadcrumb nav
* **Pagination** – Smart paginated navigation
* **Loading Skeletons** – Smooth UX with shimmer loaders
* **Theme Toggle** – Dark/light mode switching

---

## 🚀 Key Features

✅ **SEO Optimized**

> Dynamic metadata, Open Graph tags, JSON-LD

✅ **Responsive Design**

> Tailwind’s mobile-first approach

✅ **Image Optimization**

> Next.js Image with lazy loading and sizing

✅ **Accessibility**

> Semantic HTML, keyboard nav, ARIA labels

✅ **Performance**

> Server Components, dynamic imports, caching

✅ **Robust Error Handling**

> Fallbacks when API data is missing

---

## 🔌 WordPress API Integration

* 📡 Built-in wrapper in `lib/wordpress-api.ts`
* ✅ Embedded data: author, featured media, categories
* 🔁 Pagination, filtering, related posts
* 🔎 Clean and scalable architecture for data fetching

---

## 🔐 Environment Variables

Create a `.env.local` in the root directory:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

---

## 🛠️ Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mrakbari91/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Setup environment variables:**

   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

---

## 🎨 Customization Guide

| Area           | Location               |
| -------------- | ---------------------- |
| Tailwind Theme | `tailwind.config.ts`   |
| Global Styles  | `styles/globals.css`   |
| UI Components  | `components/ui/`       |
| API Logic      | `lib/wordpress-api.ts` |
| Data Types     | `types/`               |

---

## 🧪 Recent Code Updates

### 🏠 Home Page (`app/page.tsx`)

* ✅ Hero with gradient + CTA
* ✅ Latest posts grid with `BlogCard`
* ✅ Top categories with gradient cards, icons, and post counts
* ✅ Responsive design, accessibility, loading states

### 🔌 API Integration

* ✅ Posts, categories, featured media, authors
* ✅ Paginated + filtered queries via `WordPressAPI`

### 🎨 UI & UX

* ✅ Gradients, hover states, dark mode
* ✅ Animated skeletons while loading
* ✅ Keyboard accessibility + ARIA labels

---

## 📄 License

[MIT](./LICENSE)

---

## ©️ Copyright

**© 2025 Dhruv Akbari** — All rights reserved.

---

Would you like this as a downloadable `README.md` file or need help deploying it to Vercel, Netlify, etc.?
