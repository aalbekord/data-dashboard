import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card"
import Header from "./components/Header"
import List from "./components/List"
import NavBar from "./components/NavBar"
// 6 hours spent as of 10-27-2025 5:00 PM
function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [filteredList, setFilteredList] = useState(null)
    const [filterInput, setFilterInput] = useState("")

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
        setFilteredList(null) // reset filter
    }

    const searchDate = (searchValue) => {
        if (searchValue !== "") {
            // Filter the data array based on the date attribute
            const filteredData = list["data"].filter((item) =>
                item.datetime === searchValue // Compare the date attribute with the filterInput
            );
            if (filteredData.length > 0)
                setFilteredList(filteredData);
            else
                setFilterInput(null)
        } else {
            setFilteredList(null);
        }
        setFilterInput(""); // Clear the input field
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

    useEffect(() => {
        console.log("FilteredList Updated:", filteredList)
    }, [filteredList])
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
                    <div>
                        <input
                            type="text"
                            placeholder="City, State"
                            value={searchInput} // input is cleared on click
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="search-bar"
                        />
                        <button type="button" onClick={searchLocation} className="search-button">Search</button>
                    </div>
                    <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={filterInput}
                        onChange={(e => setFilterInput(e.target.value))}
                    />
                    <button type="button" onClick={() => searchDate(filterInput)} className="search-button">Search</button>
                    {
                        filteredList !== null
                            ? <List data={filteredList} />
                            : (list !== null
                                ? <List data={list["data"]} />
                                : <div />
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default App
