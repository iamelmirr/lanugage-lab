import React from "react"
import { useEffect } from "react"


const allDialogueModes = [
    {
        label: 'Airport',
        tags: 'Basics', 
        desc: 'Role-play as a traveler asking for directions, checking in, or seeking assistance at the airport.', 
        shortDesc: 'Simulate airport experiences and get feedback.', 
        imageSrc: './src/assets/modes-images/airport1.jfif',
        handleSelectedMode: 'airport'
    },
    {
        label: 'Medical Emergency',
        tags: 'Intermediate', 
        desc: 'Practice handling a medical emergency, asking for help, explaining symptoms, and understanding medical advice.', 
        shortDesc: 'Simulate emergency language skills.', 
        imageSrc: './src/assets/modes-images/emergency.jfif',
        handleSelectedMode: 'medical-emergency'
    },
    {
        label: 'Doctor\'s Appointment',
        tags: 'Intermediate', 
        desc: 'Simulate a doctor-patient interaction, discussing health issues, medications, and follow-up care.', 
        shortDesc: 'Practice healthcare-related conversations.', 
        imageSrc: './src/assets/modes-images/doctors.jfif',
        handleSelectedMode: 'doctor-appointment'
    },
    {
        label: 'Buying Movie Tickets',
        tags: 'Basics', 
        desc: 'Practice booking movie tickets online, selecting showtimes, and finding the best deals.', 
        shortDesc: 'Simulate the process of buying movie tickets.', 
        imageSrc: './src/assets/modes-images/movietickets2.jfif',
        handleSelectedMode: 'buying-movie-tickets'
    },
    {
        label: 'Ordering Dinner',
        tags: 'Basics', 
        desc: 'Practice ordering food at a restaurant, asking about the menu, specials, and dietary restrictions.', 
        shortDesc: 'Simulate restaurant dining experiences.', 
        imageSrc: './src/assets/modes-images/restaurant3.jfif',
        handleSelectedMode: 'ordering-dinner'
    },
    {
        label: 'Checking in a Hotel',
        tags: 'Basics', 
        desc: 'Practice checking into a hotel, asking about amenities, room options, and pricing.', 
        shortDesc: 'Simulate hotel check-in experiences.', 
        imageSrc: './src/assets/modes-images/hotel2.jfif',
        handleSelectedMode: 'checking-hotel'
    }
]


const dialogueModesInfo = {
    title: 'Dialogue Mode',
    infoCardTitle: 'About Dialogue Mode',
    infoCardTags: 'Pronunciation Speaking',
    infoCardDesc: 'With Dialogue Mode, immerse yourself in realistic, interactive conversations tailored to everyday scenarios. Sharpen your communication skills, expand your vocabulary, and practice speaking naturally in diverse settings, just like a native speaker.'
}




export default function DialogueModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="modes-page">
        <div className="mobile-header modes">
                        <img src="./public/header-logo.png" alt="header-logo" />
                        <span className="fa-regular fa-user"></span>
        </div>    
        <div className="modes-div">
            <div className="modes-title-wrapper">
            <span className="fa-solid fa-arrow-left" onClick={() => {
                handleSelectedMode('main')
            }}></span>
            <h2>{dialogueModesInfo.title}</h2>
            </div>

            <div className="chat-mode-info">
                <p>With the Dialogue Mode, you can practice essential daily vocabulary with pre-scripted conversations. Learn how to speak like a native speaker in various settings.</p>
                <div className="card-tags">
                    <span className="tag">Pronunciation</span>
                    <span className="tag">Speaking</span>
                </div>    
            </div>

        <div className="card-mode-list">   
        {allDialogueModes.map((card, index) => {
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
            <br />
            <div className="info-card">
                <h2>{dialogueModesInfo.infoCardTitle}</h2>
                <div className="modes-card-tags">
                    {dialogueModesInfo.infoCardTags.split(" ").map((tag, i) => {
                        return (
                            <span key={i} className="tag">{tag}</span>
                        )
                    })}
                </div>
                <p>{dialogueModesInfo.infoCardDesc}</p>
            </div>
        </div>
        </div>
    )
}