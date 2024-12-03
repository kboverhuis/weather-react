import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import WeatherInfo from "./WeatherInfo";
import "./css/Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ ready: false});

  function displayWeather(response) {
    setWeather({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      description: response.data.condition.description,
      city: response.data.city,
      date: new Date(response.data.time * 1000),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function search() {
        const apiKey = "8908d7b1834oa44093b7b64af0t393f3";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }


  if (weather.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                onChange={updateCity}
                className="form-control search-input"
              />
            </div>

            <div className="col-3">
              <input
                type="submit"
                className="search-btn w-100"
                value="Search"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weather} />
        <WeatherForecast
          coordinates={weather.coordinates}
          city={weather.city}
        />
        <footer>
          This project was coded by{" "}
          <a
            href="https://www.shecodes.io/graduates/122224-kristi-boverhuis"
            target="blank"
          >
            Kristi Boverhuis
          </a>{" "}
          and is{" "}
          <a href="https://github.com/kboverhuis/weather-react" target="blank">
            opened-sourced on GitHub
          </a>{" "}
          and{" "}
          <a href="https://musical-babka-12bce5.netlify.app/" target="blank">
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
