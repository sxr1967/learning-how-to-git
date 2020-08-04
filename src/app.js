// PART 1

let today = new Date();
let date = today.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let day = days[today.getDay()];
let hour = today.getHours();
let minutes = today.getMinutes();
let year = today.getFullYear();

console.log(date);
console.log(day);
console.log(hour);
console.log(minutes);
console.log(month);
console.log(year);

let updateDate = document.querySelector("#displayDate");
updateDate.innerHTML = `<br>${month} ${date},${year} <br> ${hour}:${minutes}<br>${day}`;

function updateMainCityTemperature(response) {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp_max)}˚C
                                |
                                ${Math.round(response.data.main.temp_min)}˚C`;

  let weathertype = document.querySelector("#weather-type");
  weathertype.innerHTML = `${response.data.weather[0].description}`;
}

function updateMainCityDisplay(event) {
  event.preventDefault();
  let newcityinput = document.querySelector("#newcityinput");
  let maincitydisplay = document.querySelector("#city");
  maincitydisplay.innerHTML = `${newcityinput.value}`;

  // Import API based on user's input
  let apikey = "5fc91e4f79dee96c1ed3234e310a83cf";
  apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${newcityinput.value}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(function (response) {
    updateMainCityTemperature(response);
  });
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updateCurrentWeather);
}

function updateHeading(response) {
  console.log(response);
  let maincitydisplay = document.querySelector("#city");
  maincitydisplay.innerHTML = `${response.data.name}`;
  updateMainCityTemperature(response);
}

function updateCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // Import API based on user's exact GPS location
  let apikey = "5fc91e4f79dee96c1ed3234e310a83cf";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(updateHeading);
}

let newcityform = document.querySelector("#newcityform");
let searchbutton = document.querySelector("#searchbutton");
let currentbutton = document.querySelector("#currentbutton");

newcityform.addEventListener("submit", updateMainCityDisplay);
searchbutton.addEventListener("submit", updateMainCityDisplay);
currentbutton.addEventListener("submit", getPosition);
