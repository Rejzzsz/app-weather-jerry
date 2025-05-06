import React, { useState, useEffect } from "react";
import searchIcon from "./Assets/search.png";
import cloudIcon from "./Assets/cloud.png";
import drizzleIcon from "./Assets/drizzle.png";
import humidityIcon from "./Assets/humidity.png";
import clearIcon from "./Assets/clear.png";
import rainIcon from "./Assets/rain.png";
import snowIcon from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";
import Swal from "sweetalert2";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperatureCelsius: "",
    location: "",
    description: "",
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [weatherIcon, setWeatherIcon] = useState(cloudIcon);

  const apiKey = "66a5845a6fa997760bd55e5231787b0f";

  const fetchData = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if(data.cod === "404") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " City not found!",
        });
      }
  
      if (response.ok) {
        const temperatureCelsius = `${data.main.temp}°C`;
  
        setWeatherData({
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed} km/h`,
          temperatureCelsius: temperatureCelsius,
          location: data.name,
          description: data.weather[0].description,
        });
  
        setWeatherIcon(getWeatherIcon(data.weather[0].icon));
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Silakan cek koneksi internet Anda atau coba lagi nanti.",
        icon: "question"
      });
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData("London");
  }, []);

  const getWeatherIcon = (iconCode) => {
    const iconMapping = {
      "01d": clearIcon,
      "01n": clearIcon,
      "02d": cloudIcon,
      "02n": cloudIcon,
      "03d": drizzleIcon,
      "03n": drizzleIcon,
      "04d": drizzleIcon,
      "04n": snowIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "10d": rainIcon,
      "10n": rainIcon,
      "13d": snowIcon,
      "13n": snowIcon,
    };

    return iconMapping[iconCode] || cloudIcon;
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];
    if (element.value === "") {
      return;
    }
    fetchData(element.value);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="h-full min-h-screen p-5 flex flex-col sm:flex-row items-center justify-center gap-5 bg-white dark:bg-slate-800 dark:text-white bg-slate-200 text-black">
      <div className="sm:w-2/3 gap-5 flex flex-col w-full max-w-[400px] tracking-wide">
        <div className="flex md:gap-5 ">
          <div className="flex flex-grow items-center justify-center shadow-xl bg-white dark:bg-slate-700 px-4 py-3 rounded-xl text-black dark:text-white">
            <input
              type="text"
              placeholder="Search"
              className="cityInput w-full bg-white dark:bg-slate-700 text-black dark:text-white outline-none px-2 rounded-xl"
            />
            <div className="search-icon items-center flex justify-center" onClick={search}>
              <img className="flex items-center justify-center" src={searchIcon} alt="" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 text-black dark:text-white rounded-lg shadow "
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
        <div className="weather-image backdrop-blur-md flex items-center justify-center rounded-xl shadow-xl bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 transform transition duration-300 hover:scale-105 ">
          <img src={weatherIcon} alt="" />
        </div>
        <div className="backdrop-blur-md rounded-xl p-5 shadow-xl text-black dark:text-white font-bold tracking-wide text-xl text-center w-full bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 transform transition duration-300 hover:scale-105 ">
          {weatherData.description}
        </div>
      </div>

      <div className="sm:w-2/3 flex flex-col gap-5 h-full w-full max-w-[400px] tracking-wide">
        <div className="flex gap-5 sm:h-[150px] flex-col sm:flex-row w-full">
          <div className="backdrop-blur-md flex items-center justify-center rounded-xl w-full p-5 shadow-xl bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 text-black dark:text-white font-extrabold text-3xl text-center sm:w-2/3 transform transition duration-300 hover:scale-105">
            {weatherData.location}
          </div>
          <div className="backdrop-blur-md flex-col rounded-xl p-5 shadow-xl bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 text-black dark:text-white font-extrabold text-4xl flex justify-center items-center text-center sm:w-2/3 transform transition duration-300 hover:scale-105">
            <div>{weatherData.temperatureCelsius}</div>
          </div>
        </div>
        <div className="backdrop-blur-md rounded-xl shadow-xl flex justify-between bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 text-black dark:text-white font-bold tracking-wide p-5 transform transition duration-300 hover:scale-105">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent text-3xl">{weatherData.humidity}</div>
            <div className="text-sm">Humidity</div>
          </div>
        </div>
        <div className="backdrop-blur-md rounded-xl shadow-xl flex justify-between bg-gradient-to-r from-blue-500 via-cyan-300 dark:bg-blue-400 text-black dark:text-white font-bold tracking-wide p-5 transform transition duration-300 hover:scale-105">
          <img src={windIcon} alt="" className="icon" />
          <div className="data flex flex-col justify-end">
            <div className="humidity-percent text-3xl">{weatherData.windSpeed}</div>
            <div className="text-sm">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

