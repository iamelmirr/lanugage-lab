
const allRoleplayModes = [
    {
        label: 'At the Date',
        tags: 'Casual Conversation',
        desc: 'Engage in a casual conversation and navigate a date scenario. Practice small talk, discussing interests, and planning activities.',
        shortDesc: 'Simulate casual conversations on a date.',
        imageSrc: './src/assets/img-date',
        handleSelectedMode: 'date'
    },
    {
        label: 'Time Traveler',
        tags: 'Creative Role-Play',
        desc: 'Engage in conversations as a time traveler from the past, present, or future. Discuss historical events, future technologies, and cultural differences.',
        shortDesc: 'Explore history, culture, and the future.',
        imageSrc: './src/assets/img-time-traveler',
        handleSelectedMode: 'time-traveler'
    },
    {
        label: 'Detective',
        tags: 'Mystery Solving',
        desc: 'Solve a mystery, ask questions to gather clues, and make deductions as a detective.',
        shortDesc: 'Simulate detective work through dialogue.',
        imageSrc: './src/assets/img-detective',
        handleSelectedMode: 'detective'
    },
    {
        label: 'Police Officer',
        tags: 'Law Enforcement Interaction',
        desc: 'Role-play interacting with a police officer, reporting a crime, or seeking advice.',
        shortDesc: 'Practice conversations involving law enforcement.',
        imageSrc: './src/assets/img-police-officer',
        handleSelectedMode: 'police-officer'
    }
]





export default function RoleplayModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div> 
        {allRoleplayModes.map((card, index) => {
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