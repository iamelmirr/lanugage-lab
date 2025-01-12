import { auth, db } from '../utils/firebaseConfig';
import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { updateProfile, updatePassword, updateEmail, sendEmailVerification } from 'firebase/auth';




export default function ProfileMode(props) {

    const {setSelectedMode, userName, setUserName, userLastName, setUserLastName, userEmail, setUserEmail, tempUserEmail, setTempUserEmail, newUserEmail, setNewUserEmail} = props

    const [tempUserName, setTempUserName] = useState(userName);
    const [tempUserLastName, setTempUserLastName] = useState(userLastName);
    

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [selectedOption, setSelectedOption] = useState('unexpanded')

    const [targetLanguage, setTargetLanguage] = useState('English')
    const [translationLanguage, setTranslationLanguage] = useState('English')
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

    const CustomLevelSelect = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);
        
        return (
            <div className="select-container">
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
                                onClick={() => {
                                    onChange(level.name);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{level.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    const CustomSelect = ({ options, value, onChange }) => {
        const [isOpen, setIsOpen] = useState(false);

        const selectedLanguage = options.find(lang => lang.name === value)


        return (
            <div className="select-container">
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
            alert("Email and first name cannot be empty");
            return;
        }
    
        try {
            const user = auth.currentUser;
            if (!user) return;

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
            firstName: tempUserName,
            lastName: tempUserLastName
        })
    
            await updateProfile(user, {
            displayName: tempUserName
            });

            if(tempUserEmail !== userEmail) {
                try {
                    const user = auth.currentUser;
                    
                    // 1. Update email in Firebase Auth
                    await updateEmail(user, tempUserEmail);
                    
                    // 2. Send verification email
                    await sendEmailVerification(user, {
                        url: window.location.href,
                        handleCodeInApp: true
                    });
                    
                    // 3. Store new email in Firestore for tracking
                    const userDocRef = doc(db, "users", user.uid);
                    await updateDoc(userDocRef, {
                        newUserEmail: tempUserEmail
                    });
                    
                    setNewUserEmail(tempUserEmail);
                    alert("Please check your email to verify the new address");
                    
                    // 4. Set up an auth state listener to check verification
                    const unsubscribe = auth.onAuthStateChanged(async (user) => {
                        if (user?.emailVerified && user.email === tempUserEmail) {
                            // Update Firestore with verified email
                            await updateDoc(userDocRef, {
                                email: tempUserEmail
                            });
                            setUserEmail(tempUserEmail);
                            unsubscribe();
                        }
                    });
            
                } catch (error) {
                    console.error("Error updating email:", error);
                    alert("Failed to update email. Make sure you're recently logged in.");
                }
            }
    
            // Update parent state only after successful save
            
            setUserName(tempUserName);
            setUserLastName(tempUserLastName);
    
            alert("Profile updated successfully");
    
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    }


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
    
            await updatePassword(user, newPassword);
            alert("Password updated successfully");
            
            // Clear the fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Make sure your current password is correct.");
        }
    };


    return (
        <div className='profile-mode'>
        <div className="profile-list-div">
            <div className="profile-header">
                <span className="fa-solid fa-arrow-left" onClick={() => setSelectedMode('main')}></span>
                <h2>Account</h2>
            </div>
            
            <div className="profile-menu">
                <div className="profile-menu-btn" onClick={() => setSelectedOption('profile')}>
                    <span className='fa-regular fa-user'></span>
                    <div className='profile-menu-text'>
                    <p>Profile</p>
                    <p className='profile-menu-small-text'>Manage your profile details.</p>
                    </div>
                </div>
                <div className="profile-menu-btn" onClick={() => setSelectedOption('settings')}>
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

        {selectedOption === 'unexpanded' && (
            <div className="profile-options-div">
                <div className="profile-option">Personal details</div>
                <div className="profile-option">Change password</div>
                <div className="profile-option">Delete account</div>
            </div>
        )}
        
        {selectedOption === 'profile' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setSelectedOption('unexpanded')
                }}></span>
                <h2>Profile</h2>
                </div>
                <div className='profile-options-btn-list'>
                <div className="profile-menu-option" onClick={() => {
                    setSelectedOption('personal-details')
                }}>
                    <span className='fa-regular fa-user'></span>
                    <div>
                    <p>Personal details</p>
                    <p className='profile-menu-small-text'>Manage your personal details below.</p>
                    </div>
                </div>
                <div className="profile-menu-option" onClick={() => {
                    setSelectedOption('change-password')
                }}><span className='fa-solid fa-lock'></span>
                    <div>
                    <p>Change password</p>
                    <p className='profile-menu-small-text'>Change your current password.</p>
                    </div></div>
                <div className="profile-menu-option"><span className='fa-solid fa-trash log-out-text'></span>
                    <div>
                    <p className='log-out-text'>Delete account</p>
                    <p className='profile-menu-small-text'>This action can not be undone.</p>
                    </div></div>
                    </div>
            </div>
        )}

        {selectedOption === 'personal-details' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setSelectedOption('profile')
                }}></span>
                <h2>Personal details</h2>
                </div>
                <div className='personal-details-btn-list'>
                    <div className="personal-details-setting">
                        
                        
                            <p>Your email address</p>
                            
                            <input type="text" value={tempUserEmail} onChange={(e) => setTempUserEmail(e.target.value)}/>

                            
                        
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

        {selectedOption === 'change-password' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setSelectedOption('profile')
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
                    setSelectedOption('forgot-password')
                }}>Click here</a></p>
                    </div>
                    
                </div>
            </div>
        )}

        {selectedOption === 'forgot-password' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                <span className='fa-solid fa-arrow-left' onClick={() => {
                    setSelectedOption('change-password')
                }}></span>
                <h2>Forgot password?</h2>
                </div>
                <div className='personal-details-btn-list'>
                    <div className="personal-details-setting">
                        
                        
                            <p>Your email address</p>
                            
                            <input type="text"  value={userEmail}/>
                            
                        
                    </div>
                    
                        <button className='personal-details-btn'>Send instructions</button>
                        
                    </div>
                    
                </div>
            
        )}
        
        {selectedOption === 'settings' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                    <span className='fa-solid fa-arrow-left' onClick={() => {
                        setSelectedOption('unexpanded')
                    }}></span>
                    <h2>Settings</h2>
                </div>
                <div className='profile-settings-btn-list'>
                    <div className="profile-menu-setting">
                        
                        
                            <p>Choose your target language</p>
                            
                            <CustomSelect
                            options={targetLanguages}
                            value={targetLanguage}
                            onChange={setTargetLanguage}
                            />
                        
                    </div>
                    <div className="profile-menu-setting">
                    <p>Choose your translation language</p>
                    <CustomSelect
                        options={translationLanguages}
                        value={translationLanguage}
                        onChange={setTranslationLanguage}
                    />
                </div>
                    
                    <div className="profile-menu-setting">
                    <p>Choose your target language level</p>
                    <CustomLevelSelect
                        options={levels}
                        value={languageLevel}
                        onChange={setLanguageLevel}
                    />
                </div>
                    
                </div>
            </div>
        )}
        </div>
    )
}