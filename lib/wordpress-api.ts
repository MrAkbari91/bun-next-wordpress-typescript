import type { WordPressPost, WordPressCategory, WordPressAuthor, PaginationInfo } from "@/types/wordpress"

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined")
}

export class WordPressAPI {
  private static async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const total = response.headers.get("X-WP-Total")
      const totalPages = response.headers.get("X-WP-TotalPages")

      return {
        data,
        pagination:
          total && totalPages
            ? {
                total: Number.parseInt(total),
                totalPages: Number.parseInt(totalPages),
              }
            : null,
      }
    } catch (error) {
      console.error("WordPress API Error:", error)
      return { data: [], pagination: null }
    }
  }

  static async getPosts(
    params: {
      page?: number
      per_page?: number
      categories?: number
      author?: number
      search?: string
    } = {},
  ): Promise<{ posts: WordPressPost[]; pagination: PaginationInfo | null }> {
    const searchParams = new URLSearchParams()

    searchParams.append("_embed", "true")
    if (params.page) searchParams.append("page", params.page.toString())
    if (params.per_page) searchParams.append("per_page", params.per_page.toString())
    if (params.categories) searchParams.append("categories", params.categories.toString())
    if (params.author) searchParams.append("author", params.author.toString())
    if (params.search) searchParams.append("search", params.search)

    const { data, pagination } = await this.fetchAPI(`/posts?${searchParams.toString()}`)

    const paginationInfo = pagination
      ? {
          total: pagination.total,
          totalPages: pagination.totalPages,
          currentPage: params.page || 1,
          hasNext: (params.page || 1) < pagination.totalPages,
          hasPrev: (params.page || 1) > 1,
        }
      : null

    return { posts: data, pagination: paginationInfo }
  }

  static async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const { data } = await this.fetchAPI(`/posts?slug=${slug}&_embed=true`)
    return data.length > 0 ? data[0] : null
  }

  static async getCategories(): Promise<WordPressCategory[]> {
    const { data } = await this.fetchAPI("/categories?per_page=100")
    return data
  }

  static async getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
    const { data } = await this.fetchAPI(`/categories?slug=${slug}`)
    return data.length > 0 ? data[0] : null
  }

  static async getAuthors(): Promise<WordPressAuthor[]> {
    const { data } = await this.fetchAPI("/users?per_page=100")
    return data
  }

  static async getAuthorBySlug(slug: string): Promise<WordPressAuthor | null> {
    const { data } = await this.fetchAPI(`/users?slug=${slug}`)
    return data.length > 0 ? data[0] : null
  }

  static async getRelatedPosts(postId: number, categories: number[], limit = 3): Promise<WordPressPost[]> {
    if (categories.length === 0) return []

    const { data } = await this.fetchAPI(
      `/posts?categories=${categories.join(",")}&exclude=${postId}&per_page=${limit}&_embed=true`,
    )
    return data
  }
}
