import { auth } from '../utils/firebaseConfig';
import { useState } from 'react';




export default function ProfileMode() {

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