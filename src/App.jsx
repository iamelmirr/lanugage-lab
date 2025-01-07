import Home from "./pages/Home"
import React, { useState } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/Registration"

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [isRegistering, setIsRegistering] = useState(true)

  

  return (
    <>
      
      {isAuthenticated ? (
                <Home />
            ) : isRegistering ? (
                <Registration />
            ) : (
                <LandingPage />
            )}
      
    </>
  )
}

export default App
