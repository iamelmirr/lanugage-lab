import React from "react"



const allRoleplayModes = [
    {
        label: 'At the Date',
        tags: 'Basics',
        desc: 'Engage in a casual conversation and navigate a date scenario. Practice small talk, discussing interests, and planning activities.',
        shortDesc: 'Simulate casual conversations on a date.',
        imageSrc: '/modes-images/at-date2.jfif',
        handleSelectedMode: 'date'
    },
    {
        label: 'Time Traveler',
        tags: 'Intermediate',
        desc: 'Engage in conversations as a time traveler from the past, present, or future. Discuss historical events, future technologies, and cultural differences.',
        shortDesc: 'Explore history, culture, and the future.',
        imageSrc: '/modes-images/time-traveler2.jfif',
        handleSelectedMode: 'time-traveler'
    },
    {
        label: 'Detective',
        tags: 'Intermediate',
        desc: 'Solve a mystery, ask questions to gather clues, and make deductions as a detective.',
        shortDesc: 'Simulate detective work through dialogue.',
        imageSrc: '/modes-images/detective2.jfif',
        handleSelectedMode: 'detective'
    },
    {
        label: 'Police Officer',
        tags: 'Basics',
        desc: 'Role-play interacting with a police officer, reporting a crime, or seeking advice.',
        shortDesc: 'Practice conversations involving law enforcement.',
        imageSrc: '/modes-images/policer-officer2.jfif',
        handleSelectedMode: 'police-officer'
    }
]





export default function RoleplayModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

            return (
                <div className="modes-page">
        <div className="mobile-header modes">
                        <img src="/header-logo.png" alt="header-logo" />
                        <span className="fa-regular fa-user"></span>
        </div>    
        <div className="modes-div roleplay">
            <div className="modes-title-wrapper">
            <span className="fa-solid fa-arrow-left" onClick={() => {
                handleSelectedMode('main')
            }}></span>
            <h2>Roleplays</h2>
            </div>

            <div className="chat-mode-info">
                <p>With the Roleplay mode practicing language will be fun and exciting. You can pick various settings, modes and fantastic dialogues.</p>
                <div className="card-tags">
                    <span className="tag">Vocabulary</span>
                    <span className="tag">Writing</span>
                </div>    
            </div>

        <div className="card-mode-list">   
        {allRoleplayModes.map((card, index) => {
            return (
                <div key={index} onClick={() => {
                    handleSelectedMode(card.handleSelectedMode)
                }} className="chat-mode-card" style={{
                    backgroundImage: `url(${card.imageSrc})`
                }} >
                    <div className="chat-card-info">
                        <h2>{card.label}</h2>
                        <div className="card-tags">
                            {card.tags.split(" ").map((tag, i) => {
                                return (
                                    <span key={i} className="tag">{tag}</span>
                                )
                            })}
                        </div>
                        
                        
                    </div>

                    
                </div>
                
            )
        })}
        </div> 
        </div>
        <div className="about-modes-div">
            <h2>Information</h2>
            <div className="border-div"></div>
            <div className="info-card">
                <h2>About Roleplay Mode</h2>
                <div className="modes-card-tags">
                    <span  className="tag">Vocabulary</span>
                    <span  className="tag">Writing</span>
                        
                </div>
                <p>With the Roleplay mode practicing language will be fun and exciting. You can pick various settings from daily conversations to creative and fantastic dialogues.</p>
            </div>
        </div>
        </div>
    )
}