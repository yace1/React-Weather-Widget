import React from 'react';
import './Weather.css'
import {useEffect} from 'react';
import { WiCloud, WiDaySunnyOvercast, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySleetStorm} from "react-icons/wi";



var apiKey = "00d3f9ed6f3768182fd4de446768c04c";

function apiLocationUrl(city) {
	return ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey);
}

function apiWeatherUrl(latitude, longitude){
	return ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=metric&appid=" + apiKey);
}
	

const Weather = () => {

	const [location, setLocation] = React.useState(["" , ""]);
	const [cityName, setCityName] = React.useState("");
 	const [weatherData, setWeatherData] = React.useState({});

	async function fetchLocationByCity(city) {
		fetch(apiLocationUrl(city))
		.then((response) => {
			if (!response.ok) {
				throw new Error(
				  `This is an HTTP error: The status is ${response.status}`
				);
			  }
			return response.json()})
		.then((actualData) => {
			setLocation([actualData[0].lat, actualData[0].lon]);
			setCityName(city);
		})
		.catch((err) => {
			console.log(err.message);
		   });
	}

	async function FetchCityName(latitude, longitude){
		const url = "https://api.bigdatacloud.net/data/reverse-geocode?latitude=" + latitude +  "&longitude=" + longitude +"&localityLanguage=en&key=bdc_02db12398d8d48b480bfad75f57e2ca7";
		fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
				  `This is an HTTP error: The status is ${response.status}`
				);
			  }
			return response.json()})
		.then((actualData) => {
			setCityName(actualData.city);
		})
		.catch((err) => {
			console.log(err.message);
		   });
	}

	async function fetchWeatherData(latitude, longitude) {
		fetch(apiWeatherUrl(latitude, longitude))
		.then((response) => {
			if (!response.ok) {
				throw new Error(
				  `This is an HTTP error: The status is ${response.status}`
				);
			  }
			return response.json()})
		.then((actualData) => {
			setWeatherData(actualData.current);
		})
		.catch((err) => {
			console.log(err.message);
		   });
	}

	function chooseEmoji(weather){
		switch(weather){
			case "Clouds":
				return <WiCloud size={190} color="white" className='weatherIcon'/>;
			case "Rain":
				return <WiDayRain size={190} color="white" className='weatherIcon'/>;
			case "Clear":
				return <WiDaySunnyOvercast size={190} color="white" className='weatherIcon'/>;
			case "Snow":
				return <WiDaySnow size={190} color="white" className='weatherIcon'/>;
			case "Drizzle":
				return <WiDaySprinkle size={190} color="white" className='weatherIcon'/>;
			case "thunderstorm":
				return <WiDaySleetStorm size={190} color="white" className='weatherIcon'/>;
			default:
				return <WiDaySunnyOvercast size={190} color="white" className='weatherIcon'/>;
		}
	}


	const handleKeyDown = event =>{
		if (event.key === 'Enter') {
			fetchLocationByCity(event.target.value);
		}
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function(position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
			fetchWeatherData(position.coords.latitude, position.coords.longitude);
			FetchCityName(position.coords.latitude, position.coords.longitude);
		  });
	}, [])


	useEffect(() => {
		if (location[0] !== "" && location[1] !== ""){
			fetchWeatherData(location[0], location[1]);
			FetchCityName(location[0], location[1]);
		}
	}, [location])

	
	return (
		<div className='weather-'>
			<h2 className='cityName'>{cityName ? cityName : "loading.."}</h2>
			<div className='weatherInfo'>
				{weatherData.weather ? chooseEmoji(weatherData.weather[0].main) : "loading.."}
				<h2 className='temp'>{weatherData.temp ? Math.round(weatherData.temp) + "°": "loading.."}</h2>
				<div className='additionalInfo' align='left'>
					<p className='addInfoText'>{weatherData.wind_speed ? "Wind Speed: " + " ".repeat(10) + weatherData.wind_speed + " km/h" : "loading.."}</p>
					<p className='addInfoText'>{weatherData.humidity ? "Humidity:" + " ".repeat(16) + weatherData.humidity + " %" : "loading.."}</p>
					<p className='addInfoText'>{weatherData.weather ? "Description:" + " ".repeat(9) + weatherData.weather[0].description : "loading.."}</p>
				</div>
			</div>
			<input className="cityInput" type="text" placeholder='Input a new city here' onKeyDown={handleKeyDown}></input>
		</div>
  	);
}

export default Weather




