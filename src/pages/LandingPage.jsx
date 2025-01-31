import Header from "../components/Header";
import Hero from "../components/Hero";




export default function LandingPage(props) {
    const {setIsAuthenticated, 
    setIsRegistering,
    setIsLogingIn} = props
    

    return (
        <div className="landing-page-main-div">
        <Header setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}/>
        
            <Hero></Hero>
        
        </div>
    )

}