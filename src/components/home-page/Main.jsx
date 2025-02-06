import React, { useState, useEffect, useRef } from 'react';
import ChatCard from './ChatCard';
import QuizCard from  './QuizCard';

export default function Main(props) {
    const {
        selectedMode, setSelectedMode, handleSelectedMode, activeTab, setActiveTab, handleTabChange,
        progressLevel, progressScore, progressPercentage, levelThresholds, longestStreak, streakCount,
        savedChats, setIsMobileModalOpen, isMobileProfileOpen, setIsMobileProfileOpen, isMobileModalOpen,
        userName
    } = props;



    const sliderWrapperRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);


    const pointsToNextLevel = levelThresholds[progressLevel] - progressScore;
    const totalMessages = savedChats.reduce((total, chat) => total + chat.messages.length, 0);


    // Scroll to top of the scrollable div when selectedMode is changed

    useEffect(() => {
        window.scrollTo(0, 0)

        const scrollableElements = document.querySelectorAll('.scrollable');
        scrollableElements.forEach(element => {
            
            element.scrollTop = 0;
        });

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            scrollableElements.forEach(element => {
                element.scrollTop = 0;
            });
        }, 100);
    }, [selectedMode]);



    // Slider wrapper


    useEffect(() => {
        if (sliderWrapperRef.current) {
            sliderWrapperRef.current.scrollLeft = 0;
        }
        setIsDragging(false);
        setStartX(0);
        setScrollLeft(0);
        setDragDistance(0);
    }, [selectedMode]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderWrapperRef.current.offsetLeft);
        setScrollLeft(sliderWrapperRef.current.scrollLeft);
        setDragDistance(0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);

        if (Math.abs(dragDistance) < 5) {
            const sliderWrapper = sliderWrapperRef.current;
            const sliderItems = sliderWrapper.querySelectorAll(".slider-item-swipe");

            sliderItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                if (
                    e.clientX >= itemRect.left &&
                    e.clientX <= itemRect.right &&
                    e.clientY >= itemRect.top &&
                    e.clientY <= itemRect.bottom
                ) {
                    if (index === 0) {
                        setSelectedMode("explore");
                    } else if (index === 1) {
                        setSelectedMode("progress");
                    }
                }
            });
        }

        snapToNearest();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderWrapperRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderWrapperRef.current.scrollLeft = scrollLeft - walk;
        setDragDistance(walk);
    };

    const snapToNearest = () => {
        const sliderWrapper = sliderWrapperRef.current;
        const sliderItems = sliderWrapper.querySelectorAll(".slider-item-swipe");
        const itemWidth = sliderItems[0].offsetWidth;
        const itemGap = parseInt(getComputedStyle(sliderWrapper).gap);

        const nearestIndex = Math.round(sliderWrapper.scrollLeft / (itemWidth + itemGap));
        const nearestOffset = nearestIndex * (itemWidth + itemGap);

        sliderWrapper.scrollTo({
            left: nearestOffset,
            behavior: "smooth",
        });
    };


    // On mobile devices

    const handleTouchStart = (e) => {
        handleMouseDown(e.touches[0]);
    };

    const handleTouchMove = (e) => {
        handleMouseMove(e.touches[0]);
    };

    const handleTouchEnd = () => {
        handleMouseUp();
    }



    useEffect(() => {
        const sliderWrapper = sliderWrapperRef.current;
        if (!sliderWrapper) return;

        sliderWrapper.addEventListener("touchstart", handleTouchStart);
        sliderWrapper.addEventListener("touchmove", handleTouchMove);
        sliderWrapper.addEventListener("touchend", handleTouchEnd);

        return () => {
            sliderWrapper.removeEventListener("touchstart", handleTouchStart);
            sliderWrapper.removeEventListener("touchmove", handleTouchMove);
            sliderWrapper.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging, startX, scrollLeft])





    

    return (
        <div className="main-div scrollable">

            {selectedMode === 'explore' ? (
                <>
                    <div className="mobile-header">
                        <img onClick={() => setSelectedMode('main')} src="/header-logo.png" alt="header-logo" />
                        <span onClick={() => {
                            setIsMobileModalOpen(true)
                            setIsMobileProfileOpen(true)
                        }} className="fa-regular fa-user"></span>
                    </div>

                    <div className="main-label-div explore">
                        <p>Explore</p>
                    </div>

                    <p className="text-small-info">
                        Find your daily picks below.
                    </p>

                    <div className="explore-options scrollable">

                        <div className="explore-card">
                            <div className="explore-card-head">
                                <p className="explore-header">Your daily pick</p>
                                <div className="card-tags">
                                    <span className="tag">Speaking</span>
                                    <span className="tag">Listening</span>
                                </div>
                            </div>
                            <p className="explore-desc">Here is your daily pick to improve your language learning skills with engaging experience.</p>
                            <div className="border-div"></div>
                            <p className="explore-options-label">Dialogue</p>
                            <div onClick={() => setSelectedMode('interview')} className="explore-card-option" style={{
                                backgroundImage: `url(/modes-images/interviewimage.jfif)`
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
                                <div onClick={() => setSelectedMode('detective')} className="explore-card-option inline" style={{
                                    backgroundImage: `url(/modes-images/detective2.jfif)`
                                }}>
                                    <p className="explore-card-label">Detective</p>
                                </div>
                                <div onClick={() => setSelectedMode('time-traveler')} className="explore-card-option inline" style={{
                                    backgroundImage: `url(/modes-images/time-traveler2.jfif)`
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
                                <div onClick={() => setSelectedMode('debate-mandatory-voting')} className="explore-card-option" style={{
                                    backgroundImage: `url(/modes-images/voting.jfif)`
                                }}>
                                    <p className="explore-card-label">Should voting be mandatory?</p>
                                </div>
                                <div onClick={() => setSelectedMode('debate-freedom-speech')} className="explore-card-option " style={{
                                    backgroundImage: `url(/modes-images/speech.jfif)`
                                }}>
                                    <p className="explore-card-label">Freedom of speech</p>
                                </div>
                            </div>
                        </div>

                        <div className="explore-card">
                            <div className="explore-card-head">
                                <p className="explore-header">Dialogues</p>
                                <div className="card-tags">
                                    <span className="tag">Vocabulary</span>
                                    <span className="tag">Writing</span>
                                </div>
                            </div>
                            <p className="explore-desc">Practice essential daily vocabulary with pre-scripted conversations.</p>
                            <div className="border-div"></div>
                            <p className="explore-options-label">Today's dialogues</p>
                            <div className="explore-cards-inline">
                                <div onClick={() => setSelectedMode('airport')} className="explore-card-option inline" style={{
                                    backgroundImage: `url(/modes-images/airport1.jfif)`
                                }}>
                                    <p className="explore-card-label">Airport</p>
                                </div>
                                <div onClick={() => setSelectedMode('ordering-dinner')} className="explore-card-option inline" style={{
                                    backgroundImage: `url(/modes-images/restaurant3.jfif)`
                                }}>
                                    <p className="explore-card-label">Ordering dinner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : selectedMode === 'progress' ? (
                <>
                    <div className="mobile-header">
                        <img onClick={() => setSelectedMode('main')} src="/header-logo.png" alt="header-logo" />
                        <span onClick={() => {
                            setIsMobileModalOpen(true)
                            setIsMobileProfileOpen(true)
                        }} className="fa-regular fa-user"></span>
                    </div>

                    <div className="progress-header">
                        <h2>Progress</h2>
                    </div>

                    <p className="progress-info-text">
                        View your learning progress and statistics.
                    </p>

                    <div className="border-div"></div>

                    <div className="progress-grid scrollable">
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
                                <p className="font-light-small dark">Send at least one message to complete a session.</p>
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
                        <img onClick={() => setSelectedMode('main')} src="/header-logo.png" alt="header-logo" />
                        <span onClick={() => {
                            setIsMobileModalOpen(true)
                            setIsMobileProfileOpen(true)
                        }} className="fa-regular fa-user"></span>
                    </div>

                    <div className="slider-horizontal">
                        <div className="slider-wrapper" ref={sliderWrapperRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>

                            <div className="slider-item-swipe">
                                <div className="slider-item slider-item-one">
                                    <p className="slider-big-text">Hello, {userName}!</p>
                                    <p className="slider-par">Have you tried our Explore tab? We have interesting things to show you.</p>
                                    <div className="slider-options-div">
                                        <p>See your daily pick</p>
                                        <span className="fa-solid fa-arrow-right"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="slider-item-swipe">
                                <div className="slider-item slider-item-two">
                                    <p className="slider-big-text">You are Level {progressLevel}</p>
                                    <p className="slider-par">Practice {pointsToNextLevel} more {pointsToNextLevel === 1 ? 'minute' : 'minutes'} in any of the modes and you will reach level {progressLevel + 1}. You can view all your learning statistics on the progress tab.</p>
                                    <div className="slider-options-div">
                                        <p>View your stats</p>
                                        <span className="fa-solid fa-arrow-right"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-label-div">
                        <p>Learning modes</p>
                    </div>

                    <div className="border-div"></div>

                    <div className={`chats-options scrollable ${activeTab === 'chats' ? 'active-tab' : ''}`}>
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
    );
}