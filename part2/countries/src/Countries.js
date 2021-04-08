import React from "react";
import Country from "./Country";

const Countries = ({ filteredCountries, query, toggleShow }) => { 
  if (query && filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (query && filteredCountries.length === 1)
    return <Country query={query} filteredCountries={filteredCountries} />;

  return (
    query &&
    filteredCountries.map((country, i) => (
      <div key={i}>
        <p>
          {country.name}{" "}
          <button
            value={country.name}
            onClick={(e) => toggleShow(e)}
          >
            show
          </button>
        </p>
      </div>
    ))
  );
};

export default Countries;
