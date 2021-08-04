import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

export default function CountriesList(props) {
  return (
    <div className="countries-list list-group" role="tablist">
      {props.countries.map((country, i) => {
        return (
          <Link
            to={`/${country.alpha3Code}`}
            key={i}
            className="list-group-item list-group-item-action"
            data-toggle="list"
            role="tab"
          >
            {country.name}
          </Link>
        );
      })}
    </div>
  );
}
