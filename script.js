const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "419e82dff4342b2f583de49070ff5325";

weatherForm.addEventListener("submit", async event =>{
   event.preventDefault();
   const city = cityInput.value;

   if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
     console.error(error);
     displayError(error);
    }
   }
   else{
     displayError("please enter a city");
   }
})

async function getWeatherData(city){
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiCall);
   
  if(!response.ok){
    throw new Error("Could not find out"); 
  }  

  return await response.json();
};

function displayWeatherInfo(data){
  const {name:city,
         main:{temp,humidity},
        weather : [{description,id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humdityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city ;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`;
        humdityDisplay.textContent=` Humdity:${humidity} %`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = displayEmoji(id);
        

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humdityDisplay.classList.add("humdityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");
        
        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humdityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function displayEmoji(emoji){

   switch(true){
    case (emoji >=200 && emoji < 300):
    return "⛈️";
    case(emoji >=300 && emoji < 400):
    return "🌧️";
    case(emoji >=400 && emoji < 500):
    return "🌧️";
    case(emoji >= 500 && emoji < 600):
    return "☃️";
    case(emoji >= 600 && emoji < 700):
    return "🌁";
    case(emoji === 800):
    return "☀️";
    case(emoji >= 801 &&  emoji < 810):
    return "😶‍🌫️";

    default:
      return "❓";
   }
}

function displayError(message){
   const errorDisplay = document.createElement("p");
   errorDisplay.textContent = message;
   errorDisplay.classList.add("errorDisplay");


   card.textContent = "";
   card.style.display = "flex";
   card.appendChild(errorDisplay);


};