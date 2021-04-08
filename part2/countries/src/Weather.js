import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ name, temp }) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${name}`
      )
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => e.response.data);
  }, [name]);
  return (
    <div>
      <h2>weather in {name}</h2>
      <p>temperature: {data?.current.temperature} celsius</p>
      <img src={data?.current.weather_icons[0]} alt="name" />
      <p>
        wind: mph {data?.current.wind_speed} direction {data?.current.wind_dir}{" "}
      </p>
    </div>
  );
};

export default Weather;
