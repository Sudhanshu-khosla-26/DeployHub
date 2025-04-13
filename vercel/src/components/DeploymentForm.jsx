"use client"

import { useState } from "react"
import { motion } from "framer-motion"

function DeploymentForm({ darkMode }) {
  const [repoUrl, setRepoUrl] = useState("")
  const [slugname, setslugname] = useState("")
  const [framework, setFramework] = useState("react")
  const [branch, setBranch] = useState("main")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Deploying from:", repoUrl);
    // try {
    //   // In a real app:
    //   const response = await fetch('http://localhost:9000/project', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ gitUrl: repoUrl, slug: slugname }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   // Mock response
    //   const mockDeploymentId = `deploy_${Date.now()}`
    //   setActiveDeployment(mockDeploymentId)

    //   // Request notification permission
    //   if (Notification.permission !== "granted") {
    //     await Notification.requestPermission()
    //   }
    // } catch (error) {
    //   console.error("Deployment failed:", error)
    //   setIsDeploying(false)
    // }
    // startDeployment(repoUrl.trim(), slugname);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <h2 className="text-xl font-semibold mb-4">Deploy a New Project</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="projectName" className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Project Name (optional)
          </label>
          <input
            type="text"
            id="projectName"
            className={`w-full px-4 py-3 rounded-lg border ${darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"} transition-all duration-200`}
            placeholder="Enter your project name"
            value={slugname}
            onChange={(e) => setslugname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="repoUrl" className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Git Repository URL
          </label>
          <input
            type="text"
            id="repoUrl"
            className={`w-full px-4 py-3 rounded-lg border ${darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"} transition-all duration-200`}
            placeholder="https://github.com/username/repo.git"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Framework</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setFramework("react")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${framework === "react"
                ? darkMode
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-blue-600 border-blue-500 text-white"
                : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              React.js
            </button>
            <button
              type="button"
              onClick={() => setFramework("next")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${framework === "next"
                ? darkMode
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-blue-600 border-blue-500 text-white"
                : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              Next.js
            </button>
            <button
              type="button"
              onClick={() => setFramework("vue")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${framework === "vue"
                ? darkMode
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-blue-600 border-blue-500 text-white"
                : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              Vue.js
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`text-sm ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"} mb-4 flex items-center`}
        >
          {showAdvanced ? "Hide" : "Show"} advanced options
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-4"
          >
            <div>
              <label htmlFor="branch" className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Branch
              </label>
              <input
                type="text"
                id="branch"
                className={`w-full px-4 py-2 rounded-lg border ${darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            <div>
              <label className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Environment Variables
              </label>
              <div
                className={`p-4 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-700/50" : "border-gray-300 bg-gray-50"}`}
              >
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="KEY"
                    className={`px-3 py-2 rounded border ${darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                  />
                  <input
                    type="text"
                    placeholder="VALUE"
                    className={`px-3 py-2 rounded border ${darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                  />
                </div>
                <button
                  type="button"
                  className={`text-sm ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"} flex items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add more
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            // disabled={!isValidURL || loading}

            className={`px-6 py-3 rounded-lg ${darkMode
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              } text-white transition-all duration-300 hover:shadow-lg ${isDeploying ? "opacity-50 cursor-not-allowed" : "hover:shadow-purple-500/20 transform hover:-translate-y-1"}`}
          >
            {isDeploying ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Deploying...
              </div>
            ) : (
              "Deploy Project"
            )}
          </button>

          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {framework === "react" ? "React.js" : framework === "next" ? "Next.js" : "Vue.js"} projects are supported
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default DeploymentForm

