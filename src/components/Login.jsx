import { useState } from 'react';
import { auth, googleProvider } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login({ setIsAuthenticated, setIsRegistering, setIsLogingIn }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setIsAuthenticated(true);
            setIsLogingIn(false);
            setIsRegistering(false);
        } catch (error) {
            console.error("Login error:", error);
            // Handle error appropriately
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            
                setIsAuthenticated(true);
                setIsRegistering(false);
                setIsLogingIn(false);
            
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

    return (
        <div className="login-container">
            <div className='header-auth-div'>
                <img src="./public/header-logo.png" alt="" />
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
                       <img src="./public/google-logo.webp" alt="" /> Continue with Google
                    </button>


                <div className='or-div'>
                    <div className='first-or-div'></div>

                    <p>or</p>

                    <div className='second-or-div'></div>    
                </div>    

                <form onSubmit={handleLogin} className="registration-form">
                    <div className='login-label-div'>
                    <label htmlFor="email">Your email address</label>    
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className='login-label-div password-div'>
                    <label htmlFor="password">Password</label>  
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span className="fa-regular fa-eye"></span>
                    </div>
                    <a href="#" className="forgot-password">Forgot password?</a>
                    
                    
                    
                    <button 
                        className="reg-btn-action registration-btn" 
                        type="submit"
                        disabled={!formData.email || !formData.password}
                    >
                        Log in
                    </button>
                    
                    
                </form>
            </div>
                <p className="login-anc">
                        Not a member yet? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setIsLogingIn(false);
                        setIsRegistering(true);
                        }}>Sign up</a>
                    </p>
        </div>
    );
}