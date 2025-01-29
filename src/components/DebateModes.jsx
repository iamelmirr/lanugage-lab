import React from "react"



const allDebateModes = [
    {
        label: 'Is Social Media Beneficial?',
        tags: 'Debate', 
        desc: 'Debate the pros and cons of using social media. Share your views, ask questions, and respond to counterarguments presented by the AI.', 
        shortDesc: 'Discuss the impact of social media on society.', 
        imageSrc: '/modes-images/social-media-debate.jfif',
        handleSelectedMode: 'debate-social-media'
    },
    {
        label: 'Online or Traditional Learning?',
        tags: 'Debate', 
        desc: 'Debate the merits of online learning versus traditional classroom learning. Discuss the advantages, disadvantages, and ideal scenarios for each.', 
        shortDesc: 'Analyze online learning vs. traditional education.', 
        imageSrc: '/modes-images/onlinelearning.jfif',
        handleSelectedMode: 'debate-online-learning'
    },
    {
        label: 'Should Voting Be Mandatory?',
        tags: 'Debate', 
        desc: 'Debate whether voting should be mandatory in democracies. Present arguments for and against and respond to opposing views.', 
        shortDesc: 'Discuss the implications of mandatory voting.', 
        imageSrc: '/modes-images/isvotingman.jfif',
        handleSelectedMode: 'debate-mandatory-voting'
    },
    {
        label: 'Is Happiness More Important Than Success?',
        tags: 'Debate', 
        desc: 'Debate whether happiness is more important than success. Discuss different perspectives on this matter and respond to counterarguments.', 
        shortDesc: 'Discuss the balance between happiness and success.', 
        imageSrc: '/modes-images/happinessorsuccess.jfif',
        handleSelectedMode: 'debate-happiness-vs-success'
    },
    {
        label: 'Is Healthcare a Human Right?',
        tags: 'Debate', 
        desc: 'Debate whether healthcare is a fundamental human right. Discuss different views and the implications of these positions.', 
        shortDesc: 'Explore healthcare as a fundamental human right.', 
        imageSrc: '/modes-images/healthcare-debate.jfif',
        handleSelectedMode: 'debate-healthcare-right'
    },
    {
        label: 'Freedom of Speech',
        tags: 'Debate', 
        desc: 'Debate the limits of freedom of speech. Present different viewpoints and respond to counterarguments.', 
        shortDesc: 'Examine the boundaries of free expression.', 
        imageSrc: '/modes-images/freedomofspeech.jfif',
        handleSelectedMode: 'debate-freedom-speech'
    }
];




export default function DebateModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div className="modes-page">
<div className="mobile-header modes">
                <img src="/header-logo.png" alt="header-logo" />
                <span className="fa-regular fa-user"></span>
</div>    
<div className="modes-div">
    <div className="modes-title-wrapper">
    <span className="fa-solid fa-arrow-left" onClick={() => {
        handleSelectedMode('main')
    }}></span>
    <h2>Debates</h2>
    </div>

    <div className="chat-mode-info">
        <p>With the Debate mode you can argue for or against interesting and intriguing topics. Enhance your language skills as you defend your arguments against all-knowing AI.</p>
        <div className="card-tags">
            <span className="tag">Vocabulary</span>
            <span className="tag">Writing</span>
        </div>    
    </div>

<div className="card-mode-list">   
{allDebateModes.map((card, index) => {
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
                <h2>About Debate Mode</h2>
                <div className="modes-card-tags">
                    <span  className="tag">Vocabulary</span>
                    <span  className="tag">Writing</span>
                        
                </div>
                <p>With the Debate mode you can argue for or against interesting and intriguing topics. Enhance your language skills as you defend your arguments against all-knowing AI.</p>
            </div>
        </div>
</div>
)
}