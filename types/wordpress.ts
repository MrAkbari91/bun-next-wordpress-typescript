export interface WordPressPost {
  id: number
  date: string
  slug: string
  status: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: WordPressAuthor[]
    "wp:featuredmedia"?: WordPressMedia[]
    "wp:term"?: WordPressCategory[][]
  }
}

export interface WordPressCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
}

export interface WordPressAuthor {
  id: number
  name: string
  slug: string
  description: string
  avatar_urls: {
    [key: string]: string
  }
}

export interface WordPressMedia {
  id: number
  date: string
  slug: string
  type: string
  title: {
    rendered: string
  }
  media_details: {
    width: number
    height: number
    sizes: {
      [key: string]: {
        file: string
        width: number
        height: number
        source_url: string
      }
    }
  }
  source_url: string
  alt_text: string
}

export interface PaginationInfo {
  total: number
  totalPages: number
  currentPage: number
  hasNext: boolean
  hasPrev: boolean
}
