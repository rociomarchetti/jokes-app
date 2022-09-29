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
let userPuntuation = "not rated yet";
let apiCall = 2;
const background = document.getElementsByClassName("bg");
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = document.getElementById("title");
        title.style.display = "none";
        const message = document.getElementById("response");
        const changeResponse = message;
        const input = document.getElementById("joke");
        const printJoke = input;
        const bg = document.getElementById("bg");
        const scoreBtns = document.getElementById("buttonsList");
        scoreBtns.style.display = "block";
        const arrowBtn = document.getElementById("jokeBtn");
        arrowBtn.style.display = "none";
        const reportData = {
            joke: "",
            score: "not rated yet",
            date: "",
        };
        if (apiCall % 2 === 0) {
            const newDadJoke = yield fetch(DAD_URL, request);
            let response = yield newDadJoke.json();
            let dadJoke = response.joke;
            reportData.joke = dadJoke;
            printJoke.innerHTML = dadJoke;
            changeResponse.innerHTML = "Coming up: a fun Chuck Norris fact";
            bg.style.backgroundColor = "#08BDBA";
            const altShapes = document.getElementById("svg2");
            altShapes.style.display = "none";
            const shapes = document.getElementById("svg1");
            shapes.style.display = "block";
            apiCall++;
        }
        else {
            const newChuckJoke = yield fetch(CHUCK_URL, request);
            let response = yield newChuckJoke.json();
            let chuckJoke = response.value;
            reportData.joke = chuckJoke;
            printJoke.innerHTML = chuckJoke;
            changeResponse.innerHTML = "Coming up: a dad joke";
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
        if (userPuntuation === "not rated yet") {
            reportData.score = userPuntuation;
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
function saveScore(rate) {
    userPuntuation = rate;
    getJoke();
}
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
        const temperature = document.getElementById("temperature");
        temperature.innerText = parseInt(todaysWeather.temperature) + "ºC";
        console.log(data);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    const altShapes = document.getElementById("svg2");
    altShapes.style.display = "none";
    const scoreBtns = document.getElementById("buttonsList");
    scoreBtns.style.display = "none";
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
