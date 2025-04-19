"use client"

import { useToasts } from "@/hooks/use-toast"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export function ToastContainer() {
  const toasts = useToasts()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

function Toast({ id, title, description, variant, visible }: any) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => {
      setIsVisible(visible)
    }, 10)

    return () => clearTimeout(timer)
  }, [visible])

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
        bg-white dark:bg-gray-800 rounded-lg shadow-lg border 
        ${variant === "destructive" ? "border-red-500" : "border-gray-200 dark:border-gray-700"}
        overflow-hidden
      `}
    >
      <div className="p-4 flex gap-3">
        <div className="flex-1">
          <h3
            className={`font-medium ${variant === "destructive" ? "text-red-500" : "text-gray-900 dark:text-gray-100"}`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          onClick={() => {
            setIsVisible(false)
          }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {variant === "destructive" && <div className="h-1 bg-red-500 w-full" />}
      {variant === "default" && <div className="h-1 bg-green-500 w-full" />}
    </div>
  )
}
