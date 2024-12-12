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




export default function DialogueModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div> 
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
    )
}