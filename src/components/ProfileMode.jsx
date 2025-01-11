import { auth } from '../utils/firebaseConfig';
import { useState } from 'react';




export default function ProfileMode() {

    const [selectedOption, setSelectedOption] = useState('unexpanded')

    const [targetLanguage, setTargetLanguage] = useState('English')
    const [translationLanguage, setTranslationLanguage] = useState('English')
    const [languageLevel, setLanguageLevel] = useState('Beginner (A1 - A2)')

    // Add language options
    const targetLanguages = ['English', 'German', 'Spanish', 'Italian', 'French']
    const translationLanguages = ['English', 'German', 'Croatian', 'Italian', 'French', 'Spanish']
    const levels = ['Beginner (A1 - A2)', 'Intermediate (B1 - B2)', 'Advanced (C1 - C2)']

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <div className='profile-mode'>
        <div className="profile-list-div">
            <div className="profile-header">
                <span className="fa-solid fa-arrow-left"></span>
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
                <div className="profile-menu-option">
                    <span className='fa-regular fa-user'></span>
                    <div>
                    <p>Personal details</p>
                    <p className='profile-menu-small-text'>Manage your personal details below.</p>
                    </div>
                </div>
                <div className="profile-menu-option"><span className='fa-solid fa-lock'></span>
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
        
        {selectedOption === 'settings' && (
            <div className="profile-options-div expanded">
                <div className='profile-option-h-div'>
                    <span className='fa-solid fa-arrow-left' onClick={() => {
                        setSelectedOption('unexpanded')
                    }}></span>
                    <h2>Settings</h2>
                </div>
                <div className='profile-options-btn-list'>
                    <div className="profile-menu-option">
                        <span className='fa-solid fa-language'></span>
                        <div>
                            <p>Target Language</p>
                            <select 
                                value={targetLanguage} 
                                onChange={(e) => setTargetLanguage(e.target.value)}
                            >
                                {targetLanguages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="profile-menu-option">
                        <span className='fa-solid fa-language'></span>
                        <div>
                            <p>Translation Language</p>
                            <select 
                                value={translationLanguage} 
                                onChange={(e) => setTranslationLanguage(e.target.value)}
                            >
                                {translationLanguages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="profile-menu-option">
                        <span className='fa-solid fa-stairs'></span>
                        <div>
                            <p>Language Level</p>
                            <select 
                                value={languageLevel} 
                                onChange={(e) => setLanguageLevel(e.target.value)}
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}