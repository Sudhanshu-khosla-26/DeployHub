"use client"

import { useState } from "react"
import { motion } from "framer-motion"

function AnalyticsPage({ darkMode }) {
  const [timeRange, setTimeRange] = useState("7d")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Analytics
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Monitor your deployment performance and usage
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange("24h")}
            className={`px-3 py-2 rounded-lg transition-colors ${
              timeRange === "24h"
                ? darkMode
                  ? "bg-purple-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            24h
          </button>
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-3 py-2 rounded-lg transition-colors ${
              timeRange === "7d"
                ? darkMode
                  ? "bg-purple-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            7d
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-3 py-2 rounded-lg transition-colors ${
              timeRange === "30d"
                ? darkMode
                  ? "bg-purple-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            30d
          </button>
          <button
            onClick={() => setTimeRange("90d")}
            className={`px-3 py-2 rounded-lg transition-colors ${
              timeRange === "90d"
                ? darkMode
                  ? "bg-purple-600 text-white"
                  : "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            90d
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Visitors</h3>
            <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">128,543</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>18% increase</span>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg. Load Time</h3>
            <div className={`p-2 rounded-lg ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">0.8s</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>12% faster</span>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Bandwidth</h3>
            <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">1.2 TB</p>
          <div className={`mt-4 ${darkMode ? "text-yellow-400" : "text-yellow-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>8% increase</span>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Error Rate</h3>
            <div className={`p-2 rounded-lg ${darkMode ? "bg-red-500/20" : "bg-red-100"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? "text-red-400" : "text-red-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">0.05%</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>2% decrease</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8 lg:grid-cols-3">
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} lg:col-span-2`}
        >
          <h2 className="text-xl font-semibold mb-4">Traffic Overview</h2>
          <div className="h-80 flex items-center justify-center">
            <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-lg">Traffic chart visualization</p>
              <p className="mt-2">
                Showing data for the last{" "}
                {timeRange === "24h"
                  ? "24 hours"
                  : timeRange === "7d"
                    ? "7 days"
                    : timeRange === "30d"
                      ? "30 days"
                      : "90 days"}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}
                >
                  <span className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}>G</span>
                </div>
                <span className="ml-3">Google</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-indigo-500/20" : "bg-indigo-100"}`}
                >
                  <span className={`text-sm ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>D</span>
                </div>
                <span className="ml-3">Direct</span>
              </div>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}
                >
                  <span className={`text-sm ${darkMode ? "text-purple-400" : "text-purple-600"}`}>T</span>
                </div>
                <span className="ml-3">Twitter</span>
              </div>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-pink-500/20" : "bg-pink-100"}`}
                >
                  <span className={`text-sm ${darkMode ? "text-pink-400" : "text-pink-600"}`}>F</span>
                </div>
                <span className="ml-3">Facebook</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Browser Usage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Chrome</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Safari</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Firefox</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Edge</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "5%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Device Types</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Mobile</span>
                <span>55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "55%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Desktop</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Tablet</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`${darkMode ? "bg-purple-600" : "bg-blue-600"} h-2.5 rounded-full`}
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalyticsPage

