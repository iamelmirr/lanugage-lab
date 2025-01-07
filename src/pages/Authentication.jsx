






export default function Authentication(props) {
    const {isGettingStarted} = props

    return (
    <>
        {isGettingStarted && <Registration></Registration>}
    </>
    )
}