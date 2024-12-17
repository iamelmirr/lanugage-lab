import { useState, useRef, useEffect } from "react";
import React from "react"
window.global = window;
window.process = {
    env: { DEBUG: undefined },
}
import { Buffer } from 'buffer'
window.Buffer = Buffer
import AWS from 'aws-sdk'
import AWSConfig from "../utils/aws-config.js"
import * as speechSdk from 'microsoft-cognitiveservices-speech-sdk';





const chatModes = {
    'default-chat': {
        name: "Default Chat",
        description: "A basic chat interface with an AI language tutor for general conversational practice.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: 
        `You are a highly engaging language tutor named John. Your goals are:
            1. Interactive Conversations:

                Initiate and maintain engaging conversations tailored to the user's language level and interests.
                Use vocabulary and sentence structures that are slightly above the user's current level to challenge and encourage learning. Simplify or explain as needed.
                Gradually introduce new topics to expand the user's comfort zone with the language.

            2. Contextual Learning:

                Incorporate practical examples, cultural context, and real-life situations to make learning relatable and memorable.
                Highlight phrases or idiomatic expressions relevant to the ongoing conversation.
                Error Correction:

                Gently correct grammatical, vocabulary, or pronunciation mistakes as they occur.
                Provide clear explanations for corrections and offer additional examples to reinforce learning.

            3. Active Engagement:

                Ask follow-up questions based on the user's responses to keep the conversation natural and dynamic.
                Offer prompts or exercises to help the user practice forming    sentences, expanding vocabulary, and improving fluency.

            4. Tailored Feedback and Encouragement:

                Adapt your tone and feedback style to the user's preferences and needs. Be supportive and encouraging to build confidence.
                Provide periodic mini-reviews of key vocabulary, phrases, or grammar points covered during the session.

            
        Then take a look at the user's last message. If there are no mistakes, then severity is 'green'. If there is not so important mistake(s), then severity is 'yellow'. If there is an important mistake(s), then severity is 'red'. After you answer to the user's message, always, no matter what, write this: "Severity: [green, yellow or red] Explanation: [your explanation for the mistakes and your recommendations on how to fix it.] even if there are no mistakes and severity is green"        
            
        Always, no matter what you write (a question, statement, answer or any other message) end your message with "Suggested Response: [appropriate response or a follow up message to your message - imagine how an average human would answer to your message and set that as an suggested response]"    `
    },
    'airport': {
        name: "At the Airport",
        description: "Role-play as a traveler asking for directions, checking in, or seeking assistance at the airport.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A travel-themed scenario where users simulate navigating airport experiences like asking for directions, checking in, or resolving travel-related queries."
    },
    'medical-emergency': {
        name: "Medical Emergency",
        description: "Practice handling a medical emergency, asking for help, explaining symptoms, and understanding medical advice.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A scenario for practicing emergency language skills, including asking for assistance, describing symptoms, and responding to medical instructions."
    },
    'doctor-appointment': {
        name: "Doctor's Appointment",
        description: "Simulate a doctor-patient interaction, discussing health issues, medications, and follow-up care.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A healthcare-focused interaction where users practice discussing symptoms, understanding prescriptions, and scheduling follow-ups with a doctor."
    },
    'buying-movie-tickets': {
        name: "Buying Movie Tickets",
        description: "Practice booking movie tickets online, selecting showtimes, and finding the best deals.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A scenario for practicing interactions related to booking tickets, selecting seats, and discussing movie preferences."
    },
    'ordering-dinner': {
        name: "Ordering Dinner",
        description: "Practice ordering food at a restaurant, asking about the menu, specials, and dietary restrictions.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "An interactive dining scenario where users practice asking about menu options, dietary concerns, and placing food orders."
    },
    'checking-hotel': {
        name: "Checking in a Hotel",
        description: "Practice checking into a hotel, asking about amenities, room options, and pricing.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A hotel-related simulation for practicing conversations about booking rooms, amenities, and other accommodations."
    },
    'date': {
        name: "At the Date",
        description: "Engage in a casual conversation and navigate a date scenario. Practice small talk, discussing interests, and planning activities.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A light-hearted scenario for practicing casual conversations, building rapport, and discussing shared interests on a date."
    },
    'time-traveler': {
        name: "Time Traveler",
        description: "Engage in conversations as a time traveler from the past, present, or future. Discuss historical events, future technologies, and cultural differences.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A creative role-play scenario where users explore historical events, future possibilities, and cultural shifts through time."
    },
    'detective': {
        name: "Detective",
        description: "Solve a mystery, ask questions to gather clues, and make deductions as a detective.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A mystery-solving scenario where users act as detectives, gathering clues and solving challenges through investigative dialogue."
    },
    'police-officer': {
        name: "Police Officer",
        description: "Role-play interacting with a police officer, reporting a crime, or seeking advice.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A law-enforcement scenario where users practice reporting incidents, seeking help, or understanding legal procedures."
    },
    'debate-social-media': {
        name: "Is Social Media Beneficial?",
        description: "Debate the pros and cons of using social media. Share your views, ask questions, and respond to counterarguments presented by the AI.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A debate scenario to critically discuss the advantages and disadvantages of social media use and its impact on society."
    },
    'debate-online-learning': {
        name: "Online or Traditional Learning?",
        description: "Debate the merits of online learning versus traditional classroom learning. Discuss the advantages, disadvantages, and ideal scenarios for each.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A debate on the effectiveness of online education compared to traditional learning, analyzing various benefits and challenges."
    },
    'debate-mandatory-voting': {
        name: "Should Voting Be Mandatory?",
        description: "Debate whether voting should be mandatory in democracies. Present arguments for and against and respond to opposing views.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A discussion on mandatory voting policies, weighing the implications for democratic engagement and individual freedom."
    },
    'debate-happiness-vs-success': {
        name: "Is Happiness More Important Than Success?",
        description: "Debate whether happiness is more important than success. Discuss different perspectives on this matter and respond to counterarguments.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A philosophical debate about the balance between personal happiness and societal definitions of success."
    },
    'debate-healthcare-right': {
        name: "Is Healthcare a Human Right?",
        description: "Debate whether healthcare is a fundamental human right. Discuss different views and the implications of these positions.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A critical discussion on whether healthcare access is a universal right or a resource tied to socio-economic systems."
    },
    'debate-freedom-speech': {
        name: "Freedom of Speech",
        description: "Debate the limits of freedom of speech. Present different viewpoints and respond to counterarguments.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A debate exploring the boundaries of free expression and the ethical considerations of its limitations."
    },
    'scenario-grocery-shopping': {
        name: "Grocery Shopping",
        description: "Practice real-life language skills by simulating a grocery shopping experience. Ask for items, check prices, and discuss quantities with an AI assistant.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A practical scenario for grocery shopping, allowing users to practice asking for items, checking prices, and handling common queries."
    },
    'scenario-restaurant-order': {
        name: "Restaurant Order",
        description: "Simulate ordering food at a restaurant. Practice asking for the menu, discussing preferences, and placing an order.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "An interactive experience for simulating restaurant interactions, from reading menus to customizing orders."
    },
    'scenario-lost-city': {
        name: "Lost in a Foreign City",
        description: "Practice asking for directions and advice when lost in a foreign city. Interact with an AI to get help and make informed decisions.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A travel-focused scenario where users practice navigating unfamiliar cities and seeking assistance from locals."
    },
    'scenario-car-trouble': {
        name: "Car Trouble",
        description: "Simulate a scenario where you encounter car trouble. Practice asking for assistance, explaining issues, and finding solutions.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A scenario to practice troubleshooting car issues, seeking mechanical help, and understanding repair options."
    },
    'scenario-product-return': {
        name: "Product Return",
        description: "Practice returning a product to a store. Discuss issues, inquire about policies, and ask for refunds or exchanges.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A customer service simulation to practice discussing product issues and negotiating returns or exchanges."
    },
    'pronunciation-practice': {
        name: "Pronunciation Practice",
        description: "Improve your pronunciation by practicing words, phrases, and sentences with feedback on clarity and accuracy.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A focused mode for enhancing pronunciation, providing exercises, examples, and real-time feedback to refine spoken language skills."
    },
    'interview': {
        name: "Interview",
        description: "Prepare for job interviews by practicing common questions, discussing strengths and weaknesses, and receiving feedback.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        context: "A professional scenario where users simulate job interviews, answer common questions, and refine their responses for real-world applications."
    },
};


const polly = new AWS.Polly(AWSConfig)

const synthesizeSpeech = (text, voice = "Matthew") => {
    return new Promise((resolve, reject) => {
        const params = {
            OutputFormat: "mp3",
            Text: text,
            VoiceId: voice
        }
        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log("polly error:", err)
                reject(err)
            } else if (data && data.AudioStream) {
                const audioBlob = new Blob([data.AudioStream], {  type: "audio/mpeg"  })
                const audioUrl = URL.createObjectURL(audioBlob)
                resolve(audioUrl)
            
            }
        })
    })
}


export default function Chat(props) {
    const { selectedMode, setSelectedMode, handleSelectedMode } = props;
    const [messages, setMessages] = useState([
        { sender: "assistant", text: "Hey! I'm John, your personal AI language teacher. Ask me anything, or click on a topic below:" },
    ])


    const [inputValue, setInputValue] = useState("");
    const [suggestedAnswer, setSuggestedAnswer] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const recognitionRef = useRef(null)
    const chatContainerRef = useRef(null)
    const lastMessageRef = useRef(null)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [feedback, setFeedback] = useState({severity: "", explanation: ""})
    const [isChatInfoVisible, setIsChatInfoVisible] = useState(true)


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
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.sender === "assistant") {
                synthesizeSpeech(lastMessage.text).then((audioUrl) => {
                    const audio = new Audio(audioUrl)
                    audio.play()
                    
                })
                .catch((err) => console.error("Error playing Polly audio:", err))
            }
        }
    }, [messages])
    
    
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
    




    const handleRepeatMessage = (messageText) => {
        synthesizeSpeech(messageText).then((audioUrl) => {
            const audio = new Audio(audioUrl)
            audio.play()
        })
        .catch((err) => console.error("error playing polly audio:", err))
    }


    const handleShowFeedback = (message) => {
        setSelectedMessage(message)
        setIsChatInfoVisible(true)
    }
    


    const handleSendMessage = async (message) => {
        
        if (!message?.text?.trim() && !inputValue.trim()) return;

        const userMessage = message || { sender: "user", text: inputValue };
        

        const modeContext = chatModes[selectedMode]?.context || "";

        setMessages(prev => [
            ...prev, 
            userMessage
        ])

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


            const severityMatch = fullResponse.match(/Severity:\s*(green|yellow|red)/i);
            const explanationMatch = fullResponse.match(/Explanation:\s*([^\n]+)/i);
            
            const severity = severityMatch ? severityMatch[1].toLowerCase() : "";
            const explanation = explanationMatch ? explanationMatch[1] : "";

            

            const match = fullResponse.match(/Suggested Response:?\s*(.+)/is)
            const suggestedResponse = match ? match[1].trim() : ""

            const cleanedResponse = fullResponse
            .replace(/Severity:\s*(green|yellow|red)/i, "")
            .replace(/Explanation:\s*[^\n]+/i, "")
            .replace(/Suggested Response:?\s*(.+)/is, "")
            .trim()


            

            console.log("Full response:", fullResponse)
            console.log("Severity:", severity)
            console.log("Explanation:", explanation)
            console.log("Cleaned response:", cleanedResponse)
            

            setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])

            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 2
                        ? { ...msg, feedback: { severity: severity, explanation: explanation } }
                        : msg
                )
            )

            

            setSuggestedAnswer(suggestedResponse);
            setInputValue("");

        } catch (error) {
            console.error("Error fetching GPT response:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: "Sorry, I couldn't process your request." },
            ]);
        }

        
    };

    const handleTopicClick = async (topic) => {
        let userText = "";
        switch (topic) {
            case "Daily Chat":
                userText = "Let's talk about our days.";
                break;
            case "Fun Fact":
                userText = "Share some interesting facts.";
                break;
            case "You Decide":
                userText = "You decide what we will talk about.";
                break;
            default:
                userText = "Let's chat about something!";
                break;
        }

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
            const fullResponse = data.choices[0]?.message?.content || ""

            const match = fullResponse.match(/Suggested Response:?\s*(.+)/is)
            const suggestedResponse = match ? match[1].trim() : ""

            console.log(suggestedResponse)

            const cleanedResponse = fullResponse.replace(/Suggested Response:?\s*(.+)/is, "").trim()

            

            setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])

            

            setSuggestedAnswer(suggestedResponse);
            console.log(suggestedResponse)
            setInputValue("");



        } catch (error) {
            console.error("Error fetching response:", error);
            
        }
    };

    const handleSuggestAnswer = async () => {

        const userMessage =  { sender: "user", text: suggestedAnswer };
        

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
            const fullResponse = data.choices[0]?.message?.content || ""

            const match = fullResponse.match(/Suggested Response:?\s*(.+)/is)
            const suggestedResponse = match ? match[1].trim() : ""

            const cleanedResponse = fullResponse.replace(/Suggested Response:?\s*(.+)/is, "").trim()

            

            setMessages(prev => [
                ...prev, 
                userMessage,
                { sender: "assistant", text: cleanedResponse }
            ])

            

            setSuggestedAnswer(suggestedResponse);
            setInputValue("");

        
        
    }

    const handleAnotherQuestion = async () => {
        const userMessage = { sender: "user", text: "Give me another question or change the topic without aknowledging this message." };
        

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
                        { role: "user", content: userMessage.text },
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || ""

            console.log(fullResponse)

            const match = fullResponse.match(/Suggested Response:?\s*(.+)/is)
            const suggestedResponse = match ? match[1].trim() : "There is no suggested response"

            const cleanedResponse = fullResponse.replace(/Suggested Response:?\s*(.+)/is, "").trim()

            setMessages((prev) => {
                return prev.slice(0, -1)
            })

            setMessages(prev => [
                ...prev, 
                { sender: "assistant", text: cleanedResponse }
            ])

            

            setSuggestedAnswer(suggestedResponse);
            setInputValue("");

            

        
    }


    




    return (
        <>
        <div className={`chat-div ${!isChatInfoVisible ? 'expanded' : ''}`}>
            <div className="chat-label">
                <span className="fa-solid fa-arrow-left"></span>
                <h2>Chat</h2>
            </div>
            <div className="chat-options">
                <div className="teacher-info">
                    <img src={chatModes[selectedMode]?.details.teacherImage || ""} alt="teacher-img" />
                    <h3 className="teacher-name">{chatModes[selectedMode]?.details.teacherName || "Unknown"}</h3>
                </div>

                <div className="chat-settings">
                    <span className="fa-solid fa-volume-high"></span>
                    <span className="fa-solid fa-ellipsis-vertical"></span>
                </div>
            </div>
            <div className="chat-msg-wrapper" ref={chatContainerRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper wrapper-${msg.sender}`}>
                    {msg.sender === "user" ? <span className="fa-solid fa-circle-info" onClick={() => handleShowFeedback(msg)}></span> : ""}
                    <div key={index} className={`message ${msg.sender}`}>  
                        <p>{msg.text}</p>
                        <span className="repeat-msg" onClick={() => handleRepeatMessage(msg.text)}>
                            <span className="fa-solid fa-rotate-right"></span>
                            <p>Repeat</p>
                        </span>
                    </div>
                    </div>
                ))}
                <div ref={lastMessageRef} />
                {messages.length === 1 && (
                    <div className="topics">
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("Daily Chat")}>Daily Chat</div>
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("Fun Fact")}>Fun Fact</div>
                        <div className="message choose-topic-btn" onClick={() => handleTopicClick("You Decide")}>You Decide</div>
                    </div>
                )}
            </div>
            <div className="chat-input-wrapper">
                <div className="assistant-options">
                    <span onClick={handleAnotherQuestion}>Another question</span>
                    <span onClick={handleSuggestAnswer}>Suggest answer</span>
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
        
        
        <div className={`chat-info-div ${!isChatInfoVisible ? 'hidden' : ''}`}>
    <div className="chat-info-title">
        <h2>{selectedMessage ? 'Feedback' : 'Information'}</h2>
        <span className="fa-solid fa-xmark" onClick={() => {
    setIsChatInfoVisible(false);
}}></span>
    </div>
    
    <div className="chat-info-list">
        {selectedMessage ? (
            <>
                <div className="severity-indicator">
                    <span className={`circle ${selectedMessage.feedback.severity}`}></span>
                </div>
                
                <div className="message-content">
                    <h3>Your message</h3>
                    <p>{selectedMessage.text}</p>
                </div>
                
                <div className={`feedback-card ${selectedMessage.feedback.severity}`}>
                    <h3>{selectedMessage.feedback.severity === 'green' ? 'Good job!' : 'Mistake'}</h3>
                    <p>{selectedMessage.feedback.severity === 'green' ? 
                        'Your message looks good!' : 
                        selectedMessage.feedback.explanation}
                    </p>
                </div>
            </>
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