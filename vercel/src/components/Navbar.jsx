import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { googleLogout } from '@react-oauth/google';

function Navbar({ darkMode, setUser, setIsAuthenticated, toggleDarkMode, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  const logOut = () => {
    setUser(null);
    googleLogout();
    setIsAuthenticated(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? darkMode
          ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
        : "bg-transparent"
        } py-4 px-6`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-4 group">
            <div
              className={`h-10 w-10 rounded-lg ${darkMode ? "bg-gradient-to-br from-purple-600 to-blue-500" : "bg-gradient-to-br from-blue-600 to-indigo-500"} flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-110`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                DeployHub
              </span>
              <span className="text-xs ml-1 px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 font-medium">
                BETA
              </span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/")
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/projects")
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
            >
              Projects
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/analytics")
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
            >
              Analytics
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${isActive("/settings")
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
            >
              Settings
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-800 text-yellow-300 hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } mr-4 transition-all duration-300 hover:rotate-12`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center space-x-2">
            <button
              className={`p-2 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} relative`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            <div className="relative">
              <button className="flex items-center space-x-1" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <img
                  src={user?.picture || "https://randomuser.me/api/portraits/men/32.jpg"}
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-purple-500 hover:scale-110 transition-transform duration-200"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"} transition-all duration-300 ease-in-out z-50`}
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || "user@example.com"}</p>
                  </div>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Settings
                  </a>
                  <button
                    onClick={logOut}
                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`md:hidden mt-4 py-2 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg absolute left-4 right-4 z-10 animate-fade-in`}
        >
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-purple-500 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/projects"
            className="block px-4 py-2 hover:bg-purple-500 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/analytics"
            className="block px-4 py-2 hover:bg-purple-500 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Analytics
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-purple-500 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
          <div className="border-t my-2 border-gray-700"></div>
          <div className="px-4 py-2">
            <p className="font-medium">{user?.displayName || "User"}</p>
            <p className="text-sm text-gray-400">{user?.email || "user@example.com"}</p>
          </div>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 hover:bg-purple-500 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

