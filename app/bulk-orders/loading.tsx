export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-4 w-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="h-14 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-14 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="mt-4 h-4 w-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
      </div>
    </div>
  )
}
