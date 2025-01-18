import React from "react"
import ChatCard from "./ChatCard"
import QuizCard from "./QuizCard"
import { useState } from "react"




export default function Main(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, activeTab, setActiveTab, handleTabChange, progressLevel, progressScore, progressPercentage, levelThresholds, longestStreak, streakCount, savedChats} = props

    const pointsToNextLevel = levelThresholds[progressLevel] - progressScore

    const totalMessages = savedChats.reduce((total, chat) => 
        total + chat.messages.length, 0);


    return (
        <div className="main-div">

{selectedMode === 'progress' ? (
   <>

    <div className="progress-header">
        <h2>Progress</h2>
    </div>

    <div className="progress-grid">
        <div className="progress-stat-large">

            <div className="progress-level-subdiv">
                <p className="font-medium">Level {progressLevel}</p>
                <p className="font-light-small">Your current level.</p>
            </div>

            <div className="border-div"></div>

            <div className="progress-level-subdiv">
                <p className="font-medium">Minutes till the next level: {`${pointsToNextLevel} ${pointsToNextLevel === 1 ? `minute` : `minutes`}`}</p>
                <p className="font-light-small">Keep on learning!</p>
            </div>

            <div className="border-div"></div>

            <div className="level-track">
                <p className="font-medium level-current">{progressLevel}</p>
                <div className="level-track-inside">
                    <div className="level-track-outside" style={{
                        width: `${progressPercentage}%`
                    }}></div>
                </div>
                <p className="font-medium level-next">{progressLevel + 1}</p>
            </div>

        </div>

        <div className="progress-stat-large progress-light-stat">

            <div className="progress-level-subdiv">
                <p className="font-medium dark">Current streak</p>
                <p className="font-light-small dark">Pracitce at least 3 minutes to complete a session.</p>
            </div>

            <div className="border-div"></div>

            <div className="progress-streak-subdiv">
                <p className="font-medium dark">Ongoing streak:</p>
                <div className="streak-number-dark"><p className="font-small">{`${streakCount} ${streakCount === 1 ? 'day' : 'days'}`}</p></div>
            </div>

            <div className="border-div"></div>

            <div className="progress-streak-subdiv">
                <p className="font-medium dark">Longest streak:</p>
                <div className="streak-number-light"><p className="font-small">{`${longestStreak} ${longestStreak === 1 ? 'day' : 'days'}`}</p></div>
            </div>

            <div></div>

        </div>

        <div className="progress-stat-small">

            <div className="progress-level-subdiv">
                <p className="font-medium dark">Learning time</p>
                <p className="font-light-small">Your total learning time.</p>
            </div>

            <div className="border-div"></div>

            <div className="stat-subdiv">

                <div className="stat-icon-div">
                <span className="fa-solid fa-stopwatch"></span>
                </div>

                <p className="font-medium dark">
                    {`${progressScore} ${progressScore === 1 ? 'minute' : 'minutes'}`} 
                </p>


                
            </div>


        </div>

        <div className="progress-stat-small">

            <div className="progress-level-subdiv">
                <p className="font-medium dark">Messages</p>
                <p className="font-light-small">Your total messages communicated.</p>
            </div>

            <div className="border-div"></div>

            <div className="stat-subdiv">

                <div className="stat-icon-div messages">
                <span className="fa-regular fa-message"></span>
                </div>

                <p className="font-medium dark">
                {`${totalMessages} ${totalMessages === 1 ? 'message' : 'messages'}`}
                </p>


                
            </div>


        </div>

        
    </div>
        
        
    </>
            ) : (
                <>
                    <div className="mode-nav">
                        <button
                            className={`mode-nav-btn ${activeTab === 'chats' ? 'active-btn' : ''}`}
                            onClick={() => handleTabChange('chats')}
                        >
                            Chats
                        </button>
                        <button
                            className={`mode-nav-btn ${activeTab === 'quizzes' ? 'active-btn' : ''}`}
                            onClick={() => handleTabChange('quizzes')}
                        >
                            Quizzes
                        </button>
                    </div>

                    <br />

                    <div className={`chats-options ${activeTab === 'chats' ? 'active-tab' : ''}`}>
                        <ChatCard
                            selectedMode={selectedMode}
                            setSelectedMode={setSelectedMode}
                            handleSelectedMode={handleSelectedMode}
                        />
                    </div>

                    <div className={`quizzes-options ${activeTab === 'quizzes' ? 'active-tab' : ''}`}>
                        <QuizCard
                            selectedMode={selectedMode}
                            setSelectedMode={setSelectedMode}
                            handleSelectedMode={handleSelectedMode}
                        />
                    </div>
                </>
            )}

        </div>
    )
}