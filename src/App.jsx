import Home from "./pages/Home"
import React, { useState } from "react"
import LandingPage from "./pages/LandingPage"

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)

  

  return (
    <>
      {!isAuthenticated && <LandingPage></LandingPage>}
      {isAuthenticated && <Home></Home>}
    </>
  )
}

export default App
