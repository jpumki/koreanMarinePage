const weather = document.querySelector(".js-weather");
const API_KEY = "dd1a510bc89f3d2e7f6bb3cd2c431596";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} °C ${place}`;
    });
}

function saveCoords(coordsOb) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOb));
}
function handleGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Cannot access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function localCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCords = JSON.parse(loadedCoords);
    getWeather(parsedCords.latitude, parsedCords.longitude);
  }
}

function init() {
  localCoords();
}

init();
