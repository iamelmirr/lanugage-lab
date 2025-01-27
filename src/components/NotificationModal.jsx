




export default function NotificationModal(props) {

    const {isNotificationModalVisible, setIsNotificationModalVisible} = props

    return (
        <div className={`notification-modal ${isNotificationModalVisible ? 'visible' : ''}`}>

            <div className="notification-icon">
                <img src="./public/exclamation-mark.png" alt="notification" />
            </div>

            <div className="notification-info">
                <p className="notification-text">Check your email!</p>   
            </div>

        </div>
    )
}