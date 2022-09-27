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
let score: 1 | 2 | 3 | string;
let apiCall: number = 2;

const background = document.getElementsByClassName("bg");

async function getJoke() {
  const title = document.getElementById("title") as HTMLElement;
  const message = document.getElementById("response") as HTMLElement;
  const changeResponse: HTMLElement = message!;
  const input = document.getElementById("joke");
  const printJoke: HTMLElement = input!;

  const header = document.getElementsByTagName("header");
  title.style.display = "none";
  background.style

  const reportData = {
    joke: "",
    score: score,
    date: "",
  };

  if (apiCall % 2 === 0) {
    console.log("dadJoke");
    const newDadJoke = await fetch(DAD_URL, request);
    let response = await newDadJoke.json();
    let dadJoke: string = response.joke;
    printJoke.innerHTML = dadJoke;
    changeResponse.innerHTML =
      "Don't like dad jokes? Click on the arrow  ​👉 for a Chuck Norris fact";
    reportData.joke = dadJoke;
    apiCall++;
  } else {
    console.log("ChuckJoke");
    const newChuckJoke = await fetch(CHUCK_URL, request);
    let response = await newChuckJoke.json();
    let chuckJoke: string = response.value;
    printJoke.innerHTML = chuckJoke;
    changeResponse.innerHTML =
      "Don't like Chuck Norris? Click on the arrow  ​👉 for a Dad Joke";
    reportData.joke = chuckJoke;

    apiCall--;
  }

  const d = new Date();
  let date = d.toISOString();
  reportData.date = date;

  if (userPuntuation === "") {
    reportData.score = "not puntuated";
  } else {
    let lengthArr = reportJokes.length;
    let index = lengthArr - 1;
    reportJokes[index].score = userPuntuation;
  }

  reportJokes.push(reportData);
  console.log(reportJokes);
}

function saveScore(score: number) {
  console.log(score);
  userPuntuation = score;
  return userPuntuation;
}

let userPuntuation: any = "";

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

  /*  const location = document.getElementById("location") as HTMLElement;
  location.innerText = "Ciudad: " + todaysWeather.location + ". "; */
  const temperature = document.getElementById("temperature") as HTMLElement;
  temperature.innerText = parseInt(todaysWeather.temperature) + "ºC";

  console.log(data);
}

document.addEventListener("DOMContentLoaded", getWeather);
document.addEventListener("DOMContentLoaded", () => {
  let rateBtns = document.getElementById("buttonsList") as HTMLElement;
  rateBtns.style.display = "none";
})
 
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
