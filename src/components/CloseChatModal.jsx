



export default function CloseChatModal (props) {

    const {isChatCloseModalVisible, setIsChatCloseModalVisible, setSelectedMode, setMessages, chatCloseMode, isChatCloseMode} = props


    return (
        <>
            <div className={`close-modal-underlay ${isChatCloseModalVisible ? 'visible' : ''}`}></div>
                <div className={`chat-close-modal ${isChatCloseModalVisible ? 'visible' : ''}`}>
                    <div className="close-chat-icon">
                        <img src="/exclamation-mark.png" alt="exclamation-mark" />
                    </div>

                    <div className="close-chat-text">
                        <p className="large-text">
                            Are you sure you want to leave the chat?
                        </p>

                        <p className="base-text">
                            Your conversation will not be lost. You can come back to it later.
                        </p>
                    </div>

                    <div className="close-chat-btns">
                        <button onClick={() => {
                            setIsChatCloseModalVisible(false)
                            setSelectedMode(chatCloseMode)
                            setMessages([])
                        }} className="close-chat-btn leave">
                            Leave
                        </button>
                        <button onClick={() => setIsChatCloseModalVisible(false)} className="close-chat-btn cancel">
                            Cancel
                        </button>
                    </div>
                </div>
            
        </>
    )
}