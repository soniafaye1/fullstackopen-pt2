import React, { useEffect, useState } from "react";
import countryService from "./services/countries";

const CountryInfo = ({country}) =>{
    const languages = Object.values(country.languages)
    return (
        <div>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages:</h4>
                <ul>
                    {languages.map((lang, idx) => <li key={idx}>{lang}</li>)}
                </ul>
            <img src={country.flags.png}/>
        </div>
    )
}

const Countries = ({countries, toggleShowCountryInfo}) => {
    if(countries.length > 10){
        return (
            <p>too many matches, specify another filter</p>
        )
    }

    if(countries.length <= 10 && countries.length > 1){
        return (
            <ul>
                {countries.map((country, idx) =>         
                    <li key={idx}>
                        {country.name.common}
                        <button onClick={() => toggleShowCountryInfo(country.name.common)}>show</button>
                    </li>       
                )}
            </ul>
        )
    }
    
    if(countries.length === 1){
        return(
            <div>
                <CountryInfo country={countries[0]}/>
            </div>
        )
    }
}

const Filter = ({ filter, handleFilter}) => (
    <div>
        <p>find countries <input value={filter} onChange={handleFilter} /></p>
    </div>
)

const CountryFinder = () =>{
    const [allCountries, setAllCountries] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilter = (event) => {
        const f = event.target.value;
        setFilter(f)
        setFilteredCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
        console.log("filteredCOunties: ",filteredCountries)
    }

    const toggleShowCountryInfo = (countryName) => {setFilteredCountries(countryName)}


    useEffect(() => {
        countryService.getAll().then(allCountries => setAllCountries(allCountries))
    }, [])

    if(!allCountries){
        return null
    }

    return(
        <>
            <h2>Countries: </h2>
            <Filter filter={filter} handleFilter={handleFilter}/>
            
            <Countries countries={filteredCountries} toggleShowCountryInfo={toggleShowCountryInfo}/>
        </>
    )
}

export default CountryFinder;


