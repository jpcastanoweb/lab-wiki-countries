import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export default function CountryDetails(props) {
  const [countryData, setCountryData] = useState({
    capital: '',
    area: '',
    borders: [],
  });

  const [bordersData, setBordersData] = useState([]);

  const { alpha3Code } = useParams();

  useEffect(() => {
    const getCountry = async (code) => {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${code}?fields=name;capital;area;borders;`
      );

      const bordersData = [];
      for (let i = 0; i < res.data.borders.length; i++) {
        let bCode = res.data.borders[i];
        const borderName = await axios.get(
          `https://restcountries.eu/rest/v2/alpha/${bCode}?fields=name;`
        );
        bordersData.push({
          code: bCode,
          name: borderName.data.name,
        });
      }

      console.log(bordersData);

      setCountryData(res.data);
      setBordersData(bordersData);
    };

    getCountry(alpha3Code);
  }, [alpha3Code]);

  return (
    <div>
      <h1>{countryData.name}</h1>
      <hr />
      <div className="row">
        <div className="col-4">Capital</div>
        <div className="col-8">{countryData.capital}</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-4">Area</div>
        <div className="col-8">
          {countryData.area} km <sup>2</sup>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-4">Borders</div>
        <div className="col-8">
          <ul>
            {bordersData.map((border, i) => {
              return (
                <li key={i}>
                  <Link to={`/${border.code}`}>{border.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
