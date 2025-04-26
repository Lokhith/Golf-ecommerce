import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section Skeleton */}
      <section className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-12 w-[300px] md:w-[400px] rounded-lg" />
            <Skeleton className="h-6 w-[250px] md:w-[500px] rounded-lg" />
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Featured Article Skeleton */}
        <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
              <Skeleton className="h-6 w-24 mb-4 rounded-lg" />
              <Skeleton className="h-8 w-full max-w-[500px] mb-4 rounded-lg" />
              <Skeleton className="h-4 w-full max-w-[400px] mb-2 rounded-lg" />
              <Skeleton className="h-4 w-full max-w-[450px] mb-2 rounded-lg" />
              <Skeleton className="h-4 w-full max-w-[350px] mb-6 rounded-lg" />
              <div className="flex items-center mt-4">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-24 mb-1 rounded-lg" />
                  <Skeleton className="h-3 w-16 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[300px]">
              <Skeleton className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="mt-12 mb-8">
          <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
          <div className="flex flex-wrap gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
              ))}
          </div>
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-6 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5">
                    <Skeleton className="h-4 w-24 mb-2 rounded-lg" />
                    <Skeleton className="h-6 w-full mb-2 rounded-lg" />
                    <Skeleton className="h-4 w-full mb-4 rounded-lg" />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-20 rounded-lg" />
                      </div>
                      <Skeleton className="h-4 w-16 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-md" />
                ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup Skeleton */}
        <div className="mt-16 mb-8">
          <Skeleton className="w-full h-[200px] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
