import { useRef } from "react"




export default function MobileNav(props) {

    const {setSelectedMode, selectedMode} = props

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    
    };


    return (
        <div className="mobile-nav">
            <a className={selectedMode === 'explore' ? 'nav-selected' : ''} onClick={() => handleModeChange('explore')}>
            <img src="./src/assets/map.svg" alt="" /></a>
            <a onClick={() => handleModeChange('main')} className={selectedMode === 'main' ? 'nav-selected' : ''} >
            <img src="./src/assets/dashboard-tile-svgrepo-com.svg" alt="" /></a>
            <a className={selectedMode === 'progress' ? 'nav-selected' : ''} onClick={() => handleModeChange('progress')}>
            <img className="progress-icon" src="./src/assets/progress-edited.svg" alt="" /></a>
        </div>
    )
}