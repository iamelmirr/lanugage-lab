import Nav from "../components/Nav";
import Main from "../components/Main";
import Dashboard from "../components/Dashboard";
import { useState } from "react";


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
    }

    return (
        <>
        <Nav selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} handleTabChange={handleTabChange} setActiveTab={setActiveTab} activeTab={activeTab}></Nav>
        <Main selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode} activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange}></Main>
        <Dashboard selectedMode={selectedMode} setSelectedMode={setSelectedMode} handleSelectedMode={handleSelectedMode}></Dashboard>
        </>
    )
}