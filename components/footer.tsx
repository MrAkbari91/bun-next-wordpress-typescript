import Link from "next/link"
import { Sparkles, Heart, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ModernBlog
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A beautifully crafted modern blog experience powered by WordPress and Next.js. Discover amazing content
              with stunning design and seamless performance.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/category/technology"
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/category/development"
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  Development
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">&copy; 2025 Dhruv Akbari. All rights reserved.</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using Next.js & WordPress</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
