import { useParams } from "react-router"

function DetailView({ data }) {
    const { index } = useParams()
    const item = data[index]
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
