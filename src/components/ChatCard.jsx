import React from "react"


const chatCards = [
    { 
        label: 'Chat',
        tags: 'Writing Reading', 
        desc: 'Enhance your language skills by chatting with our AI teacher.', 
        shortDesc: 'Pick a topic and get started.', 
        imageSrc: './src/assets/aiimages/default-chat-mode.png',
        handleSelectedMode: 'default-chat'
    },
    { 
        label: 'Dialogue Mode',
        tags: 'Writing Reading', 
        desc: 'Enhance your language skills by chatting with our AI teacher.', 
        shortDesc: 'Pick a topic and get started.', 
        imageSrc: './src/assets/aiimages/dialogue-mode.png',
        handleSelectedMode: 'dialogue-modes'
    },
    { 
        label: 'Roleplay Mode', 
        tags: 'Speaking Conversation', 
        desc: 'Engage in roleplay scenarios to practice speaking naturally.', 
        shortDesc: 'Simulate real-life situations with AI characters.', 
        imageSrc: './src/assets/aiimages/roleplay-mode.png',
        handleSelectedMode: 'roleplay-modes'
    },
    { 
        label: 'Debates', 
        tags: 'Speaking Argumentation', 
        desc: 'Improve your critical thinking and argumentation skills in debates.', 
        shortDesc: 'Debate on topics and receive AI feedback.', 
        imageSrc: './src/assets/aiimages/debate-mode.png',
        handleSelectedMode: 'debates-modes'
    },
    { 
        label: 'Interview',
        tags: 'Speaking Professional', 
        desc: 'Prepare for interviews by practicing questions with the AI.', 
        shortDesc: 'Build confidence for real-life interviews.', 
        imageSrc: './src/assets/aiimages/interview-mode.png',
        handleSelectedMode: 'interview'
    },
    { 
        label: 'Pronunciation Practice Mode', 
        tags: 'Pronunciation Speaking', 
        desc: 'Perfect your pronunciation with AI feedback on your speech.', 
        shortDesc: 'Speak clearly and confidently in any language.', 
        imageSrc: './src/assets/aiimages/pronounciation-mode.png',
        handleSelectedMode: 'pronunciation-practice'
    },
    { 
        label: 'Scenario Mode', 
        tags: 'Speaking Listening', 
        desc: 'Practice your language skills in a variety of contextual scenarios.', 
        shortDesc: 'Learn and respond in immersive situations.', 
        imageSrc: './src/assets/aiimages/scenario-mode.png',
        handleSelectedMode: 'scenario-modes'
    }
]

export default function ChatCard(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <> 
        {chatCards.map((card, index) => {
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
        </>
    )
}