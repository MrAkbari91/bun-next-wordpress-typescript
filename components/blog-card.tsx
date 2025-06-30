import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { WordPressPost } from "@/types/wordpress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { htmlToText, truncateText } from "@/lib/html-to-text"

interface BlogCardProps {
  post: WordPressPost
}

export function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]
  const categories = post._embedded?.["wp:term"]?.[0] || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const excerpt = truncateText(htmlToText(post.excerpt.rendered), 120)
  const title = htmlToText(post.title.rendered)

  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="relative">
        {featuredImage ? (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={featuredImage.source_url || "/placeholder.svg"}
              alt={featuredImage.alt_text || title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <div className="text-6xl font-bold text-purple-500/30">{title.charAt(0)}</div>
          </div>
        )}

        {/* Floating Categories */}
        {categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Badge
                  variant="secondary"
                  className="bg-white/90 dark:bg-black/90 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 border-0 backdrop-blur-sm"
                  title={category.name}
                  dangerouslySetInnerHTML={{ __html: category.name }}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            <Link href={`/blog/${post.slug}`} className="hover:text-purple-600 dark:hover:text-purple-400">
              {title}
            </Link>
          </h3>

          <p className="text-muted-foreground line-clamp-3 leading-relaxed">{excerpt}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center space-x-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/link"
          >
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
