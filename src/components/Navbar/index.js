import React from 'react';
import './style.css';

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            WikiCountries
          </a>
        </div>
      </nav>
    </div>
  );
}
