import React from "react"



export default function Dashboard(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    return (
        <div className="dashboard-div">
            <div className="dashboard-header">
                <h1>Overview</h1>
            </div>
            <div className="dashboard-info">
                <div className="dashboard-greeting">
                <h2>Hi Name, have you tried new challenge?</h2>
                 </div>
                <div className="dashboard-streak">
                <h2>You need 4 minutes to get to level 14</h2>
                </div>
                <div className="dashboard-stats">

            </div>
            </div>
        </div>
    )
}