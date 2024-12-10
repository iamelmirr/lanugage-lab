


const mainNavButtons = [
    {label: 'Dashboard', link: '/'},
    {label: 'Chat', link: '/'},
    {label: 'Challenge', link: '/'},
    {label: 'Progress', link: '/'},
]


const navOptions = [
    {label: 'Mode 1', link: '/'},
    {label: 'Mode 2', link: '/'},
    {label: 'Mode 3', link: '/'},
    {label: 'Mode 4', link: '/'},
    {label: 'Mode 5', link: '/'},
]


export default function Nav() {
    return (
        <div className="nav">
            <div className="logo-div">
                <img src="./public/header-logo.png" alt="" />
            </div>

            <div className="nav-container">
                <div className="main-nav">

                    {mainNavButtons.map((button, index) => {
                        return (
                        <a key={index} href={button.link}>
                           {button.label} 
                        </a>
                        )
                    })}

                </div>

                <div className="nav-options">

                    {navOptions.map((button, index) => {
                        return (
                            <a key={index} href={button.link}>
                                {button.label}
                            </a>
                        )
                    })}

                </div>

                
            </div>

            <a className="profile-link" href="/">Profile</a>



        </div>
    )
}