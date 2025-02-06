import React from "react"


const allScenarioModes = [
    {
        label: 'Grocery Shopping',
        tags: 'Basics',
        desc: 'Practice real-life language skills by simulating a grocery shopping experience. Ask for items, check prices, and discuss quantities with an AI assistant.',
        shortDesc: 'Simulate a grocery shopping experience.',
        imageSrc: '/modes-images/shopping-scenario.jfif',
        handleSelectedMode: 'scenario-grocery-shopping'
    },
    {
        label: 'Restaurant Order',
        tags: 'Basics',
        desc: 'Simulate ordering food at a restaurant. Practice asking for the menu, discussing preferences, and placing an order.',
        shortDesc: 'Practice ordering food at a restaurant.',
        imageSrc: '/modes-images/order-scenario.jfif',
        handleSelectedMode: 'scenario-restaurant-order'
    },
    {
        label: 'Lost in a Foreign City',
        tags: 'Intermediate',
        desc: 'Practice asking for directions and advice when lost in a foreign city. Interact with an AI to get help and make informed decisions.',
        shortDesc: 'Navigate being lost in a foreign city.',
        imageSrc: '/modes-images/lost-scenario.jfif',
        handleSelectedMode: 'scenario-lost-city'
    },
    {
        label: 'Car Trouble',
        tags: 'Intermediate',
        desc: 'Simulate a scenario where you encounter car trouble. Practice asking for assistance, explaining issues, and finding solutions.',
        shortDesc: 'Troubleshoot car issues and seek help.',
        imageSrc: '/modes-images/car-trouble-scenario.jfif',
        handleSelectedMode: 'scenario-car-trouble'
    },
    {
        label: 'Product Return',
        tags: 'Intermediate',
        desc: 'Practice returning a product to a store. Discuss issues, inquire about policies, and ask for refunds or exchanges.',
        shortDesc: 'Simulate a product return process.',
        imageSrc: '/modes-images/product-return.jfif',
        handleSelectedMode: 'scenario-product-return'
    }
]





export default function ScenarioModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div className="modes-page">
        <div className="mobile-header modes">
                        <img onClick={() => setSelectedMode('main')} src="/header-logo.png" alt="header-logo" />
                        <span className="fa-regular fa-user"></span>
        </div>    
        <div className="modes-div">
            <div className="modes-title-wrapper">
            <span className="fa-solid fa-arrow-left" onClick={() => {
                handleSelectedMode('main')
            }}></span>
            <h2>Scenarios</h2>
            </div>

            <div className="chat-mode-info">
                <p>Practice real-life language skills by simulating a real-life scenario. Ask, check, and discuss with an AI assistant.</p>
                <div className="card-tags">
                    <span className="tag">Pronunciation</span>
                    <span className="tag">Speaking</span>
                </div>    
            </div>

        <div className="card-mode-list">   
        {allScenarioModes.map((card, index) => {
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
                <h2>About Scenario Mode</h2>
                <div className="modes-card-tags">
                    <span  className="tag">Listening</span>
                    <span  className="tag">Comprehension</span>
                        
                </div>
                <p>Immerse yourself in dynamic, real-life situations to practice language like never before. Choose from a variety of scenarios, such as ordering food at a restaurant, traveling abroad, or handling workplace challenges.</p>
            </div>
        </div>
        </div>
    )
}