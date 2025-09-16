import { Github, Linkedin, Mail, Instagram, Facebook, CodepenIcon } from "lucide-react"

export const siteConfig = {
  name: "ModernBlog",
  description: "A beautifully crafted modern blog experience powered by WordPress and Next.js",
  tagline: "Powered by WordPress",
  author: {
    name: "Dhruv Akbari",
    email: "dhruvakbari303@gmail.com",
    social: {
      github: "https://github.com/mrakbari91",
      linkedin: "https://linkedin.com/in/dhruvakbari",
      codepen: "https://codepen.io/dhruvakbari",
      instagram: "https://instagram.com/1bari_91",
      facebook: "https://facebook.com/dhruvakbari91",
      email: "mailto:dhruvakbari303@gmail.com",
    },
  },
  hero: {
    badge: {
      text: "Welcome to the future of blogging",
      icon: "sparkles",
    },
    title: {
      main: "Discover Amazing",
      highlight: "Stories",
    },
    description:
      "Explore a world of knowledge with our beautifully crafted articles, powered by modern technology and stunning design.",
    buttons: {
      primary: {
        text: "Explore Articles",
        href: "/blog",
        icon: "book-open",
      },
      secondary: {
        text: "Browse Categories",
        href: "/categories",
        icon: "trending-up",
      },
    },
  },
  sections: {
    latestPosts: {
      title: {
        main: "Latest",
        highlight: "Articles",
      },
      description: "Stay updated with our freshest content and insights",
      postsPerPage: 6,
    },
    topCategories: {
      title: {
        main: "Explore",
        highlight: "Topics",
      },
      description: "Dive into your favorite subjects and discover new interests",
      maxCategories: 6,
    },
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
  ],
  footer: {
    description:
      "A beautifully crafted modern blog experience powered by WordPress and Next.js. Discover amazing content with stunning design and seamless performance.",
    sections: {
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/" },
          { name: "All Posts", href: "/blog" },
          { name: "Categories", href: "/categories" },
        ],
      },
      categories: {
        title: "Popular Categories",
        links: [
          { name: "Technology", href: "/category/technology" },
          { name: "Design", href: "/category/design" },
          { name: "Development", href: "/category/development" },
        ],
      },
    },
    copyright: "All rights reserved.",
    madeWith: "Made with ❤️ using Next.js & WordPress",
  },
  socialIcons: [
    { name: "GitHub", icon: Github, href: "github" },
    { name: "LinkedIn", icon: Linkedin, href: "linkedin" },
    { name: "CodePen", icon: CodepenIcon, href: "codepen" },
    { name: "Email", icon: Mail, href: "email" },
    { name: "Instagram", icon: Instagram, href: "instagram" },
    { name: "Facebook", icon: Facebook, href: "facebook" },
  ],
  blog: {
    postsPerPage: 9,
    relatedPostsCount: 3,
    readingTime: {
      wordsPerMinute: 200,
      show: true,
    },
  },
}

export type SiteConfig = typeof siteConfig
