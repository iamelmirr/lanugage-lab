



export default function Chat() {



    return (
        <div className="chat-div">
            <div className="chat-label">
                <span class="fa-solid fa-arrow-left"></span>
                <h2>Chat</h2>
            </div>
            <div className="chat-options">
                <div className="teacher-info">
                <img src="/" alt="teacher-img"/>
                <h3 className="tacher-name">John</h3>
                </div>

                <div className="chat-settings">
                    <span class="fa-solid fa-volume-high"></span>
                    <span class="fa-solid fa-ellipsis-vertical"></span>
                </div>
                
            </div>
            <div className="chat-msg-wrapper">
                <div className={`message ${msg.sender}`}></div>
            </div>
            <div className="chat-input-wrapper">
                <input type="text" placeholder="Enter your message" />
                <button className="input-btn">
                <span class="fa-solid fa-microphone"></span>
                <span class="fa-solid fa-circle-arrow-right"></span>
                </button>
            </div>
        </div>
    )
}