# WP Blog – Modern WordPress Frontend

A modern, production-ready blog frontend built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, seamlessly integrating with the WordPress REST API. Features include SEO optimization, responsive design, dark/light theme support, and robust error handling.

---

## **Architecture & Technology Stack**

- **Next.js 14** (App Router, Server & Client Components)
- **TypeScript** for type safety
- **Tailwind CSS** with custom themes and dark/light mode
- **WordPress REST API** integration
- **Radix UI** & **shadcn/ui** for accessible UI components
- **Lucide Icons** for modern iconography
- **next-themes** for theme switching
- **Recharts** for chart visualizations
- **Sonner** for toast notifications

---

## **Project Structure**

```
.
├── app/                # App Router pages (home, blog, category, author, etc.)
│   └── page.tsx        # Home page with hero, latest posts, top categories
├── components/         # Reusable UI and feature components
│   ├── blog-card.tsx   # BlogCard component
│   ├── loading-skeleton.tsx # Loading skeletons
│   ├── ui/             # UI primitives (button, card, pagination, etc.)
│   └── ...             # Feature components (header, footer, etc.)
├── hooks/              # Custom React hooks
├── lib/                # API wrappers and utilities (WordPressAPI, etc.)
├── public/             # Static assets (images, SVGs)
├── styles/             # Global and Tailwind CSS files
├── types/              # TypeScript types (WordPress, etc.)
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── postcss.config.mjs  # PostCSS configuration
├── package.json        # Project dependencies and scripts
└── ...
```

---

## **Pages Implemented**

- **Home Page** (`/`) – Hero section, latest posts, top categories
- **Blog Page** (`/blog`) – All posts with category filtering and pagination
- **Category Page** (`/category/[slug]`) – Category-specific posts with breadcrumbs
- **Blog Detail Page** (`/blog/[slug]`) – Full post content with related posts
- **Author Page** (`/author/[slug]`) – Author info and their posts
- **Categories Page** (`/categories`) – All categories overview
- **404 Page** – Custom not found page

---

## **Components Created**

- **BlogCard** – Optimized post cards with images, categories, author info
- **Header/Footer** – Navigation with theme toggle
- **Breadcrumb** – Navigation breadcrumbs
- **Pagination** – Smart pagination component
- **Loading Skeletons** – Smooth loading states
- **Theme Toggle** – Dark/light mode switcher

---

## **Key Features**

- **SEO Optimized** – Dynamic metadata, Open Graph tags, JSON-LD structured data
- **Image Optimization** – Next.js Image component with proper sizing
- **Responsive Design** – Mobile-first approach with Tailwind CSS
- **Error Handling** – Graceful fallbacks when API data is unavailable
- **Performance** – Server Components, dynamic imports, and caching
- **Accessibility** – Semantic HTML, ARIA labels, keyboard navigation

---

## **API Integration**

- Comprehensive WordPress REST API wrapper (`lib/wordpress-api.ts`)
- Embedded data fetching for authors, featured media, and categories
- Proper pagination handling
- Related posts functionality
- Category and author filtering

---

## **Environment Variables**

Create a `.env.local` file in the root directory and set:

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

---

## **Getting Started**

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   bun install
   ```

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and set your WordPress API URL.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

---

## **Customization**

- **Tailwind CSS:** Edit [`tailwind.config.ts`](tailwind.config.ts) and [`styles/globals.css`](styles/globals.css) for theme and utility customization.
- **UI Components:** All UI primitives are in [`components/ui/`](components/ui/).
- **API Logic:** WordPress API integration is in [`lib/`](lib/).
- **Types:** Extend or modify types in [`types/`](types/).

---

## **Recent Code Changes**

- **Enhanced Home Page (`app/page.tsx`):**
  - Hero section with gradient backgrounds and call-to-action buttons.
  - Latest posts grid using `BlogCard` and suspense loading skeletons.
  - Top categories grid with gradient backgrounds, icons, and post counts.
  - Responsive and accessible design using Tailwind CSS and semantic HTML.
  - Improved error handling for empty states.
- **API Integration:** Uses `WordPressAPI` from `lib/wordpress-api.ts` for fetching posts and categories.
- **UI Improvements:** Added gradients, hover effects, and dark mode support for category cards and buttons.
- **Loading States:** Added animated skeletons for both posts and categories.
- **SEO & Accessibility:** Semantic headings, ARIA labels, and keyboard navigation support.

---

## **License**

MIT

---

## **Copyright**

&copy; 2025 Dhruv Akbari. All rights reserved.