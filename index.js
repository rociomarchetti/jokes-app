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
const API_URL = "https://icanhazdadjoke.com/";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=07b52cb67cf89c2c99b8e5227164aab1&units=metric&lang=ca";
const request = {
    headers: {
        Accept: "application/json",
    },
};
let reportJokes = [];
let score;
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const newJoke = yield fetch(API_URL, request);
        let response = yield newJoke.json();
        let joke = response.joke;
        const input = document.getElementById("joke");
        const printJoke = input;
        printJoke.innerHTML = joke;
        const title = document.getElementById("title");
        const changeTitle = title;
        changeTitle.innerHTML = "How many stars do you give to this one?:";
        const reportData = {
            joke: "",
            score: score,
            date: "",
        };
        reportData.joke = joke;
        const d = new Date();
        let date = d.toISOString();
        reportData.date = date;
        if (userPuntuation === "") {
            reportData.score = "not puntuated";
        }
        else {
            reportData.score = userPuntuation;
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
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        let weather = yield fetch(WEATHER_URL);
        let data = yield weather.json();
        let todaysWeather = {
            location: "",
            temperature: "",
        };
        todaysWeather.location = data.name;
        todaysWeather.temperature = data.main.temp;
        const location = document.getElementById("location");
        location.innerText = 'Ciudad: ' + todaysWeather.location + '. ';
        const temperature = document.getElementById("temperature");
        temperature.innerText = ' Temperatura actual: ' + todaysWeather.temperature + 'º';
        console.log(data);
    });
}
document.addEventListener("DOMContentLoaded", getWeather);
