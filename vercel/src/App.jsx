
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import ProjectsPage from "./components/ProjectsPage"
import AnalyticsPage from "./components/AnalyticsPage"
import SettingsPage from "./components/SettingsPage"
import { io } from "socket.io-client";
import ProjectDetailPage from "./components/ProjectDetailPage"
import LoginPage from "./components/LoginPage"
import BackgroundEffects from "./components/BackgroundEffects"
import "./App.css"

const socket = io("http://localhost:9001");

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [deployments, setDeployments] = useState([
    {
      id: "dep_1",
      status: "success",
      projectName: "E-commerce App",
      branch: "main",
      deployedAt: "2 hours ago",
      duration: "1m 12s",
      url: "https://ecommerce-app.vercel.app",
    },
    {
      id: "dep_2",
      status: "building",
      projectName: "Portfolio Site",
      branch: "develop",
      deployedAt: "15 minutes ago",
      duration: "45s",
      url: "https://portfolio-preview.vercel.app",
    },
    {
      id: "dep_3",
      status: "failed",
      projectName: "Blog Platform",
      branch: "feature/comments",
      deployedAt: "1 day ago",
      duration: "2m 05s",
      url: null,
    },
  ])

  const [logs, setLogs] = useState([])
  // const [socket, setSocket] = useState(null)
  // const [activeDeployment, setActiveDeployment] = useState(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: "proj_1",
      name: "E-commerce App",
      deployments: 12,
      lastDeployed: "2 hours ago",
      status: "online",
      githubUrl: "https://github.com/username/ecommerce-app",
    },
    {
      id: "proj_2",
      name: "Portfolio Site",
      deployments: 5,
      lastDeployed: "15 minutes ago",
      status: "building",
      githubUrl: "https://github.com/username/portfolio-site",
    },
    {
      id: "proj_3",
      name: "Blog Platform",
      deployments: 8,
      lastDeployed: "1 day ago",
      status: "error",
      githubUrl: "https://github.com/username/blog-platform",
    },
    {
      id: "proj_4",
      name: "Admin Dashboard",
      deployments: 3,
      lastDeployed: "3 days ago",
      status: "online",
      githubUrl: "https://github.com/username/admin-dashboard",
    },
    {
      id: "proj_5",
      name: "Mobile App Landing",
      deployments: 7,
      lastDeployed: "1 week ago",
      status: "online",
      githubUrl: "https://github.com/username/mobile-app-landing",
    },
  ])
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [deployPreviewURL, setDeployPreviewURL] = useState(undefined);
  // const logContainerRef = useRef(null);

  const isValidURL = useMemo(() => {
    if (!URL || URL.trim() === "") return [false, null];
    const regex = new RegExp(
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/);
    return [regex.test(URL), "Enter valid Github Repository URL"];
  }, [URL]);

  console.log(projectId, "projectid");

  const handleClickDeploy = useCallback(async (repoURL, slugname) => {
    setLoading(true);


    const { data } = await axios.post("http://localhost:9000/project", {
      gitUrl: repoURL,
      slug: slugname,
    });
    console.log(data);

    if (data && data.data) {
      const { projectSlug, url } = data.data;
      setProjectId(projectSlug);
      setDeployPreviewURL(url);

      console.log(`Subscribing to logs:${projectSlug}`);
      socket.emit("subscribe", `logs:${projectSlug}`);
    }


    console.log(projectId, deployPreviewURL);

  }, [projectId, URL]);

  const handleSocketIncomingMessage = useCallback((message) => {
    console.log(`[Incoming Socket Message]:`, typeof (message), message);
    const { log } = JSON.parse(message);
    setLogs((prev) => [...prev, log]);
    // logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // console.log(logs, "logs");

  useEffect(() => {
    socket.on("message", handleSocketIncomingMessage);

    return () => {
      socket.off("message", handleSocketIncomingMessage);
    };

  }, [handleSocketIncomingMessage]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark", !darkMode)
  }

  const handleLogin = (userData) => {
    console.log("User logged in:", userData)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const deleteProject = (projectId) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId))
    // Also remove related deployments
    setDeployments((prevDeployments) =>
      prevDeployments.filter(
        (deployment) => !projects.find((p) => p.id === projectId && p.name === deployment.projectName),
      ),
    )
  }

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <BackgroundEffects darkMode={darkMode} />

        {isAuthenticated && (
          <Navbar darkMode={darkMode} setIsAuthenticated={setIsAuthenticated} setUser={setUser} toggleDarkMode={toggleDarkMode} user={user} onLogout={handleLogout} />
        )}

        <main className={`container mx-auto px-4 py-8 relative z-10 ${!isAuthenticated ? "pt-0" : ""}`}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage darkMode={darkMode} onLogin={handleLogin} />
              }
            />

            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <>
                    <Dashboard
                      deployments={deployments}
                      darkMode={darkMode}
                      // setActiveDeployment={setActiveDeployment}
                      projects={projects}
                      logs={logs}
                      setLogs={setLogs}
                      isDeploying={isDeploying}
                      setIsDeploying={setIsDeploying}
                      URL={URL}
                      setURL={setURL}
                      isValidURL={isValidURL}
                      handleClickDeploy={handleClickDeploy}
                      loading={loading}
                      projectId={projectId}
                      setLoading={setLoading}
                      setProjectId={setProjectId}
                      deployPreviewURL={deployPreviewURL}
                    // logContainerRef={logContainerRef}
                    />

                    {/* <div>Hello world</div> */}
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/projects"
              element={
                isAuthenticated ? (
                  <ProjectsPage darkMode={darkMode} projects={projects} onDeleteProject={deleteProject} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/projects/:id"
              element={
                isAuthenticated ? (
                  <ProjectDetailPage
                    darkMode={darkMode}
                    deployments={deployments}
                    projects={projects}
                    onDeleteProject={deleteProject}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/analytics"
              element={isAuthenticated ? <AnalyticsPage darkMode={darkMode} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/settings"
              element={isAuthenticated ? <SettingsPage user={user} darkMode={darkMode} /> : <Navigate to="/login" replace />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

