import Home from "./pages/Home"
import NotificationModal from "./components/overlay-components/NotificationModal"
import React, { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import Authentication from "./pages/Authentication"
import Registration from "./components/auth/Registration"
import Login from "./components/auth/Login"
import { auth, db } from './utils/firebaseConfig'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { signInWithEmailLink, isSignInWithEmailLink, updateEmail } from "firebase/auth"
import LoadingScreen from "./components/overlay-components/LoadingScreen"




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    
    return auth.currentUser !== null
  })
const [isLoading, setIsLoading] = useState(true)  
const [isRegistering, setIsRegistering] = useState(false)
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
const [targetLanguage, setTargetLanguage] = useState('')
const [translationLanguage, setTranslationLanguage] = useState('')
const [targetLanguageLevel, setTargetLanguageLevel] = useState('')
const [learningGoal, setLearningGoal] = useState('')
const [learningReason, setLearningReason] = useState('')
const [isMuted, setIsMuted] = useState(false)
const [savedChats, setSavedChats] = useState([])
const [showOptionsModal, setShowOptionsModal] = useState(false);
const [voiceSpeed, setVoiceSpeed] = useState(1)
const [showSuggestionBar, setShowSuggestionBar] = useState(true)
const [progressPercentage, setProgressPercentage] = useState(0)
const [streakCount, setStreakCount] = useState(0);
const [longestStreak, setLongestStreak] = useState(0);
const [lastChatDate, setLastChatDate] = useState(null);
const [todaysChatTime, setTodaysChatTime] = useState(0);
const [isNotificationModalVisible, setIsNotificationModalVisible] = useState()



// Body class for styles

useEffect(() => {
  document.body.classList.toggle('authenticated', isAuthenticated);
  document.body.classList.toggle('registering', isRegistering);
  document.body.classList.toggle('logging-in', isLogingIn);
}, [isAuthenticated, isRegistering, isLogingIn]);



// Registration form data

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


// Progress level tresholds
 
const levelThresholds = Array(100).fill(0).reduce((thresholds, _, index) => {
  if (index === 0) thresholds.push(0); // Level 1 starts at 0
  else if (index < 10) thresholds.push(thresholds[index - 1] + 10); // Levels 1–10: +5 points
  else if (index < 30) thresholds.push(thresholds[index - 1] + 20); // Levels 11–30: +10 points
  else if (index < 60) thresholds.push(thresholds[index - 1] + 30); // Levels 31–60: +20 points
  else thresholds.push(thresholds[index - 1] + 50); // Levels 61–100: +30 points
  return thresholds
}, []);



// Calculate progress level

const calculateLevel = (score) => {
  return levelThresholds.findIndex((threshold) => score < threshold) || 100;
};


// Update progress level every time it changes

useEffect(() => {
  const newLevel = calculateLevel(progressScore);
  setProgressLevel(newLevel);
  
  const currentThreshold = levelThresholds[progressLevel - 1]
  const nextThreshold = levelThresholds[progressLevel]
  const newProgressPercentage = ((progressScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  setProgressPercentage(newProgressPercentage)

  // Update Firebase
  if (auth.currentUser) {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(userDocRef, {
      progressScore: progressScore,
      progressLevel: newLevel,
      progressPercentage: newProgressPercentage
    });
  }

  

}, [progressScore]);





// Check if user is logged in and authenticate him if he is, if he is not set isAuthenticated to false
// Set user's data fetched from Firebase


const [userData, setUserData] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      setIsAuthenticated(true)
      setIsLoading(false)
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
          setTargetLanguage(userDoc.data().language)
          setTranslationLanguage(userDoc.data().translationLanguage)
          setTargetLanguageLevel(userDoc.data().level)
          setLearningGoal(userDoc.data().goal)
          setLearningReason(userDoc.data().reason)
          setSavedChats(userDoc.data().savedChats)
          setProgressPercentage(userDoc.data().progressPercentage)
          setStreakCount(userDoc.data().streakCount || 0)
          setLongestStreak(userDoc.data().longestStreak || 0)
          setLastChatDate(userDoc.data().lastChatDate || null)

          
        } 
      } catch (error) {
        console.error("Error fetching user data");
      }
    } else {
      setIsAuthenticated(false)
      setUserData(null);
      setUserName('');
      setIsLoading(false)
    }
  });

  return () => unsubscribe();
}, []);

  

  const renderPage = () => {
    
    if (!isAuthenticated) {
        if (isRegistering) return <Registration isNotificationModalVisible={isNotificationModalVisible}
        setIsNotificationModalVisible={setIsNotificationModalVisible} progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} savedChats={savedChats} setSavedChats={setSavedChats} setLearningGoal={setLearningGoal} setLearningReason={setLearningReason} setTargetLanguageLevel={setTargetLanguageLevel} targetLanguageLevel={targetLanguageLevel} setTargetLanguage={setTargetLanguage} setTranslationLanguage={setTranslationLanguage} formData={formData} setFormData={setFormData} setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} userName={userName} userLastName={userLastName} userEmail={userEmail} setUserEmail={setUserEmail} setUserLastName={setUserLastName} setUserName={setUserName} selectedMode={selectedMode} setSelectedMode={setSelectedMode} setProgressScore={setProgressScore} progressScore={progressScore} progressLevel={progressLevel} levelThresholds={levelThresholds} tempUserEmail={tempUserEmail} setTempUserEmail={setTempUserEmail} newUserEmail={newUserEmail} setNewUserEmail={setNewUserEmail} userPassword={userPassword} setUserPassword={setUserPassword} isAuthenticated={isAuthenticated} setProgressLevel={setProgressLevel} setUserData={setUserData}/>
        if (isLogingIn) return <Login isNotificationModalVisible={isNotificationModalVisible}
        setIsNotificationModalVisible={setIsNotificationModalVisible} setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} setIsLoading={setIsLoading} />;
        return <LandingPage setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn} setIsLoading={setIsLoading} />;
    }
    return <Home isNotificationModalVisible={isNotificationModalVisible}
    setIsNotificationModalVisible={setIsNotificationModalVisible} userName={userName} userLastName={userLastName} userEmail={userEmail} setUserEmail={setUserEmail} setUserLastName={setUserLastName} setUserName={setUserName} selectedMode={selectedMode} setSelectedMode={setSelectedMode} setProgressScore={setProgressScore} progressScore={progressScore} progressLevel={progressLevel} levelThresholds={levelThresholds} tempUserEmail={tempUserEmail} setTempUserEmail={setTempUserEmail} newUserEmail={newUserEmail} setNewUserEmail={setNewUserEmail} userPassword={userPassword} setUserPassword={setUserPassword} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setFormData={setFormData} setTargetLanguage={setTargetLanguage} setTranslationLanguage={setTranslationLanguage} targetLanguage={targetLanguage} translationLanguage={translationLanguage} setTargetLanguageLevel={setTargetLanguageLevel} targetLanguageLevel={targetLanguageLevel} learningGoal={learningGoal} learningReason={learningReason} isMuted={isMuted} setIsMuted={setIsMuted} savedChats={savedChats} setSavedChats={setSavedChats} showOptionsModal={showOptionsModal} setShowOptionsModal={setShowOptionsModal} voiceSpeed={voiceSpeed} setVoiceSpeed={setVoiceSpeed} showSuggestionBar={showSuggestionBar} setShowSuggestionBar={setShowSuggestionBar} progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} streakCount={streakCount} setStreakCount={setStreakCount} longestStreak={longestStreak} setLongestStreak={setLongestStreak} lastChatDate={lastChatDate} setLastChatDate={setLastChatDate} todaysChatTime={todaysChatTime} setTodaysChatTime={setTodaysChatTime} />;
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen /> 
      ) : (
        <>
          {renderPage()}
          {isNotificationModalVisible && (
            <NotificationModal 
              isNotificationModalVisible={isNotificationModalVisible}
              setIsNotificationModalVisible={setIsNotificationModalVisible}
            />
          )}
        </>
      )}
    </>
  );

}

export default App
