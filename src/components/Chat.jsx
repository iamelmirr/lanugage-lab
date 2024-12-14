import { useState } from "react";
import React from "react"




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
            1. Initiate and maintain ongoing conversations by asking questions. Don't go too much with the same topic. Change topics as needed.
            2. Provide interesting facts to make interactions engaging.
            3. Actively ask follow-up questions based on the user's interests.
            4. Point out grammatical or language mistakes in a polite and encouraging manner.
            5. Provide a recommended response for the user to continue the conversation.
            Please end your responses with 'Suggested Response: [your suggestion]'`
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


export default function Chat(props) {
    const { selectedMode, setSelectedMode, handleSelectedMode } = props;
    const [messages, setMessages] = useState([
        { sender: "assistant", text: "Hey! I'm John, your personal AI language teacher. Ask me anything, or click on a topic below:" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [suggestedAnswer, setSuggestedAnswer] = useState("")
    const chatContainerRef = useRef(null)
    const lastMessageRef = useRef(null)

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = { sender: "user", text: inputValue };
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
                        ...messages.map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                        { role: "user", content: inputValue },
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const fullResponse = data.choices[0]?.message?.content || "";

            const match = fullResponse.match(/Suggested Response:?\s*(.*?)(?:\n|$)/i)
            let suggestedResponse = match ? match[1] : ""

            suggestedResponse = suggestedResponse.replace(/^"(.*)"$/, '$1')

            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: fullResponse.replace(/Suggested Response:\s*.*$/, "").trim() }, 
            ])

            setSuggestedAnswer(suggestedResponse.trim());
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
            const assistantMessage = data?.choices?.[0]?.message?.content || "No response received.";
            setMessages((prev) => [...prev, { sender: "assistant", text: assistantMessage }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: "Error: Unable to process your request." },
            ]);
        }
    };

    const handleSuggestAnswer = async () => {
        if (!suggestedAnswer.trim()) return;
        
        const userMessage = { sender: "user", text: suggestedAnswer };
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
            
            // Extract new suggested response
            const match = fullResponse.match(/Suggested Response:?\s*(.*?)(?:\n|$)/i);
            let newSuggestedResponse = match ? match[1] : "";
            newSuggestedResponse = newSuggestedResponse.replace(/^"(.*)"$/, '$1');
    
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: fullResponse.replace(/Suggested Response:\s*.*$/, "").trim() },
            ]);
    
            setSuggestedAnswer(newSuggestedResponse.trim());
        } catch (error) {
            console.error("Error fetching GPT response:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: "Sorry, I couldn't process your request." },
            ]);
        }
    }

    const handleAnotherQuestion = async () => {
        setMessages((prev) => prev.slice(0, -1));
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
                        ...messages.slice(0, -1).map((msg) => ({
                            role: msg.sender === "assistant" ? "assistant" : "user",
                            content: msg.text,
                        })),
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const newQuestion = data.choices[0]?.message?.content || "Let's try another topic!";

            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: newQuestion },
            ]);
        } catch (error) {
            console.error("Error fetching new question:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: "Sorry, I couldn't fetch another question." },
            ]);
        }
    };

    return (
        <div className="chat-div">
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
            <div className="chat-msg-wrapper">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
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
                    <button className="input-btn" onClick={handleSendMessage}>
                        <span className="fa-solid fa-microphone"></span>
                        <span className="fa-solid fa-circle-arrow-right"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}