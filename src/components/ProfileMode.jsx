import React from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { useState, useEffect, useRef } from 'react';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, updateEmail, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail, deleteUser } from 'firebase/auth';




export default function ProfileMode(props) {

    const {setSelectedMode, userName, setUserName, userLastName, setUserLastName, userEmail, setUserEmail, tempUserEmail, setTempUserEmail, newUserEmail, setNewUserEmail, userPassword, setUserPassword, setIsAuthenticated, isAuthenticated, setFormData, setTargetLanguage, setTranslationLanguage, targetLanguage, translationLanguage, targetLanguageLevel, setTargetLanguageLevel, accountSelectedOption, setAccountSelectedOption} = props

    const [tempUserName, setTempUserName] = useState(userName);
    const [tempUserLastName, setTempUserLastName] = useState(userLastName);
    const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
    

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    
    const [languageLevel, setLanguageLevel] = useState('Beginner (A1 - A2)')

    // Add language options
    const targetLanguages = [
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'de', name: 'German', flag: './public/flags/german.png' },
        { code: 'es', name: 'Spanish', flag: './public/flags/spanish.png' },
        { code: 'it', name: 'Italian', flag: './public/flags/italian.png' },
        { code: 'fr', name: 'French', flag: './public/flags/french.png' }
    ];
    const translationLanguages = [
        { code: 'hr', name: 'Croatian', flag: './public/flags/croatian.png'},
        { code: 'en', name: 'English', flag: './public/flags/english.png' },
        { code: 'de', name: 'German', flag: './public/flags/german.png' },
        { code: 'es', name: 'Spanish', flag: './public/flags/spanish.png' },
        { code: 'it', name: 'Italian', flag: './public/flags/italian.png' },
        { code: 'fr', name: 'French', flag: './public/flags/french.png' }
    ];

    const levels = [
        { code: 'a1-a2', name: 'Beginner (A1 - A2)' },
        { code: 'b1-b2', name: 'Intermediate (B1 - B2)' },
        { code: 'c1-c2', name: 'Advanced (C1 - C2)' }
      ];

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }


    const handleLanguageChange = async (newLanguage, type) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
    
            const userDocRef = doc(db, "users", user.uid);
            
            // Update state based on type
            if (type === 'target') {
                setTargetLanguage(newLanguage);
            } else {
                setTranslationLanguage(newLanguage);
            }
    
            // Update Firebase
            await updateDoc(userDocRef, {
                [type === 'target' ? 'language' : 'translationLanguage']: newLanguage
            });
    
        } catch (error) {
            console.error("Error updating language:", error);
        }
    };


    const CustomLevelSelect = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectRef = useRef(null);


        useEffect(() => {
            const handleClickOutside = (event) => {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);


        const handleLevelChange = async (newLevel) => {
            try {
                const user = auth.currentUser;
                if (!user) return;
                
                const userDocRef = doc(db, "users", user.uid);
                
                // Update state
                onChange(newLevel);
                
                // Update Firebase
                await updateDoc(userDocRef, {
                    level: newLevel
                });
                
                setIsOpen(false);
            } catch (error) {
                console.error("Error updating level:", error);
            }
        };
        
        return (
            <div className="select-container" ref={selectRef}>
                <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
                    <span>{value}</span>
                    <span className="fa-solid fa-chevron-down"></span>
                </div>
                
                {isOpen && (
                    <div className="custom-select">
                        {options.map(level => (
                            <div 
                            key={level.code} 
                            className={`select-option ${value === level.name ? 'selected' : ''}`}
                            onClick={() => handleLevelChange(level.name)}
                        >
                            <span>{level.name}</span>
                        </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        return () => setDeleteAccountPassword('');
    }, [showDeleteModal]);


    const CustomSelect = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectRef = useRef(null);

        

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLanguage = options.find(lang => lang.name === value)

        return (
            <div className="select-container" ref={selectRef}>
            <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
            {selectedLanguage && <img src={selectedLanguage.flag} alt={value} />}
              
              <span>{value}</span>
              <span className="fa-solid fa-chevron-down"></span>
            </div>
            
            {isOpen && (
              <div className="custom-select">
                {options.map(lang => (
                  <div 
                  key={lang.code} 
                  className={`select-option ${value === lang.code ? 'selected' : ''}`}
                  onClick={() => onChange(lang.name)} // Use the passed onChange prop
                >
                  <img src={lang.flag} alt={lang.name} />
                  <span>{lang.name}</span>
                </div>
                ))}
              </div>
            )}
          </div>
        );
      }


      const handleSavePersonalDetails = async () => {
        if (!tempUserEmail.trim() || !tempUserName.trim() || !tempUserLastName.trim()) {
            alert("Email, first name or last name can not be empty!");
            return;
        }
    
        try {
            const user = auth.currentUser;
            if (!user) return;
    
            const userDocRef = doc(db, "users", user.uid);
    
            // Update user profile in Firestore
            await updateDoc(userDocRef, {
                firstName: tempUserName,
                lastName: tempUserLastName,
            });
    
            // Update Firebase Authentication profile
            await updateProfile(user, {
                displayName: tempUserName,
            });
            
    
            setUserName(tempUserName);
            setUserLastName(tempUserLastName);
    
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.code === "auth/requires-recent-login") {
                alert("Please log in again to update your email.");
            } else {
                alert("Failed to update profile");
            }
        }
    };
    
    
    


    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("All fields are required");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match");
            return;
        }
    
        try {
            const user = auth.currentUser;
            if (!user) return;


            const credential = EmailAuthProvider.credential(user.email, currentPassword)
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);
            alert("Password updated successfully");
            await updateDoc(userDocRef, {
                password: newPassword,
            });
            
            // Clear the fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Make sure your current password is correct.");
        }
    };

    const handleForgotPassword = async () => {
        if (!userEmail) {
            alert("Please enter your email address");
            return;
        }
    
        try {
            await sendPasswordResetEmail(auth, userEmail);
            alert("Password reset instructions have been sent to your email");
        } catch (error) {
            console.error("Error sending reset email:", error);
            alert("Failed to send reset email. Please try again.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;
    
            const credential = EmailAuthProvider.credential(user.email, deleteAccountPassword)
            await reauthenticateWithCredential(user, credential);
            // Delete user data from Firestore
            const userDocRef = doc(db, "users", user.uid);
            await deleteDoc(userDocRef);
    
            // Delete user account from Firebase Authentication
            await deleteUser(user);

            setFormData({
                language: '',
                translationLanguage: '',
                level: '',
                goal: '',
                reason: '',
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            })

            setUserName('')
            setUserLastName('')
            setUserEmail('')
            setTempUserEmail('')
            
    
            // Close the modal and redirect/logout
            setShowDeleteModal(false);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error deleting account:", error);
            if (error.code === "auth/requires-recent-login") {
                alert("Please log in again to delete your account.");
            } else {
                alert("Failed to delete account");
            }
        }
    };



    const DeleteAccountModal = React.memo(() => {
        const [inputValue, setInputValue] = useState('');
        const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [deleteAccountPassword])


        return (
            <div
                className="modal-overlay"
                onClick={(e) => {
                    if (e.target.className === 'modal-overlay') {
                        setShowDeleteModal(false);
                    }
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
            >
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <h2>Are you sure you want to delete your account?</h2>
                    <input 
                        type="password"
                        name="deleteAccountPassword"
                        placeholder="Enter your password"
                        ref={inputRef}
                        value={deleteAccountPassword}
                        onChange={(e) => {
                            if (e.target && e.target.value !== undefined) {
                                setDeleteAccountPassword(e.target.value);
                            }
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                        }}
                    >
                        <button
                            style={{
                                background: '#F44336',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                            }}
                            onClick={handleDeleteAccount}
                        >
                            Delete
                        </button>
                        <button
                            style={{
                                background: '#e4e4e4',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    });
    
    
    
    


    return (
        <div className='profile-mode'>
        <div className="profile-list-div">
            <div className="profile-header">
                <span className="fa-solid fa-arrow-left" onClick={() => setSelectedMode('main')}></span>
                <h2>Account</h2>
            </div>
            
            <div className="profile-menu">
                <div className="profile-menu-btn" onClick={() => setAccountSelectedOption('profile')}>
                    <span className='fa-regular fa-user'></span>
                    <div className='profile-menu-text'>
                    <p>Profile</p>
                    <p className='profile-menu-small-text'>Manage your profile details.</p>
                    </div>
                </div>
                <div className="profile-menu-btn" onClick={() => setAccountSelectedOption('settings')}>
                <span className='fa-solid fa-gear'></span>
                    <div className='profile-menu-text'>
                    <p>Settings</p>
                    <p className='profile-menu-small-text'>Manage your account settings.</p>
                    </div>
                </div>
                <div className="profile-menu-btn" onClick={handleLogout}>
                <span className='fa-solid fa-arrow-right-from-bracket'></span>
                    <div className='profile-menu-text'>
                    <p className='log-out-text'>Log out</p>
                    <p className='profile-menu-small-text'>Log out from this profile.</p>
                    </div>
                </div>
            </div>
        </div>

        {accountSelectedOption === 'unexpanded' && (
            <div className="profile-options-div">
                <div className="profile-option">Personal details</div>
                <div className="profile-option">Change password</div>
                <div className="profile-option">Delete account</div>
            </div>
        )}
        
        {accountSelectedOption === 'profile' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setAccountSelectedOption('unexpanded')
                }}></span>
                <h2>Profile</h2>
                </div>
                <div className='profile-options-btn-list'>
                <div className="profile-menu-option" onClick={() => {
                    setAccountSelectedOption('personal-details')
                }}>
                    <span className='fa-regular fa-user'></span>
                    <div>
                    <p>Personal details</p>
                    <p className='profile-menu-small-text'>Manage your personal details below.</p>
                    </div>
                </div>
                <div className="profile-menu-option" onClick={() => {
                    setAccountSelectedOption('change-password')
                }}><span className='fa-solid fa-lock'></span>
                    <div>
                    <p>Change password</p>
                    <p className='profile-menu-small-text'>Change your current password.</p>
                    </div></div>
                <div className="profile-menu-option" onClick={() => setShowDeleteModal(true)}><span className='fa-solid fa-trash log-out-text'></span>
                    <div>
                    <p className='log-out-text'>Delete account</p>
                    <p className='profile-menu-small-text'>This action can not be undone.</p>
                    </div></div>
                    </div>
            </div>
        )}

        {showDeleteModal && <DeleteAccountModal/>}

        {accountSelectedOption === 'personal-details' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setAccountSelectedOption('profile')
                }}></span>
                <h2>Personal details</h2>
                </div>
                <div className='personal-details-btn-list'>
                    <div className="personal-details-setting">
                        
                        
                            <p>Your email address</p>
                            
                            <input type="text" disabled value={tempUserEmail} onChange={(e) => setTempUserEmail(e.target.value)}/>

                            
                        
                    </div>
                    <div className="personal-details-setting">
                        
                        
                            <p>First name</p>
                            
                            <input type="text" value={tempUserName} onChange={(e) => setTempUserName(e.target.value)}/>

                            
                        
                    </div>
                    
                    <div className="personal-details-setting">
                        
                        
                            <p>Last name</p>
                            
                            <input type="text" value={tempUserLastName} onChange={(e) => setTempUserLastName(e.target.value)}/>
                            
                        
                    </div>

                    <button className='personal-details-btn' onClick={handleSavePersonalDetails}>Save</button>
                    
                </div>
            </div>
        )}

        {accountSelectedOption === 'change-password' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setAccountSelectedOption('profile')
                }}></span>
                <h2>Change password</h2>
                </div>
                <div className='personal-details-btn-list'>
                    <div className="personal-details-setting">
                        
                        
                            <p>Current password</p>
                            
                            <input 
                                type="password" 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            
                        
                    </div>
                    <div className="personal-details-setting">
                        
                        
                            <p>New password</p>
                            
                            <input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            
                        
                    </div>
                    
                    <div className="personal-details-setting">
                        
                        
                            <p>Repeat password</p>
                            
                            <input 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            
                        
                    </div>

                    <div className='change-password-btns'>
                        <button className='personal-details-btn' onClick={handleChangePassword}>Save</button>
                        <p>Forgot password? <a onClick={() => {
                    setAccountSelectedOption('forgot-password')
                }}>Click here</a></p>
                    </div>
                    
                </div>
            </div>
        )}

        {accountSelectedOption === 'forgot-password' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setAccountSelectedOption('change-password')
                }}></span>
                <h2>Forgot password?</h2>
                </div>
                <div className='personal-details-btn-list'>
                    <div className="personal-details-setting">
                        
                        
                            <p>Your email address</p>
                            
                            <input type="text"  value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                            
                        
                    </div>
                    
                        <button className='personal-details-btn' onClick={handleForgotPassword}>Send instructions</button>
                        
                    </div>
                    
                </div>
            
        )}
        
        {accountSelectedOption === 'settings' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                    <span className='fa-solid fa-arrow-left' onClick={() => {
                        setAccountSelectedOption('unexpanded')
                    }}></span>
                    <h2>Settings</h2>
                </div>
                <div className='profile-settings-btn-list'>
                    <div className="profile-menu-setting">
                        
                        
                            <p>Choose your target language</p>
                            
                            <CustomSelect
                                options={targetLanguages}
                                value={targetLanguage}
                                onChange={(newValue) => handleLanguageChange(newValue, 'target')}
                            />
                        
                    </div>
                    <div className="profile-menu-setting">
                    <p>Choose your translation language</p>
                    <CustomSelect
                        options={translationLanguages}
                        value={translationLanguage}
                        onChange={(newValue) => handleLanguageChange(newValue, 'translation')}
                    />
                </div>
                    
                    <div className="profile-menu-setting">
                    <p>Choose your target language level</p>
                    <CustomLevelSelect
                        options={levels}
                        value={targetLanguageLevel}
                        onChange={setTargetLanguageLevel}
                    />
                </div>
                    
                </div>
            </div>
        )}
        </div>
    )
}