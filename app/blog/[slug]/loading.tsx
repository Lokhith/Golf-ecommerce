import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back to blog link skeleton */}
      <div className="container px-4 md:px-6 pt-8">
        <Skeleton className="h-6 w-36 mb-6" />
      </div>

      {/* Article header skeleton */}
      <article className="container px-4 md:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-28" />
          </div>

          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-3/4 mb-6" />

          <div className="flex items-center space-x-4 mb-8">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Featured image skeleton */}
          <Skeleton className="w-full h-[400px] rounded-xl mb-8" />

          {/* Article content skeleton */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />

            <Skeleton className="h-8 w-64 mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />

            <Skeleton className="h-8 w-64 mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />

            <Skeleton className="h-8 w-64 mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>

          {/* Share buttons skeleton */}
          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 my-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-36" />
              <div className="flex space-x-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-9 w-9 rounded-full" />
                  ))}
              </div>
            </div>
          </div>

          {/* Author bio skeleton */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles skeleton */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container px-4 md:px-6">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md h-full flex flex-col"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 flex-1 flex flex-col space-y-3">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full flex-1" />
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
