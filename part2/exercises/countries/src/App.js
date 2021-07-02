import {useState, useRef, useEffect} from 'react'
import axios from 'axios'

const Filter = ({text, handleChange}) => {
  return (
    <div>
      <span>{text}</span>
      <input onChange={handleChange} />
    </div>
  );
}

const Results = (props) => {
  const countries = props.countries;
  return (
    <div>
      <ul>
        {countries.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
      </ul>
        { props.showOne ? (
          <div>
            <h2>{countries[0].name}</h2>
            <p>capital {countries[0].capital}</p> 
            <p>population {countries[0].population}</p>
            <h2>languages</h2>
            <ul>
              {countries[0].languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={countries[0].flag} />
          </div>
         ) : <></> }
    </div>

    
  );
}

function App() {

  const [countries, setCountries] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [showOne, setShowOne] = useState(false);
  const filterRef = useRef();
  //filterRef.current.value = null

  const handleChange = (event) => {
    const filterInputValue = event.target.value;
    if (filterInputValue.length > 0) {
      axios
       .get(`https://restcountries.eu/rest/v2/name/${filterInputValue}?fields=name;capital;languages;population;flag;alpha3Code`)
       .then(response => {
         const data = response.data;
         if (data.length > 10) {
          setShowResults(false)
         } else if (data.length == 1) {
          setShowOne(true)
          setShowResults(true)
          setCountries(response.data)
         } else {
          console.log(response.data)
          setShowOne(false)
          setShowResults(true)
          setCountries(response.data)
         }
       }).catch(e => {
          setShowResults(false)
          console.log('No results')
       })
    }
  }

  return (
    <div>
      <Filter text='find countries' handleChange={handleChange} />
      {showResults ? <Results countries={countries} showOne={showOne} /> : 'too many results or no results'}
    </div>
  );
}

export default App;
