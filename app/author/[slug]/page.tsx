import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { WordPressAPI } from "@/lib/wordpress-api"
import { BlogCard } from "@/components/blog-card"
import { Breadcrumb } from "@/components/breadcrumb"
import { Pagination } from "@/components/pagination"
import { BlogGridSkeleton } from "@/components/loading-skeleton"

interface AuthorPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await WordPressAPI.getAuthorBySlug(params.slug)

  if (!author) {
    return {
      title: "Author Not Found",
    }
  }

  return {
    title: `${author.name} - WP Blog`,
    description: author.description || `Posts by ${author.name}`,
  }
}

async function AuthorPosts({ slug, page }: { slug: string; page: number }) {
  const author = await WordPressAPI.getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const { posts, pagination } = await WordPressAPI.getPosts({
    page,
    per_page: 9,
    author: author.id,
  })

  return (
    <>
      <div className="mb-12">
        <div className="flex items-start space-x-6 mb-6">
          {author.avatar_urls?.["96"] && (
            <Image
              src={author.avatar_urls["96"] || "/placeholder.svg"}
              alt={author.name}
              width={96}
              height={96}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
            {author.description && <p className="text-muted-foreground text-lg">{author.description}</p>}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Posts by {author.name}</h2>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {pagination && <Pagination pagination={pagination} basePath={`/author/${slug}`} />}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found by this author.</p>
        </div>
      )}
    </>
  )
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const currentPage = Number.parseInt(searchParams.page || "1")

  const breadcrumbItems = [{ label: "Authors", href: "/authors" }, { label: params.slug }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <Suspense fallback={<BlogGridSkeleton count={9} />}>
        <AuthorPosts slug={params.slug} page={currentPage} />
      </Suspense>
    </div>
  )
}
