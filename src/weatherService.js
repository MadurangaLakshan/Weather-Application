const fetchedWeatherData = async (city, units = "metric") => {
  const inputBox = document.getElementById("input-box");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const CreateIconURL = (iconID) => {
    return `https://openweathermap.org/img/wn/${iconID}@2x.png`;
  };

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const {
      name,
      sys: { country },
      weather,
      main: { temp, feels_like, temp_max, temp_min, pressure, humidity },
      wind: { speed },
    } = data;

    const { description, icon } = weather[0];

    return {
      name,
      country,
      description,
      IconURL: CreateIconURL(icon),
      temp,
      feels_like,
      temp_max,
      temp_min,
      pressure,
      humidity,
      speed,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchedWeatherData;
