import Home from "./pages/Home"
import React, { useState } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/Registration"
import Login from "./components/Login"

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [isRegistering, setIsRegistering] = useState(true)
const [isLogingIn, setIsLogingIn] = useState(false)

  

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
