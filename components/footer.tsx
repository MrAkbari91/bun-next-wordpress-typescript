import Link from "next/link"
import { Sparkles } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">{siteConfig.footer.description}</p>
            {/* <div className="flex items-center space-x-4">
              {siteConfig.socialIcons.map((social) => {
                const IconComponent = social.icon
                const href = siteConfig.author.social[social.href as keyof typeof siteConfig.author.social]
                return (
                  <a
                    key={social.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                    title={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div> */}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{siteConfig.footer.sections.quickLinks.title}</h4>
            <ul className="space-y-3 text-sm">
              {siteConfig.footer.sections.quickLinks.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{siteConfig.footer.sections.categories.title}</h4>
            <ul className="space-y-3 text-sm">
              {siteConfig.footer.sections.categories.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 {siteConfig.author.name}. {siteConfig.footer.copyright}
            </p>
            <div className="text-sm text-muted-foreground">{siteConfig.footer.madeWith}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
