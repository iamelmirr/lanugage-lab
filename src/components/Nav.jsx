import React from "react"


const mainNavButtons = [
    {label: 'Dashboard', link: '/', icon: <img className="nav-a-img" src="./public/home.png"/>, handleMode: 'main'},
    {label: 'Chat', link: '/', icon: <img className="nav-a-img" src="./public/chat.png"/>, handleMode: 'default-chat'},
    {label: 'Challenge', link: '/', icon: <img className="nav-a-img" src="./public/challenge.png"/>, handleMode: 'main'},
    {label: 'Progress', link: '/', icon: <img className="nav-a-img" src="./public/rise.png"/>, handleMode: 'progress'},
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


export default function Nav(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, handleTabChange, setShowOptionsModal} = props

    return (
        <div className="nav" onClick={() => setShowOptionsModal(false)}>
            <div className="logo-div">
                <img src="./public/header-logo.png" alt="" />
            </div>

            <div className="nav-container">
                <div className="main-nav">

                    {mainNavButtons.map((button, index) => {
                        const isChallengeBtn = button.handleMode === 'quizes'

                        return (
                        <a key={index} onClick= {() => {isChallengeBtn ? () => {
                            handleTabChange('quizzes')
                            handleSelectedMode(button.handleMode)
                        } : handleSelectedMode(button.handleMode)}} className="dashboard-link" >{button.icon}  
                           {button.label}
                        </a>
                        )
                    })}

                </div>

                <div className="nav-options">

                    {navOptions.map((button, index) => {
                        return (
                            <a key={index} onClick={() => {
                                handleSelectedMode(button.handleSelectedMode)
                            }}>
                                {button.label}
                            </a>
                        )
                    })}

                </div>

                
            </div>

            <a className="profile-link" onClick={() => {
                handleSelectedMode('profile-mode')
            }}><img src="./public/user.png"/> Profile</a>



        </div>
    )
}