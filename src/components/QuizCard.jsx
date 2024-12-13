import React from "react"



const quizCards = [
    { 
        label: 'Vocabulary Quiz', 
        tags: 'Vocabulary Quiz', 
        desc: 'Test your vocabulary knowledge with fun and engaging quizzes.', 
        shortDesc: 'Answer questions and learn new words.', 
        imageSrc: './src/assets/img2',
    },
    { 
        label: 'Grammar Quiz', 
        tags: 'Grammar Quiz', 
        desc: 'Challenge yourself with grammar quizzes to perfect your language skills.', 
        shortDesc: 'Test your knowledge of grammar rules.', 
        imageSrc: './src/assets/img3',
    },
    { 
        label: 'Pronunciation Quiz',
        tags: 'Pronunciation Quiz', 
        desc: 'Test your pronunciation skills with quizzes and get feedback.',
        shortDesc: 'Speak out and see how well you pronounce words.',
        imageSrc: './src/assets/img4',
    },
    { 
        label: 'Cultural Quiz',
        tags: 'Culture Quiz', 
        desc: 'Test your knowledge of cultural facts related to the language.',
        shortDesc: 'Learn about customs, idioms, and traditions.',
        imageSrc: './src/assets/img5',
    },
    { 
        label: 'Sentence Construction Quiz',
        tags: 'Grammar Quiz', 
        desc: 'Put your grammar to the test by forming correct sentences.',
        shortDesc: 'Rearrange words and phrases to form proper sentences.',
        imageSrc: './src/assets/img6',
    },
    { 
        label: 'Translation Quiz',
        tags: 'Translation Quiz', 
        desc: 'Challenge your translation skills with sentences in different languages.',
        shortDesc: 'Translate words and phrases to check your proficiency.',
        imageSrc: './src/assets/img7',
    }
]

export default function QuizCard() {
    return (
        <> 
        {quizCards.map((card, index) => {
            return (
                <div key={index} className="quiz-card">
                    <div className="quiz-card-info">
                        <h2>{card.label}</h2>
                        <div className="card-tags">
                            {card.tags.split(" ").map((tag, i) => {
                                return (
                                    <span key={i} className="tag">{tag}</span>
                                )
                            })}
                        </div>
                        <h4 className="card-desc">
                            {card.desc}
                        </h4>
                        <p className="card-light-desc">{card.shortDesc}</p>
                    </div>

                    <div className="quiz-card-img">
                        <img src={card.imageSrc} alt={card.label} />
                    </div>
                </div>
            )
        })}
        </>
    )
}