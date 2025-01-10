import Home from "./pages/Home"
import React, { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/Registration"
import Login from "./components/Login"
import { auth, db } from './utils/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is logged in (e.g., using Firebase Auth)
    return auth.currentUser !== null
  })
const [isRegistering, setIsRegistering] = useState(true)
const [isLogingIn, setIsLogingIn] = useState(false)


const [userName, setUserName] = useState('');

// App.jsx
const [userData, setUserData] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      setIsAuthenticated(true)
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setUserName(userDoc.data().firstName);
          console.log(userData)
        } else {
          console.log(`No user document found for UID: ${user.uid}`)
        }
      } catch (error) {
        console.error("Error fetching user data");
      }
    } else {
      setIsAuthenticated(false)
      setUserData(null);
      setUserName('');
    }
  });

  return () => unsubscribe();
}, []);

  

  const renderPage = () => {
    if (!isAuthenticated) {
        if (isRegistering) return <Registration setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />
        if (isLogingIn) return <Login setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />;
        return <LandingPage setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />;
    }
    return <Home userName={userName} setUserName={setUserName}/>;
  };

  return <>{renderPage()}</>

}

export default App
