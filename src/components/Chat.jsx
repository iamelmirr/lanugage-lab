import { useState, useRef, useEffect } from "react";
import React from "react"
window.global = window;
window.process = {
    env: { DEBUG: undefined },
}
import { Buffer } from 'buffer'
window.Buffer = Buffer
import { doc, updateDoc, getDoc, increment } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import * as speechSdk from 'microsoft-cognitiveservices-speech-sdk';
import { use } from "react";











export default function Chat(props) {
    const { selectedMode, setSelectedMode, handleSelectedMode, progressScore, setProgressScore, targetLanguage, translationLanguage, targetLanguageLevel, learningGoal, learningReason, isMuted, setIsMuted, savedChats, setSavedChats, showOptionsModal, setShowOptionsModal, setTargetLanguageLevel, setTranslationLanguage, voiceSpeed, setVoiceSpeed, showSuggestionBar, setShowSuggestionBar, streakCount, setStreakCount, longestStreak, setLongestStreak, lastChatDate, setLastChatDate, todaysChatTime, setTodaysChatTime, isChatSettingsModalOpen, setIsChatSettingsModalOpen, isMobileModalOpen, setIsMobileModalOpen, isChatInfoVisible, setIsChatInfoVisible, activeChat, setActiveChat, messages, setMessages, showGenderModal, setShowGenderModal, tutorName, setTutorName, tutorImage, setTutorImage, chatModes, tutorGender, setTutorGender, userGender, setUserGender, isMobileChatInfoVisible, setIsMobileChatInfoVisible, isMobileChatHistory, setIsMobileChatHistory, isChatHistoryOpen, setIsChatHistoryOpen, selectedMessage, setSelectedMessage, feedback, setFeedback } = props;

    
    
    
    
    const [isPlayingAudio, setIsPlayingAudio] = useState(false)
    const [hasLoadedInitialChat, setHasLoadedInitialChat] = useState(false);
    
    

    const translationLanguages = [
        { code: 'hr', name: 'Croatian', flag: './public/flags/croatian.png'},
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'de', name: 'German', flag: './public/flags/german.png' },
        { code: 'es', name: 'Spanish', flag: './public/flags/spanish.png' },
        { code: 'it', name: 'Italian', flag: './public/flags/italian.png' },
        { code: 'fr', name: 'French', flag: './public/flags/french.png' }
    ];

    const levels = [
        { code: 'a1-a2', name: 'Beginner (A1 - A2)' },
        { code: 'b1-b2', name: 'Intermediate (B1 - B2)' },
        { code: 'c1-c2', name: 'Advanced (C1 - C2)' }
      ];


    useEffect(() => {
        if (messages.length === 0 && !hasLoadedInitialChat) {
            if (savedChats.length > 0) {
                const latestChat = savedChats
                    .filter(chat => chat.mode === selectedMode)
                    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))[0];
                
                if (latestChat) {
                    setMessages(latestChat.messages);
                    setActiveChat(latestChat)
                    setTutorName(latestChat.tutorName)
                } else {
                    if (selectedMode === 'date') {
                        setMessages([])
                        setActiveChat(null)
                    } else {
                        setMessages([chatModes[selectedMode]?.firstMessage[targetLanguage]]);
                        setActiveChat(null)
                        setTutorName([chatModes[selectedMode]?.teacherInfo[targetLanguage].name])
                        setTutorImage([chatModes[selectedMode]?.teacherInfo[targetLanguage].image])
                    }
                }
            
            }   else {
                if (selectedMode === 'date') {
                    setMessages([])
                    setActiveChat(null)
                } else {
                    setMessages([chatModes[selectedMode]?.firstMessage[targetLanguage]]);
                    setTutorName([chatModes[selectedMode]?.teacherInfo[targetLanguage].name])
                    setTutorImage([chatModes[selectedMode]?.teacherInfo[targetLanguage].image])
                    setActiveChat(null)
                }
            }
            setHasLoadedInitialChat(true)
            console.log("saved chats:", savedChats)
            console.log("activeChat:", activeChat)
        }}, [selectedMode]);


      useEffect(() => {
        if (selectedMode === 'date' && messages.length === 0) {
          // Show modal instead of first message
          setShowGenderModal(true)
        }      
      }, [selectedMode])


    const saveChat = async () => {
        if (!auth.currentUser) return;
        
        // Check if there's an existing chat for this mode
        
        
        const chatData = {
            id: activeChat ? activeChat.id : Date.now().toString(),
            mode: selectedMode,
            messages: messages.length > 100 ? messages.slice(-100) : messages,
            lastUpdated: new Date().toISOString(),
            isActive: true,
            tutorName: tutorName,
            tutorImage: tutorImage
        };
        
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        
        if (activeChat) {
            // Update existing chat
            const updatedChats = savedChats.map(chat => 
                chat.id === activeChat.id ? chatData : chat
            );
            setSavedChats(updatedChats);
            await updateDoc(userDocRef, {
                savedChats: updatedChats
            });
            
        } else {
            // Save new chat
            const newChats = [...savedChats, {
                id: Date.now().toString(),
                mode: selectedMode,
                messages: messages,
                lastUpdated: new Date().toISOString(),
                isActive: true,
                tutorName: tutorName,
                tutorImage: tutorImage
            }];
            setSavedChats(newChats);
            setActiveChat({
                id: Date.now().toString(),
                mode: selectedMode,
                messages: messages,
                lastUpdated: new Date().toISOString(),
                isActive: true,
                tutorName: tutorName,
                tutorImage: tutorImage
            })
            await updateDoc(userDocRef, {
                savedChats: newChats
            });
            
            
        }
        console.log("saved chats:", savedChats)
        console.log("activeChat:", activeChat)
    };

      

    const updateChatTime = async () => {
        const now = new Date();
        const today = now.toDateString();

        
        
        console.log("streak count:", streakCount)
        console.log("longest streak:", longestStreak)
        console.log("last chat date:", lastChatDate)
    
        // If chat time reaches 3 minutes (180 seconds) and hasn't been counted today
        if (lastChatDate !== today) {

            console.log("started updateChatTime")
            
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const isContinuingStreak = lastChatDate === yesterday.toDateString();
    
            const newStreak = isContinuingStreak ? streakCount + 1 : 1;
            const longestStreakValue = Math.max(longestStreak, newStreak);
    
            setStreakCount(newStreak);
            setLongestStreak(longestStreakValue);
            setLastChatDate(today);
    
            // Update Firebase
            if (auth.currentUser) {
                const userDocRef = doc(db, "users", auth.currentUser.uid);
                try {
                    await updateDoc(userDocRef, {
                        streakCount: newStreak,
                        longestStreak: longestStreakValue,
                        lastChatDate: today,
                        
                    });
                    console.log("Streak data updated successfully!");
                } catch (error) {
                    console.error("Error updating streak data:", error);
                }
            }
        }   else {
            console.log("Message sent on the same day, no streak update needed.");
        }
    };
      



const topicLabels = {
    English: {
        dailyChat: "Daily Chat",
        funFact: "Fun Fact",
        youDecide: "You Decide"
    },
    Spanish: {
        dailyChat: "Charla Diaria",
        funFact: "Dato Curioso",
        youDecide: "Tú Decides"
    },
    French: {
        dailyChat: "Discussion Quotidienne",
        funFact: "Anecdote",
        youDecide: "Tu Décides"
    },
    Italian: {
        dailyChat: "Chiacchierata Quotidiana",
        funFact: "Curiosità",
        youDecide: "Tu Decidi"
    },
    German: {
        dailyChat: "Täglicher Chat",
        funFact: "Interessante Fakten",
        youDecide: "Du Entscheidest"
    }
};





    const [inputValue, setInputValue] = useState("");
    const [suggestedAnswer, setSuggestedAnswer] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const recognitionRef = useRef(null)
    const chatContainerRef = useRef(null)
    const lastMessageRef = useRef(null)
    const [currentAudio, setCurrentAudio] = useState(null)
    
    const [translationMessage, setTranslationMessage] = useState('')
    
    

    

      


      const loadChat = (chatId) => {
        const chat = savedChats.find(c => c.id === chatId);
        if (chat) {
        setMessages([]); // Clear messages first
        setTimeout(() => {
            setMessages(chat.messages);
            setTutorName(chat.tutorName)
            setTutorImage(chat.tutorImage)
            if (chat.tutorName === 'Mia') {
                setTutorGender('female')
            } else if (chat.tutorName === 'Noah') {
                setTutorGender('male')
            } // Set messages after a brief delay
        }, 0);

        

        setActiveChat(chat)
        console.log("activeChat:", activeChat)
        setSelectedMode(chat.mode);
    }
    console.log("saved chats:", savedChats)
      };

      



    const synthesizeSpeech = (text, voice = "en-US-JennyNeural") => {

        return new Promise((resolve, reject) => {
            const speechConfig = speechSdk.SpeechConfig.fromSubscription(
                import.meta.env.VITE_AZURE_SPEECH_KEY,
                import.meta.env.VITE_AZURE_REGION
            );
            
            speechConfig.speechSynthesisVoiceName = voice;
            
            // Update the SSML to include the VOICE tag
            const ssmlText = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
                <voice name="${voice}">
                    <prosody rate="${voiceSpeed}">${text}</prosody>
                </voice>
            </speak>`;
    
            const synthesizer = new speechSdk.SpeechSynthesizer(speechConfig, null);
            
            synthesizer.speakSsmlAsync(
                ssmlText,
                result => {
                    if (result.reason === speechSdk.ResultReason.SynthesizingAudioCompleted) {
                        resolve(result.audioData);
                    } else {
                        reject(`Failed: ${result.errorDetails}`);
                    }
                    synthesizer.close();
                },
                error => {
                    console.error("Error during speech synthesis:", error);
                    synthesizer.close();
                    reject(error);
                }
            );
        });
    };




    
    
        const handleSpeech = async () => {
            if (isMuted || messages.length === 0) return;

        
                let voice;
        if (selectedMode === 'date' && tutorGender === 'female') {
            // Female voices for date mode
            voice = targetLanguage === "English" ? "en-US-JennyNeural"
                : targetLanguage === "Spanish" ? "es-ES-ElviraNeural"
                : targetLanguage === "French" ? "fr-FR-DeniseNeural"
                : targetLanguage === "German" ? "de-DE-KatjaNeural"
                : targetLanguage === "Italian" ? "it-IT-ElsaNeural"
                : "en-US-JennyNeural";
        } else {
            // Existing voices for other modes
            voice = targetLanguage === "English" ? "en-US-BrandonNeural"
                : targetLanguage === "Spanish" ? "es-ES-TristanMultilingualNeural"
                : targetLanguage === "French" ? "fr-FR-LucienMultilingualNeural"
                : targetLanguage === "German" ? "de-DE-ConradNeural"
                : targetLanguage === "Italian" ? "it-IT-GiuseppeMultilingualNeural"
                : "en-US-BrandonNeural";
    }


            const lastMessage = messages[messages.length - 1];
            if (lastMessage.sender === "assistant") {
                
        
                try {

                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                        URL.revokeObjectURL(currentAudio.src);
                        setCurrentAudio(null);
                        setIsPlayingAudio(false);
                    }

                    const audioData = await synthesizeSpeech(lastMessage.text, voice);
                    const audioBlob = new Blob([audioData], { type: "audio/wav" });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    
                    setCurrentAudio(audio);
                    setIsPlayingAudio(true);
                    
                    audio.play(); // Now you control when to play
        
                    audio.onended = () => {
                        setCurrentAudio(null);
                        setIsPlayingAudio(false);
                    };
                } catch (error) {
                    console.error("Error in handleSpeech:", error);
                }
            }
        };

        useEffect(() => {
            const lastMessage = messages[messages.length - 1];
            
            if (messages.length > 1 && lastMessage.sender === 'assistant') { 
              saveChat();
              updateChatTime()
            } 
          }, [messages]);


        useEffect(() => {
            const lastMessage = messages[messages.length - 1];
            
            if (messages.length > 0 && lastMessage.sender === 'assistant') { 
              handleSpeech()
            } 
        }, [messages])  
    



    const handleLanguageChange = async (newLanguage, type) => {
            try {
                const user = auth.currentUser;
                if (!user) return;
        
                const userDocRef = doc(db, "users", user.uid);
                
                // Update state based on type
                
                setTranslationLanguage(newLanguage);
                
        
                // Update Firebase
                await updateDoc(userDocRef, {
                    [type === 'target' ? 'language' : 'translationLanguage']: newLanguage
                });
        
            } catch (error) {
                console.error("Error updating language:", error);
            }
        };


    const CustomSelect = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectRef = useRef(null);
        const selectedLanguage = options.find(lang => lang.name === value);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
    
        return (
            <div className="select-container" ref={selectRef}>
                <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedLanguage && <img src={selectedLanguage.flag} alt={value} />}
                    <span>{value}</span>
                    <span className="fa-solid fa-chevron-down"></span>
                </div>
                
                {isOpen && (
                    <div className="custom-select">
                        {options.map(lang => (
                            <div 
                                key={lang.code} 
                                className={`select-option ${value === lang.code ? 'selected' : ''}`}
                                onClick={() => onChange(lang.name)}
                            >
                                <img src={lang.flag} alt={lang.name} />
                                <span>{lang.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const CustomLevelSelect = ({ options, value, onChange }) => {
            const [isOpen, setIsOpen] = useState(false);
            const selectRef = useRef(null);

            useEffect(() => {
                const handleClickOutside = (event) => {
                    if (selectRef.current && !selectRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                };
        
                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }, []);

    
            const handleLevelChange = async (newLevel) => {
                try {
                    const user = auth.currentUser;
                    if (!user) return;
                    
                    const userDocRef = doc(db, "users", user.uid);
                    
                    // Update state
                    onChange(newLevel);
                    
                    // Update Firebase
                    await updateDoc(userDocRef, {
                        level: newLevel
                    });
                    
                    setIsOpen(false);
                } catch (error) {
                    console.error("Error updating level:", error);
                }
            };
            
            return (
                <div className="select-container" ref={selectRef}>
                    <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
                        <span>{value}</span>
                        <span className="fa-solid fa-chevron-down"></span>
                    </div>
                    
                    {isOpen && (
                        <div className="custom-select">
                            {options.map(level => (
                                <div 
                                key={level.code} 
                                className={`select-option ${value === level.name ? 'selected' : ''}`}
                                onClick={() => handleLevelChange(level.name)}
                            >
                                <span>{level.name}</span>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        };

    const GenderSelectionModal = () => {
        
        return (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
            <div className="modal-content" style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <h2>Select your gender</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => {
                  setUserGender('male');
                  // Update context for AI to play female role
                  setTutorGender('female')
                  setTutorName('Mia')
                  setTutorImage(chatModes?.date?.teacherInfo?.female.image)
                  setShowGenderModal(false)
                  setMessages([{
                    sender: "assistant",
                    text: chatModes?.date?.firstMessage[targetLanguage]['male'].text
                }])
                
                  
                  

                }}>Male</button>
                <button onClick={() => {
                  setUserGender('female');
                  setTutorGender('male')
                  setTutorName('Noah')
                  setTutorImage(chatModes?.date?.teacherInfo?.male.image)
                  setShowGenderModal(false)
                  setMessages([{
                    sender: "assistant",
                    text: chatModes?.date?.firstMessage[targetLanguage]['female'].text
                }])
                
                  
                  
                  
                }}>Female</button>
              </div>
            </div>
          </div>
        );
      }; 


      const OptionsModal = () => (
        <>
          <div className="modal-overlay" onClick={(e) => { e.stopPropagation()
             setShowOptionsModal(false)}} />
          <div className="options-modal" style={{
            position: 'absolute',
            top: '20px',
            right: '-10px',
            background: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            padding: '8px 0',
            zIndex: 5,
            minWidth: '200px'
          }}>
              <button style={{
                width: '100%', // Add this line
                padding: '8px 16px', // Add padding
                textAlign: 'left'
              }} onClick={() => {
                setActiveChat(null)
                handleStartNewChat()}}>Start a new chat</button>
              <button style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left'
              }} onClick={() => {
                setIsChatInfoVisible(true)
                setIsChatHistoryOpen(true)
                setSelectedMessage('')}}>See chat history</button>
              <button style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left'
              }} onClick={() => {
                setIsChatInfoVisible(true)
                setIsChatHistoryOpen(false)
                setSelectedMessage({
                  settings: true
                })
                }}>Settings</button>
            </div>
  </>
);

      


    useEffect(() => {
        const timer = setInterval(() => {
          
          props.setProgressScore(prev => prev + 1);
          
        }, 60000); 
      
        return () => clearInterval(timer);
      }, [])


    useEffect(() => {
        const speechKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
        const serviceRegion = import.meta.env.VITE_AZURE_REGION;

        if (!speechKey || !serviceRegion) {
            console.error("Azure Speech key or region missing.");
            return;
        }

        const speechConfig = speechSdk.SpeechConfig.fromSubscription(speechKey, serviceRegion);
        speechConfig.speechRecognitionLanguage = "en-US";

        const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();

        const recognizer = new speechSdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognized = (s, e) => {
            if (e.result.reason === speechSdk.ResultReason.RecognizedSpeech) {
                const recognizedText = e.result.text;
                console.log(recognizedText)
                if (recognizedText.trim()) {  
                    handleSendMessage({ sender: "user", text: recognizedText.trim() });
                }
                setIsRecording(false);
            }
        }

        recognizer.canceled = (s, e) => {
            console.error(`Recognition canceled: ${e.errorDetails}`);
            setIsRecording(false);
        };

        recognitionRef.current = recognizer;

        return () => {
            recognizer.close();
        };
    }, [])

    

    

    useEffect(() => {
        if (isMuted && currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            URL.revokeObjectURL(currentAudio.src);
            setCurrentAudio(null);
            setIsPlayingAudio(false);
        } else {
            handleSpeech()
        }
    }, [isMuted]);
    
    
    useEffect(() => {
        console.log(messages)
    }, [messages])
    

    useEffect(() => {
        
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])





    

    
    const handleMicrophonePress = () => {
        if (recognitionRef.current) {
            setIsRecording(true);
            recognitionRef.current.startContinuousRecognitionAsync();
        }
    };

    const handleMicrophoneRelease = () => {
        if (recognitionRef.current) {
            setIsRecording(false);
            recognitionRef.current.stopContinuousRecognitionAsync();
        }
    };
    




    const handleRepeatMessage = async (messageText) => {
        if (isPlayingAudio) {
            console.log("An audio is already playing. Skipping repeat.");
            return;
        }
    
        try {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                URL.revokeObjectURL(currentAudio.src);
            }
    
            if (isMuted) {
                console.log("Muted. No audio will play.");
                return;
            }
    
            let voice;
            if (selectedMode === 'date' && tutorGender === 'female') {
                // Female voices for date mode
                voice = targetLanguage === "English" ? "en-US-JennyNeural"
                    : targetLanguage === "Spanish" ? "es-ES-ElviraNeural"
                    : targetLanguage === "French" ? "fr-FR-DeniseNeural"
                    : targetLanguage === "German" ? "de-DE-KatjaNeural"
                    : targetLanguage === "Italian" ? "it-IT-ElsaNeural"
                    : "en-US-JennyNeural";
            } else {
                // Existing voices for other modes
                voice = targetLanguage === "English" ? "en-US-BrandonNeural"
                    : targetLanguage === "Spanish" ? "es-ES-TristanMultilingualNeural"
                    : targetLanguage === "French" ? "fr-FR-LucienMultilingualNeural"
                    : targetLanguage === "German" ? "de-DE-ConradNeural"
                    : targetLanguage === "Italian" ? "it-IT-GiuseppeMultilingualNeural"
                    : "en-US-BrandonNeural";
            }
    
            const audioData = await synthesizeSpeech(messageText, voice);
            const audioBlob = new Blob([audioData], { type: "audio/wav" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
    
            setCurrentAudio(audio);
            setIsPlayingAudio(true)
    
            audio.play();
    
            audio.onended = () => {
                setCurrentAudio(null);
                setIsPlayingAudio(false);
            };
        } catch (error) {
            console.error("Error in handleRepeatMessage:", error);
            setIsPlayingAudio(false)
        }
    };



    const handleGetMessageFeedback = async (message) => {
        if (message.sender !== "user") {return}

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: `Take a look at my last message in ${targetLanguage} language and analyze it like a language teacher (grammar, vocabulary etc.). If there are no mistakes, then severity is 'green'. If there is not so important mistake(s), then severity is 'yellow'. If there is an important mistake(s), then severity is 'red'. Always, no matter what, write this: "Severity: [green, yellow or red] Explanation: [your explanation for the mistakes and your recommendations on how to fix it. Write the explanation as if you are talking, address with you.] even if there are no mistakes and severity is green provide severity and explanation"` },
                        
                        { role: "user", content: message.text},
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";

            console.log(data.choices[0]?.message?.content)


            const severityMatch = fullResponse.match(/Severity:\s*\[?(green|yellow|red)\]?/i);
            const explanationMatch = fullResponse.match(/Explanation:\s*([^\n]+)/i);
            
            const severity = severityMatch ? severityMatch[1].toLowerCase() : "";
            const explanation = explanationMatch ? explanationMatch[1] : "";         
            
            console.log("Severity:", severity)
            console.log("Explanation:", explanation)

            setSelectedMessage({
                text: message.text,
                feedback: {
                    severity: severity,
                    explanation: explanation
                }
            });

            setIsChatInfoVisible(true);


        } catch (error) {
            console.error("Error fetching GPT response:", error);
            
        }

    }




    const handleSendMessage = async (message) => {
        
        if (!message?.text?.trim() && !inputValue.trim()) return;

        const userMessage = message || { sender: "user", text: inputValue };

        setSuggestedAnswer("")
        

        const modeContext = chatModes[selectedMode]?.context || "";

        setMessages(prev => [
            ...prev, 
            userMessage
        ])

        

        setInputValue("")

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: modeContext },
                        ...messages.map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                        { role: "user", content: message.text || inputValue },
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";

            console.log(data.choices[0]?.message?.content)

            const cleanedResponse = fullResponse.trim()           
            
            await setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])


        } catch (error) {
            console.error("Error fetching GPT response:", error);
        }

        
    };



     const handleCreateSuggestedAnswer = async () => {

        const lastAssistantMessage = messages[messages.length - 1]

        const modeContextSuggest = chatModes[selectedMode]?.context || "";

        setInputValue("")

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        ...messages.map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                        { role: "user", content: `Based on this conversation, how would average human respond to this last assistant's message: " ${lastAssistantMessage.text} "? Respond like the user only with the suggested response, nothing else. Don't aknowledge this message and don't say something like "Sure! I would respond with this:". Just answer with a straight response. Respond in ${targetLanguage} language, not any other language.` }
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const dataResponse = await response.json();
            const suggestedResponse = dataResponse.choices[0]?.message?.content || "";

            handleSuggestAnswer(suggestedResponse)

            setSuggestedAnswer(suggestedResponse);
            console.log("suggestedResponse:", suggestedResponse)
            
            

        } catch (error) {
            console.error("Error fetching GPT response:", error);
        }
    }




    const handleTopicClick = async (topic) => {

        let topicMessages = {
            "Daily Chat": {
                English: "Let's talk about our days.",
                Spanish: "Hablemos sobre nuestros días.",
                French: "Parlons de nos journées.",
                Italian: "Parliamo delle nostre giornate.",
                German: "Lass uns über unsere Tage sprechen."
            },
            "Fun Fact": {
                English: "Share some interesting facts.",
                Spanish: "Comparte algunos datos interesantes.",
                French: "Partage quelques faits intéressants.",
                Italian: "Condividi alcuni fatti interessanti.",
                German: "Teile einige interessante Fakten."
            },
            "You Decide": {
                English: "You decide what we will talk about.",
                Spanish: "Tú decides de qué hablaremos.",
                French: "Tu décides de quoi nous allons parler.",
                Italian: "Tu decidi di cosa parleremo.",
                German: "Du entscheidest, worüber wir sprechen werden."
            }
        };

        const userText = topicMessages[topic][targetLanguage];
        const userMessage = { sender: "user", text: userText };
        setMessages((prev) => [...prev, userMessage]);

        

        const modeContext = chatModes[selectedMode]?.context || "";

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: modeContext },
                        { role: "user", content: userText },
                    ],
                }),
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                setMessages((prev) => [
                    ...prev,
                    { sender: "assistant", text: "Error: Unable to fetch response from AI." },
                ]);
                return;
            }

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";

            const cleanedResponse = fullResponse.trim()

            setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])        
            setInputValue("");

        } catch (error) {
            console.error("Error fetching response:", error);
            
        }
    };

    const handleSuggestAnswer = async () => {

        const userMessage =  { sender: "user", text: suggestedAnswer };

        setMessages(prev => [
            ...prev, 
            userMessage
        ])
        
        

        const modeContext = chatModes[selectedMode]?.context || "";

        
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: modeContext },
                        ...messages.map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                        { role: "user", content: suggestedAnswer },
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";

            const cleanedResponse = fullResponse.trim()

            setMessages(prev => [
                ...prev,
                { sender: "assistant", text: cleanedResponse }
            ])
            setInputValue("");       
        
    }

    const handleAnotherQuestion = async () => {

        const lastMessage = messages[messages.length - 1]

        const lastMessageText = lastMessage.text

        const userMessage = { sender: "user", text: `Can you ask me something else instead of your last question which was "${lastMessageText}". Don't reply to this message, just ask another question or talk about something else in ${targetLanguage} language.` };
        

        const modeContext = chatModes[selectedMode]?.context || "";

        setMessages((prev) => {
            return prev.slice(0, -1)
        })

        
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: modeContext },
                        ...messages.map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                        { role: "user", content: userMessage.text },
                    ],
                }),
            });

            

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";


            const cleanedResponse = fullResponse.trim()

            
            setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])

            setInputValue("");
        
    }


    const handleTranslateMessage = async (message) => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: `Translate the following text to ${translationLanguage}` },
                        { role: "user", content: message.text }
                    ],
                }),
            });
    
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const data = await response.json();
            const translation = data.choices[0]?.message?.content || "";

            setTranslationMessage(translation)

            setSelectedMessage({
                text: message.text,
                translation: {
                    language: translationLanguage,
                    content: translation,
                }
            });

            setIsChatInfoVisible(true)
    
            
        } catch (error) {
            console.error("Translation error:", error);
        }
    };


    

    return (
        <>
        <div className={`chat-div ${!isChatInfoVisible ? 'expanded' : isMobileChatInfoVisible ? 'mobile-chat' : ''}`}>
            {props.selectedMode === 'date' && messages.length < 1 && showGenderModal && 
            <GenderSelectionModal />
            }
            <div className="chat-label">
                <span className="fa-solid fa-arrow-left" onClick={() => setSelectedMode('main')}></span>
                <h2>Chat</h2>
            </div>
            <div className="chat-options">
                <div className="teacher-info">
                <span onClick={() => setSelectedMode('main')} className="fa-solid fa-arrow-left"></span>
                <div className="img-wrapper">    
                <img 
                src={
                    tutorImage
                } 
                alt="teacher-img" 
                                />
                </div>                
                    <h3 className="teacher-name">{tutorName}</h3>
                </div>

                <div className="chat-settings">
                <span 
                 className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}
                 onClick={() => {
                    setIsMuted(!isMuted);
                }}
                    />
                    
                        <span 
                        className="fa-solid fa-ellipsis-vertical widescreen" 
                        onClick={() => setShowOptionsModal(!showOptionsModal)}
                        >{showOptionsModal && <OptionsModal />}</span>

                        <span 
                        className="fa-solid fa-ellipsis-vertical mobile" onClick={() => {                            setIsMobileModalOpen(true)
                        setIsChatSettingsModalOpen(true)    
                        }}> 
                        </span>
                                       
                </div>
            </div>
            <div className="chat-msg-wrapper" ref={chatContainerRef}>

                {messages?.length > 0 && messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper wrapper-${msg.sender}`}>
                    {msg.sender === "user" ? <span className="fa-solid fa-circle-info" onClick={() => handleGetMessageFeedback(msg)}></span> : ""}
                    <div key={index} className={`message ${msg.sender}`}>  
                        <p>{msg.text}</p>
                        <div className="msg-options-div">
                        <span className="repeat-msg" onClick={() => handleRepeatMessage(msg.text)}>
                            <span className="fa-solid fa-rotate-right"></span>
                            <p>Repeat</p>
                        </span>
                        <span className="translate-msg" onClick={() => handleTranslateMessage(msg)}>
                            <span className="fa-solid fa-language"></span>
                            <p>Translate</p>
                        </span>
                        </div>
                    </div>

                    <div className={`msg-options-div mobile ${msg.sender}`}>
                        <span className="repeat-msg" onClick={() => handleRepeatMessage(msg.text)}>
                            <span className="fa-solid fa-rotate-right"></span>
                            
                        </span>
                        <span className="translate-msg" onClick={() => handleTranslateMessage(msg)}>
                            <span className="fa-solid fa-language"></span>
                            
                        </span>
                        </div>

                    </div>
                ))}
                <div ref={lastMessageRef} />
                {messages.length === 1 && selectedMode === 'default-chat' && (
                    <div className="topics">
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("Daily Chat")}>{topicLabels[targetLanguage].dailyChat}</div>
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("Fun Fact")}>{topicLabels[targetLanguage].funFact}</div>
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("You Decide")}>{topicLabels[targetLanguage].youDecide}</div>
                    </div>
                )}
            </div>
            <div className="chat-input-wrapper">
                <div className={`assistant-options ${showSuggestionBar ? '' : 'hidden'}`}>
                    <span onClick={handleAnotherQuestion}>Another question</span>
                    <span onClick={handleCreateSuggestedAnswer}>Suggest answer</span>
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter your message"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className={`input-btn ${inputValue === "" ? "microphone" : "arrow-right"}`} onClick={() => {
                        handleSendMessage({ sender: "user", text: inputValue })
                    }} onMouseDown={inputValue === "" ? handleMicrophonePress : undefined} 
                    onMouseUp={inputValue === "" ? handleMicrophoneRelease : undefined}>
                        <span className={`fa-solid ${inputValue === "" ? "fa-microphone" : "fa-arrow-right"}`}></span>
                        
                    </button>
                </div>
            </div>
        </div>
        
        
        <div className={`chat-info-div ${!isChatInfoVisible ? 'hidden' : isMobileChatInfoVisible ? 'mobile' : ''}`} onClick={() => {setShowOptionsModal(false)
            setIsChatHistoryOpen(false)
        }}>

    <div className="mobile-header">
            <img src="./public/header-logo.png" alt="header-logo" />
    </div>

    <div className="chat-info-title">
    <span className="fa-solid fa-arrow-left" onClick={() => {
        setIsMobileChatInfoVisible(false)
        setSelectedMessage(null)
        setIsChatHistoryOpen(false)
    }}></span>
    <h2>{isChatHistoryOpen && !selectedMessage ? 'Chat history' : selectedMessage?.settings ? 'Settings' : selectedMessage ? (selectedMessage.translation ? 'Translation' : 'Feedback') : 'Information'}</h2>
        <span className="fa-solid fa-xmark" onClick={() => {
    setIsChatInfoVisible(false);
}}></span>
    </div>

    <p className="chat-info-small-text">
        {isChatHistoryOpen && !selectedMessage ? 'Manage your previous conversations below.' : selectedMessage?.settings ? 'Manage your account settings below.' : ''}
    </p>


    <p className={`chat-info-list-label ${selectedMessage?.settings ? 'settings' : ''}`}>
        {isChatHistoryOpen && !selectedMessage ? 'Chat history' : ''}
    </p>
    
    <div className="chat-info-list">



    {selectedMessage?.settings ? (
      <div className="profile-settings-btn-list mobile-settings">
        <div className="profile-menu-setting">
          <p>Choose your translation language</p>
          <CustomSelect
            options={translationLanguages}
            value={translationLanguage}
            onChange={(newValue) => handleLanguageChange(newValue, 'translation')}
          />
        </div>
        <div className="profile-menu-setting">
          <p>Choose your target language level</p>
          <CustomLevelSelect
            options={levels}
            value={targetLanguageLevel}
            onChange={setTargetLanguageLevel}
          />
        </div>
        <div className="profile-menu-setting checkbox">
          <p>Suggestion bar</p>
          <div className="bar-check-div">
            <p>Show bar</p>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={showSuggestionBar}
                    onChange={() => setShowSuggestionBar(!showSuggestionBar)}
                />
            <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="profile-menu-setting">
            <p>Voice speed</p>
            <div className="voice-speed-control">
                <input
                type="range"
                min="0.5"
                max="1.5" 
                step="0.25"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                />
                <div className="speed-labels">
                <span>0.5x</span>
                <span>0.75x</span>
                <span>1x</span>
                <span>1.25x</span>
                <span>1.5x</span>
                </div>
            </div>
        </div>
      </div>
    ) :

    isChatHistoryOpen && !selectedMessage ? (savedChats
            .filter(chat => chat.mode === selectedMode)
            .map((chat) => {
                const lastChatMessage = chat.messages?.[chat.messages.length - 1].text
            return (
                <div onClick={() => loadChat(chat.id)} key={chat.id} className="chat-history-item">

                    <div className="chat-history-img-wrapper">
                        <img src={chat.tutorImage} alt="tutor-image" />
                    </div>

                    <div className="chat-history-info-wrapper">
                        <h2>{new Date(chat.lastUpdated).toLocaleDateString()}</h2>
                        <p>{lastChatMessage}</p>
                    </div>

                    <span>
                        
                    </span>
                    <button 
                        className="delete-chat-btn"
                        onClick={async () => {
                            const updatedChats = savedChats.filter(c => c.id !== chat.id);
                            const userDocRef = doc(db, "users", auth.currentUser.uid);
                            await updateDoc(userDocRef, {
                                savedChats: updatedChats
                            });
                            setSavedChats(updatedChats);
                        }}
                    >
                        <span className="fa-solid fa-trash"></span>
                    </button>
                </div>
           )})
        ) : selectedMessage ? (
            selectedMessage.translation ? (
                <>
                    <div className="translation-content">
                        <h3>{targetLanguage}</h3>
                        <p>{selectedMessage.text}</p>
                        <h3>{selectedMessage.translation.language}</h3>
                        <p>{selectedMessage.translation.content}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="severity-indicator">
                        <span className={`circle ${selectedMessage.feedback?.severity}`}></span>
                    </div>
                    <div className="message-content">
                        <h3>Your message</h3>
                        <p>{selectedMessage.text}</p>
                    </div>
                    <div className={`feedback-card ${selectedMessage.feedback?.severity}`}>
                        <h3>{selectedMessage.feedback?.severity === 'green' ? 'Good job!' : 'Mistake'}</h3>
                        <p>{selectedMessage.feedback?.explanation}</p>
                    </div>
                </>
            )
        ) : (
            <div className="default-chat-info-card">                          <h2>Get feedback on messages</h2>
                            <div className="chat-info-card-icons">
                            <span className="check"><i className="fa-solid fa-check"></i></span>
                            <span className="user-circle"><i className="fa-solid fa-circle-user"></i></span>
                            </div>
                            <p>AI will assess your messages and give you personalized feedback.</p>
                    
            
            </div>
        )}
        </div>
        </div>
        </>
    )
}