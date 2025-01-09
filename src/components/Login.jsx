import { useState } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="registration-container">
            <div className="registration-content">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin} className="registration-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <a href="#" className="forgot-password">Forgot password?</a>
                    
                    <button className="reg-btn-action">
                        Continue with Google
                    </button>
                    
                    <button 
                        className="reg-btn-action registration-btn" 
                        type="submit"
                        disabled={!formData.email || !formData.password}
                    >
                        Log in
                    </button>
                    
                    <p className="login-anc">
                        Not a member yet? <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setIsLogingIn(false);
                        setIsRegistering(true);
                        }}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}