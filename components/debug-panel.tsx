"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface DebugPanelProps {
  isEnabled?: boolean
}

export function DebugPanel({ isEnabled = false }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  // Only render if debug is enabled
  if (!isEnabled) return null

  // Function to clear localStorage
  const clearStorage = () => {
    try {
      localStorage.clear()
      setLogs((prev) => [...prev, "✅ localStorage cleared successfully"])
    } catch (error) {
      setLogs((prev) => [...prev, `❌ Error clearing localStorage: ${error}`])
    }
  }

  // Function to view localStorage
  const viewStorage = () => {
    try {
      const items: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          const value = localStorage.getItem(key)
          items.push(`${key}: ${value}`)
        }
      }

      if (items.length === 0) {
        setLogs((prev) => [...prev, "ℹ️ localStorage is empty"])
      } else {
        setLogs((prev) => [...prev, "📋 localStorage contents:", ...items])
      }
    } catch (error) {
      setLogs((prev) => [...prev, `❌ Error reading localStorage: ${error}`])
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Debug
        </button>
      ) : (
        <div className="bg-gray-800 text-white p-4 rounded-md w-96 max-h-96 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Debug Panel</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex space-x-2 mb-4">
            <button onClick={clearStorage} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              Clear Storage
            </button>
            <button onClick={viewStorage} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              View Storage
            </button>
            <button onClick={() => setLogs([])} className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
              Clear Logs
            </button>
          </div>

          <div className="bg-gray-900 p-2 rounded text-sm font-mono">
            {logs.length === 0 ? (
              <p className="text-gray-400">No logs yet</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
