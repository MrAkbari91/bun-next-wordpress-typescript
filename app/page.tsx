import { Suspense } from "react"
import Link from "next/link"
import { WordPressAPI } from "@/lib/wordpress-api"
import { BlogCard } from "@/components/blog-card"
import { BlogGridSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, BookOpen } from "lucide-react"

async function LatestPosts() {
  const { posts } = await WordPressAPI.getPosts({ per_page: 6 })

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

async function TopCategories() {
  const categories = await WordPressAPI.getCategories()
  const topCategories = categories.slice(0, 6)

  if (topCategories.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {topCategories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-200/20 dark:border-purple-800/20 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {category.name.charAt(0)}
            </div>
            <h3 className="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
              dangerouslySetInnerHTML={{ __html: category.name }}
              title={category.name} />
            <p className="text-sm text-muted-foreground">{category.count} posts</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/20 dark:border-purple-800/20 rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-purple-700 dark:text-purple-300">Welcome to the future of blogging</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore a world of knowledge with our beautifully crafted articles, powered by modern technology and
              stunning design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-6 text-lg rounded-full"
                asChild
              >
                <Link href="/blog">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950 px-8 py-6 text-lg rounded-full bg-transparent"
                asChild
              >
                <Link href="/categories">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Browse Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Latest Posts Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="text-purple-600">Articles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our freshest content and insights
            </p>
          </div>

          <Suspense fallback={<BlogGridSkeleton count={6} />}>
            <LatestPosts />
          </Suspense>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950 rounded-full bg-transparent"
              asChild
            >
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Top Categories Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-purple-600">Topics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into your favorite subjects and discover new interests
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-muted animate-pulse">
                    <div className="w-12 h-12 mx-auto bg-muted-foreground/20 rounded-xl mb-4" />
                    <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-2/3 mx-auto" />
                  </div>
                ))}
              </div>
            }
          >
            <TopCategories />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
