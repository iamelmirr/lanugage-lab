import Home from "./pages/Home"
import React, { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/Registration"
import Login from "./components/Login"
import { auth, db } from './utils/firebaseConfig'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is logged in (e.g., using Firebase Auth)
    return auth.currentUser !== null
  })
const [isRegistering, setIsRegistering] = useState(true)
const [isLogingIn, setIsLogingIn] = useState(false)

useEffect(() => {
  // Listen for auth state changes
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setIsAuthenticated(user !== null);
    setIsRegistering(false);
      setIsLogingIn(false);
  });

  return () => unsubscribe();
}, [])
  

  return (
    <>
      
      {!isAuthenticated && !isLogingIn && isRegistering && (
      <Registration 
        setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}
      />
    )}
    {!isAuthenticated && isLogingIn && !isRegistering && (
      <Login 
        setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}
      />
    )}
    {!isAuthenticated && !isLogingIn && !isRegistering && (
      <LandingPage 
      setIsAuthenticated={setIsAuthenticated} 
      setIsRegistering={setIsRegistering}
      setIsLogingIn={setIsLogingIn}
      />
    )}
    {isAuthenticated && (
      <Home />
    )}
      
    </>
  )
}

export default App
