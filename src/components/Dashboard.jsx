import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, React } from "react";



export default function Dashboard(props) {

    const {selectedMode, setSelectedMode, handleSelectedMode} = props

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userDocRef = doc(db, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                console.log("User doc:", userDoc.data())
                
                if (userDoc.exists()) {
                    
                    console.log(userData);
                    setUserName(userDoc.firstName);
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchUserData();
    }, []);

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
                <h2>You need 4 minutes to get to level 14</h2>
                </div>
                <div className="dashboard-stats">

            </div>
            </div>
        </div>
    )
}