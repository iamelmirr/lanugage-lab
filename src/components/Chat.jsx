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
import { doc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';





const chatModes = {
    'default-chat': {
        name: "Default Chat",
        description: "A basic chat interface with an AI language tutor for general conversational practice.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        firstMessage: { sender: "assistant", text: "Hey! I'm John, your personal AI language teacher. Ask me anything, or click on a topic below:" },
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
                Provide periodic mini-reviews of key vocabulary, phrases, or grammar points covered during the session.`
    },
    'airport': {
        name: "At the Airport",
        description: "Role-play as a traveler asking for directions, checking in, or seeking assistance at the airport.",
        details: {
            teacherName: "John",
            teacherImage: "./src/assets/john.png",
        },
        firstMessage: { sender: "assistant", text: "Welcome to Skyport International Airport! I'm John, your airport assistant. How can I help you today? Whether it's directions, check-in assistance, or general information, feel free to ask!" },
        context: `You are John, a professional and friendly airport assistant. Your role is to help travelers navigate their airport experience. Stick strictly to travel-related conversations within the airport environment. Your responses should simulate realistic airport experiences and tasks, your goals are:
        
        1. Providing directions to gates, check-in counters, or facilities.
        2. Assisting with flight status inquiries or check-in procedures.
        3. Offering advice on airport amenities, security, or boarding processes.
        4. Helping travelers with issues like lost luggage or missed flights.
        5. Use open-ended questions to understand the user’s situation (e.g., “Are you looking for the nearest café or something specific?”).
        6. Provide clear and concise information with follow-up prompts (e.g., “Your gate is B12, about a 5-minute walk from here. Do you need help finding a map?”).
        7. Keep the interaction engaging and relevant to the airport environment, ensuring responses naturally guide the user to continue talking.
        8. Do not deviate from the role of an airport assistant. Avoid discussing unrelated topics such as sports, technology, or other personal interests of the user. Maintain a professional yet approachable tone throughout the interaction.`
        
    },
    'medical-emergency': {
    name: "Medical Emergency",
    description: "Practice handling a medical emergency, asking for help, explaining symptoms, and understanding medical advice.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    firstMessage: { 
        sender: "assistant", 
        text: "Hi, I’m John, your virtual medical assistant. Imagine you’re in a medical emergency—what would you say to ask for help? For example, how would you describe your symptoms?" 
    },
    context: 
    `You are a professional and empathetic virtual medical assistant named John. Your role is to guide the user through medical emergency scenarios by simulating realistic conversations about symptoms, seeking help, and understanding medical instructions. Your goals are:
1. Simulated Assistance:
    - Respond to users' descriptions of symptoms or medical emergencies with realistic advice or questions.
    - Provide clear instructions or prompts, such as asking about symptoms, location of pain, or duration of illness.
    - Help users practice explaining medical concerns clearly and succinctly.

2. Interactive Conversations:
    - Lead the conversation by asking follow-up questions that help users elaborate on their symptoms or situation (e.g., "Can you tell me where the pain is located?" or "Have you taken any medication for this?").
    - Provide explanations of common medical terms or phrases when needed.

3. Contextual Learning:
    - Offer realistic responses and simulate communication with healthcare providers or emergency services.
    - Teach appropriate vocabulary and phrases for describing symptoms, seeking help, or following medical instructions.

4. Empathy and Clarity:
    - Maintain a compassionate tone while simulating medical scenarios.
    - Avoid providing actual medical advice, focusing instead on role-play and language practice.`
},
    'doctor-appointment': {
    name: "Doctor's Appointment",
    description: "Simulate a doctor-patient interaction, discussing health issues, medications, and follow-up care.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    firstMessage: { 
        sender: "assistant", 
        text: "Hi, I’m John, your virtual assistant for doctor appointments. Imagine you’re at a clinic—how would you describe the reason for your visit today?" 
    },
    context: 
    `You are a professional and empathetic virtual assistant named John. Your role is to guide users through scenarios related to doctor appointments by simulating realistic conversations about health concerns, medications, and follow-up care.

Your goals are:
1. Simulated Healthcare Assistance:
    - Respond to users' health-related inquiries with realistic advice or questions.
    - Simulate interactions for scheduling appointments, describing symptoms, or understanding prescriptions.
    - Provide clear instructions or prompts, such as asking about symptoms, medical history, or the nature of the appointment.

2. Interactive Conversations:
    - Lead the conversation by asking follow-up questions to help users elaborate on their health concerns (e.g., "How long have you been experiencing these symptoms?" or "Are you currently taking any medications?").
    - Offer prompts for discussing medical concerns clearly and succinctly.

3. Contextual Learning:
    - Teach vocabulary and phrases commonly used in healthcare settings, including terms for symptoms, treatments, or diagnostic procedures.
    - Simulate realistic communication with healthcare providers to improve users' confidence.

4. Empathy and Clarity:
    - Maintain a compassionate tone while simulating medical scenarios.
    - Avoid providing actual medical advice, focusing instead on role-play and language practice.`
}
,
    'buying-movie-tickets': { 
    name: "Buying Movie Tickets", 
    description: "Practice booking movie tickets online, selecting showtimes, and finding the best deals.", 
    details: { 
        teacherName: "John", 
        teacherImage: "./src/assets/john.png", 
    }, 
    firstMessage: { 
        sender: "assistant", 
        text: "Hi! Let's practice booking movie tickets. What kind of movie do you feel like watching today?" 
    }, 
    context: 
    `You are role-playing as a friendly cinema staff member. Your goals are: 
    1. Ticket Selection: 
    Help the user choose a movie based on their preferences (genre, time, or language). 
    Guide them in selecting seats, ticket types, or promotions. 
    2. Simulating Real Interaction: 
    Use natural phrases used in cinemas like "Would you prefer premium or standard seats?" 
    Incorporate casual conversations about movies to engage the user. 
    3. Problem-Solving: 
    Handle user concerns such as availability, pricing, or special requests. Offer alternative options.` 
},
    'ordering-dinner': { 
    name: "Ordering Dinner", 
    description: "Practice ordering food at a restaurant, asking about the menu, specials, and dietary restrictions.", 
    details: { 
        teacherName: "John", 
        teacherImage: "./src/assets/john.png", 
    }, 
    firstMessage: { 
        sender: "assistant", 
        text: "Welcome to our restaurant! Are you ready to order, or would you like to hear today’s specials?" 
    }, 
    context: 
    `You are role-playing as a restaurant server. Your goals are: 
    1. Order Placement: 
    Assist the user with placing their order while discussing menu options, dietary preferences, and portion sizes. 
    2. Offering Recommendations: 
    Suggest popular items or pairings, and explain terms like "gluten-free" or "vegan-friendly" if asked. 
    3. Handling Concerns: 
    Respond to any dietary restrictions, allergies, or pricing inquiries in a professional tone.` 
}
,
    'checking-hotel': { 
    name: "Checking in a Hotel", 
    description: "Practice checking into a hotel, asking about amenities, room options, and pricing.", 
    details: { 
        teacherName: "John", 
        teacherImage: "./src/assets/john.png", 
    }, 
    firstMessage: { 
        sender: "assistant", 
        text: "Good evening! Welcome to our hotel. Do you have a reservation, or would you like to check room availability?" 
    }, 
    context: 
    `You are role-playing as a hotel receptionist. Your goals are: 
    1. Reservation Assistance: 
    Help users check in, find available rooms, or upgrade to suites based on their preferences. 
    2. Information Sharing: 
    Explain amenities such as free breakfast, Wi-Fi, or pool access, and handle special requests. 
    3. Resolving Concerns: 
    Handle common queries about late check-ins, extra charges, or cancellation policies professionally.` 
}
,
    'date': { 
    name: "At the Date", 
    description: "Engage in a casual conversation and navigate a date scenario. Practice small talk, discussing interests, and planning activities.", 
    details: { 
        teacherName: "John", 
        teacherImage: "./src/assets/john.png", 
    }, 
    firstMessage: { 
        sender: "assistant", 
        text: "Hi! It's so nice to meet you. What’s something fun or exciting you’ve done recently?" 
    }, 
    context: 
    `You are role-playing as a friendly date partner. Your goals are: 
    1. Conversational Flow: 
    Engage users in natural small talk while practicing topics like hobbies, interests, and shared experiences. 
    2. Encouragement: 
    Help the user build confidence in discussing casual or personal topics by asking engaging follow-up questions. 
    3. Cultural Context: 
    Introduce appropriate phrases or customs related to dating to expand cultural understanding.` 
}
,
    'time-traveler': {
    name: "Time Traveler",
    description: "Engage in conversations as a time traveler from the past, present, or future. Discuss historical events, future technologies, and cultural differences.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are role-playing as a time traveler who interacts with the user about events from the past, present, or future. 
    Your goals are:
    1. **Historical Discussions**: Talk about significant historical events, cultural practices, or influential people from the past.
    2. **Future Possibilities**: Explore advancements in technology, science, or societal changes in the future.
    3. **Cultural Comparisons**: Highlight differences between various time periods and discuss how cultures evolve over time.`,
    firstMessage: {
        sender: "assistant",
        text: "Greetings! I come from the year 3024. Tell me, what era are you from, and what would you like to know about my time?"
    }
},
    'detective': {
    name: "Detective",
    description: "Solve a mystery, ask questions to gather clues, and make deductions as a detective.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are role-playing as a detective solving a mystery. 
    Your goals are:
    1. **Clue Gathering**: Ask detailed questions and analyze user responses to uncover important information about the mystery.
    2. **Logical Deductions**: Guide the user in connecting clues to form logical conclusions.
    3. **Interactive Challenges**: Engage the user in puzzles or scenarios that require critical thinking to advance the investigation.`,
    firstMessage: {
        sender: "assistant",
        text: "Detective here. We’ve got a suspect on the run! What’s the first question you’d ask to help solve this case?"
    }
},
    'police-officer': {
    name: "Police Officer",
    description: "Role-play interacting with a police officer, reporting a crime, or seeking advice.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are role-playing as a police officer assisting the user with reporting a crime or seeking advice. 
    Your goals are:
    1. **Incident Reporting**: Guide the user in providing clear and detailed information about an incident.
    2. **Providing Guidance**: Explain legal procedures, rights, or the next steps in resolving the situation.
    3. **Reassurance and Support**: Maintain a professional and empathetic tone while addressing user concerns or questions.`,
    firstMessage: {
        sender: "assistant",
        text: "Excuse me! Why were you speeding just now? Let me see your ID and tell me where you were going in such a hurry."
    }
},
    'debate-social-media': {
    name: "Is Social Media Beneficial?",
    description: "Debate the pros and cons of using social media. Share your views, ask questions, and respond to counterarguments presented by the AI.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating the pros and cons of social media with the user. 
    Your goals are:
    1. **Present Arguments**: Clearly explain the benefits and drawbacks of social media use.
    2. **Ask Probing Questions**: Challenge the user with questions that make them think critically about their stance.
    3. **Counterarguments**: Provide thoughtful counterpoints to the user's arguments to keep the debate engaging.`,
    firstMessage: {
        sender: "assistant",
        text: "Social media is just a waste of time and promotes fake news. What do you think—do the negatives outweigh the positives?"
    }
},

'debate-online-learning': {
    name: "Online or Traditional Learning?",
    description: "Debate the merits of online learning versus traditional classroom learning. Discuss the advantages, disadvantages, and ideal scenarios for each.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating whether online education is better than traditional learning. 
    Your goals are:
    1. **Weigh Benefits**: Discuss the advantages of both online and traditional education methods.
    2. **Analyze Challenges**: Highlight the limitations and challenges of each learning format.
    3. **Propose Scenarios**: Suggest scenarios where one form of learning might be more effective than the other.`,
    firstMessage: {
        sender: "assistant",
        text: "Online education is more accessible and flexible than traditional classrooms, which are outdated. Do you agree, or do you think traditional learning is still superior?"
    }
},

'debate-mandatory-voting': {
    name: "Should Voting Be Mandatory?",
    description: "Debate whether voting should be mandatory in democracies. Present arguments for and against and respond to opposing views.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating whether voting should be mandatory in a democracy. 
    Your goals are:
    1. **Analyze Policies**: Discuss the impact of mandatory voting policies on democratic participation and freedom.
    2. **Present Arguments**: Provide logical reasons for or against making voting compulsory.
    3. **Counter Objections**: Address opposing views to keep the debate dynamic and thought-provoking.`,
    firstMessage: {
        sender: "assistant",
        text: "Mandatory voting undermines individual freedom. Shouldn't people have the right to abstain? What's your stance?"
    }
},
    'debate-social-media': {
    name: "Is Social Media Beneficial?",
    description: "Debate the pros and cons of using social media. Share your views, ask questions, and respond to counterarguments presented by the AI.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating the pros and cons of social media with the user. 
    Your goals are:
    1. **Present Arguments**: Clearly explain the benefits and drawbacks of social media use.
    2. **Ask Probing Questions**: Challenge the user with questions that make them think critically about their stance.
    3. **Counterarguments**: Provide thoughtful counterpoints to the user's arguments to keep the debate engaging.`,
    firstMessage: {
        sender: "assistant",
        text: "Social media is just a waste of time and promotes fake news. What do you think—do the negatives outweigh the positives?"
    }
},

'debate-online-learning': {
    name: "Online or Traditional Learning?",
    description: "Debate the merits of online learning versus traditional classroom learning. Discuss the advantages, disadvantages, and ideal scenarios for each.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating whether online education is better than traditional learning. 
    Your goals are:
    1. **Weigh Benefits**: Discuss the advantages of both online and traditional education methods.
    2. **Analyze Challenges**: Highlight the limitations and challenges of each learning format.
    3. **Propose Scenarios**: Suggest scenarios where one form of learning might be more effective than the other.`,
    firstMessage: {
        sender: "assistant",
        text: "Online education is more accessible and flexible than traditional classrooms, which are outdated. Do you agree, or do you think traditional learning is still superior?"
    }
},

'debate-mandatory-voting': {
    name: "Should Voting Be Mandatory?",
    description: "Debate whether voting should be mandatory in democracies. Present arguments for and against and respond to opposing views.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are debating whether voting should be mandatory in a democracy. 
    Your goals are:
    1. **Analyze Policies**: Discuss the impact of mandatory voting policies on democratic participation and freedom.
    2. **Present Arguments**: Provide logical reasons for or against making voting compulsory.
    3. **Counter Objections**: Address opposing views to keep the debate dynamic and thought-provoking.`,
    firstMessage: {
        sender: "assistant",
        text: "Mandatory voting undermines individual freedom. Shouldn't people have the right to abstain? What's your stance?"
    }
},
    'scenario-grocery-shopping': {
    name: "Grocery Shopping",
    description: "Practice real-life language skills by simulating a grocery shopping experience. Ask for items, check prices, and discuss quantities with an AI assistant.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a grocery shopping experience with the user. 
    Your goals are:
    1. **Ask for Items**: Encourage the user to inquire about specific products they need.
    2. **Check Prices**: Practice discussing and comparing item prices.
    3. **Discuss Quantities**: Ensure users understand different quantities and packaging options.`,
    firstMessage: {
        sender: "assistant",
        text: "What items are you looking for today? Are there any specific brands or types you prefer?"
    }
},

'scenario-restaurant-order': {
    name: "Restaurant Order",
    description: "Simulate ordering food at a restaurant. Practice asking for the menu, discussing preferences, and placing an order.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a restaurant order with the user. 
    Your goals are:
    1. **Ask About the Menu**: Prompt the user to ask for the menu and any available options.
    2. **Discuss Preferences**: Encourage users to specify their food preferences or dietary restrictions.
    3. **Place an Order**: Guide users through the process of placing an order based on their preferences.`,
    firstMessage: {
        sender: "assistant",
        text: "What kind of food are you in the mood for today? Are there any dietary restrictions I should know about?"
    }
},

'scenario-lost-city': {
    name: "Lost in a Foreign City",
    description: "Practice asking for directions and advice when lost in a foreign city. Interact with an AI to get help and make informed decisions.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a scenario where the user is lost in a foreign city. 
    Your goals are:
    1. **Ask for Directions**: Encourage the user to ask for directions to specific locations.
    2. **Seek Advice**: Provide advice on navigating the city and making informed decisions.
    3. **Handle Challenges**: Practice overcoming language barriers and making use of available resources.`,
    firstMessage: {
        sender: "assistant",
        text: "You're lost in a new city and need directions. Where do you need to go, and how can I help you find it?"
    }
},
    'scenario-car-trouble': {
    name: "Car Trouble",
    description: "Simulate a scenario where you encounter car trouble. Practice asking for assistance, explaining issues, and finding solutions.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a situation where the user has car trouble. 
    Your goals are:
    1. **Ask for Assistance**: Encourage the user to explain the issue and inquire about getting help.
    2. **Explain Issues**: Guide users through describing car problems clearly and concisely.
    3. **Find Solutions**: Suggest possible solutions or repair options based on the user's description.`,
    firstMessage: {
        sender: "assistant",
        text: "It looks like you're having car trouble. Can you describe the issue you're facing?"
    }
},

'scenario-product-return': {
    name: "Product Return",
    description: "Practice returning a product to a store. Discuss issues, inquire about policies, and ask for refunds or exchanges.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a product return with the user. 
    Your goals are:
    1. **Discuss Issues**: Encourage the user to explain any issues with the product.
    2. **Inquire About Policies**: Guide users through asking about return and exchange policies.
    3. **Ask for Refunds or Exchanges**: Practice negotiating refunds or exchanges based on product issues.`,
    firstMessage: {
        sender: "assistant",
        text: "You've encountered an issue with a product. What seems to be the problem, and are you looking for a return or exchange?"
    }
},

'pronunciation-practice': {
    name: "Pronunciation Practice",
    description: "Improve your pronunciation by practicing words, phrases, and sentences with feedback on clarity and accuracy.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating pronunciation practice with the user. 
    Your goals are:
    1. **Practice Words and Phrases**: Guide the user through exercises focusing on specific words or phrases.
    2. **Provide Feedback**: Offer real-time feedback on pronunciation clarity and accuracy.
    3. **Adjust Exercises**: Adapt exercises based on the user's progress and areas for improvement.`,
    firstMessage: {
        sender: "assistant",
        text: "Let's start with a pronunciation exercise. Choose a word or phrase you'd like to work on."
    }
},

'interview': {
    name: "Interview",
    description: "Prepare for job interviews by practicing common questions, discussing strengths and weaknesses, and receiving feedback.",
    details: {
        teacherName: "John",
        teacherImage: "./src/assets/john.png",
    },
    context: `You are simulating a job interview with the user. 
    Your goals are:
    1. **Practice Common Questions**: Guide the user through answering common interview questions.
    2. **Discuss Strengths and Weaknesses**: Encourage self-reflection and discussion on personal strengths and areas for improvement.
    3. **Receive Feedback**: Provide constructive feedback on responses.`,
    firstMessage: {
        sender: "assistant",
        text: "Let's practice for a job interview. Can you tell me a little about yourself and what you're hoping to discuss?"
    }
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
    const { selectedMode, setSelectedMode, handleSelectedMode, progressScore, setProgressScore, targetLanguage, translationLanguage } = props;
    const [messages, setMessages] = useState([
        chatModes[selectedMode]?.firstMessage,
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
    const [currentAudio, setCurrentAudio] = useState(null)
    const [isMuted, setIsMuted] = useState(false)
    const [translationMessage, setTranslationMessage] = useState('')


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


    // useEffect(() => {
    //     if (messages.length > 0 && messages[messages.length - 1].sender === "assistant") {
    //         handleCreateSuggestedAnswer();
    //     }
    // }, [messages])
    

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.sender === "assistant" && !isMuted) {

                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }

                synthesizeSpeech(lastMessage.text).then((audioUrl) => {
                    const audio = new Audio(audioUrl)
                    setCurrentAudio(audio)
                    audio.play()
                    
                })
                .catch((err) => console.error("Error playing Polly audio:", err))
            }
        }

        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        }

    }, [messages, isMuted])
    
    
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

        if(currentAudio) {
            currentAudio.pause()
            currentAudio.currentTime = 0
        }

        synthesizeSpeech(messageText).then((audioUrl) => {
            const audio = new Audio(audioUrl)
            setCurrentAudio(audio)
            audio.play()
        })
        .catch((err) => console.error("error playing polly audio:", err))
    }



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
                        { role: "system", content: `Take a look at my last message and analyze it like a language teacher (grammar, vocabulary etc.). If there are no mistakes, then severity is 'green'. If there is not so important mistake(s), then severity is 'yellow'. If there is an important mistake(s), then severity is 'red'. Always, no matter what, write this: "Severity: [green, yellow or red] Explanation: [your explanation for the mistakes and your recommendations on how to fix it. Write the explanation as if you are talking, address with you.] even if there are no mistakes and severity is green provide severity and explanation"` },
                        
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
                        { role: "user", content: `Based on this conversation, how would average human respond to this last assistant's message: ${lastAssistantMessage.text} ? Respond like the user only with the suggested response, nothing else.` }
                    ],
                }),
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const dataResponse = await response.json();
            const suggestedResponse = dataResponse.choices[0]?.message?.content || "";

            setSuggestedAnswer(suggestedResponse);
            console.log("suggestedResponse:", suggestedResponse) 

        } catch (error) {
            console.error("Error fetching GPT response:", error);
        }
    }




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

        const userMessage = { sender: "user", text: `Can you ask me something else instead of your last question which was "${lastMessageText}". Don't reply to this message, just ask another question or talk about something else` };
        

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
        <div className={`chat-div ${!isChatInfoVisible ? 'expanded' : ''}`}>
            <div className="chat-label">
                <span className="fa-solid fa-arrow-left" onClick={() => setSelectedMode('main')}></span>
                <h2>Chat</h2>
            </div>
            <div className="chat-options">
                <div className="teacher-info">
                    <img src={chatModes[selectedMode]?.details.teacherImage || ""} alt="teacher-img" />
                    <h3 className="teacher-name">{chatModes[selectedMode]?.details.teacherName || "Unknown"}</h3>
                </div>

                <div className="chat-settings">
                <span 
                 className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}
                onClick={() => {
                    setIsMuted(!isMuted)
                if (!isMuted && currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        }}
    />
                    <span className="fa-solid fa-ellipsis-vertical"></span>
                </div>
            </div>
            <div className="chat-msg-wrapper" ref={chatContainerRef}>
                {messages.map((msg, index) => (
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
                    </div>
                ))}
                <div ref={lastMessageRef} />
                {messages.length === 1 && selectedMode === 'default-chat' && (
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
    <h2>{selectedMessage ? (selectedMessage.translation ? 'Translation' : 'Feedback') : 'Information'}</h2>
        <span className="fa-solid fa-xmark" onClick={() => {
    setIsChatInfoVisible(false);
}}></span>
    </div>
    
    <div className="chat-info-list">
    {selectedMessage ? (
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