import { useState } from 'react';
import { auth, db, googleProvider } from '../utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup } from 'firebase/auth';

export default function Registration(props) {
    const {  setIsAuthenticated, setIsRegistering, setIsLogingIn, formData, setFormData, userName, userLastName, userEmail, setUserEmail, setUserLastName, setUserName, selectMode, setSelectMode, setProgressScore, progressScore, progressLevel, setProgressLevel,  levelThresholds, tempUserEmail, setTempUserEmail, newUserEmail, setNewUserEmail, userPassword, setUserPassword, isAuthenticated, setUserData, setTargetLanguage, setTranslationLanguage, setTargetLanguageLevel, targetLanguageLevel, setLearningReason, setLearningGoal, savedChats, setSavedChats } = props


    const [step, setStep] = useState(-1); // -1 represents the initial landing screen
    
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    


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
            savedChats: []
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



    const handleRegistration = async (email, password) => {

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        try {

        

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created:", userCredential);


          await sendEmailVerification(userCredential.user, {
            url: window.location.href, // Redirect URL after verification
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
              
            })


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
                      
                      console.log(userDoc)
            
                      
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
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'es', name: 'Spanish', flag: './public//flags/spanish.png' },
        { code: 'fr', name: 'French', flag: './public//flags/french.png' },
        { code: 'de', name: 'German', flag: './public//flags/german.png' },
        { code: 'it', name: 'Italian', flag: './public//flags/italian.png' },
        // Add more languages here
    ];

    const translationLanguages = [
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'es', name: 'Spanish', flag: './public//flags/spanish.png' },
        { code: 'fr', name: 'French', flag: './public//flags/french.png' },
        { code: 'de', name: 'German', flag: './public//flags/german.png' },
        { code: 'it', name: 'Italian', flag: './public//flags/italian.png' },
        { code: 'hr', name: 'Croatian', flag: './public/flags/croatian.png' }
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
                                onClick={() => handleInputChange('language', lang.name)}
                                className={`language-option ${formData.language === lang.name ? 'selected' : ''}`}
                            >
                                <span className='img-span'><img className='lang-flag' src={lang.flag} alt={lang.name} /></span>
                                <span>{lang.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className='reg-process-btns'>
                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.language}>Continue</button>
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
                        {["Beginner (A1 - A2)", "Intermediate (B1 - B2)", "Advanced (C1 - C2)"].map(level => (
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
                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.level}>Continue</button>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    </div>
                </div>
            )
        },
        {
            title: "Translation Language",
            component: (
                <div className="registration-step">
                    <h2>Choose your translation language</h2>
                    <div className="language-options">
                    {translationLanguages.filter(lang => lang.name !== formData.language).map(lang => (
                    <div 
                        key={lang.code} 
                        onClick={() => handleInputChange('translationLanguage', lang.name)}
                        className={`language-option ${formData.translationLanguage === lang.name ? 'selected' : ''}`}
                    >
                        <span className='img-span'>
                            <img className='lang-flag' src={lang.flag} alt={lang.name} />
                        </span>
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>
            <div className='reg-process-btns'>
                <button 
                    className='reg-btn-action'
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
                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.goal}>Continue</button>
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
                    <button className='reg-btn-action registration-btn' type="submit" disabled={!formData.reason}>Continue</button>
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
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}

                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat Password"
                        value={formData.confirmPassword}
                    />
                    <button onClick={() => handleRegistration(formData.email, formData.password)}>Register</button>
                    <div className="auth-options">
                        <button onClick={handleGoogleSignIn}>Sign up with Google</button>                      
                    </div>
                    <p className='login-anc'>Already a member? <a href="/login">Log in</a></p>
                    
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
                        <a className='reg-btn-action login-btn' href="/login" onClick={(e) =>                                            {e.preventDefault();
                                setIsLogingIn(true);
                                setIsRegistering(false);
                                }}>Log in</a>
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
