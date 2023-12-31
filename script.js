
//variables

const searchBtn = document.querySelector("#searchBtn");
const cityInput = document.querySelector("#cityInput");

const celciusTxt = document.querySelector("#celcius");
const fahrenheitTxt = document.querySelector("#fahrenheit");
const descriptionTxt = document.querySelector("#description");
const windTxt = document.querySelector(".windTxt");
const cityTxt = document.querySelector(".city");
const humidityTxt = document.querySelector(".humidityNum");
const weatherIcon = document.querySelector(".weatherIcon")

const APIkey = "f22bce010e18b972e428a4d5bb274aaf";

getCity()

function getCity() {
    let cityName = cityInput.value.trim();
    if (!cityName){
        cityName = "Cincinnati"
    };
    const GEOCODING_API_URL = 
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

    fetch(GEOCODING_API_URL).then(response => response.json()).then(data => {
        if(data.cod === "404"){
            alert(`No coordinates found for ${cityName}`);
            return
        } else {
            cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
            cityTxt.textContent = cityName;

            let description = data.weather[0].main;
            let kelvinTemp = data.main.temp;
            let humidity = data.main.humidity;
            let meterWindSpeed = data.wind.speed;

            implementData(kelvinTemp, description, meterWindSpeed, humidity);
        }
    }).catch(() => {
        alert("An error occurred when fetching the coordinates")
    })
}

searchBtn.addEventListener("click", getCity);
document.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        getCity()
    }
})

function implementData(kelvinTemp, description, meterWindSpeed, humidity){
    descriptionPic(description)
    descriptionTxt.textContent = description;

    const { celcius, fahrenheit } = convertingTemp(kelvinTemp);
    celciusTxt.textContent = `${celcius}°C`;
    fahrenheitTxt.textContent = `${fahrenheit}°F`;

    humidityTxt.textContent = `${humidity}%`;

    const { MphWindSpeed } = convertWindSpeed(meterWindSpeed);
    windTxt.textContent = `${MphWindSpeed} mph`;

}

function descriptionPic(description){
    if(description === "Sunny") {
        weatherIcon.src = "/Images/sunIcon.png"
    }
    else if(description === "Drizzle" || description === "Rain") {
        weatherIcon.src = "/Images/rainIcon.png"
    }
    else if(description === "Snow") {
        weatherIcon.src = "/Images/snowIcon.png"
    }
    else if (description === "Windy"){
        weatherIcon.src = "/Images/windIcon.png"
    }
    else {
        weatherIcon.src = "/Images/cloudyIcon.png"
    }
}

//conversions

function convertingTemp(kelvinTemp){
    let UnroundedCelcius = kelvinTemp - 273.15;
    let UnroundedFahrenheit = (UnroundedCelcius * 9 / 5) + 32;

    let celcius = Math.round(UnroundedCelcius)
    let fahrenheit = Math.round(UnroundedFahrenheit)

    return {celcius, fahrenheit}
}

function convertWindSpeed(meterWindSpeed) {
    let NumMeterWindSpeed = parseFloat(meterWindSpeed)
    let UnroundedMphWindSpeed = NumMeterWindSpeed * 2.23694;
    let MphWindSpeed = Math.round(UnroundedMphWindSpeed)
    return {MphWindSpeed}
}




