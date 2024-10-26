import { useEffect, useState } from "react"
import countryService from "./services/countries"

const CountryInfo = ({filteredCountry}) =>{
    const country = filteredCountry[0];
    console.log("country: ", country)
    //const languages = Object.values(country.languages)
    return (
        <div>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages:</h4>
                {/* <ul>
                    {languages.map((lang, idx) => <li key={idx}>{lang}</li>)}
                </ul> */}
            <img src={country.flags.png}/>
        </div>
    )
}

const Countries = ({countries, showInfo}) => {
    if(countries.length > 10) {
        return (
            <p>too many matches, specify another filter</p>
        )
    }else if(countries.length === 1) {
        return (
        <CountryInfo filteredCountry={countries[0]} />
    )}else{
        return(
            countries.map((country, idx) => 
                <li key={idx}>
                    {country.name.common}
                    <button onClick={() => showInfo(country)}>show</button>
                </li> 
            )
        )
    }
}

const App = () => {
    const[countries, setCountries] = useState([])
    const[country, setCountry] = useState("")

    const handleValue = (event) =>{
        setCountry(event.target.value)
    }
    console.log("country: ", country)

    const filteredCountries = country ? countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase())) : [];
    console.log("filtereCOuntries: ", filteredCountries)
    
    const showInfo = (countryName) =>{
        setCountry(countryName)
    }

    useEffect(() => {
        countryService.getAll().then(allCountries => setCountries(allCountries))
    },[])

    return(
        <div>
            <p>find countries <input value={country} onChange={handleValue}/></p>

            <Countries countries={filteredCountries} showInfo={showInfo}/>
        </div>
    )
}

export default App