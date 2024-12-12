
const allScenarioModes = [
    {
        label: 'Grocery Shopping',
        tags: 'Scenario Practice',
        desc: 'Practice real-life language skills by simulating a grocery shopping experience. Ask for items, check prices, and discuss quantities with an AI assistant.',
        shortDesc: 'Simulate a grocery shopping experience.',
        imageSrc: './src/assets/john.png',
        handleSelectedMode: 'scenario-grocery-shopping'
    },
    {
        label: 'Restaurant Order',
        tags: 'Scenario Practice',
        desc: 'Simulate ordering food at a restaurant. Practice asking for the menu, discussing preferences, and placing an order.',
        shortDesc: 'Practice ordering food at a restaurant.',
        imageSrc: './src/assets/john.png',
        handleSelectedMode: 'scenario-restaurant-order'
    },
    {
        label: 'Lost in a Foreign City',
        tags: 'Scenario Practice',
        desc: 'Practice asking for directions and advice when lost in a foreign city. Interact with an AI to get help and make informed decisions.',
        shortDesc: 'Navigate being lost in a foreign city.',
        imageSrc: './src/assets/john.png',
        handleSelectedMode: 'scenario-lost-city'
    },
    {
        label: 'Car Trouble',
        tags: 'Scenario Practice',
        desc: 'Simulate a scenario where you encounter car trouble. Practice asking for assistance, explaining issues, and finding solutions.',
        shortDesc: 'Troubleshoot car issues and seek help.',
        imageSrc: './src/assets/john.png',
        handleSelectedMode: 'scenario-car-trouble'
    },
    {
        label: 'Product Return',
        tags: 'Scenario Practice',
        desc: 'Practice returning a product to a store. Discuss issues, inquire about policies, and ask for refunds or exchanges.',
        shortDesc: 'Simulate a product return process.',
        imageSrc: './src/assets/john.png',
        handleSelectedMode: 'scenario-product-return'
    }
]





export default function ScenarioModes(props) {
    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div> 
        {allDebateModes.map((card, index) => {
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