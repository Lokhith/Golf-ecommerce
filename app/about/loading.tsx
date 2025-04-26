export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-200 dark:bg-gray-700"></div>

      {/* Introduction Section Skeleton */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Skeleton */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-16 mx-auto"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 mx-auto"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder Skeleton */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <div className="h-[500px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="md:w-3/5">
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section Skeleton */}
      <section className="py-16 md:py-24 px-4 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto max-w-6xl">
          <div className="h-10 w-64 bg-gray-300 dark:bg-gray-600 rounded mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mb-16 mx-auto"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-300 dark:bg-gray-600 p-8 rounded-lg">
                <div className="w-12 h-12 bg-gray-400 dark:bg-gray-500 rounded-full mb-6 mx-auto"></div>
                <div className="h-6 bg-gray-400 dark:bg-gray-500 rounded w-24 mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-4/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Skeleton */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="h-10 w-96 bg-gray-200 dark:bg-gray-700 rounded mb-6 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl mb-8 mx-auto"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto sm:mx-2"></div>
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto sm:mx-2"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
