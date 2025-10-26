import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card"
import Header from "./components/Header"
import List from "./components/List"
import NavBar from "./components/NavBar"

function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/current&key=${API_KEY}`)
            const json = await response.json()
            setList(json)
        }
        fetchWeatherData().catch(console.error)
    }, []) // [] - run once when the component is first rendered
    console.log(list)
    return (
        <>
        </>
    )
}

export default App
