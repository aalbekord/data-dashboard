import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card"
import Header from "./components/Header"
import List from "./components/List"
import NavBar from "./components/NavBar"

function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)
    const [location, setLocation] = useState("Cupertino,California")
    const [searchInput, setSearchInput] = useState("")
    const [filteredList, setFilteredList] = useState([])
    const today = new Date();
    const endDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
    let twoWeeksPrior = endDate.slice(0, 8)

    if (Number(endDate.slice(8)) - 14 < 0)
        twoWeeksPrior += String(((Number(endDate.slice(8)) - 14) + 30));
    else
        twoWeeksPrior += String((Number(endDate.slice(8)) - 14));

    const startDate = twoWeeksPrior // YYYY-MM-DD

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?start_date=${startDate}&end_date=${endDate}&city=${location}&key=${API_KEY}`)
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
                setFilteredList(json)
            }
            fetchWeatherData().catch(console.error)
        } else { // Cupertino, California is default
            setFilteredList(list)
        }
        console.log(filteredList)
    }
    
    useEffect(() => {
        console.log("Filtered List Updated:", filteredList)
    }, [filteredList])
    
    return (
        <>
            <h1>{endDate}</h1>
            <h1>{startDate}</h1>

            <div className="whole-page">
                <div className="side-bar">
                    <Header />
                    <NavBar />
                </div>
                <div className="main-page">
                    <div className="card-container">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <input
                        type="text"
                        placeholder="City, State"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={searchLocation}></button>
                    {searchInput.length > 0
                        ? <List data={filteredList} />
                        : <List data={list} />
                    }
                </div>
            </div>
        </>
    )
}

export default App
