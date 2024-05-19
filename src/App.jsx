import { useEffect, useRef, useState } from "react";
import Descriptions from "./components/Descriptions";
import fetchedWeatherData from "./weatherService";
import { IoLocationSharp } from "react-icons/io5";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("london");
  const inputRef = useRef(null);

  const searchCity = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      inputRef.current.value = "";
    }
  };

  const clickUnits = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "imperial" : "metric");
  };

  const getCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setCity(data.name);
            })
            .catch((error) => {
              console.error("Error fetching city:", error);
            });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const formattedData = async () => {
      const data = await fetchedWeatherData(city, units);
      setWeather(data);
    };

    formattedData();
  }, [units, city]);

  return (
    <div className="app">
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                ref={inputRef}
                onKeyDown={searchCity}
                type="text"
                name="city"
                placeholder="Enter city..."
              />
              <div className="buttons">
                <button onClick={getCity}>
                  <IoLocationSharp />{" "}
                </button>
                <button onClick={clickUnits}>°C</button>
              </div>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country} `}</h3>
                <img src={weather.IconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}${
                  units === "metric" ? "°C" : "°F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
