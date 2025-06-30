import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WP Blog - Modern WordPress Frontend",
  description: "A modern blog powered by WordPress and Next.js",
  keywords: ["blog", "wordpress", "nextjs", "react"],
  authors: [{ name: "WP Blog Team" }],
  openGraph: {
    title: "WP Blog - Modern WordPress Frontend",
    description: "A modern blog powered by WordPress and Next.js",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WP Blog - Modern WordPress Frontend",
    description: "A modern blog powered by WordPress and Next.js",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
