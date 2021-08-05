import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import axios from 'axios';

import { Route, Switch } from 'react-router-dom';

function App() {
  const [countries, setCountries] = useState([]);

  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get(
        'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag;'
      );

      setCountries(res.data);
    };

    getCountries();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <CountriesList countries={countries} />
          </div>
          <div className="col-7">
            <Switch>
              <Route exact path="/:alpha3Code" component={CountryDetails} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
