"import ./Card.css"

const Card = ({ value, label }) => {
    return (
        <>
            <div className="card-container">
                <div>{value}</div>
                <div>{label}</div>
            </div>
        </>
    )
}
export default Card;