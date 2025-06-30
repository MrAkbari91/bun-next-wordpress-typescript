import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { WordPressAPI } from "@/lib/wordpress-api"
import { Breadcrumb } from "@/components/breadcrumb"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
      type: "article",
      publishedTime: post.date,
      images: featuredImage ? [featuredImage.source_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
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

  const breadcrumbItems = [{ label: "Blog", href: "/blog" }, { label: post.title.rendered }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title.rendered}</h1>

          <div className="flex items-center space-x-6 text-muted-foreground">
            {author && (
              <Link href={`/author/${author.slug}`} className="flex items-center space-x-2 hover:text-primary">
                <User className="h-4 w-4" />
                <span>{author.name}</span>
              </Link>
            )}

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage.source_url || "/placeholder.svg"}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Author Info */}
        {author && (
          <div className="border-t pt-8 mb-12">
            <div className="flex items-start space-x-4">
              {author.avatar_urls?.["96"] && (
                <Image
                  src={author.avatar_urls["96"] || "/placeholder.svg"}
                  alt={author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/author/${author.slug}`} className="hover:text-primary">
                    {author.name}
                  </Link>
                </h3>
                {author.description && <p className="text-muted-foreground">{author.description}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
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
              name: "WP Blog",
            },
          }),
        }}
      />
    </div>
  )
}
