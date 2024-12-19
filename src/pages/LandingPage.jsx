import Header from "../components/Header";
import Hero from "../components/Hero";




export default function LandingPage() {
    

    return (
        <div className="landing-page-div">
        <Header/>
        <div className="landing-page-body">
            <Hero></Hero>
        </div>
        </div>
    )

}