import "./Card.css"

const Card = ({ value, label }) => {
    return (
        <>
            <div className="container">
                <div className="value">{value}</div>
                <div className="label">{label}</div>
            </div>
        </>
    )
}
export default Card;