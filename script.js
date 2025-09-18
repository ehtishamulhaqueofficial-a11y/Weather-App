let inputcity = document.querySelector("#cityInput");
let btn = document.querySelector("button");
let finalResult = document.querySelector(".result");

let myApiKey = "9c7f9f11f24c4a20ac4122753251709";

btn.addEventListener("click", (event) => {
  event.preventDefault(); // stop form refresh

  let city = inputcity.value.trim(); // rezmove extra spaces

  if (city === "") {
    finalResult.innerText = "⚠️ Please enter a city name!";
    return;
  }

  getWeather(city)
});

async function getWeather(city) {
  try{
        let myurl =  `https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${city}&aqi=yes&units=metric`;
        let response = await fetch(myurl)
        if (!response.ok){
          finalResult.innerText = "❌ City not found!";
          return; // stop here
        }
          let data = await response.json();
          console.log(data);
          showWeather(data);
    }catch (error) {
    finalResult.innerText = "⚠️ Something went wrong. Please try again.";
    console.error(error);
  }
}

function showWeather(data) {
  let updatedTime = ` ${data.current.last_updated}`;
  
  if(data.current.temp_c <= 20){
    finalResult.innerText = `${updatedTime}\n 🌨️ ${data.current.temp_c}°C in ${data.location.name}, ${data.location.country}`;
  }
  else {
    finalResult.innerText = `${updatedTime}\n 🌡️ ${data.current.temp_c}°C in ${data.location.name}, ${data.location.country}`;
  }
}

   
