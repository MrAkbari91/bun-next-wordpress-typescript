import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import type { WordPressPost } from "@/types/wordpress"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  post: WordPressPost
}

export function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]
  const author = post._embedded?.author?.[0]
  const categories = post._embedded?.["wp:term"]?.[0] || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {featuredImage && (
        <div className="relative aspect-video">
          <Image
            src={featuredImage.source_url || "/placeholder.svg"}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardContent className="p-6">
        <div className="space-y-3">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 3).map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold line-clamp-2 min-h-14">
            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title.rendered}
            </Link>
          </h3>

          <p className="text-muted-foreground line-clamp-3">{stripHtml(post.excerpt.rendered)}</p>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t bg-muted/50">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {author && (
              <Link href={`/author/${author.slug}`} className="flex items-center space-x-2 hover:text-primary">
                <User className="h-4 w-4" />
                <span>{author.name}</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
