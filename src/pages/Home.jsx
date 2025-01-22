import Nav from "../components/Nav";
import React from "react"
import Main from "../components/Main";
import Dashboard from "../components/Dashboard";
import { useState, useEffect } from "react";
import Chat from "../components/Chat";
import DialogueModes from "../components/DialogueModes";
import RoleplayModes from "../components/RoleplayModes";
import DebateModes from "../components/DebateModes";
import ScenarioModes from "../components/ScenarioModes";
import ProfileMode from "../components/ProfileMode";
import MobileNav from "../components/MobileNav";


export default function Home(props) {
    const {userName, setUserName, userLastName, setUserLastName, userEmail, setUserEmail, selectedMode, setSelectedMode, setProgressScore, progressScore, progressLevel, levelThresholds, tempUserEmail, setTempUserEmail, newUserEmail, setNewUserEmail, userPassword, setUserPassword, isAuthenticated, setIsAuthenticated, setFormData, setTargetLanguage, setTranslationLanguage, translationLanguage, targetLanguage, targetLanguageLevel, setTargetLanguageLevel, learningGoal, learningReason, isMuted, setIsMuted, savedChats, setSavedChats, showOptionsModal, setShowOptionsModal, voiceSpeed, setVoiceSpeed, showSuggestionBar, setShowSuggestionBar, progressPercentage, setProgressPercentage, streakCount, setStreakCount, longestStreak, setLongestStreak, lastChatDate, setLastChatDate, todaysChatTime, setTodaysChatTime} = props

    const [showChat, setShowChat] = useState(false)
    const [activeChatMode, setActiveChatMode] = useState(null)

    const openChat = (mode) => {
        setActiveChatMode(mode)
        setShowChat(true)
    }

    const closeChat = () => {
        setShowChat(false)
        setActiveChatMode(null)
    }

    const [activeTab, setActiveTab] = useState('chats')

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    

    const handleSelectedMode = (mode) => {
        setSelectedMode(mode)
        console.log(selectedMode)
    }




    const chatModes = [
        'default-chat', 'airport', 'medical-emergency', 'doctor-appointment',
        'buying-movie-tickets', 'ordering-dinner', 'checking-hotel', 'date',
        'time-traveler', 'detective', 'police-officer', 'debate-social-media',
        'debate-online-learning', 'debate-mandatory-voting', 'debate-happines-vs-success',
        'debate-healthcare-right', 'debate-freedom-speech', 'scenario-grocery-shopping',
        'scenario-restaurant-order', 'scenario-lost-city', 'scenario-car-trouble',
        'scenario-product-return', 'pronunciation-practice', 'interview'
    ]


    
    return (
        <>
        <Nav selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} handleTabChange={handleTabChange} setActiveTab={setActiveTab} activeTab={activeTab} showOptionsModal={showOptionsModal} setShowOptionsModal={setShowOptionsModal}></Nav>

        {(selectedMode === 'main' || selectedMode === 'progress') && <Main levelThresholds={levelThresholds} selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} progressLevel={progressLevel} progressScore={progressScore} progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage} streakCount={streakCount} longestStreak={longestStreak} savedChats={savedChats} ></Main>}

        {selectedMode === 'dialogue-modes' && <DialogueModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></DialogueModes>}

        {selectedMode === 'roleplay-modes' && <RoleplayModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></RoleplayModes>}

        {selectedMode === 'debates-modes' && <DebateModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></DebateModes>}

        {selectedMode === 'scenario-modes' && <ScenarioModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></ScenarioModes>}

        {chatModes.includes(selectedMode) && <Chat  selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} progressScore={progressScore} setProgressScore={setProgressScore} targetLanguage={targetLanguage} translationLanguage={translationLanguage} targetLanguageLevel={targetLanguageLevel} learningGoal={learningGoal} learningReason={learningReason} isMuted={isMuted} setIsMuted={setIsMuted} savedChats={savedChats} setSavedChats={setSavedChats} showOptionsModal={showOptionsModal} setShowOptionsModal={setShowOptionsModal} setTargetLanguageLevel={setTargetLanguageLevel} setTranslationLanguage={setTranslationLanguage} voiceSpeed={voiceSpeed} setVoiceSpeed={setVoiceSpeed} showSuggestionBar={showSuggestionBar} setShowSuggestionBar={setShowSuggestionBar} streakCount={streakCount} setStreakCount={setStreakCount} longestStreak={longestStreak} setLongestStreak={setLongestStreak} lastChatDate={lastChatDate} setLastChatDate={setLastChatDate} todaysChatTime={todaysChatTime} setTodaysChatTime={setTodaysChatTime} />}

        

        {(selectedMode === 'main' || selectedMode === 'progress') && <Dashboard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} userName={userName} setUserName={setUserName} progressScore={progressScore} progressLevel={progressLevel} levelThresholds={levelThresholds}></Dashboard>}


        {selectedMode === 'profile-mode' && <ProfileMode userName={userName} userLastName={userLastName} userEmail={userEmail} setUserEmail={setUserEmail} setUserLastName={setUserLastName} setUserName={setUserName} selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} tempUserEmail={tempUserEmail} setTempUserEmail={setTempUserEmail} newUserEmail={newUserEmail} setNewUserEmail={setNewUserEmail} userPassword={userPassword} setUserPassword={setUserPassword} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setFormData={setFormData} setTargetLanguage={setTargetLanguage} setTranslationLanguage={setTranslationLanguage} targetLanguage={targetLanguage} translationLanguage={translationLanguage} setTargetLanguageLevel={setTargetLanguageLevel} targetLanguageLevel={targetLanguageLevel}/>}

        {selectedMode === 'main' && <MobileNav></MobileNav>}

        </>

    )
}