const cityInput =document.queryselctor(".city-input");
const SearchButton=document.querySelector(".search-btn");
const locationButton=document.querySelector(".location-btn");
const currentWeatherDiv=document.querySelector(".current-weather")
const weatherCardsDiv= document.querySelector(".weather-cards");


const API_KEY=""; //Add an API KEY here

const  createWeatherCards= (cityName, weatherItem, index) =>{
    if(index ===0){
        return`
        <h2>${cityName} (${weatherItem.dt_txt.split("")[0]})</h2>
        <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Wind: ${weatherItem.wind.speed}km/h</h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
    </div>
    <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h4>(${weatherItem.weather[0].description}</h4>
    </div>`;
    }else{
        return`<li class="cards">
        <h3> (${weatherItem.dt_txt.split("")[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
        <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Wind: ${weatherItem.wind.speed}km/h</h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`;
         }
    }


const getWeatherDetails =(cityName, lat, lon) =>{
    const Weather_API_URL =`http:api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_Key}`

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {

        const uniqueForecastDays = [];
 
        const fiveDaysForecast= data.list.filter(forecast => {
            const forecastDate= new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDtae)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        //Clearing previous data
        cityInput.value = "";
       currentWeatherDiv.innerHTML="";
        weatherCardsDiv.innerHTML="" ;

        fiveDaysForecast.forEach(weatherItem, index) => {

            if (index ===0){
               currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCards(cityName, weatherItem, index));

            }else{
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCards(cityName, weatherItem, index));

            }
           

           
        });

    }).catch(()=>{
        alert("An error occurred while fetching coordinates");
    });

}


const getCityCoordinates=()=>{
    const cityName = cityInput.value.trim(); //Get user to enter city name and remve xtra spaces
    if(!cityNme) return;
    const GEOCODING_API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=&{cityName}&limit=5&appid=&{API_key}`;

    fetch(GEOCODING_API_URL).then(res=>res.json()).then(data =>{
        if(!data.length) return alert(`No coordinates found for &(cityName`);

        const {name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);

    }).catch(()=>{
        alert("An error occurred while fetching coordinates");
    
    });

    

 
}


const getUserCoordinates=() =>{
    navigator.geolocation.getCurrentPosition(
        position =>{
            const { latitude, longitude} = position.coords;
            const REVERSE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_Key}`;

            
    fetch(REVERSE_GEOCODING_URL).then(res=>res.json()).then(data =>{
        const {name} = data[0];
        getWeatherDetails(name, latitude, longitude);

    }).catch(()=>{
        alert("An error occurred while fetching city");
    
    });

        },
        error =>{
            if(error.code ===error.PERMISSION_DENIED) {
                alert("Request denied.Reset location permission.")
            }

        }
    );
}


searchButton.addEventListener("click", getCityCoordiantes);
locationButton.addEventListener("click", getUserCoordiantes);

