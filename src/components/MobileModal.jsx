import { useRef, useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";

export default function MobileModal(props) {
    const { setIsMobileModalOpen, isMobileProfileOpen, setIsMobileProfileOpen, accountSelectedOption, setAccountSelectedOption, isMobileModalOpen, setSelectedMode, isChatSettingsModalOpen, setIsChatSettingsModalOpen, setActiveChat, handleStartNewChat, isMobileChatInfoVisible, setIsMobileChatInfoVisible, isMobileChatHistory, setIsMobileChatHistory, isChatHistoryOpen, setIsChatHistoryOpen, selectedMessage, setSelectedMessage, feedback, setFeedback, targetLanguage } = props;

    const modalRef = useRef(null);
    const [dragStartY, setDragStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isMobileModalOpen) {
            // Reset modal position and dragging state when opened
            if (modalRef.current) {
                modalRef.current.style.transform = "translateY(0)";
            }
            setDragStartY(0);
            setIsDragging(false);

            const handleInitialDragStart = (e) => {
                setIsDragging(true);
                handleDragStart(e);
            };
            const dragElement = modalRef.current.querySelector('.modal-drag-down');
            dragElement.addEventListener('mousedown', handleInitialDragStart);
            dragElement.addEventListener('touchstart', handleInitialDragStart);
    
            return () => {
                dragElement.removeEventListener('mousedown', handleInitialDragStart);
                dragElement.removeEventListener('touchstart', handleInitialDragStart);
            };
        }
        
    }, [isMobileModalOpen]);

    const handleDragStart = (e) => {
        e.preventDefault()
        const startY = e.touches ? e.touches[0].clientY : e.clientY; // Support touch and mouse events
        setDragStartY(startY);
        setIsDragging(true);

        if (modalRef.current) {
            modalRef.current.style.transition = ""; // Clear any existing transition styles
        }

        // Attach the move and end listeners
        window.addEventListener("mousemove", handleDragMove);
        window.addEventListener("mouseup", handleDragEnd);
        window.addEventListener("touchmove", handleDragMove);
        window.addEventListener("touchend", handleDragEnd);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const offsetY = currentY - dragStartY;

        if (offsetY > 0 && modalRef.current) {
            modalRef.current.style.transform = `translateY(${offsetY}px)`;
        }
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        const endY = e.touches ? e.changedTouches[0].clientY : e.clientY;
        const offsetY = endY - dragStartY;

        if (offsetY > 50) {
            closeModal();
        } else if (modalRef.current) {
            modalRef.current.style.transition = "transform 0.3s ease-out";
            modalRef.current.style.transform = "translateY(0)";
        }

        setIsDragging(false);

        // Detach the move and end listeners
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchmove", handleDragMove);
        window.removeEventListener("touchend", handleDragEnd);
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.style.transition = "transform 0.3s ease-out";
            modalRef.current.style.transform = "translateY(100%)";
        }

        setTimeout(() => {
            setIsMobileModalOpen(false);
            setIsMobileProfileOpen(false);
            if (modalRef.current) {
                modalRef.current.style.transition = "";
            }
        }, 400); // Match the duration of the transition
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <div
                className={`mobile-modal-underlay ${isMobileModalOpen ? "open" : ""}`}
                onClick={() => {
                    setIsMobileModalOpen(false);
                    setTimeout(() => {
                        setIsMobileProfileOpen(false);
                        setSelectedMessage(null)
                    }, 2000);
                }}
            ></div>
            <div ref={modalRef} className={`mobile-modal ${isMobileModalOpen ? "open" : ""}`}>
                <div
                    className="modal-drag-down"
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                >
                    <div className="drag-indicator"></div>
                </div>
                {isMobileProfileOpen ? (
                    <div className="profile-list-div modal">
                        <div className="profile-header">
                            <h2>Account settings</h2>
                        </div>
                        <div className="profile-menu">
                            <div className="profile-menu-btn" onClick={() => {
                                setSelectedMode('profile-mode')
                                setAccountSelectedOption("profile")
                                closeModal()
                            } }>
                                <span className="fa-regular fa-user"></span>
                                <div className="profile-menu-text">
                                    <p>Profile</p>
                                    <p className="profile-menu-small-text">Manage your profile details.</p>
                                </div>
                            </div>
                            <div className="profile-menu-btn" onClick={() => {
                                setSelectedMode('profile-mode')
                                setAccountSelectedOption("settings")
                                closeModal()
                            } }>
                                <span className="fa-solid fa-gear"></span>
                                <div className="profile-menu-text">
                                    <p>Settings</p>
                                    <p className="profile-menu-small-text">Manage your account settings.</p>
                                </div>
                            </div>
                            <div className="profile-menu-btn" onClick={handleLogout}>
                                <span className="fa-solid fa-arrow-right-from-bracket"></span>
                                <div className="profile-menu-text">
                                    <p className="log-out-text">Log out</p>
                                    <p className="profile-menu-small-text">Log out from this profile.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selectedMessage?.feedback ? (
                    <div className="feedback-modal">
                       <div className="feedback-modal-first"> 
                        <div className="user-msg-severity">
                            <div className="severity-mark">
                                <span className={selectedMessage?.feedback?.severity}></span>
                            </div>
                        </div>
                        <div className="msg">
                            <p className={`small-text ${selectedMessage?.feedback?.severity}`}>Your message</p>
                            <p className="base-text">{selectedMessage?.text}</p>
                        </div>
                        </div>

                        <div className={`feedback-modal-second ${selectedMessage?.feedback?.severity}`}>
                            <p className="feedback-short">
                                {selectedMessage?.feedback?.severity === 'green' ? 'Good job!' : 'Mistake'}
                            </p>

                            <p className="feedback-explanation">
                                {selectedMessage?.feedback?.explanation}
                            </p>
                        </div>
                    </div>

                    
                ) : selectedMessage?.translation ? (

                    <div className="translation-modal">

                        <div className="translation-header">
                            <h2>Translation</h2>
                        </div>

                        <div className="border-div"></div>

                        <div className="translation-msg">
                            <p className="translation-language">
                                {targetLanguage}
                            </p>

                            <p className="translation-message">
                                {selectedMessage.text}
                            </p>

                        </div>

                        <div className="border-div"></div>

                        <div className="translation-msg">
                            <p className="translation-language">
                                {selectedMessage?.translation.language}
                            </p>

                            <p className="translation-message">
                                {selectedMessage?.translation.content}
                            </p>

                        </div>

                    </div>

                ) : isChatSettingsModalOpen ? (
                    <div className="profile-list-div modal">
                        
                        <div className="profile-menu">

                            <div className="modal-menu-btns-div">
                            <div className="profile-menu-btn" onClick={() => {
                                setActiveChat(null)
                                handleStartNewChat()
                                closeModal()
                            } }>
                                <img src="./public/new-message.png" alt="new-chat" />
                                <div className="profile-menu-text">
                                    <p>Start a new chat</p>
                                    <p className="profile-menu-small-text">End the current chat and start a new one.</p>
                                </div>
                            </div>
                            <div className="profile-menu-btn" onClick={() => {
                                setIsMobileChatInfoVisible(true)
                                setIsChatHistoryOpen(true)
                                closeModal()
                            } }>
                                <img src="./public/history.png" alt="new-chat" />
                                <div className="profile-menu-text">
                                    <p>See chat history</p>
                                    <p className="profile-menu-small-text">You can view and manage your previous conversations.</p>
                                </div>
                            </div>
                            </div>



                            <div className="profile-menu-btn" onClick={() => {
                                setIsMobileChatInfoVisible(true)
                                setSelectedMessage({
                                    settings: true
                                  })
                                closeModal()
                            } }>
                                <img src="./public/settings.png" alt="new-chat" />
                                <div className="profile-menu-text">
                                    <p>Settings</p>
                                    <p className="profile-menu-small-text">Manage your chat settings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null }
            </div>
        </>
    );
}
