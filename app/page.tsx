import { Suspense } from "react"
import Link from "next/link"
import { WordPressAPI } from "@/lib/wordpress-api"
import { BlogCard } from "@/components/blog-card"
import { BlogGridSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, BookOpen } from "lucide-react"
import { siteConfig } from "@/config/site"

async function LatestPosts() {
  const { posts } = await WordPressAPI.getPosts({ per_page: siteConfig.sections.latestPosts.postsPerPage })

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
  const topCategories = categories.slice(0, siteConfig.sections.topCategories.maxCategories)

  if (topCategories.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {topCategories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-200/20 dark:border-blue-800/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {category.name.charAt(0)}
            </div>
            <h3
              className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              dangerouslySetInnerHTML={{ __html: category.name }}
              title={category.name}
            />
            <p className="text-sm text-muted-foreground">{category.count} posts</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { hero, sections } = siteConfig

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/20 dark:border-blue-800/20 rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700 dark:text-blue-300">{hero.badge.text}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {hero.title.main}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {hero.title.highlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-6 text-lg rounded-full"
                asChild
              >
                <Link href={hero.buttons.primary.href}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  {hero.buttons.primary.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 px-8 py-6 text-lg rounded-full bg-transparent"
                asChild
              >
                <Link href={hero.buttons.secondary.href}>
                  <TrendingUp className="mr-2 h-5 w-5" />
                  {hero.buttons.secondary.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Latest Posts Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {sections.latestPosts.title.main}{" "}
              <span className="text-blue-600">{sections.latestPosts.title.highlight}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{sections.latestPosts.description}</p>
          </div>

          <Suspense fallback={<BlogGridSkeleton count={siteConfig.sections.latestPosts.postsPerPage} />}>
            <LatestPosts />
          </Suspense>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-full bg-transparent"
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
              {sections.topCategories.title.main}{" "}
              <span className="text-blue-600">{sections.topCategories.title.highlight}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{sections.topCategories.description}</p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Array.from({ length: siteConfig.sections.topCategories.maxCategories }).map((_, i) => (
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
