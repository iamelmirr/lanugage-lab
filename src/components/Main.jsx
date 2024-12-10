import ChatCard from "./ChatCard";




export default function Main() {
    return (
        <div className="main-div">

            <div className="mode-nav">
                <button className="mode-nav-btn">Chats</button>
                <button className="mode-nav-btn">Quizes</button>
            </div>

            <br />

            <div className="chats-options">
                <ChatCard></ChatCard>
            </div>

            <div className="quizes-options">
                {/* <QuizCard></QuizCard> */}
            </div>
        </div>
    )
}