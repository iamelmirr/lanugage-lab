


const mainNavButtons = [
    {label: 'Dashboard', link: '/', icon: <span className="fa-solid fa-house"></span>, handleMode: 'main'},
    {label: 'Chat', link: '/', icon: <span className="fa-solid fa-comment-dots"></span>, handleMode: 'default-chat'},
    {label: 'Challenge', link: '/', icon: <span className="fa-solid fa-trophy"></span>, handleMode: 'quizes'},
    {label: 'Progress', link: '/', icon: <span className="fa-solid fa-bolt"></span>, handleMode: 'progress'},
]


const navOptions = [
    {label: 'Chat', link: '/', handleSelectedMode: 'default-chat'},
    {label: 'Dialogue Mode', link: '/', handleSelectedMode: 'dialogue-modes'},
    {label: 'Roleplay Mode', link: '/', handleSelectedMode: 'roleplay-modes'},
    {label: 'Debate', link: '/', handleSelectedMode: 'debates-modes'},
    {label: 'Interview', link: '/', handleSelectedMode: 'interview'},
    {label: 'Pronunciation', link: '/', handleSelectedMode: 'pronunciation-practice'},
    {label: 'Scenario Mode', link: '/', handleSelectedMode: 'scenario-modes'},
]


export default function Nav(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, handleTabChange} = props

    return (
        <div className="nav">
            <div className="logo-div">
                <img src="./public/header-logo.png" alt="" />
            </div>

            <div className="nav-container">
                <div className="main-nav">

                    {mainNavButtons.map((button, index) => {
                        const isChallengeBtn = button.handleMode === 'quizes'

                        return (
                        <a key={index} onClick= {() => {isChallengeBtn ? handleTabChange('quizzes') : handleSelectedMode(button.handleMode)}} className="dashboard-link" >{button.icon}  
                           {button.label}
                        </a>
                        )
                    })}

                </div>

                <div className="nav-options">

                    {navOptions.map((button, index) => {
                        return (
                            <a key={index} onClick={() => {
                                handleSelectedMode(button.handleSelectedMode)
                            }}>
                                {button.label}
                            </a>
                        )
                    })}

                </div>

                
            </div>

            <a className="profile-link" onClick={() => {
                handleSelectedMode('profile-mode')
            }}>Profile</a>



        </div>
    )
}