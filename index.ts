const DAD_URL = "https://icanhazdadjoke.com/";
const WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=07b52cb67cf89c2c99b8e5227164aab1&units=metric&lang=ca";
const CHUCK_URL = "https://api.chucknorris.io/jokes/random";

const request = {
  headers: {
    Accept: "application/json",
  },
};

let reportJokes: { joke: string; score: any; date: string }[] = [];
let userPuntuation: any = "not rated yet";
let apiCall: number = 2;

const background = document.getElementsByClassName("bg");

async function getJoke() {
  const title = document.getElementById("title") as HTMLElement;
  title.style.display = "none";

  const message = document.getElementById("response") as HTMLElement;
  const changeResponse: HTMLElement = message!;

  const input = document.getElementById("joke");
  const printJoke: HTMLElement = input!;

  const bg = document.getElementById("bg") as HTMLElement;

  const scoreBtns = document.getElementById("buttonsList") as HTMLElement;
  scoreBtns.style.display = "block";

  const arrowBtn = document.getElementById("jokeBtn") as HTMLElement;
  arrowBtn.style.display = "none";

  const reportData = {
    joke: "",
    score: "not rated yet",
    date: "",
  };

  if (apiCall % 2 === 0) {
    
    const newDadJoke = await fetch(DAD_URL, request);
    let response = await newDadJoke.json();
    let dadJoke: string = response.joke;
    reportData.joke = dadJoke;

    printJoke.innerHTML = dadJoke;
    changeResponse.innerHTML = "Coming up: a fun Chuck Norris fact";
    bg.style.backgroundColor = "#08BDBA";
    const altShapes = document.getElementById("svg2") as HTMLDivElement;
    altShapes.style.display = "none";
    const shapes = document.getElementById("svg1") as HTMLDivElement;
    shapes.style.display = "block";

    apiCall++;
  } else {
    
    const newChuckJoke = await fetch(CHUCK_URL, request);
    let response = await newChuckJoke.json();
    let chuckJoke: string = response.value;
    reportData.joke = chuckJoke;

    printJoke.innerHTML = chuckJoke;
    changeResponse.innerHTML = "Coming up: a dad joke";
    bg.style.backgroundColor = "red";
    const altShapes = document.getElementById("svg2") as HTMLDivElement;
    altShapes.style.display = "block";
    const shapes = document.getElementById("svg1") as HTMLDivElement;
    shapes.style.display = "none";
    
    apiCall--;
  }

  const d = new Date();
  let date = d.toISOString();
  reportData.date = date;

  if (userPuntuation === "not rated yet") {
    reportData.score = userPuntuation;
  } else {
    let lengthArr = reportJokes.length;
    let index = lengthArr - 1;
    reportJokes[index].score = userPuntuation;
  }

  reportJokes.push(reportData);
  console.log(reportJokes);
}

function saveScore(rate: number) {
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

async function getWeather() {
  let weather = await fetch(WEATHER_URL);
  let data = await weather.json();

  todaysWeather.location = data.name;
  todaysWeather.temperature = data.main.temp;
  todaysWeather.icon = data.weather[0].icon;
  todaysWeather.urlIcon =
    "http://openweathermap.org/img/wn/" + todaysWeather.icon + "@2x.png";

  showIcon(todaysWeather);
  const temperature = document.getElementById("temperature") as HTMLElement;
  temperature.innerText = parseInt(todaysWeather.temperature) + "ºC";

  console.log(data);
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  const altShapes = document.getElementById("svg2") as HTMLDivElement;
  altShapes.style.display = "none";
  const scoreBtns = document.getElementById("buttonsList") as HTMLElement;
  scoreBtns.style.display = "none";
});

async function showIcon(todaysWeather: any) {
  const weatherInfo = document.getElementById("meteoInfo") as HTMLElement;
  let response = await fetch(todaysWeather.urlIcon);
  let imageBlob = await response.blob();
  let imageUrl = URL.createObjectURL(imageBlob);

  let weatherIcon = document.createElement("img");
  weatherIcon.src = imageUrl;
  weatherIcon.style.width = "5em";
  weatherIcon.style.marginLeft = "10px";
  weatherInfo.append(weatherIcon);
}
