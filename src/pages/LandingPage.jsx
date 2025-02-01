import Header from "../components/Header";
import Hero from "../components/Hero";
import { useEffect, useRef } from "react";




export default function LandingPage(props) {
    const {setIsAuthenticated, 
    setIsRegistering,
    setIsLogingIn} = props

    const sliderRef = useRef(null)


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
            const slider = sliderRef.current;
            if (slider) {
                const sliderWidth = slider.scrollWidth / 2;
                const animationDuration = sliderWidth / 50;
                slider.style.animationDuration = `${animationDuration}s`;
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
                <p>Portugese</p>
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
        
            <Hero></Hero>
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


        <div className="testimonials-section">
            <h1>Testimonials</h1>
            <p>Here is what our customers said.</p>
            <div className="testimonials-wrapper">
                <div className="testimonials-slider">
                    <div className="testimonial-item">

                    </div>
                </div>
            </div>
        </div>

        



        </div>
    )

}