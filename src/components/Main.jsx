import React from "react"
import ChatCard from "./ChatCard"
import QuizCard from "./QuizCard"
import { useState, useRef, useEffect } from "react"




export default function Main(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, activeTab, setActiveTab, handleTabChange, progressLevel, progressScore, progressPercentage, levelThresholds, longestStreak, streakCount, savedChats, setIsMobileModalOpen, isMobileProfileOpen, setIsMobileProfileOpen, isMobileModalOpen} = props
    

    const pointsToNextLevel = levelThresholds[progressLevel] - progressScore

    const totalMessages = savedChats.reduce((total, chat) => 
        total + chat.messages.length, 0);



    
    const sliderWrapperRef = useRef(null);

    useEffect(() => {
        const sliderWrapper = sliderWrapperRef.current;
        if (!sliderWrapper) return;

        const sliderItems = sliderWrapper.querySelectorAll(".slider-item");
        let isDown = false;
        let startX;
        let scrollLeft;
        let dragged = false;

        const handleMouseDown = (e) => {
            isDown = true;
            dragged = false;
            sliderWrapper.classList.add("active");
            const paddingLeft = parseInt(getComputedStyle(sliderWrapper).paddingLeft, 10);
            startX = e.pageX - sliderWrapper.offsetLeft - paddingLeft;
            scrollLeft = sliderWrapper.scrollLeft;
        };

        const handleMouseLeave = () => {
            if (isDown) snapToNearest();
            isDown = false;
            sliderWrapper.classList.remove("active");
        };

        const handleMouseUp = () => {
            if (dragged) snapToNearest();
            isDown = false;
            sliderWrapper.classList.remove("active");
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            dragged = true;
            e.preventDefault();
            const x = e.pageX - sliderWrapper.offsetLeft;
            const walk = (x - startX) * 1.5; // Adjust sensitivity here
            sliderWrapper.scrollLeft = scrollLeft - walk;
        };

        const snapToNearest = () => {
            const sliderWrapperScrollLeft = sliderWrapper.scrollLeft;
            let nearestItem = sliderItems[0];
            let minDistance = Math.abs(sliderWrapperScrollLeft - nearestItem.offsetLeft);

            sliderItems.forEach((item) => {
                const distance = Math.abs(sliderWrapperScrollLeft - item.offsetLeft);
                if (distance < minDistance) {
                    nearestItem = item;
                    minDistance = distance;
                }
            });

            sliderWrapper.scrollTo({
                left: nearestItem.offsetLeft,
                behavior: "smooth",
            });
        };

        sliderWrapper.addEventListener("mousedown", handleMouseDown);
        sliderWrapper.addEventListener("mouseleave", handleMouseLeave);
        sliderWrapper.addEventListener("mouseup", handleMouseUp);
        sliderWrapper.addEventListener("mousemove", handleMouseMove);

        return () => {
            sliderWrapper.removeEventListener("mousedown", handleMouseDown);
            sliderWrapper.removeEventListener("mouseleave", handleMouseLeave);
            sliderWrapper.removeEventListener("mouseup", handleMouseUp);
            sliderWrapper.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);






    return (
        <div className="main-div">

    {selectedMode === 'explore' ? 
    (
        <>
            

            <div className="mobile-header">
                <img src="./public/header-logo.png" alt="header-logo" />
                <span onClick={() => {
                    setIsMobileModalOpen(true)
                    setIsMobileProfileOpen(true)
                }}  className="fa-regular fa-user"></span>
            </div>


            

            <div className="main-label-div explore">
                <p>Explore</p>
            </div>

            <p className="text-small-info">
                    Find your daily picks below.
                </p>

            <div className="explore-options">

                <div className="explore-card">
                    <div className="explore-card-head">
                    <p className="explore-header">Your daily pick</p>
                    <div className="card-tags">
                        <span className="tag">Vocabulary</span>
                        <span className="tag">Writing</span>
                    </div>
                    </div>
                    <p className="explore-desc">Here is your daily pick to improve your language learning skills with engaging experience.</p>
                    <div className="border-div"></div>
                    <p className="explore-options-label">Dialogue</p>
                    <div className="explore-card-option" style={{
                    backgroundImage: `url(./src/assets/modes-images/interviewimage.jfif)`
                        }}>
                        <p className="explore-card-label">Interview</p>
                        </div>
                </div>

                <div className="explore-card">
                    <div className="explore-card-head">
                    <p className="explore-header">Roleplays</p>
                    <div className="card-tags">
                        <span className="tag">Vocabulary</span>
                        <span className="tag">Writing</span>
                    </div>
                    </div>
                    <p className="explore-desc">Practice through useful real-life situations.</p>
                    <div className="border-div"></div>
                    <p className="explore-options-label">Today's scenarios</p>
                    <div className="explore-cards-inline">
                        <div className="explore-card-option inline" style={{
                        backgroundImage: `url(./src/assets/modes-images/detective2.jfif)`
                        }}>
                            <p className="explore-card-label">Detective</p>
                        </div>
                        <div className="explore-card-option inline" style={{
                        backgroundImage: `url(./src/assets/modes-images/time-traveler2.jfif)`
                        }}>
                            <p className="explore-card-label">Time traveler</p>
                        </div>
                    </div>    
                </div>

                <div className="explore-card">
                    <div className="explore-card-head">
                    <p className="explore-header">Debates</p>
                    <div className="card-tags">
                        <span className="tag">Vocabulary</span>
                        <span className="tag">Writing</span>
                    </div>
                    </div>
                    <p className="explore-desc">Argue for or against interesting and intriguing topics.</p>
                    <div className="border-div"></div>
                    <p className="explore-options-label">Today's topics</p>
                    <div className="explore-cards-block">
                        <div className="explore-card-option" style={{
                        backgroundImage: `url(./src/assets/modes-images/voting.jfif)`
                        }}>
                            <p className="explore-card-label">Should voting be mandatory?</p>
                        </div>
                        <div className="explore-card-option " style={{
                        backgroundImage: `url(./src/assets/modes-images/speech.jfif)`
                        }}>
                            <p className="explore-card-label">Freedom of speech</p>
                        </div>
                    </div>    
                </div>

                <div className="explore-card">
                    <div className="explore-card-head">
                    <p className="explore-header">Debates</p>
                    <div className="card-tags">
                        <span className="tag">Vocabulary</span>
                        <span className="tag">Writing</span>
                    </div>
                    </div>
                    <p className="explore-desc">Practice essential daily vocabulary with pre-scripted conversations.</p>
                    <div className="border-div"></div>
                    <p className="explore-options-label">Today's dialogues</p>
                    <div className="explore-cards-inline">
                        <div className="explore-card-option inline" style={{
                        backgroundImage: `url(./src/assets/modes-images/airport1.jfif)`
                        }}>
                            <p className="explore-card-label">Airport</p>
                        </div>
                        <div className="explore-card-option inline" style={{
                        backgroundImage: `url(./src/assets/modes-images/restaurant3.jfif)`
                        }}>
                            <p className="explore-card-label">Ordering dinner</p>
                        </div>
                    </div>    
                </div>
            </div>

        </>
    )
: selectedMode === 'progress' ? (
   <>

    <div className="mobile-header">
                <img src="./public/header-logo.png" alt="header-logo" />
                <span onClick={() => {
                    setIsMobileModalOpen(true)
                    setIsMobileProfileOpen(true)
                }}  className="fa-regular fa-user"></span>
    </div>

    <div className="progress-header">
        <h2>Progress</h2>
    </div>

    <p className="progress-info-text">
        View your learning progress and statistics.
    </p>

    <div className="progress-grid">
        <div className="progress-stat-large">

            <div className="progress-level-subdiv">
                <p className="font-medium">Level {progressLevel}</p>
                <p className="font-light-small">Your current level.</p>
            </div>

            <div className="border-div"></div>

            <div className="progress-level-subdiv">
                <p className="font-base">Minutes till the next level: {`${pointsToNextLevel} ${pointsToNextLevel === 1 ? `minute` : `minutes`}`}</p>
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
                <p className="font-medium dark font-base">Ongoing streak:</p>
                <div className="streak-number-dark"><p className="font-small">{`${streakCount} ${streakCount === 1 ? 'day' : 'days'}`}</p></div>
            </div>

            <div className="border-div"></div>

            <div className="progress-streak-subdiv">
                <p className="font-medium dark font-base">Longest streak:</p>
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

                <p className="font-medium dark font-base">
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

                <p className="font-medium dark font-base">
                {`${totalMessages} ${totalMessages === 1 ? 'message' : 'messages'}`}
                </p>


                
            </div>


        </div>

        
    </div>
        
        
    </>
            ) : (
                <>
                    

                    <div className="mobile-header">
                        <img src="./public/header-logo.png" alt="header-logo" />
                        <span onClick={() => {
                            setIsMobileModalOpen(true)
                            setIsMobileProfileOpen(true)
                        }}  className="fa-regular fa-user"></span>
                    </div>


                    <div className="slider-horizontal">
                        <div className="slider-wrapper" ref={sliderWrapperRef}>
                        
                            <div className="slider-item-swipe">
                                <div className="slider-item slider-item-one">
                                    <p className="slider-big-text">Hello, Elmir!</p>
                                    <p className="slider-par">Have you tried our Explore tab? We have interesting things to show you.</p>
                                    <div className="slider-options-div">
                                        <p>See your daily pick</p>
                                        <span className="fa-solid fa-arrow-right"></span>
                                    </div>

                                </div>
                            </div>

                            <div className="slider-item-swipe">
                                <div className="slider-item slider-item-two">
                                    <p className="slider-big-text">Hello, Elmir!</p>
                                    <p className="slider-par">Have you tried our Explore tab? We have interesting things to show you.</p>
                                    <div className="slider-options-div">
                                        <p>See your daily pick</p>
                                        <span className="fa-solid fa-arrow-right"></span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="main-label-div">
                        <p>Learning modes</p>
                    </div>

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