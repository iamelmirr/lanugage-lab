import { useState } from 'react';
import { auth, googleProvider } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { use } from 'react';

export default function Login({ setIsAuthenticated, setIsRegistering, setIsLogingIn }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
    const [isEmailSentOpen, setIsEmailSentOpen] = useState(false)
    const [errors, setErrors] = useState({
            email: '',
            password: ''
        })
    const [showPassword, setShowPassword] = useState(false);


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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            if (errors.email || errors.password) {
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setIsAuthenticated(true);
            setIsLogingIn(false);
            setIsRegistering(false);
        } catch (error) {
            console.error("Login error:", error);
            
            if (error.code === 'auth/invalid-credential') {
                setErrors(prev => ({
                    ...prev,
                    email: 'Wrong email/password or this account does not exist'
                }));
            } else if (error.code === 'auth/wrong-password') {
                setErrors(prev => ({
                    ...prev,
                    password: 'Incorrect password'
                }));
            }
    
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const userDocRef = doc(db, "users", result.user.uid);
            const userDoc = await getDoc(userDocRef);
            
            
            if (userDoc.exists()) {
                setIsAuthenticated(true);
                setIsRegistering(false);
                setIsLogingIn(false);
            } else {
                // User doesn't exist in database
                await auth.signOut(); // Sign out the user
                setErrors(prev => ({
                    ...prev,
                    email: 'This email is not registered. Please sign up first.'
                }));
            }
            
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return isEmailSentOpen ? (
        <div className='login-wrapper'>
        <div className="login-container">
            <div className='header-auth-div'>
                <img src="/header-logo.png" alt="" />
            </div>
            <div className="login-content">
                <div className="login-header-options reset-password-header">
                    <span onClick={() => {
                        setIsEmailSentOpen(false)
                        setIsForgotPasswordOpen(false)
                    }} className="fa-solid fa-arrow-left"></span>
                    <h2>Check your email</h2>
                </div>
                <p className='forgot-password-p'>We just sent you a password reset link to your email address.</p>
                <p className='forgot-password-p'>If you did not receive it, please check your spam folder or click below.</p>
                    
                    
            </div>

            <img className='robot-img' src="/aiimages/robot-mail.png" alt="" />


            <div className='bottom-br-line check-email'></div>
                
            <button 
                        className="reg-btn-action registration-btn check-email" 
                        type="submit"
                        disabled={!formData.email || !formData.password}
                    >
                        I did not receive the email
            </button>
                
        </div>
        </div>
    ) : isForgotPasswordOpen ? (
        <div className='login-wrapper'>
        <div className="login-container reset-password">
            <div className='header-auth-div'>
                <img src="/header-logo.png" alt="" />
            </div>
            <div className="login-content">
                <div className="login-header-options reset-password-header">
                    <span onClick={() => {
                        setIsForgotPasswordOpen(false)
                    }} className="fa-solid fa-arrow-left"></span>
                    <h2>Reset Password</h2>
                    
                </div>
                <p className='forgot-password-p'>Enter the email associated with your account and we’ll send an email with instructions to reset password.</p>

                


               

                <form onSubmit={handleLogin} className="registration-form forgot-password-form">
                    <div className='login-label-div reset-password-label-div'>
                    <label htmlFor="email">Your email address</label>    
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => {
                            handleInputChange(e);
                            setErrors({
                                ...errors,
                                email: validateEmail(e.target.value)
                            });
                        }}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    
                    
                    
                    
                    
                </form>

            </div>

            <button 
                        className="reg-btn-action registration-btn send-instructions-btn" 
                        type="submit"
                        disabled={!formData.email || !formData.password}
                    >
                        Send instructions
                    </button>


            <div className='bottom-br-line forgot-password'></div>
                
                <p className="login-anc ">
                        Not a member yet? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setIsLogingIn(false);
                        setIsRegistering(true);
                        }}>Sign up</a>
                    </p>
        </div>
        </div>
    ) : (
        <div className='login-wrapper'>
            <img className='header-logo' src="/header-logo.png" alt="header-logo" />
        <div className="login-container">
            <div className='header-auth-div'>
                <img src="/header-logo.png" alt="" />
            </div>
            <div className="login-content">
                <div className="login-header-options">
                    <span onClick={() => {
                        setIsLogingIn(false);
                        setIsRegistering(true);
                    }} className="fa-solid fa-arrow-left"></span>
                    <h2>Login</h2>
                </div>

                <button className="reg-btn-action google-btn" onClick={handleGoogleLogin}>
                       <img src="/google-logo.webp" alt="" /> Continue with Google
                    </button>


                <div className='or-div'>
                    <div className='first-or-div'></div>

                    <p>or</p>

                    <div className='second-or-div'></div>    
                </div>    

                <form onSubmit={handleLogin} className="registration-form">
                    <div className='login-label-div'>
                    <label htmlFor="email">Your email address</label>    
                    <input className={errors.email ? "invalid" : ""}
                        type="email"
                        required
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        onBlur={(e) => {   
                            setErrors({
                                ...errors,
                                email: validateEmail(e.target.value)
                            });
                        }}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}

                    </div>
                    <div className='login-label-div password-div'>
                    <label htmlFor="password">Password</label>  
                    <input className={errors.password ? "invalid" : ""}
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        onBlur={(e) => {
                            
                            setErrors({
                                ...errors,
                                password: validatePassword(e.target.value)
                            });
                        }}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                    <span 
                            className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></span>
                    </div>
                    <a href="#" onClick={() => setIsForgotPasswordOpen(true)} className="forgot-password">Forgot password?</a>
                    
                    
                    
                    <button 
                        className="reg-btn-action registration-btn" 
                        type="submit"
                        disabled={!formData.email || !formData.password}
                    >
                        Log in
                    </button>
                    
                    
                </form>
            </div>

            <div className='border-div'></div>

            <div className='bottom-br-line'></div>
                <p className="login-anc">
                        Not a member yet? <a onClick={(e) => {
                        e.preventDefault();
                        setIsLogingIn(false);
                        setIsRegistering(true);
                        }}>Sign up</a>
                    </p>
        </div>
        </div>
    ) 
}