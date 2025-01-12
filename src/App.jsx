import Home from "./pages/Home"
import React, { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/Registration"
import Login from "./components/Login"
import { auth, db } from './utils/firebaseConfig'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { signInWithEmailLink, isSignInWithEmailLink, updateEmail } from "firebase/auth"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is logged in (e.g., using Firebase Auth)
    return auth.currentUser !== null
  })
const [isRegistering, setIsRegistering] = useState(true)
const [isLogingIn, setIsLogingIn] = useState(false)
const [selectedMode, setSelectedMode] = useState('main')

const [progressScore, setProgressScore] = useState(0);
const [progressLevel, setProgressLevel] = useState(1);

const [userName, setUserName] = useState('');
const [userLastName, setUserLastName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [tempUserEmail, setTempUserEmail] = useState('')
const [newUserEmail, setNewUserEmail] = useState('')
const [userPassword, setUserPassword] = useState('')

const [formData, setFormData] = useState({
  language: '',
  translationLanguage: '',
  level: '',
  goal: '',
  reason: '',
  firstName: '',
  lastName: '',
  email: '',
  password: ''


})
 
const levelThresholds = Array(100).fill(0).reduce((thresholds, _, index) => {
  if (index === 0) thresholds.push(0); // Level 1 starts at 0
  else if (index < 10) thresholds.push(thresholds[index - 1] + 5); // Levels 1–10: +5 points
  else if (index < 30) thresholds.push(thresholds[index - 1] + 10); // Levels 11–30: +10 points
  else if (index < 60) thresholds.push(thresholds[index - 1] + 20); // Levels 31–60: +20 points
  else thresholds.push(thresholds[index - 1] + 30); // Levels 61–100: +30 points
  return thresholds;
}, []);


const calculateLevel = (score) => {
  return levelThresholds.findIndex((threshold) => score < threshold) || 100;
};

useEffect(() => {
  const newLevel = calculateLevel(progressScore);
  setProgressLevel(newLevel);
  
  // Update Firebase
  if (auth.currentUser) {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(userDocRef, {
      progressScore: progressScore,
      progressLevel: newLevel
    });
  }
}, [progressScore]);







const [userData, setUserData] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      setIsAuthenticated(true)
      try {

        const userEmail = user.email;
        setUserEmail(userEmail);
        setTempUserEmail(userEmail);
        console.log("User email:", userEmail)

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setUserName(userDoc.data().firstName);
          setUserLastName(userDoc.data().lastName)
          setUserPassword(userDoc.data().password)
          setProgressScore(userDoc.data().progressScore)
          setProgressLevel(userDoc.data().progressLevel)
          
          console.log(userDoc)

          
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
        if (isRegistering) return <Registration formData={formData} setFormData={setFormData} setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />
        if (isLogingIn) return <Login setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />;
        return <LandingPage setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} />;
    }
    return <Home userName={userName} userLastName={userLastName} userEmail={userEmail} setUserEmail={setUserEmail} setUserLastName={setUserLastName} setUserName={setUserName} selectedMode={selectedMode} setSelectedMode={setSelectedMode} setProgressScore={setProgressScore} progressScore={progressScore} progressLevel={progressLevel} levelThresholds={levelThresholds} tempUserEmail={tempUserEmail} setTempUserEmail={setTempUserEmail} newUserEmail={newUserEmail} setNewUserEmail={setNewUserEmail} userPassword={userPassword} setUserPassword={setUserPassword}/>;
  };

  return <>{renderPage()}</>

}

export default App
