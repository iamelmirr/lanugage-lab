import { auth } from '../utils/firebaseConfig';




export default function ProfileMode() {

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <div className="profile-mode">
            <div className="profile-header">
                <span>ARROW ICON</span>
                <h2>Account</h2>
            </div>
            <div className="profile-menu">
                <div className="profile-menu-btn" onClick={handleLogout}>
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}