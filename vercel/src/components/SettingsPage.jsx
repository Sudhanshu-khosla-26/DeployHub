"use client"

import { useState } from "react"
import { motion } from "framer-motion"

function SettingsPage({ darkMode, user }) {
  const [activeTab, setActiveTab] = useState("general")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mt-20"
    >
      <div className="mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Settings</h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account and deployment preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} h-fit`}>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'general'
                ? darkMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'notifications'
                ? darkMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('deployments')}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'deployments'
                ? darkMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
              </svg>
              Deployments
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'team'
                ? darkMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Team
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeTab === 'billing'
                ? darkMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Billing
            </button>
          </nav>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} md:col-span-3`}>
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">General Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Account Information</label>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center">
                      <img
                        src={user.picture}
                        alt="User"
                        className="h-16 w-16 rounded-full border-2 border-purple-500"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                      <button className={`ml-auto px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Theme</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-purple-500' : 'border-gray-300'} cursor-pointer`}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        </div>
                        <span className="ml-3">Dark</span>
                        {darkMode && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${!darkMode ? 'border-blue-500' : 'border-gray-700'} cursor-pointer`}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3">Light</span>
                        {!darkMode && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Language</label>
                  <select className={`w-full px-4 py-2 rounded-lg border ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'}`}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button className={`px-4 py-2 rounded-lg ${darkMode
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications about your deployments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <div className={`w-11 h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${darkMode ? 'peer-checked:bg-purple-600' : 'peer-checked:bg-blue-600'}`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                      disabled={!notificationsEnabled}
                    />
                    <div className={`w-11 h-6 ${!notificationsEnabled ? 'bg-gray-600 opacity-50' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${darkMode ? 'peer-checked:bg-purple-600' : 'peer-checked:bg-blue-600'}`}></div>
                  </label>

                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Browser Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      disabled={!notificationsEnabled}
                    />
                    <div className={`w-11 h-6 ${!notificationsEnabled ? 'bg-gray-600 opacity-50' : darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${darkMode ? 'peer-checked:bg-purple-600' : 'peer-checked:bg-blue-600'}`}></div>
                  </label>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Notification Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="deploy-start"
                        className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${darkMode ? 'text-purple-600' : 'text-blue-600'}`}
                        disabled={!notificationsEnabled}
                        defaultChecked
                      />
                      <label htmlFor="deploy-start" className="ml-2 text-sm">Deployment started</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="deploy-success"
                        className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${darkMode ? 'text-purple-600' : 'text-blue-600'}`}
                        disabled={!notificationsEnabled}
                        defaultChecked
                      />
                      <label htmlFor="deploy-success" className="ml-2 text-sm">Deployment successful</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="deploy-fail"
                        className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${darkMode ? 'text-purple-600' : 'text-blue-600'}`}
                        disabled={!notificationsEnabled}
                        defaultChecked
                      />
                      <label htmlFor="deploy-fail" className="ml-2 text-sm">Deployment failed</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="domain-expiry"
                        className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${darkMode ? 'text-purple-600' : 'text-blue-600'}`}
                        disabled={!notificationsEnabled}
                        defaultChecked
                      />
                      <label htmlFor="domain-expiry" className="ml-2 text-sm">Domain expiry warnings</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className={`px-4 py-2 rounded-lg ${darkMode
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )
          }

          {
            activeTab === "deployments" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Deployment Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto-Deploy</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Automatically deploy when changes are pushed to the main branch
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={autoDeployEnabled}
                        onChange={() => setAutoDeployEnabled(!autoDeployEnabled)}
                      />
                      <div
                        className={`w-11 h-6 ${darkMode ? "bg-gray-700" : "bg-gray-200"} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${darkMode ? "peer-checked:bg-purple-600" : "peer-checked:bg-blue-600"}`}
                      ></div>
                    </label>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Build Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm">Build Command</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                          placeholder="npm run build"
                          defaultValue="npm run build"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Output Directory</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                          placeholder="build"
                          defaultValue="build"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Node.js Version</label>
                        <select
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                            } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"}`}
                        >
                          <option value="18.x">18.x (Default)</option>
                          <option value="16.x">16.x</option>
                          <option value="14.x">14.x</option>
                          <option value="12.x">12.x</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`px-4 py-2 rounded-lg ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white transition-colors`}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          {
            activeTab === "team" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Team Settings</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Team Members</h3>
                      <button
                        className={`px-3 py-1.5 rounded-lg text-sm ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                          } text-white transition-colors flex items-center`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Invite Member
                      </button>
                    </div>

                    <div className={`rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} overflow-hidden`}>
                      <table className="min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}">
                        <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className={`${darkMode ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}`}
                        >
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full">
                                  <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt=""
                                    className="h-10 w-10 rounded-full"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">John Doe</div>
                                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    john.doe@example.com
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">Owner</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`}
                              >
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className={`text-${darkMode ? "purple-400 hover:text-purple-300" : "blue-600 hover:text-blue-900"}`}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full">
                                  <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt=""
                                    className="h-10 w-10 rounded-full"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">Jane Smith</div>
                                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    jane.smith@example.com
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">Admin</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`}
                              >
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className={`text-${darkMode ? "purple-400 hover:text-purple-300" : "blue-600 hover:text-blue-900"}`}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Pending Invitations</h3>
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} text-center`}>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No pending invitations</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {
            activeTab === "billing" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Billing Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Current Plan</h3>
                    <div
                      className={`p-4 rounded-lg border ${darkMode ? "border-purple-500 bg-purple-500/10" : "border-blue-500 bg-blue-50"}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className={`text-lg font-semibold ${darkMode ? "text-purple-400" : "text-blue-600"}`}>Pro Plan</h4>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>$20/month</p>
                        </div>
                        <button
                          className={`px-3 py-1.5 rounded-lg text-sm ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
                            } text-white transition-colors`}
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center">
                        <div className={`p-2 rounded ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Expires 12/2024</p>
                        </div>
                        <button
                          className={`ml-auto text-sm ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"}`}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Billing History</h3>
                    <div className={`rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} overflow-hidden`}>
                      <table className="min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}">
                        <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className={`${darkMode ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}`}
                        >
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Mar 1, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">$20.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`}
                              >
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className={`text-${darkMode ? "purple-400 hover:text-purple-300" : "blue-600 hover:text-blue-900"}`}
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Feb 1, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">$20.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`}
                              >
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className={`text-${darkMode ? "purple-400 hover:text-purple-300" : "blue-600 hover:text-blue-900"}`}
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsPage

