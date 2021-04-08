import React from "react";
import Weather from "./Weather";

const Country = ({ query, filteredCountries }) => {
  return (
    <div>
      {query &&
        filteredCountries.map((country) => (
          <div key={country.alpha2Code}>
            {/* <p>{console.log(country)}</p> */}
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <div>
              <h2>languages</h2>
              <ul>
                {country.languages.map((lang) => (
                  <li key={lang.iso639_2}>{lang.name}</li>
                ))}
              </ul>
            </div>
            <img src={country.flag} width="200" alt="flag" />
            <Weather name={country.name} />
          </div>
        ))}
    </div>
  );
};

export default Country;
