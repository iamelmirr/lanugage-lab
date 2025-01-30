import React from "react"


const mainNavButtons = [
    {label: 'Dashboard', link: '/', icon: <img className="nav-a-img" src="/home.png"/>, handleMode: 'main'},
    {label: 'Chat', link: '/', icon: <img className="nav-a-img" src="/chat.png"/>, handleMode: 'default-chat'},
    {label: 'Challenge', link: '/', icon: <img className="nav-a-img" src="/challenge.png"/>, handleMode: 'main'},
    {label: 'Progress', link: '/', icon: <img className="nav-a-img" src="/rise.png"/>, handleMode: 'progress'},
]


const navOptions = [
    {label: 'Chat', link: '/', handleSelectedMode: 'default-chat'},
    {label: 'Dialogue Mode', link: '/', handleSelectedMode: 'dialogue-modes'},
    {label: 'Roleplay Mode', link: '/', handleSelectedMode: 'roleplay-modes'},
    {label: 'Debate', link: '/', handleSelectedMode: 'debates-modes'},
    {label: 'Interview', link: '/', handleSelectedMode: 'interview'},
    {label: 'Pronunciation', link: '/', handleSelectedMode: 'pronunciation-practice'},
    {label: 'Scenario Mode', link: '/', handleSelectedMode: 'scenario-modes'},
]

const allChatModes = [
    'default-chat', 'airport', 'medical-emergency', 'doctor-appointment',
    'buying-movie-tickets', 'ordering-dinner', 'checking-hotel', 'date',
    'time-traveler', 'detective', 'police-officer', 'debate-social-media',
    'debate-online-learning', 'debate-mandatory-voting', 'debate-happines-vs-success',
    'debate-healthcare-right', 'debate-freedom-speech', 'scenario-grocery-shopping',
    'scenario-restaurant-order', 'scenario-lost-city', 'scenario-car-trouble',
    'scenario-product-return', 'pronunciation-practice', 'interview'
]


export default function Nav(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, handleTabChange, setShowOptionsModal, isChatCloseMode, setIsChatCloseModalVisible} = props

    return (
        <div className="nav" onClick={() => setShowOptionsModal(false)}>
            <div className="logo-div">
                <img onClick= {() => {

                            if (allChatModes.includes(selectedMode)) {
                                
                                setIsChatCloseModalVisible(true)
                                isChatCloseMode('main')

                            } else {
                            
                            handleSelectedMode('main') }}} 
                 src="/header-logo.png" alt="" />
            </div>

            <div className="nav-container">
                <div className="main-nav">

                    {mainNavButtons.map((button, index) => {

                        return (
                        <a key={index} onClick= {() => {

                            if (allChatModes.includes(selectedMode)) {

                                if(selectedMode !== button.handleMode) {

                                setIsChatCloseModalVisible(true)
                                isChatCloseMode(button.handleMode)
                                }


                            } else {
                            
                            handleSelectedMode(button.handleMode) }}
                        } className={`dashboard-link ${selectedMode === button.handleMode && button.label !== 'Challenge' ? 'selected' : ''}`} >{button.icon}  
                           {button.label}
                        </a>
                        )
                    })}

                </div>

                <div className="nav-options">

                    {navOptions.map((button, index) => {
                        return (
                            <a key={index} className={selectedMode === button.handleSelectedMode && selectedMode !== 'default-chat' ? 'selected' : ''} onClick = {() => {

                                if (allChatModes.includes(selectedMode)) {
    
                                    if(selectedMode !== button.handleSelectedMode) {

                                        setIsChatCloseModalVisible(true)
                                        isChatCloseMode(button.handleSelectedMode)
                                        }
    
    
                                } else {
                                
                                handleSelectedMode(button.handleSelectedMode) }}}
                                >
                                {button.label}
                            </a>
                        )
                    })}

                </div>

                
            </div>

            <a className={`profile-link ${selectedMode === 'profile-mode' ? 'selected' : ''}`} onClick = {() => {

                                if (allChatModes.includes(selectedMode)) {
    
                                    setIsChatCloseModalVisible(true)
                                    isChatCloseMode('profile-mode')
    
    
                                } else {
                                
                                handleSelectedMode('profile-mode') }}}><img src="/user.png"/> Profile</a>



        </div>
    )
}