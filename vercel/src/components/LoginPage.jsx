"use client"
import { useGoogleLogin } from '@react-oauth/google';
import GitHubLogin from 'react-github-login';

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"


function LoginPage({ darkMode, onLogin }) {
  const clientid = "Ov23li9k6ZhkQwGpVim6";
  const clientsecret = "888ca287adf2a88a08ac2d0187cc71d62162b869";

  const [isLoading, setIsLoading] = useState(false)
  const handleGithubLogin = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const userData = {
        uid: "github_123456",
        displayName: "GitHub User",
        email: "github_user@example.com",
        photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
        provider: "github",
        accessToken: "mock_access_token_github",
      }

      console.log("GitHub login user data:", userData)
      onLogin(userData)
      setIsLoading(false)
    }, 1500)
  }

  // const handleGoogleLogin = () => {
  //   setIsLoading(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     const userData = {
  //       uid: "google_123456",
  //       displayName: "Google User",
  //       email: "google_user@example.com",
  //       photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
  //       provider: "google",
  //       accessToken: "mock_access_token_google",
  //     }

  //     console.log("Google login user data:", userData)
  //     onLogin(userData)
  //     setIsLoading(false)
  //   }, 1500)
  // }

  const onSuccess = response => {
    console.log(response);
    setIsLoading(true);

    //https://github.com/login/oauth/access_token?client_id=Ov23li9k6ZhkQwGpVim6&client_secret=888ca287adf2a88a08ac2d0187cc71d62162b869&code=78f2f0c4c63d7c4c70be

    // const params = "?client_id=" + clientid + "&client_secret=" + clientsecret + "&code=" + "3b817b0600dfb0bb24f0";
    // fetch("https://github.com/login/oauth/access_token" + params, {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json"
    //   }
    // })
    //   .then((response) => {
    //     console.log("access_token", response);
    //   })



    // .then(userRes => {
    //   console.log('GitHub User:', userRes.data);
    //   axios.get('https://api.github.com/user/repos?visibility=private', {
    //     headers: {
    //       Authorization: `token ${response.access_token}`
    //     }
    //   })
    //     .then(repoRes => {
    //       console.log('GitHub Private Repos:', repoRes.data);
    //       setIsLoading(false);
    //       onLogin({ ...userRes.data, repos: repoRes.data });
    //     })
    //     .catch(repoErr => {
    //       console.error('Error fetching GitHub private repos:', repoErr);
    //       setIsLoading(false);
    //     });
    // })
    //     .catch (userErr => {
    //   console.error('Error fetching GitHub user details:', userErr);
    //   setIsLoading(false);
    // });
  };
  const onFailure = response => console.error(response);

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {


      console.log("user", user);
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            setIsLoading(false)
            onLogin(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  console.log(profile, "profile");
  console.log(user);

  return (
    <>

      {/* <GoogleLogin

        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}

      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-xl ${darkMode ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div
                className={`h-16 w-16 rounded-xl ${darkMode ? "bg-gradient-to-br from-purple-600 to-blue-500" : "bg-gradient-to-br from-blue-600 to-indigo-500"} flex items-center justify-center shadow-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
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
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              DeployHub
            </h1>
            <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Sign in to continue to your dashboard
            </p>
          </div>

          <div className="space-y-4">
            <button
              // onClick={handleGithubLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                } transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
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
              ) : (
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              <GitHubLogin clientId="Ov23li9k6ZhkQwGpVim6"
                onSuccess={onSuccess}
                redirectUri="http://localhost:5173"
                onFailure={onFailure} />
            </button>


            <button
              onClick={login}
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                } transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
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
              ) : (
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              )}
              Continue with Google
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              By signing in, you agree to our
              <a
                href="#"
                className={`ml-1 ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"}`}
              >
                Terms of Service
              </a>
              <span className="mx-1">and</span>
              <a
                href="#"
                className={`${darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"}`}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>

  )
}

export default LoginPage

