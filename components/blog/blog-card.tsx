import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

interface BlogCardProps {
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
  readTime: number
}

export function BlogCard({ title, excerpt, image, category, date, author, slug, readTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              {category}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
            {excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <Image
                src={author.avatar || "/placeholder.svg"}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{author.name}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
