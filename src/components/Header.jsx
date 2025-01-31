




export default function Header (props) {

    const {setIsAuthenticated, 
        setIsRegistering,
        setIsLogingIn} = props


    return (
        <div className="landing-header">
            <div className="lan-header-container">
            <img src="/header-logo.png" alt="logo" />
            </div>
            <a href="/" className="get-started-a" onClick={(e) => {e.preventDefault(), setIsRegistering(true)}}>Get Started</a>
        </div>
    )
}