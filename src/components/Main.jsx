import React from "react"
import ChatCard from "./ChatCard"
import QuizCard from "./QuizCard"
import { useState } from "react"




export default function Main(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, activeTab, setActiveTab, handleTabChange} = props



    return (
        <div className="main-div">

            <div className="mode-nav">
                <button className={`mode-nav-btn ${activeTab === 'chats' ? 'active-btn' : ''}`} onClick={() => handleTabChange('chats')}>Chats</button>
                <button className={`mode-nav-btn ${activeTab === 'quizzes' ? 'active-btn' : ''}`} onClick={() => handleTabChange('quizzes')}>Quizes</button>
            </div>

            <br />

            <div className={`chats-options ${activeTab === 'chats' ? 'active-tab' : ''}`}>
                <ChatCard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></ChatCard>
            </div>

            <div className={`quizzes-options ${activeTab === 'quizzes' ? 'active-tab' : ''}`}>
                <QuizCard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></QuizCard>
            </div>
        </div>
    )
}