"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

// Sample sales data
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "This Year",
      data: [3500, 4200, 5100, 4800, 5300, 6100, 5900, 6500, 7200, 7800, 8300, 9100],
      borderColor: "#16a34a",
      backgroundColor: "rgba(22, 163, 74, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: "Last Year",
      data: [3000, 3700, 4300, 4100, 4600, 5200, 5000, 5500, 6100, 6600, 7000, 7700],
      borderColor: "#94a3b8",
      backgroundColor: "rgba(148, 163, 184, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
}

export function AdminSalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: salesData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                align: "end",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || ""
                    if (label) {
                      label += ": "
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y)
                    }
                    return label
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value.toLocaleString(),
                },
              },
            },
          },
        })
      }
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}
