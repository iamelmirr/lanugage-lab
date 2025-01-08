import { useState } from 'react';

export default function Registration() {
    const [step, setStep] = useState(-1); // -1 represents the initial landing screen
    const [formData, setFormData] = useState({
        language: '',
        level: '',
        goal: '',
        reason: '',
    });

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            console.log('Registration complete:', formData);
        }
    };

    const languages = [
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'es', name: 'Spanish', flag: './public//flags/spanish.png' },
        { code: 'fr', name: 'French', flag: './public//flags/french.png' },
        { code: 'de', name: 'German', flag: './public//flags/german.png' },
        { code: 'it', name: 'Italian', flag: './public//flags/italian.png' },
        // Add more languages here
    ];

    const steps = [
        {
            title: "Choose Language",
            component: (
                <div className="registration-step">
                    <h2>Choose the language you want to learn</h2>
                    <div className="language-options">
                        {languages.map(lang => (
                            <div 
                                key={lang.code} 
                                onClick={() => handleInputChange('language', lang.code)}
                                className={`language-option ${formData.language === lang.code ? 'selected' : ''}`}
                            >
                                <span className='img-span'><img className='lang-flag' src={lang.flag} alt={lang.name} /></span>
                                <span>{lang.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className='reg-process-btns'>
                    <button className='reg-btn-action registration-btn' type="submit">Continue</button>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        },
        {
            title: "Language Level",
            component: (
                <div className="registration-step">
                    <h2>What's your current level?</h2>
                    <div className="level-options">
                        {["Beginner", "Intermediate", "Advanced"].map(level => (
                            <button 
                                key={level} 
                                onClick={() => handleInputChange('level', level)}
                                className={formData.level === level ? 'selected' : ''}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <div className='reg-process-btns'>
                    <button className='reg-btn-action registration-btn' type="submit">Continue</button>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        },
        {
            title: "Your Goal",
            component: (
                <div className="registration-step">
                    <h2>What do you want to achieve?</h2>
                    <div className="goal-options">
                        {["Learning basics", "Improve speaking", "Become fluent", "I'm not sure"].map(goal => (
                            <button 
                                key={goal} 
                                onClick={() => handleInputChange('goal', goal)}
                                className={formData.goal === goal ? 'selected' : ''}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                    <div className='reg-process-btns'>
                    <button className='reg-btn-action registration-btn' type="submit">Continue</button>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        },
        {
            title: "Your Reason",
            component: (
                <div className="registration-step">
                    <h2>Why do you want to learn this language?</h2>
                    <div className="reason-options">
                        {["Academy and research", "University and education", "Travel and tourism", "Job and career", "Immigration", "Better communication", "Language tests and certificates", "Other"].map(reason => (
                            <button 
                                key={reason} 
                                onClick={() => handleInputChange('reason', reason)}
                                className={formData.reason === reason ? 'selected' : ''}
                            >
                                {reason}
                            </button>
                        ))}
                    </div>
                    <div className='reg-process-btns'>
                    <button className='reg-btn-action registration-btn' type="submit">Continue</button>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        },
        {
            title: "Authentication",
            component: (
                <div className="registration-step">
                    <h2>Complete your registration</h2>
                    <div className="auth-options">
                        <button>Sign up with Google</button>
                        <button>Sign up with Apple</button>
                        <button>Sign up with Facebook</button>
                        <button>Sign up with Email</button>
                    </div>
                    <div className='reg-process-btns'>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        }
    ];



    return (
        <div className="registration-container">
            {step === -1 ? (
                <div className="registration-content">
                    <h1>The most efficient way to learn a language</h1>
                    <h3>Learn languages with an AI-powered language teacher using immersive, fun and engaging methods.</h3>
                    <img className='teacherfullimg' src="./src/assets/teacherfullimg.png" alt="teacherfullimg" />
                    <div className="action-buttons">
                        <button className='reg-btn-action registration-btn'  onClick={() => setStep(0)}>Get started</button>
                        <a className='reg-btn-action login-btn' href="/login">Log in</a>
                    </div>
                </div>
            ) : (
                <div className="registration-content step-div">
                <form className='registration-form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                    {steps[step].component}
                    {step < steps.length - 1}
                </form>
                </div>
            )}
        </div>
    );
}
