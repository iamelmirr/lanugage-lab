


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
                <div className="chat-card">
                    <div className="chat-card-info">

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