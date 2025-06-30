import Link from "next/link"
import { WordPressAPI } from "@/lib/wordpress-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Categories - WP Blog",
  description: "Browse all blog categories",
}

export default async function CategoriesPage() {
  const categories = await WordPressAPI.getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-muted-foreground">Browse posts by category</p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {category.description && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{category.description}</p>
                  )}
                  <p className="text-sm font-medium text-primary">{category.count} posts</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      )}
    </div>
  )
}
