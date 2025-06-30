import { Suspense } from "react"
import Link from "next/link"
import { WordPressAPI } from "@/lib/wordpress-api"
import { BlogCard } from "@/components/blog-card"
import { BlogGridSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {topCategories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <h3 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{category.count} posts</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">WP Blog</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing content powered by WordPress and built with modern Next.js technology
        </p>
        <Button size="lg" asChild>
          <Link href="/blog">
            Explore Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Latest Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>

        <Suspense fallback={<BlogGridSkeleton count={6} />}>
          <LatestPosts />
        </Suspense>
      </section>

      {/* Top Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Top Categories</h2>
          <Button variant="outline" asChild>
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border bg-card animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }
        >
          <TopCategories />
        </Suspense>
      </section>
    </div>
  )
}
