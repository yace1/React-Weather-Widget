<h1 align="center" style="text-align: center">
    React Weather APP
</br>
    <h4 align="center" style="width: 50%; margin: 2rem auto; font-weight: normal; text-align: center"> 
     React Weather application that uses the browser location, the openweathermap.org API for the weather data and the bigdatacloud.com API for reverse geocoding
     You can access the app here: https://yace1.github.io/React-Weather-Widget/
    </h4>
</h1>

## How it works
- The app asks the browser for location permissions
- Then it fetches the city name from the BigDataCloud Reverse Geocoding API: https://www.bigdatacloud.com/docs/reverse-geocoding?
- With the location it fetches weather datas from the openWeatherMap - One Call API 3.0: https://openweathermap.org/api/one-call-3
- If a new city is typed in the input filed, it fetches the precise location from the openWeatherMap - Geocoding API: https://openweathermap.org/api/geocoding-api

<div align="center" style="text-align: center">
   <img alt="42Lausanne" title="42Lausanne" src="https://github.com/yace1/React-Weather-Widget/blob/main/public/application-sample.png" width="500"> 
</div>
