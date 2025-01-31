



export default function Hero() {


    return (
        <div className="hero-div">

            <div className="hero-framer">

                <div className="phone-framer">
                    <div className="phone-top">

                    </div>
                    <div className="screen-framer">
                        <div className="screen"></div>
                        <div className="hero-messages">
                            <div className="message user">
                                <p>¡Hola! Estoy aprendiendo español 😃. ¿Me puedes ayudar?</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>

                            <div className="message ai">
                                <p>¡Hola! Claro que sí 😎. ¿Qué quieres practicar hoy?</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="phone-bottom">

                      

                    </div>
                </div>
                
                <div className="hero-text-div">
                    <h1>Speak to Learn</h1>
                    <h1>Learn to Speak</h1>
                    <h1>10+ languages</h1>
                    <p>Unlock new language with your AI partner</p>
                    <a href="/" className="get-started hero-get-started">Get Started</a>
                </div>

            </div>    
                
            </div>
    )
}