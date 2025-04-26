import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { FeaturedArticle } from "@/components/blog/featured-article"
import { BlogCard } from "@/components/blog/blog-card"
import { CategoryFilter } from "@/components/blog/category-filter"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { blogPosts, categories } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog & News | GolfGearPro",
  description: "Latest golf tips, equipment reviews, and news from GolfGearPro",
}

export default function BlogPage() {
  // Get featured article (first post)
  const featuredPost = blogPosts[0]

  // Get remaining posts
  const remainingPosts = blogPosts.slice(1)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-green-800 dark:text-green-400">
              Golf Insights & News
            </h1>
            <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
              Expert tips, equipment reviews, and the latest from the world of golf
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Featured Article */}
        <FeaturedArticle
          title={featuredPost.title}
          excerpt={featuredPost.excerpt}
          image={featuredPost.image}
          category={featuredPost.category}
          date={featuredPost.date}
          author={featuredPost.author}
          slug={featuredPost.slug}
        />

        {/* Category Filter */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Browse by Category</h2>
          <CategoryFilter categories={categories} />
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Articles</h2>
            <Link
              href="/blog/archive"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center text-sm font-medium"
            >
              View all articles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingPosts.slice(0, 9).map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                category={post.category}
                date={post.date}
                author={post.author}
                slug={post.slug}
                readTime={post.readTime}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-green-600 dark:text-green-400"
                disabled
              >
                Previous
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                1
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-green-600 dark:text-green-400">
                2
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-green-600 dark:text-green-400">
                3
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-green-600 dark:text-green-400">
                Next
              </button>
            </nav>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 mb-8">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
