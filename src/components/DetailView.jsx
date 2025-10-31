import { useParams, useLocation } from "react-router-dom"

function DetailView() {
    const { index } = useParams()
    const location = useLocation()
    const item = location.state?.item

    if (!item) return <div>No data available</div>

    return (
        <>
            <h1>Details for {item["datetime"]}</h1>
            <p>Temperature: {item["temp"]}</p>
            <p>Wind Speed: {item["wind_spd"]}</p>
            <p>Snow: {item["snow"]}</p>
            <p>Max UV: {item["max_uv"]}</p>
        </>
    )
}

export default DetailView