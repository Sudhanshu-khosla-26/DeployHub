import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='550047556006-m0m460hibg9mpdb3rnqjpsu60abfkpot.apps.googleusercontent.com'>
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>

)
