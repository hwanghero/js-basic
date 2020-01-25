const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = '7e34aaaeb066c42cf26c985173445e36';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        // then은 함수를 호출하는데 fetch 데이터를 전부다 받고 fetch 데이터를 호출을 함.
    )
    .then(function(respnse){
        return respnse.json();
    })
    .then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(position){
    console.log("Cant access geo location");
}

function asdForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadCords = localStorage.getItem(COORDS);
    if(loadCords === null){
        asdForCoords();
    }else{
        const parseCoords = JSON.parse(loadCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();