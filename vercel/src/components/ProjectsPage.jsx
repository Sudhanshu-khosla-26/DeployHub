"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function ProjectsPage({ darkMode, projects, onDeleteProject }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || project.status === filter
    return matchesSearch && matchesFilter
  })

  const handleDeleteClick = (e, project) => {
    e.stopPropagation()
    e.preventDefault()
    setProjectToDelete(project)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id)
      setShowDeleteModal(false)
      setProjectToDelete(null)
    }
  }

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

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Projects
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Manage and monitor all your projects</p>
        </div>
        <Link
          to="/projects/new"
          className={`px-4 py-2 rounded-lg ${
            darkMode
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

      <div
        className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} mb-8`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("online")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === "online"
                  ? darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Online
            </button>
            <button
              onClick={() => setFilter("building")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === "building"
                  ? darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Building
            </button>
            <button
              onClick={() => setFilter("error")}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === "error"
                  ? darkMode
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Error
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">No projects found</p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {searchTerm ? "Try a different search term" : "Create your first project to get started"}
            </p>
          </div>
        ) : (
          <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-lg border ${darkMode ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all duration-300 hover:shadow-md relative`}
              >
                <Link to={`/projects/${project.id}`} className="block">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>
                        {project.deployments} deployments
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${
                        project.status === "online"
                          ? "bg-green-500"
                          : project.status === "building"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      } ${project.status === "building" ? "animate-pulse" : ""}`}
                    ></span>
                  </div>

                  <div className="mt-4">
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} truncate`}>
                      {project.githubUrl}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Last deployed: </span>
                      <span>{project.lastDeployed}</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        className={`p-1.5 rounded-md ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          window.open(project.githubUrl, "_blank")
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </button>
                      <button
                        className={`p-1.5 rounded-md ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} transition-colors text-red-500`}
                        onClick={(e) => handleDeleteClick(e, project)}
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg max-w-md w-full`}>
            <h3 className="text-xl font-bold mb-4">Delete Project</h3>
            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Are you sure you want to delete <span className="font-semibold">{projectToDelete?.name}</span>? This
              action cannot be undone and will permanently delete all deployments and settings.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setProjectToDelete(null)
                }}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
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

export default ProjectsPage

