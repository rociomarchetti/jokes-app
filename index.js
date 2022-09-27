"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DAD_URL = "https://icanhazdadjoke.com/";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=07b52cb67cf89c2c99b8e5227164aab1&units=metric&lang=ca";
const CHUCK_URL = "https://api.chucknorris.io/jokes/random";
const request = {
    headers: {
        Accept: "application/json",
    },
};
let reportJokes = [];
let score;
let apiCall = 2;
const background = document.getElementsByClassName("bg");
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = document.getElementById("title");
        const message = document.getElementById("response");
        const changeResponse = message;
        const input = document.getElementById("joke");
        const printJoke = input;
        const bg = document.getElementById("bg");
        const shapes = document.getElementById("svg1");
        title.style.display = "none";
        const reportData = {
            joke: "",
            score: score,
            date: "",
        };
        if (apiCall % 2 === 0) {
            console.log("dadJoke");
            const newDadJoke = yield fetch(DAD_URL, request);
            let response = yield newDadJoke.json();
            let dadJoke = response.joke;
            printJoke.innerHTML = dadJoke;
            changeResponse.innerHTML =
                "Don't like dad jokes? Click on the arrow  ​👉 for a Chuck Norris fact";
            reportData.joke = dadJoke;
            bg.style.backgroundColor = "#08BDBA";
            const altShapes = document.getElementById("svg2");
            altShapes.style.display = "none";
            const shapes = document.getElementById("svg1");
            shapes.style.display = "block";
            apiCall++;
        }
        else {
            console.log("ChuckJoke");
            const newChuckJoke = yield fetch(CHUCK_URL, request);
            let response = yield newChuckJoke.json();
            let chuckJoke = response.value;
            printJoke.innerHTML = chuckJoke;
            changeResponse.innerHTML =
                "Don't like Chuck Norris? Click on the arrow  ​👉 for a Dad Joke";
            reportData.joke = chuckJoke;
            bg.style.backgroundColor = "red";
            const altShapes = document.getElementById("svg2");
            altShapes.style.display = "block";
            const shapes = document.getElementById("svg1");
            shapes.style.display = "none";
            apiCall--;
        }
        const d = new Date();
        let date = d.toISOString();
        reportData.date = date;
        if (userPuntuation === "") {
            reportData.score = "not puntuated";
        }
        else {
            let lengthArr = reportJokes.length;
            let index = lengthArr - 1;
            reportJokes[index].score = userPuntuation;
        }
        reportJokes.push(reportData);
        console.log(reportJokes);
    });
}
function saveScore(score) {
    console.log(score);
    userPuntuation = score;
    return userPuntuation;
}
let userPuntuation = "";
//---------------------------------------WEATHER
let todaysWeather = {
    location: "",
    temperature: "",
    icon: "",
    urlIcon: "",
};
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        let weather = yield fetch(WEATHER_URL);
        let data = yield weather.json();
        todaysWeather.location = data.name;
        todaysWeather.temperature = data.main.temp;
        todaysWeather.icon = data.weather[0].icon;
        todaysWeather.urlIcon =
            "http://openweathermap.org/img/wn/" + todaysWeather.icon + "@2x.png";
        showIcon(todaysWeather);
        /*  const location = document.getElementById("location") as HTMLElement;
        location.innerText = "Ciudad: " + todaysWeather.location + ". "; */
        const temperature = document.getElementById("temperature");
        temperature.innerText = parseInt(todaysWeather.temperature) + "ºC";
        console.log(data);
    });
}
document.addEventListener("DOMContentLoaded", getWeather);
document.addEventListener("DOMContentLoaded", () => {
    const altShapes = document.getElementById("svg2");
    altShapes.style.display = "none";
});
function showIcon(todaysWeather) {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherInfo = document.getElementById("meteoInfo");
        let response = yield fetch(todaysWeather.urlIcon);
        let imageBlob = yield response.blob();
        let imageUrl = URL.createObjectURL(imageBlob);
        let weatherIcon = document.createElement("img");
        weatherIcon.src = imageUrl;
        weatherIcon.style.width = "5em";
        weatherIcon.style.marginLeft = "10px";
        weatherInfo.append(weatherIcon);
    });
}
