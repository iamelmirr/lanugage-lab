import Header from "../components/Header";
import Hero from "../components/Hero";




export default function LandingPage(props) {
    const {setIsAuthenticated, 
    setIsRegistering,
    setIsLogingIn} = props
    

    return (
        <div className="landing-page-div">
        <Header setIsAuthenticated={setIsAuthenticated} 
        setIsRegistering={setIsRegistering}
        setIsLogingIn={setIsLogingIn}/>
        <div className="landing-page-body">
            <Hero></Hero>
        </div>
        </div>
    )

}