"use client"

import { useState, useEffect } from "react"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
  visible: boolean
}

// Global state for toasts
let toasts: Toast[] = []
let listeners: (() => void)[] = []

// Function to notify all listeners
const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

export function toast({ title, description, variant = "default", duration = 3000 }: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)

  // Add toast to global state
  toasts = [...toasts, { id, title, description, variant, duration, visible: true }]
  notifyListeners()

  // Auto-dismiss after duration
  setTimeout(() => {
    toasts = toasts.map((t) => (t.id === id ? { ...t, visible: false } : t))
    notifyListeners()

    // Remove from array after animation
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      notifyListeners()
    }, 300)
  }, duration)
}

export function useToasts() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts)

  useEffect(() => {
    // Add listener
    const updateToasts = () => {
      setCurrentToasts([...toasts])
    }

    listeners.push(updateToasts)

    // Initial update
    updateToasts()

    // Cleanup
    return () => {
      listeners = listeners.filter((listener) => listener !== updateToasts)
    }
  }, [])

  return currentToasts
}
