const clockDiv = document.querySelector(".js-clock"),
clocktitle = clockDiv.querySelector("h1");

function getTime(){
    const getTime = new Date();
    const getMinutes = getTime.getMinutes();
    const getHours = getTime.getHours();
    const getSeconds = getTime.getSeconds();
    clocktitle.innerText = `${getHours < 10 ? `0${getHours}` : getHours}:${getMinutes < 10 ? `0${getMinutes}` : getMinutes}:${getSeconds < 10 ? `0${getSeconds}` : getSeconds}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();