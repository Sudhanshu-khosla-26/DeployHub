"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function ProjectDetailPage({ darkMode, deployments, projects, onDeleteProject }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectDeployments, setProjectDeployments] = useState([])

  useEffect(() => {
    // Find project from projects array
    const foundProject = projects.find((p) => p.id === id)

    if (foundProject) {
      setProject({
        ...foundProject,
        description: "A modern application built with React.js",
        repository: foundProject.githubUrl || "https://github.com/username/repo",
        domain: `${foundProject.name.toLowerCase().replace(/\s+/g, "-")}.vercel.app`,
        framework: "react",
        nodeVersion: "16.x",
        createdAt: "3 months ago",
      })

      // Filter deployments for this project
      const filteredDeployments = deployments.filter((d) => d.projectName === foundProject.name)
      setProjectDeployments(filteredDeployments)
    }

    setIsLoading(false)
  }, [id, projects, deployments])

  const handleDeleteProject = () => {
    onDeleteProject(id)
    setShowDeleteModal(false)
    navigate("/projects")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div
            className={`h-12 w-12 rounded-full border-4 ${darkMode ? "border-purple-600" : "border-blue-600"} border-t-transparent animate-spin`}
          ></div>
          <p className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          The project you're looking for doesn't exist or you don't have access to it.
        </p>
      </div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <span
              className={`ml-3 inline-flex h-3 w-3 rounded-full ${
                project.status === "online"
                  ? "bg-green-500"
                  : project.status === "building"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              } ${project.status === "building" ? "animate-pulse" : ""}`}
            ></span>
          </div>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{project.description}</p>
        </div>

        <div className="flex gap-2">
          <a
            href={`https://${project.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            } transition-colors flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
            Visit Site
          </a>
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            } transition-colors flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0010 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={`px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`mb-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 font-medium relative ${
              activeTab === "overview"
                ? darkMode
                  ? "text-white"
                  : "text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <motion.div
                layoutId="activeProjectTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? "bg-purple-500" : "bg-blue-600"}`}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("deployments")}
            className={`py-2 px-1 font-medium relative ${
              activeTab === "deployments"
                ? darkMode
                  ? "text-white"
                  : "text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Deployments
            {activeTab === "deployments" && (
              <motion.div
                layoutId="activeProjectTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? "bg-purple-500" : "bg-blue-600"}`}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-1 font-medium relative ${
              activeTab === "settings"
                ? darkMode
                  ? "text-white"
                  : "text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
            {activeTab === "settings" && (
              <motion.div
                layoutId="activeProjectTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? "bg-purple-500" : "bg-blue-600"}`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div
        className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} mb-8`}
      >
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Status</span>
                      <span className="flex items-center">
                        <span
                          className={`inline-flex h-2 w-2 rounded-full ${
                            project.status === "online"
                              ? "bg-green-500"
                              : project.status === "building"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          } ${project.status === "building" ? "animate-pulse" : ""} mr-2`}
                        ></span>
                        {project.status === "online" ? "Online" : project.status === "building" ? "Building" : "Error"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Framework</span>
                      <span>{project.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Node.js Version</span>
                      <span>{project.nodeVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Created</span>
                      <span>{project.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Last Deployed</span>
                      <span>{project.lastDeployed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Domain</span>
                      <a
                        href={`https://${project.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"}`}
                      >
                        {project.domain}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} h-full`}>
                  {projectDeployments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 opacity-50 mb-2"
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
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No recent activity</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projectDeployments.slice(0, 4).map((deployment, index) => (
                        <div
                          key={index}
                          className={`flex items-start ${index < projectDeployments.slice(0, 4).length - 1 ? "pb-4 border-b border-gray-700" : ""}`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              deployment.status === "success"
                                ? darkMode
                                  ? "bg-green-500/20"
                                  : "bg-green-100"
                                : deployment.status === "failed"
                                  ? darkMode
                                    ? "bg-red-500/20"
                                    : "bg-red-100"
                                  : darkMode
                                    ? "bg-yellow-500/20"
                                    : "bg-yellow-100"
                            } mr-3`}
                          >
                            {deployment.status === "success" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : deployment.status === "failed" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${darkMode ? "text-red-400" : "text-red-600"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {deployment.status === "success"
                                ? "Deployment successful"
                                : deployment.status === "failed"
                                  ? "Deployment failed"
                                  : "Deployment in progress"}
                            </p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Branch: {deployment.branch} • {deployment.deployedAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Project Analytics</h3>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <h4 className="text-sm font-medium mb-2">Visitors (Last 7 days)</h4>
                    <p className="text-2xl font-bold">3,254</p>
                    <div className={`mt-2 ${darkMode ? "text-green-400" : "text-green-600"} text-sm flex items-center`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>12% increase</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <h4 className="text-sm font-medium mb-2">Avg. Load Time</h4>
                    <p className="text-2xl font-bold">0.8s</p>
                    <div className={`mt-2 ${darkMode ? "text-green-400" : "text-green-600"} text-sm flex items-center`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>5% faster</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <h4 className="text-sm font-medium mb-2">Error Rate</h4>
                    <p className="text-2xl font-bold">0.02%</p>
                    <div className={`mt-2 ${darkMode ? "text-green-400" : "text-green-600"} text-sm flex items-center`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>1% decrease</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "deployments" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Deployment History</h3>
              <button
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors flex items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Deploy Now
              </button>
            </div>

            {projectDeployments.length === 0 ? (
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
                <p className="mt-2">Deploy your project to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`${darkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"} border-b`}
                    >
                      <th className="text-left pb-3 font-medium">Status</th>
                      <th className="text-left pb-3 font-medium">Branch</th>
                      <th className="text-left pb-3 font-medium">Deployed</th>
                      <th className="text-left pb-3 font-medium">Duration</th>
                      <th className="text-left pb-3 font-medium">URL</th>
                      <th className="text-left pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectDeployments.map((deployment, index) => (
                      <tr
                        key={index}
                        className={`${darkMode ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-200 hover:bg-gray-50"} border-b transition-colors`}
                      >
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              deployment.status === "success"
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
                            >
                              {deployment.url.replace("https://", "")}
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button
                              className={`p-1.5 rounded-md ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} transition-colors`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              className={`p-1.5 rounded-md ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} transition-colors`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Project Name</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue={project.name}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Framework</label>
                      <select
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue={project.framework}
                      >
                        <option value="react">React</option>
                        <option value="next">Next.js</option>
                        <option value="vue">Vue.js</option>
                        <option value="angular">Angular</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Root Directory</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue="/"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Build & Development Settings</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Build Command</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue="npm run build"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Output Directory</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue="build"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Install Command</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue="npm install"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Node.js Version</label>
                      <select
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        defaultValue={project.nodeVersion}
                      >
                        <option value="18.x">18.x (Default)</option>
                        <option value="16.x">16.x</option>
                        <option value="14.x">14.x</option>
                        <option value="12.x">12.x</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Key</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2 rounded-lg border ${
                            darkMode
                              ? "bg-gray-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                          placeholder="API_KEY"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">Value</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2 rounded-lg border ${
                            darkMode
                              ? "bg-gray-800 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                          placeholder="your-api-key-here"
                        />
                      </div>
                    </div>
                    <button
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
                      Add Environment Variable
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg max-w-md w-full`}>
            <h3 className="text-xl font-bold mb-4">Delete Project</h3>
            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>? This action cannot
              be undone and will permanently delete all deployments and settings.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ProjectDetailPage

