


const chatCards = [
    {label: 'Chat',
     tags: 'Writing Reading', 
     desc: 'Enhance your language skills by chatting with our AI teacher.', 
     shortDesc: 'Pick a topic and get started.', 
     imageSrc: './src/assets/img1',
    },
]

export default function ChatCard() {
    return (
        <> 
        {chatCards.map((card, index) => {
            return (
                <div key={index} className="chat-card">
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
                        <img src="/" alt="" />
                    </div>
                </div>
            )
        })}
        </>
    )
}