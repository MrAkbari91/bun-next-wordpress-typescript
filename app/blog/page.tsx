"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { WordPressAPI } from "@/lib/wordpress-api"
import type { WordPressPost, WordPressCategory, PaginationInfo } from "@/types/wordpress"
import { BlogCard } from "@/components/blog-card"
import { Pagination } from "@/components/pagination"
import { BlogGridSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

function BlogContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<WordPressPost[]>([])
  const [categories, setCategories] = useState<WordPressCategory[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const currentPage = Number.parseInt(searchParams.get("page") || "1")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const [postsData, categoriesData] = await Promise.all([
          WordPressAPI.getPosts({
            page: currentPage,
            per_page: siteConfig.blog.postsPerPage,
            categories: selectedCategory || undefined,
          }),
          WordPressAPI.getCategories(),
        ])

        setPosts(postsData.posts)
        setPagination(postsData.pagination)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching blog data:", error)
        setPosts([])
        setPagination(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, selectedCategory])

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">Discover our latest articles and insights</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => handleCategoryFilter(null)}
          >
            All Posts
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category.id)}
            >
              <span dangerouslySetInnerHTML={{ __html: category.name }} /> ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <BlogGridSkeleton count={9} />
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {pagination && (
            <Pagination
              pagination={pagination}
              basePath={selectedCategory ? `/blog?category=${selectedCategory}` : "/blog"}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      )}
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogGridSkeleton count={9} />}>
      <BlogContent />
    </Suspense>
  )
}
