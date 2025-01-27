import { useRef } from "react"




export default function MobileNav(props) {

    const {setSelectedMode} = props

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    
    };


    return (
        <div className="mobile-nav">
            <a onClick={() => handleModeChange('explore')}>
            <img src="./src/assets/map.svg" alt="" /></a>
            <a onClick={() => handleModeChange('main')} className="nav-selected" >
            <img src="./src/assets/dashboard-tile-svgrepo-com.svg" alt="" /></a>
            <a onClick={() => handleModeChange('progress')}>
            <img className="progress-icon" src="./src/assets/progress-edited.svg" alt="" /></a>
        </div>
    )
}