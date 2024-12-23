import Home from "./pages/Home"
import React, { useState } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [isGettingStarted, setIsGettingStarted] = useState(true)

  

  return (
    <>
      {isAuthenticated && <LandingPage></LandingPage>}
      {isAuthenticated && <Home></Home>}
      {isGettingStarted && <Authentication></Authentication>}
    </>
  )
}

export default App
