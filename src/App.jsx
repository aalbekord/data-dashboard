import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card"
import List from "./components/List"

function App() {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [list, setList] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [filteredList, setFilteredList] = useState(null)
    const [cityInput, setCityInput] = useState("")
    const [uvInput, setUvInput] = useState("")

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
            // Use filteredList if it exists, otherwise use the full list
            const dataToFilter = filteredList && filteredList.length > 0 ? filteredList : list["data"];

            // Filter the data based on the searchValue
            const filteredData = dataToFilter.filter((item) =>
                item.datetime.indexOf(searchValue) !== -1
            );

            // Update the filteredList state
            if (filteredData.length > 0) {
                setFilteredList(filteredData);
            } else {
                setFilteredList(null); // No matches found
            }
        } else {
            setFilteredList(null); // Reset the filteredList if searchValue is empty
        }
        setCityInput("")
    }

    const searchUv = (searchValue) => {
        if (searchValue !== "") {
            // Use filteredList if it exists, otherwise use the full list
            const dataToFilter = filteredList && filteredList.length > 0 ? filteredList : list["data"];

            // Filter the data based on the UV value
            const filteredData = dataToFilter.filter((item) =>
                item.max_uv < Number(searchValue)
            );

            // Update the filteredList state
            if (filteredData.length > 0) {
                setFilteredList(filteredData);
            } else {
                setFilteredList(null); // No matches found
            }
        } else {
            setFilteredList(null); // Reset the filteredList if searchValue is empty
        }
        setUvInput("")
    };

    const calculateAverage = (category) => {
        let total = 0
        for (let i = 0; i < list["data"].length; i++) {
            total += list["data"][i][category]
        }
        return (Math.floor((total / list["data"].length) * 10)) / 10
    }    
    return (
        <>
            <div className="whole-page">
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
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="search-bar"
                        />
                        <button type="button" onClick={searchLocation} className="search-button">Search</button>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={cityInput}
                            onChange={(e => setCityInput(e.target.value))}
                            className="search-bar"
                        />
                        <button type="button" onClick={() => searchDate(cityInput)} className="search-button">Filter Date</button>
                        <input
                            type="text"
                            placeholder="Max UV"
                            value={uvInput}
                            onChange={(e => setUvInput(e.target.value))}
                            className="search-bar"
                        />
                        <button type="button" onClick={() => searchUv(uvInput)} className="search-button">Filter UV</button>
                    </div>
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
