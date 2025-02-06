import { useState } from 'react';
import { auth, db, googleProvider } from '../../utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import React from 'react';

const Registration = (props) => {
    const {  setIsAuthenticated, setIsRegistering, setIsLogingIn, formData, setFormData, userName, userLastName, userEmail, setUserEmail, setUserLastName, setUserName, selectMode, setSelectMode, setProgressScore, progressScore, progressLevel, setProgressLevel,  levelThresholds, tempUserEmail, setTempUserEmail, newUserEmail, setNewUserEmail, userPassword, setUserPassword, isAuthenticated, setUserData, setTargetLanguage, setTranslationLanguage, setTargetLanguageLevel, targetLanguageLevel, setLearningReason, setLearningGoal, savedChats, setSavedChats, progressPercentage, setProgressPercentage } = props


    const [step, setStep] = useState(-1); // -1 represents the initial landing screen
    const [selectedLanguage, setSelectedLanguage] = useState('target language')


    // Registration progress line animation

    const currentProgress = (step / 6) * 100



    // Errors and data validation

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^.{8,}$/;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Required';
        }
        if (!emailRegex.test(email)) {
            return 'Invalid email';
        }
        return '';
    };
    
    const validatePassword = (password) => {
        if (!password) {
            return 'Required';
        }
        if (password.length < 8) {
            return 'Must be at least 8 characters';
        }
        return '';
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) {
            return 'Required';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    };

    const validateName = (name) => {
        if (!name) {
            return 'Required';
        }
        return '';
    };





    const handleGoogleRegistration = async (googleUser) => {
        try {
          // Create user document in Firestore with same structure
          await setDoc(doc(db, "users", googleUser.uid), {
            firstName: googleUser.displayName.split(' ')[0],
            lastName: googleUser.displayName.split(' ')[1] || '',
            email: googleUser.email,
            language: formData.language,
            translationLanguage: formData.translationLanguage,
            level: formData.level,
            goal: formData.goal,
            reason: formData.reason,
            progressLevel: 1,
            progressScore: 0,
            lastChatTime: new Date(),
            createdAt: new Date(),
            savedChats: [],
            progressPercentage: 0,
            streakCount: 0,
            longestStreak: 0,
            lastChatDate: null,
            todaysChatTime: 0,
          });

          setUserEmail(googleUser.email);
          setTempUserEmail(googleUser.email);
          setUserName(googleUser.displayName.split(' ')[0])
          setUserLastName(googleUser.displayName.split(' ')[1] || '');

          const userDocRef = doc(db, "users", googleUser.uid);
          const userDoc = await getDoc(userDocRef);
      
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setUserName(userDoc.data().firstName);
            setUserLastName(userDoc.data().lastName);
            setProgressScore(userDoc.data().progressScore);
            setProgressLevel(userDoc.data().progressLevel);
            setTargetLanguage(userDoc.data().language);
            setTranslationLanguage(userDoc.data().translationLanguage);
            setTargetLanguageLevel(userDoc.data().level);
            setLearningGoal(userDoc.data().goal);
            setLearningReason(userDoc.data().reason);
            setProgressPercentage(userDoc.data().progressPercentage)
        }
          


          setIsAuthenticated(true);
          setIsRegistering(false);
          setIsLogingIn(false);
        } catch (error) {
          console.error("Google registration error:", error);
        }
      };




      const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await handleGoogleRegistration(result.user);
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };





    // Handle email registration 

    const handleRegistration = async (email, password) => {

        if (!emailRegex.test(email)) {
            
            return;
        }
    
        if (!passwordRegex.test(password)) {
            
            return;
        }

        try {

        

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created:", userCredential);


        // Send email verification

          await sendEmailVerification(userCredential.user, {
            url: window.location.href, 
            handleCodeInApp: true
          });

          
          await setDoc(doc(db, "users", userCredential.user.uid), {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: email,
              password: formData.password,
              language: formData.language,
              translationLanguage: formData.translationLanguage,
              level: formData.level,
              goal: formData.goal,
              reason: formData.reason,
              progressLevel: 1,
              progressScore: 0,
              lastChatTime: new Date(),
              createdAt: new Date(),
              savedChats: [],
              progressPercentage: 0,
              streakCount: 0,
              longestStreak: 0,
              lastChatDate: null,
              todaysChatTime: 0,
              
            })


            // Update profile after registration to have the data after registration, without having to reload the page

            await updateProfile(userCredential.user, {
              displayName: `${formData.firstName} ${formData.lastName}`
              })  

                    const userEmail = userCredential.user.email;
                    setUserEmail(userEmail);
                    setTempUserEmail(userEmail);
                    console.log("User email:", userEmail)
            
                    const userDocRef = doc(db, "users", userCredential.user.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                      setUserData(userDoc.data());
                      setUserName(userDoc.data().firstName);
                      setUserLastName(userDoc.data().lastName)
                      setUserPassword(userDoc.data().password)
                      setProgressScore(userDoc.data().progressScore)
                      setProgressLevel(userDoc.data().progressLevel)
                      setTargetLanguage(userDoc.data().language)
                    setTranslationLanguage(userDoc.data().translationLanguage)
                    setTargetLanguageLevel(userDoc.data().level)
                    setLearningGoal(userDoc.data().goal)
                    setLearningReason(userDoc.data().reason)
                    setSavedChats(userDoc.data().savedChats)
                    setProgressPercentage(userDoc.data().progressPercentage)
                    
                    
                      

            
                      
                    } else {
                      console.log(`No user document found for UID: ${user.uid}`)
                    }
            
          console.log("User registered successfully:", userCredential.user)
          setIsAuthenticated(true);
          setIsRegistering(false)
          setIsLogingIn(false)
          
        } catch (error) {
          console.error("Registration error:", error);
          // Handle error
        }
      }



    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
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
        { code: 'en', name: 'English', flag: '/flags/english.png' },
        { code: 'es', name: 'Spanish', flag: '/flags/spanish.png' },
        { code: 'fr', name: 'French', flag: '/flags/french.png' },
        { code: 'de', name: 'German', flag: '/flags/german.png' },
        { code: 'it', name: 'Italian', flag: '/flags/italian.png' },
    ];

    const translationLanguages = [
        { code: 'en', name: 'English', flag: '/flags/english.png' },
        { code: 'es', name: 'Spanish', flag: '/flags/spanish.png' },
        { code: 'fr', name: 'French', flag: '/flags/french.png' },
        { code: 'de', name: 'German', flag: '/flags/german.png' },
        { code: 'it', name: 'Italian', flag: '/flags/italian.png' },
        { code: 'hr', name: 'Croatian', flag: '/flags/croatian.png' }
    ];


    // Registration steps

    const steps = [
        {
            title: "Choose Language",
            component: (
                <>
                <div className='reg-progress-animation'>
                        <div className='reg-progress-inside' style={{ width: `${currentProgress}%` }}></div>
                </div>
                <div className="registration-step">
                    
                    <div className='reg-step-header'>
                        <span onClick={() => setStep(-1)} className="fa-solid fa-arrow-left"></span>
                        <h2>Which language do you want to learn?</h2>
                    </div>    
                    <div className="language-options">
                        {languages.map(lang => (
                            <div 
                                key={lang.code} 
                                onClick={() => {
                                    handleInputChange('language', lang.name)
                                    setSelectedLanguage(lang.name)
                                    handleNextStep()     
                                }}
                                className={`language-option ${formData.language === lang.name ? 'selected' : ''}`}
                            >
                                <span className='img-span'><img className='lang-flag' src={lang.flag} alt={lang.name} /></span>
                                <span className='lang-name-span'>{lang.name}</span>
                            </div>
                        ))}
                    </div>
                    
                    
                    
                    
                </div>

                <div className='reg-step-action-btns'>

                <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.language}>Continue</button>

                <div className='bottom-br-line reg-step'></div>

                <p className='login-anc'>Already a member? <a onClick={() => {
                    setIsRegistering(false)
                    setIsLogingIn(true)
                }}>Log in</a></p>

                </div>    
                
                </>
            )
        },
        {
            title: "Language Level",
            component: (
                <>
                <div className='reg-progress-animation'>
                        <div style={{ width: `${currentProgress}%` }} className='reg-progress-inside'></div>
                </div>
                <div className="registration-step">
                    
                    <div className='reg-step-header'>
                        <span onClick={() => setStep(0)} className="fa-solid fa-arrow-left"></span>
                        <h2>What is your {selectedLanguage} level?</h2>
                    </div>

                    <p className='registration-info-p'>We will personalize conversations based on your language level.</p>

                    <div className="level-options">
                        {[{name: "Beginner (A1 - A2)", desc: "Beginner", langLevel: "A1-A2", levelImage: "/signal-weak.svg"}, {name: "Intermediate (B1 - B2)", desc: "Intermediate", langLevel: "B1-B2", levelImage: "/signal-medium.svg"}, {name: "Advanced (C1 - C2)", desc: "Advanced", langLevel: "C1-C2", levelImage: "/signal-strong.svg"}].map(level => (
                            <button 
                                key={level.desc} 
                                onClick={() => handleInputChange('level', level.name)}
                                className={`lang-level-btn ${formData.level === level.name ? 'selected' : ''}`}
                            >
                                <span className='lang-level-name-span'><img src={level.levelImage} alt="signal-image" /> {level.desc}</span> 
                                <span className='lang-level-span'>{level.langLevel}</span>
                            </button>
                        ))}
                    </div>
                    
                    
                    
                    
                </div>

                <div className='reg-step-action-btns'>
                <div className='bottom-br-line reg-step'></div>

                <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.level}>Continue</button>

                </div>

                </>
            )
        },
        {
            title: "Translation Language",
            component: (
                <>
                <div className='reg-progress-animation'>
                        <div style={{ width: `${currentProgress}%` }} className='reg-progress-inside'></div>
                </div>

                <div className="registration-step">
                    
                    
                    <div className='reg-step-header'>
                        <span onClick={() => setStep(1)} className="fa-solid fa-arrow-left"></span>
                        <h2>Choose translation language?</h2>
                    </div>

                    <p className='registration-info-p'>Choose your preferred language for translation.</p>


                    <div className="language-options">
                    {translationLanguages.filter(lang => lang.name !== formData.language).map(lang => (
                    <div 
                        key={lang.code} 
                        onClick={() => {handleInputChange('translationLanguage', lang.name)

                            handleNextStep()      
                        }}
                        className={`language-option ${formData.translationLanguage === lang.name ? 'selected' : ''}`}
                    >
                        <span className='img-span'>
                            <img className='lang-flag' src={lang.flag} alt={lang.name} />
                        </span>
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>
        </div>
            <div className='reg-step-action-btns'>

            <div className='bottom-br-line'></div>

                <button 
                    className='reg-btn-action skip-btn'
                    onClick={() => handleInputChange('translationLanguage', 'none')}
                >
                    Skip
                </button>
                <button 
                    className='reg-btn-action registration-btn' 
                    type="submit" 
                    disabled={!formData.translationLanguage}
                >
                    Continue
                </button>

                
            </div>
        </>
    )
},
        {
            title: "Your Goal",
            component: (
                <>
                <div className='reg-progress-animation'>
                        <div style={{ width: `${currentProgress}%` }} className='reg-progress-inside'></div>
                </div>

                <div className="registration-step">
                    
                    <div className='reg-step-header'>
                        <span onClick={() => setStep(2)} className="fa-solid fa-arrow-left"></span>
                        <h2>What are you looking to achieve?</h2>
                    </div>

                    <div className="goal-options">
                        {[{name: "Learning basics", desc: "I want to learn basics", levelImage: "/books.webp"}, {name: "Improve speaking", desc: "I want to improve speaking", levelImage: "/talking.webp"}, {name: "Become fluent", desc: "I want to become fluent", levelImage: "/star.webp"}, {name: "I'm not sure", desc: "I'm not sure yet", levelImage: "/unsure.webp"}].map(goal => (
                            <button 
                                key={goal.name} 
                                onClick={() => handleInputChange('goal', goal.name)}
                                className={`lang-goal-btn ${formData.goal === goal.name ? 'selected' : ''}`}
                            >
                                <img src={goal.levelImage} alt="level-image" /> 
                                <span className='lang-goal-span'>{goal.desc}</span>
                            </button>
                        ))}
                    </div>
                    

                    

                    
                </div>
                    <div className='reg-step-action-btns'>
                    <div className='bottom-br-line'></div>

                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.goal}>Continue</button>
                    </div>
                </>
            )
        },
        {
            title: "Your Reason",
            component: (
                <>
                <div className='reg-progress-animation'>
                        <div style={{ width: `${currentProgress}%` }} className='reg-progress-inside'></div>
                </div>

                <div className="registration-step">
                    <div className='reg-step-header'>
                        <span onClick={() => setStep(3)} className="fa-solid fa-arrow-left"></span>
                        <h2>What is your primary reason for learning {selectedLanguage}?</h2>
                    </div>


                    <div className="reason-options">
                        {[{name: "Academy and research", image: "/books.webp"}, {name: "University and education", image:"/student-hat.webp"}, {name: "Travel and tourism", image:"/airplane.webp"}, {name:"Job and career", image:"/job.webp"}, {name:"Immigration", image:"/globe.webp"}, {name:"Better communication", image:"/talking.webp"}, {name:"Language tests and certificates", image:"/test.webp"}, {name:"Other", image:"/perfection.webp"}].map(reason => (
                            <button 
                                key={reason.name} 
                                onClick={() => handleInputChange('reason', reason.name)}
                                className={formData.reason === reason.name ? 'selected' : ''}
                            >
                                <img src={reason.image} alt="reason-image" />
                                <p>{reason.name}</p>
                            </button>
                        ))}
                    </div>
                    
                    
                    <div className='reg-step-action-btns reason-learning'>
                    <div className='bottom-br-line'></div>

                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.reason}>Continue</button>
                    </div>
                </div>
                    
                </>
            )
        },
        {
            title: "Authentication",
            component: (
            <>

                <div className='reg-progress-animation'>
                <div style={{ width: `${currentProgress}%` }} className='reg-progress-inside'></div>
                </div>

                <div className="registration-step">
                    
                <div className='reg-step-header'>
                        <span onClick={() => setStep(4)} className="fa-solid fa-arrow-left"></span>
                        <h2>Almost there!</h2>
                    </div>

                    <p className='registration-info-p'>Just a but more info to set up your LanguageLab account.</p>    


                    <div className='registration-auth-div'>

                    <button className='reg-btn-action google-btn auth' onClick={handleGoogleSignIn}>
                    <img src="/google-logo.webp" alt="" /> Sign up with Google
                        </button>

                    <div className='or-div signup-or'>
                    <div className='first-or-div'></div>

                    <p>or</p>

                    <div className='second-or-div'></div>    
                    </div>    

                    <div className='registration-form'>

                    <div className='login-label-div'>
                    <label htmlFor="text">First name</label>    
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => {
                            handleInputChange(e.target.name, e.target.value);
                        }}
                        onBlur={(e) => {
                            setErrors({
                                ...errors,
                                firstName: validateName(e.target.value)
                            });
                        }}
                        className={errors.firstName ? "invalid" : ""}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>    
                    
                    <div className='login-label-div'>
                    <label htmlFor="text">Last name</label>    
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => {
                            handleInputChange(e.target.name, e.target.value);
                        }}
                        onBlur={(e) => {
                            setErrors({
                                ...errors,
                                lastName: validateName(e.target.value)
                            });
                        }}
                        className={errors.lastName ? "invalid" : ""}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>    

                    
                    <div className='login-label-div'>
                    <label htmlFor="email">Your email address</label>    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => {
                            handleInputChange('email', e.target.value);
                        }}

                        onBlur={(e) => {
                            setErrors({
                                ...errors,
                                email: validateEmail(e.target.value)
                            });
                        }}
                        className={errors.email ? "invalid" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>    


                    <div className='login-label-div'>
                    <label htmlFor="password">Password</label>    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => {
                            handleInputChange('password', e.target.value);
                        }}

                        onBlur={(e) => {
                            setErrors({
                                ...errors,
                                password: validatePassword(e.target.value)
                            });
                        }}
                        className={errors.password ? "invalid" : ""}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                    </div> 
                    
                    <div className='login-label-div'>
                    <label htmlFor="password">Repeat password</label>    
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                            handleInputChange('confirmPassword', e.target.value);
                        }}

                        onBlur={(e) => {
                            setErrors({
                                ...errors,
                                confirmPassword: validateConfirmPassword(formData.password, e.target.value)
                            });
                        }}
                        className={errors.confirmPassword ? "invalid" : ""}
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div> 
                    
                
                    <button className='reg-btn-action registration-btn auth' onClick={() => handleRegistration(formData.email, formData.password)}>Register</button>

                    </div>
                    </div>

                    <div className='bottom-br-line auth'></div>

                    
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>

                    <p className='terms-p'>
                    By signing up, you accept our Terms and Conditions and Privacy Policy. Occasionally, we’ll send you our newsletters, with learning tips and special offers. You can unsubscribe anytime.
                    </p>
                    
                </div>

                </>
            )
        }
    ];



    return (
        <div>
            <div className="registration-container">
            <img className='registration-logo' src="/header-logo.png" alt="" />
                {step === -1 ? (
                    <div className="registration-content null-step">
                        <div className='mobile-get-started-reg-div'>
                            <img src="/aiimages/default-chat-mode.png" alt="chat-avatar" />
                        </div>
                        <div className='get-started-info'>
                        <div className='get-started-text'>    
                        <h1>A Smarter Way to Learn a Language</h1>
                        <p>Discover how AI can revolutionize your language learning experience with immersive techniques, engaging methods, and personalized teaching for maximum progress.</p>
                        </div>
                        <img className='teacherfullimg' src="/aiimages/default-chat-mode.png" alt="teacherfullimg" />
                        <div className="action-buttons">
                            <button className='reg-btn-action registration-btn'  onClick={() => setStep(0)}>Get started</button>
                            <a className='reg-btn-action login-btn' href="/login" onClick={(e) =>                                            {e.preventDefault();
                                    setIsLogingIn(true);
                                    setIsRegistering(false);
                                    }}>Log in</a>
                        </div>
                        <div className='absolute-logo-div'>
                            <img src="/header-logo.png" alt="" />
                        </div>
                        <div className='border-div'></div>
                        <a className='bottom-reg-a' href="/">            
                            <p>© LanguageLab, Inc.</p>
                        </a>
                        </div>
                        
                    </div>
                ) : step === 0 ? ( 
                <>    
                    <div className='header-auth-div registration'>
                    <img src="/header-logo.png" alt="" />
                    </div>
                    <div className="registration-content step-div">
                    <form className='registration-form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                        {steps[step].component}
                        {step < steps.length - 1}
                    </form>
                    </div>
                </>    
                ) : (
                    <>    
                    <div className='header-auth-div registration'>
                    <img src="/header-logo.png" alt="" />
                    </div>
                    <div className="registration-content step-div">
                    <form className='registration-form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                        {steps[step].component}
                        {step < steps.length - 1}
                    </form>
                    </div>
                </>    
                )}
            </div>
        </div>
    );
};

export default Registration
