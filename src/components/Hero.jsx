



export default function Hero() {


    return (
        <div className="hero-div">

            <div className="hero-framer">

                <div className="phone-framer">
                    <div className="phone-top">

                        <div className="hero-teacher-info">
                            <div className="img-framer">
                                <img src="/carlos.png" alt="teacher" />
                            </div>

                            <p className="hero-teacher-p">
                                Carlos
                            </p>
                        </div>

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

                            <div className="message user">
                                <p>Quiero hablar mejor. A veces olvido palabras.</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>

                            <div className="message ai">
                                <p>No te preocupes, es normal 🤗. Practiquemos con una conversación. ¿Cómo te llamas?</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>

                            <div className="message user">
                                <p>Me llamo Alex. Vivo en Croacia y me gusta el fútbol ⚽.</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>

                            <div className="message ai">
                                <p>¡Genial, Alex! Entonces, dime… ¿Quién es tu jugador favorito? 😏</p>
                                <div className="message-options">
                                    <img src="/hero-volume.png" alt="volume" />
                                    <img src="/hero-translate.png" alt="translate" />
                                </div>
                            </div>


                        </div>  
                    </div>
                    <div className="phone-bottom">

                      <div className="microphone-wrapper">
                        <img src="/hero-microphone-trimmed.png" alt="microphone" />
                      </div>

                    </div>
                </div>
                
                <div className="hero-text-div">
                    <h1>Speak to Learn</h1>
                    <h1>Learn to Speak</h1>
                    <h1 className="languages">10+ languages</h1>
                    <p>Unlock new language with your AI partner</p>
                    <p className="disclaimer">**reviews and features on this landing page are not real**</p>
                    <a className="get-started hero-get-started">Get Started</a>
                </div>

            </div>    
                
            </div>
    )
}