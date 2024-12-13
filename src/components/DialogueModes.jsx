import React from "react"


const allDialogueModes = [
    {
        label: 'Airport',
        tags: 'Speaking Interaction', 
        desc: 'Role-play as a traveler asking for directions, checking in, or seeking assistance at the airport.', 
        shortDesc: 'Simulate airport experiences and get feedback.', 
        imageSrc: './src/assets/img-airport',
        handleSelectedMode: 'airport'
    },
    {
        label: 'Medical Emergency',
        tags: 'Speaking Interaction', 
        desc: 'Practice handling a medical emergency, asking for help, explaining symptoms, and understanding medical advice.', 
        shortDesc: 'Simulate emergency language skills.', 
        imageSrc: './src/assets/img-medical-emergency',
        handleSelectedMode: 'medical-emergency'
    },
    {
        label: 'Doctor\'s Appointment',
        tags: 'Speaking Interaction', 
        desc: 'Simulate a doctor-patient interaction, discussing health issues, medications, and follow-up care.', 
        shortDesc: 'Practice healthcare-related conversations.', 
        imageSrc: './src/assets/img-doctor-appointment',
        handleSelectedMode: 'doctor-appointment'
    },
    {
        label: 'Buying Movie Tickets',
        tags: 'Speaking Interaction', 
        desc: 'Practice booking movie tickets online, selecting showtimes, and finding the best deals.', 
        shortDesc: 'Simulate the process of buying movie tickets.', 
        imageSrc: './src/assets/img-buying-movie-tickets',
        handleSelectedMode: 'buying-movie-tickets'
    },
    {
        label: 'Ordering Dinner',
        tags: 'Speaking Interaction', 
        desc: 'Practice ordering food at a restaurant, asking about the menu, specials, and dietary restrictions.', 
        shortDesc: 'Simulate restaurant dining experiences.', 
        imageSrc: './src/assets/img-ordering-dinner',
        handleSelectedMode: 'ordering-dinner'
    },
    {
        label: 'Checking in a Hotel',
        tags: 'Speaking Interaction', 
        desc: 'Practice checking into a hotel, asking about amenities, room options, and pricing.', 
        shortDesc: 'Simulate hotel check-in experiences.', 
        imageSrc: './src/assets/img-checking-hotel',
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

    return (
        <div className="modes-page">
        <div className="modes-div">
        <div className="modes-title-wrapper">
            <span className="fa-solid fa-arrow-left" onClick={() => {
                handleSelectedMode('main')
            }}></span>
            <h2>{dialogueModesInfo.title}</h2>
        </div>
        <div className="card-mode-list">   
        {allDialogueModes.map((card, index) => {
            return (
                <div key={index} onClick={() => {
                    handleSelectedMode(card.handleSelectedMode)
                }} className="chat-card">
                    <div className="chat-card-info">
                        <h2>{card.label}</h2>
                        <div className="card-tags">
                            {card.tags.split(" ").map((tag, i) => {
                                return (
                                    <span key={i} className="tag">{tag}</span>
                                )
                            })}
                        </div>
                        <h4 className="card-desc">
                            {card.desc}
                        </h4>
                        <p className="card-light-desc">{card.shortDesc}</p>
                        
                    </div>

                    <div className="chat-card-img">
                        <img src={card.imageSrc} alt="" />
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