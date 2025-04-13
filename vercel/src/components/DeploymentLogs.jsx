"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

function DeploymentLogs({ logs, loading, darkMode }) {
  const logsEndRef = useRef(null)

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  console.log((logs));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Deployment Logs</h2>
        {loading && (
          <div className="flex items-center">
            <div className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></div>
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Live</span>
          </div>
        )}
      </div>

      <div
        className={`p-4 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"} h-64 overflow-y-auto font-mono text-sm`}
      >
        {logs.length === 0 && loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-gray-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Initializing deployment...</p>
            </div>
          </div>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-1"
            >
              <span
                className={`${log.type === "error" ? "text-red-500" : log.type === "warning" ? "text-yellow-500" : darkMode ? "text-green-400" : "text-green-600"}`}
              >
                {log.timestamp && `[${log.timestamp}] `}
              </span>
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{log.message}</span>
            </motion.div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>

      {loading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full animate-pulse-width`}
              style={{ width: "45%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Building...</span>
            <span>45%</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default DeploymentLogs

