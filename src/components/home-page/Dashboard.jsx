import { auth, db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, React, useRef } from "react";



export default function Dashboard(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, userName, setUserName, progressScore, progressLevel, levelThresholds, progressPercentage} = props
    const pointsToNextLevel = levelThresholds[progressLevel] - progressScore

    const sliderWrapperRef = useRef(null);
    
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0)
        const [scrollLeft, setScrollLeft] = useState(0)
        const [dragDistance, setDragDistance] = useState(0)


    useEffect(() => {
            // Reset slider state when returning to the page
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
                // If drag distance is less than 5px, consider it a click
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
                        // Set selectedMode based on the clicked item's index
                        if (index === 0) {
                            setSelectedMode("roleplay-modes");
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
        
          const handleTouchStart = (e) => {
            handleMouseDown(e.touches[0]);
          };
        
          const handleTouchMove = (e) => {
            handleMouseMove(e.touches[0]);
          };
        
          const handleTouchEnd = () => {
            handleMouseUp();
          };
        
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
          }, [isDragging, startX, scrollLeft]);
    

    return (
        <div className={`dashboard-div ${selectedMode === 'progress' ? 'dashboard-progress' : ''}`}>
            <div className="dashboard-header">
                <h1>{selectedMode === 'progress' ? 'Popular modes' : 'Dashboard'}</h1>
            </div>
            <div className='border-div'></div>
            {selectedMode === 'main' ? (
                <>
                <div className="slider-horizontal">
                        <div className="slider-wrapper" ref={sliderWrapperRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                        
                            <div className="slider-item-swipe">
                                <div className="slider-item slider-item-one">
                                    <p className="slider-big-text">Hello, {userName}!</p>
                                    <p className="slider-par">Have you tried our Roleplay mode? We have interesting things to show you.</p>
                                    <div className="slider-options-div">
                                        <p>See your roleplay picks</p>
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
                    <div className='border-div'></div>

                    <div className="progress-stat-large">

            <div className="progress-level-subdiv">
                <p className="font-medium">Level {progressLevel}</p>
                <p className="font-light-small">Your current level.</p>
            </div>

            <div className="border-div"></div>

            <div className="progress-level-subdiv">
                <p className="font-base">Minutes till the next level: {`${pointsToNextLevel} ${pointsToNextLevel === 1 ? `minute` : `minutes`}`}</p>
                <p className="font-light-small dark">Keep on learning!</p>
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

                    

                    <div className="progress-stat-small">

            <div className="progress-level-subdiv">
                <p className="font-medium dark">Learning time</p>
                <p className="font-light-small dark">Your total learning time.</p>
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
        </>)
         : (<>
         
                <div onClick={() => setSelectedMode('default-chat')} className='popular-card'>

                    <p className='font-medium'>
                        Chat
                    </p>

                    <p className='font-base'>
                    Enhance your language skills by chatting with our AI teacher.
                    </p>

                    <span className='tag'>Writing</span>

                </div>

                <div onClick={() => setSelectedMode('detective')} className='popular-card'>

                    <p className='font-medium'>
                        Detective
                    </p>

                    <p className='font-base'>
                    Learn new words and phrases by helping professional detective resolve the case.
                    </p>

                    <span className='tag'>Vocabulary</span>

                </div>
         
         
         </>)}

        </div>
    )
}