import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react"
import { WordPressAPI } from "@/lib/wordpress-api"
import { Breadcrumb } from "@/components/breadcrumb"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { htmlToText } from "@/lib/html-to-text"
// Add the RelatedProducts import at the top
import { RelatedProducts } from "@/components/related-products"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await WordPressAPI.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]
  const title = htmlToText(post.title.rendered)
  const description = htmlToText(post.excerpt.rendered).substring(0, 160)

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: post.date,
      images: featuredImage ? [featuredImage.source_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: featuredImage ? [featuredImage.source_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await WordPressAPI.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]
  const author = post._embedded?.author?.[0]
  const categories = post._embedded?.["wp:term"]?.[0] || []

  // Get related posts
  const relatedPosts = await WordPressAPI.getRelatedPosts(post.id, post.categories, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const title = htmlToText(post.title.rendered)
  const breadcrumbItems = [{ label: "Blog", href: "/blog" }, { label: title }]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <Button variant="ghost" asChild className="mb-8 hover:bg-purple-50 dark:hover:bg-purple-950">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-12 text-center">
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-200/20 dark:border-purple-800/20"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h1>

            <div className="flex items-center justify-center space-x-8 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg">8 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-lg">Article</span>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </header>

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featuredImage.source_url || "/placeholder.svg"}
                alt={featuredImage.alt_text || title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16 prose-headings:font-bold prose-headings:text-foreground prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-950/20 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground prose-code:bg-muted prose-code:text-purple-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-table:border prose-th:bg-muted prose-th:font-semibold prose-td:border prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="border-t border-border/40 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related <span className="text-purple-600">Articles</span>
                </h2>
                <p className="text-lg text-muted-foreground">Continue exploring with these handpicked articles</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}

          {/* Related Products */}
          <RelatedProducts />
        </article>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description: htmlToText(post.excerpt.rendered),
              image: featuredImage?.source_url,
              datePublished: post.date,
              author: author
                ? {
                    "@type": "Person",
                    name: author.name,
                  }
                : undefined,
              publisher: {
                "@type": "Organization",
                name: "ModernBlog",
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
