import Nav from "../components/Nav";
import React from "react"
import Main from "../components/Main";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import Chat from "../components/Chat";
import DialogueModes from "../components/DialogueModes";
import RoleplayModes from "../components/RoleplayModes";
import DebateModes from "../components/DebateModes";
import ScenarioModes from "../components/ScenarioModes";
import ProfileMode from "../components/ProfileMode";


export default function Home() {

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

    const [selectedMode, setSelectedMode] = useState('main')

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
        <Nav selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} handleTabChange={handleTabChange} setActiveTab={setActiveTab} activeTab={activeTab}></Nav>

        {selectedMode === 'main' && <Main selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange}></Main>}

        {selectedMode === 'dialogue-modes' && <DialogueModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></DialogueModes>}

        {selectedMode === 'roleplay-modes' && <RoleplayModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></RoleplayModes>}

        {selectedMode === 'debates-modes' && <DebateModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></DebateModes>}

        {selectedMode === 'scenario-modes' && <ScenarioModes selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></ScenarioModes>}

        {chatModes.includes(selectedMode) && <Chat  selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}/>}

        {selectedMode === 'main' && <Dashboard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></Dashboard>}


        {selectedMode === 'profile-mode' && <ProfileMode selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}/>}

        </>

    )
}