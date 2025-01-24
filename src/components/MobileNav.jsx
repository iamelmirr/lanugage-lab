




export default function MobileNav(props) {

    const {setSelectedMode} = props


    return (
        <div className="mobile-nav">
            <a href="/">
            <img src="./src/assets/map.svg" alt="" /></a>
            <a onClick={() => setSelectedMode('main')} className="nav-selected" >
            <img src="./src/assets/dashboard-tile-svgrepo-com.svg" alt="" /></a>
            <a onClick={() => setSelectedMode('progress')}>
            <img className="progress-icon" src="./src/assets/progress-edited.svg" alt="" /></a>
        </div>
    )
}