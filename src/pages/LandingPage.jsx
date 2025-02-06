import Header from "../components/landing-page/Header";
import Hero from "../components/landing-page/Hero";
import { useEffect, useRef } from "react";




export default function LandingPage(props) {
    const {setIsAuthenticated, 
    setIsRegistering,
    setIsLogingIn} = props

    const sliderRef = useRef(null)
    const testimonialSliderRef = useRef(null);

    useEffect(() => {
        const slider = testimonialSliderRef.current;
        if (slider) {
            const sliderWidth = slider.scrollWidth / 2;
            const animationDuration = sliderWidth / 20; // Adjust 20 to change speed (higher number = slower)
            slider.style.animationDuration = `${animationDuration}s`;
        }
    }, []);


    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const sliderWidth = slider.scrollWidth / 2; // Divide by 2 because content is duplicated
            const animationDuration = sliderWidth / 50; // Adjust 50 to change speed

            slider.style.animationDuration = `${animationDuration}s`;
        }
    }, []);


    useEffect(() => {
        const handleResize = () => {
            const languageSlider = sliderRef.current;
            const testimonialSlider = testimonialSliderRef.current;

            if (languageSlider) {
                const sliderWidth = languageSlider.scrollWidth / 2;
                const animationDuration = sliderWidth / 50;
                languageSlider.style.animationDuration = `${animationDuration}s`;
            }

            if (testimonialSlider) {
                const sliderWidth = testimonialSlider.scrollWidth / 2;
                const animationDuration = sliderWidth / 20; // Slower speed for testimonials
                testimonialSlider.style.animationDuration = `${animationDuration}s`;
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial calculation
        handleResize();

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const testimonialContent = (
        <>
        <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>This AI tutor has completely changed the way I learn Spanish! The interactive dialogues and pronunciation feedback are super helpful. Highly recommend!</p>

                        <div className="review-info">
                            <p className="name">Emma L.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/spanish.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>I use this AI tutor to improve my English for work. The real-time corrections help a lot, and I like that I can practice business-related scenarios.</p>

                        <div className="review-info">
                            <p className="name">Marco R.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/english.png" alt="language" />
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>I love the structured lessons and how the AI adapts to my mistakes. The roleplay feature is amazing—I feel more confident speaking French now!</p>

                        <div className="review-info">
                            <p className="name">Aisha K.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/french.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>I’ve been using this tutor to learn basic Japanese before my trip. It’s great for practicing common phrases, and I feel like I’ll be much more prepared when I land in Tokyo.</p>

                        <div className="review-info">
                            <p className="name">Tom S.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/japanese.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>The AI explains grammar in a simple way, and I can practice at my own pace. I used to struggle with finding time for lessons, but now I can just open the app and practice whenever I want.</p>

                        <div className="review-info">
                            <p className="name">Sofia M.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/german.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>This AI makes learning English less stressful. I can practice speaking without feeling embarrassed.</p>

                        <div className="review-info">
                            <p className="name">Yuki T.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/english.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>I speak three languages, and this AI tutor is the best practice tool I’ve found. It keeps track of what I struggle with and helps me review at just the right time.</p>

                        <div className="review-info">
                            <p className="name">Elena P.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/turkish.png" alt="language" />
                            </div>
                        </div>
                    </div>


                    <div className="testimonial-item">
                        <div className="stars">
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        <span className="fa-solid fa-star"></span>
                        </div>

                        <p>The progress tracking feature is very useful, and I’ve noticed a real improvement in my students’ speaking confidence. It’s like having a personal tutor available 24/7!</p>

                        <div className="review-info">
                            <p className="name">Fatima Z.</p>
                            <div className="learning-lan">
                                <p>is learning</p>
                                <img src="/flags/english.png" alt="language" />
                            </div>
                        </div>
                    </div>
        
        </>
    )


    const sliderContent = (
        <>
           <div className="language-slider-option">
                <img src="/flags/spanish.png" alt="flag" />
                <p>Spanish</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/arabic.png" alt="flag" />
                <p>Arabic</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/chinese.png" alt="flag" />
                <p>Chinese</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/english.png" alt="flag" />
                <p>English</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/croatian.png" alt="flag" />
                <p>Croatian</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/french.png" alt="flag" />
                <p>French</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/german.png" alt="flag" />
                <p>German</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/italian.png" alt="flag" />
                <p>Italian</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/japanese.png" alt="flag" />
                <p>Japanese</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/portugese.png" alt="flag" />
                <p>Portuguese</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/russian.png" alt="flag" />
                <p>Russian</p>
            </div>

            <div className="language-slider-option">
                <img src="/flags/turkish.png" alt="flag" />
                <p>Turkish</p>
            </div>
        </>
    );

    

    return (
        <div className="landing-page">
        <div className="landing-page-main-div">
        <Header setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}/>
        
            <Hero setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}></Hero>
        </div>    
        <div className="languages-slider" 
        onFocus={() => sliderRef.current.style.animationPlayState = 'paused'}
        onBlur={() => sliderRef.current.style.animationPlayState = 'running'}>
        <div className="slider-track" ref={sliderRef}>       
            {sliderContent}
            {sliderContent}
            {sliderContent}
            {sliderContent}
            {sliderContent}
            {sliderContent}
            {sliderContent}  
            </div>
        
        </div>


        <div className="app-info">
            <div className="app-info-inside">
                <div className="app-statistic">
                    <h2>1.000+</h2>
                    <p>Active students</p>
                </div>
                <div className="app-statistic">
                    <h2>10M+</h2>
                    <p>Words learned</p>
                </div>
                <div className="app-statistic">
                    <h2>200.000+</h2>
                    <p>Conversations</p>
                </div>
                <div className="app-statistic">
                    <h2>15+</h2>
                    <p>Languages</p>
                </div>
            </div>
        </div>

        <div className="features-section">

            <div className="features-wrapper">
            <h1>INTRODUCING LANGUAGELAB AI</h1>
            <p className="features-p">AVAILABLE IN 10+ LANGUAGES</p>

            <div className="features-list">
                <div className="feature">
                    <img src="/aiimages/1DES.png" alt="feature-img" />
                    <p className="feature-header">Immersive conversations</p>
                    <p>Immerse into fun, professional, or lifelike situations to boost your language skills.</p>
                </div>

                <div className="feature">
                    <img src="/aiimages/2des.png" alt="feature-img" />
                    <p className="feature-header">Real-time feedback</p>
                    <p>Receive immediate, personalized feedback and suggestions to accelerate your language mastery.</p>
                </div>

                <div className="feature">
                    <img src="/aiimages/des3.png" alt="feature-img" />
                    <p className="feature-header">Pronunciation assessment</p>
                    <p>Work on your pronunciation and improve your accent.</p>
                </div>
            </div>

            <button onClick={() => setIsRegistering(true)} className="features-cta">TRY FOR FREE</button>
            </div>

            <div className="made-for-you-section">
                

                <div className="mfy-text">
                    <h2>Made to suit you</h2>
                    <p>Your AI Language Tutor adapts to you, your language level and your language goals. Learn on your schedule.</p>
                </div>

                <div className="img-wrapper">
                    <img src="/aiimages/langphonemockup.png" alt="phone-mockup" />
                </div>
            </div>

        </div>


        <div className="testimonials-section">
            <h1>Testimonials</h1>
            <p className="sub-h">Here is what our customers said.</p>
            <div className="testimonials-wrapper">
                <div className="testimonials-slider" ref={testimonialSliderRef}>



                    {testimonialContent}
                    {testimonialContent}




                </div>
            </div>
        </div>


        <div className="mobile-cta-btn">

            <div className="text">
                <h2>Experience the future</h2>
            </div>

            <div className="play-btns">

                <img src="/googleplay.png" alt="mobile-store-btn" />

                <img src="/applestore.png" alt="mobile-store-btn" />

            </div>

        </div>


        <div className="footer">
            <div className="footer-framer">
                <div className="footer-part">
                    <p className="header">
                        Download
                    </p>
                    <p>iOS</p>
                    <p>Android</p>
                    <p>Desktop</p>
                </div>

                <div className="footer-part">
                    <p className="header">
                        About us
                    </p>
                    <p>Careers</p>
                    <p>Contact us</p>
                    <p>FAQ</p>
                </div>

                <div className="footer-part">
                    <p className="header">
                        Social
                    </p>
                    <p>Discord</p>
                    <p>Instagram</p>
                    <p>Tiktok</p>
                    <p>YouTube</p>
                    <p>LinkedIn</p>
                </div>

                <div className="footer-part">
                    <p className="header">
                        Policy
                    </p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Security</p>
                </div>

                <div className="footer-part">
                    <p className="header">
                        Other
                    </p>
                    <p>For Business</p>
                    <p>Get a Gift</p>
                    <p>Redeem a Code</p>
                </div>
            </div>

            <p className="email-p">Say hi :) <a href= "mailto:besirovicelmir36@gmail.com">besirovicelmir36@gmail.com</a></p>

            <div className="footer-br"></div>

            <p className="copyright">
            Copyright © 2024 LanguageLab
            </p>
        </div>

        



        </div>
    )

}