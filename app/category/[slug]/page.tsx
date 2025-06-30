import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { WordPressAPI } from "@/lib/wordpress-api"
import { BlogCard } from "@/components/blog-card"
import { Breadcrumb } from "@/components/breadcrumb"
import { Pagination } from "@/components/pagination"
import { BlogGridSkeleton } from "@/components/loading-skeleton"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await WordPressAPI.getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} - WP Blog`,
    description: category.description || `Browse all posts in ${category.name} category`,
  }
}

async function CategoryPosts({ slug, page }: { slug: string; page: number }) {
  const category = await WordPressAPI.getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const { posts, pagination } = await WordPressAPI.getPosts({
    page,
    per_page: 9,
    categories: category.id,
  })

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (<p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: category.description }}/> )}
        <p className="text-sm text-muted-foreground mt-2">{category.count} posts in this category</p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {pagination && <Pagination pagination={pagination} basePath={`/category/${slug}`} />}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found in this category.</p>
        </div>
      )}
    </>
  )
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const currentPage = Number.parseInt(searchParams.page || "1")

  const breadcrumbItems = [{ label: "Categories", href: "/categories" }, { label: params.slug }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <Suspense fallback={<BlogGridSkeleton count={9} />}>
        <CategoryPosts slug={params.slug} page={currentPage} />
      </Suspense>
    </div>
  )
}
