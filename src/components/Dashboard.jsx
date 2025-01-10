import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, React } from "react";



export default function Dashboard(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode, userName, setUserName, progressScore, progressLevel, levelThresholds} = props
    const pointsToNextLevel = levelThresholds[progressLevel] - progressScore
    

    return (
        <div className="dashboard-div">
            <div className="dashboard-header">
                <h1>Overview</h1>
            </div>
            <div className="dashboard-info">
                <div className="dashboard-greeting">
                <h2>Hi {userName}, have you tried new challenge?</h2>
                 </div>
                <div className="dashboard-streak">
                <h2>You need {pointsToNextLevel} minutes to get to level {progressLevel + 1}</h2>
                </div>
                <div className="dashboard-stats">

            </div>
            </div>
        </div>
    )
}