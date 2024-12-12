import Nav from "../components/Nav";
import Main from "../components/Main";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import Chat from "../components/Chat";


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

        {chatModes.includes(selectedMode) && <Chat />}

        {selectedMode === 'main' && <Dashboard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></Dashboard>}
        </>
    )
}