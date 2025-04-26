import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

interface FeaturedArticleProps {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: {
    name: string
    avatar: string
    role?: string
  }
  slug: string
}

export function FeaturedArticle({ title, excerpt, image, category, date, author, slug }: FeaturedArticleProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mb-4">
            {category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{excerpt}</p>
          <div className="flex items-center mt-4">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">{author.name}</div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <time dateTime={date}>{date}</time>
              </div>
            </div>
          </div>
          <Link
            href={`/blog/${slug}`}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-offset-gray-900"
          >
            Read Article
          </Link>
        </div>
        <div className="lg:col-span-2 relative min-h-[300px]">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        </div>
      </div>
    </div>
  )
}
