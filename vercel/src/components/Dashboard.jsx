"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
// import DeploymentForm from "./DeploymentForm"
import DeploymentLogs from "./DeploymentLogs"


function Dashboard({
  darkMode,
  handleClickDeploy,
  setLoading,
  loading,
  setURL,
  logs,
  isDeploying,
}) {

  const [activeTab, setActiveTab] = useState("deployments")
  const [repoUrl, setRepoUrl] = useState("")
  const [slugname, setslugname] = useState("")
  const [framework, setFramework] = useState("react")
  const [branch, setBranch] = useState("main")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }


  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const submit = async (e) => {
    e.preventDefault();
    setURL(repoUrl);
    handleClickDeploy(repoUrl, slugname);

  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Dashboard
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome back!
          </p>
        </div>
        <Link
          to="/projects/new"
          className={`px-4 py-2 rounded-lg ${darkMode
            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            } text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1`}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Project
          </span>
        </Link>
      </div>

      {/* Analytics Cards */}
      {/* <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <motion.div
          variants={fadeIn}
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Deployments</h3>
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">{deployments.length}</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>12% increase</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Success Rate</h3>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">98%</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>2% increase</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg. Deploy Time</h3>
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">1m 24s</p>
          <div className={`mt-4 ${darkMode ? "text-red-400" : "text-red-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>5% increase</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Projects</h3>
            <div className={`p-2 rounded-lg ${darkMode ? "bg-indigo-500/20" : "bg-indigo-100"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold">{projects.length}</p>
          <div className={`mt-4 ${darkMode ? "text-green-400" : "text-green-600"} flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            <span>3 new this month</span>
          </div>
        </motion.div>
      </motion.div> */}

      {/* GitHub URL / Deployment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Deploy a New Project</h2>

          <form onSubmit={submit}>
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
                required
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
        {/* <DeploymentForm HandleClickDeploy={HandleClickDeploy} isValidURL={isValidURL} loading={loading} setProjectId={setProjectId} setURL={setURL} setLogs={setLogs} setIsDeploying={setIsDeploying} setActiveDeployment={setActiveDeployment} startDeployment={startDeployment} isDeploying={isDeploying} darkMode={darkMode} /> */}
      </motion.div>

      {/* Logs Section */}
      {(logs.length > 0 || loading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <DeploymentLogs setLoading={setLoading} logs={logs} loading={loading} darkMode={darkMode} />
        </motion.div>
      )}

      {/* Recent Deployments */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Deployments</h2>

          {deployments.length === 0 ? (
            <div className={`text-center py-10 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-lg">No deployments yet</p>
              <p className="mt-2">Deploy your first project to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`${darkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"} border-b`}
                  >
                    <th className="text-left pb-3 font-medium">Status</th>
                    <th className="text-left pb-3 font-medium">Project</th>
                    <th className="text-left pb-3 font-medium">Branch</th>
                    <th className="text-left pb-3 font-medium">Deployed</th>
                    <th className="text-left pb-3 font-medium">Duration</th>
                    <th className="text-left pb-3 font-medium">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {deployments.slice(0, 5).map((deployment, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`${darkMode ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-200 hover:bg-gray-50"} border-b cursor-pointer transition-colors`}
                      onClick={() => setActiveDeployment(deployment.id)}
                    >
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${deployment.status === "success"
                            ? "bg-green-100 text-green-800"
                            : deployment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {deployment.status === "success" ? (
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : deployment.status === "failed" ? (
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
                          {deployment.status === "success"
                            ? "Ready"
                            : deployment.status === "failed"
                              ? "Failed"
                              : "Building"}
                        </span>
                      </td>
                      <td className="py-4">{deployment.projectName}</td>
                      <td className="py-4">{deployment.branch}</td>
                      <td className="py-4">{deployment.deployedAt}</td>
                      <td className="py-4">{deployment.duration}</td>
                      <td className="py-4">
                        {deployment.url ? (
                          <a
                            href={deployment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-${darkMode ? "blue-400" : "blue-600"} hover:underline`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {deployment.url.replace("https://", "")}
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {deployments.length > 5 && (
                <div className="mt-4 text-center">
                  <Link
                    to="/projects"
                    className={`text-sm ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"}`}
                  >
                    View all deployments
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}

export default Dashboard

