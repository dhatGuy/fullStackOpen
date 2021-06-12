import { useEffect, useState } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then((country) => {
          country = { data: country.data[0], found: true }; 
          setCountry(country);
        })
        .catch(() => setCountry({ found: false }));
    }
  }, [name]);

  return country;
};

export default useCountry;
