import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card"
import Header from "./components/Header"
import List from "./components/List"
import NavBar from "./components/NavBar"
// 2 hours spent as of 10-26-2025 1:00 PM
function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [filteredList, setFilteredList] = useState([])

    const today = new Date();
    const endDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
    const startDate = new Date(new Date(today).setDate(today.getDate() - 14)).toISOString().slice(0, 10)

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?start_date=${startDate}&end_date=${endDate}&city=Cupertino,California&key=${API_KEY}`)
            const json = await response.json()
            setList(json)
        }
        fetchWeatherData().catch(console.error)
    }, []) // [] - run once when the component is first rendered

    const searchLocation = () => {
        if (searchInput !== "") {
            const fetchWeatherData = async () => {
                const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?start_date=${startDate}&end_date=${endDate}&city=${searchInput}&key=${API_KEY}`)
                const json = await response.json()
                setList(json)
            }
            fetchWeatherData().catch(console.error)
        }
        setSearchInput("") // clear the input field
        console.log(list)
    }

    const calculateAverage = (category) => {
        let total = 0
        for (let i = 0; i < list["data"].length; i++) {
            total += list["data"][i][category]
        }
        return (Math.floor((total / list["data"].length) * 10)) / 10
    }

    useEffect(() => {
        console.log("List Updated:", list)
    }, [list])

    return (
        <>
            <div className="whole-page">
                <div className="side-bar">
                    <Header />
                    <NavBar />
                </div>
                <div className="main-page">
                    {
                        list !== null ?
                            <div className="card-container">
                                <Card value={list["city_name"]} label={`${list["city_name"]}, ${list["state_code"]}`} />
                                <Card value={`${calculateAverage("temp")}°C`} label='Avg. Temp' />
                                <Card value={`${calculateAverage("wind_spd")}mph`} label='Avg. Wind' />
                            </div> : <div />
                    }
                    <input
                        type="text"
                        placeholder="City, State"
                        value={searchInput} // input is cleared on click
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="button" onClick={searchLocation}>Search</button>
                    {
                        list !== null ?
                            <List data={list["data"]} /> : <div />
                    }
                </div>
            </div>
        </>
    )
}

export default App
