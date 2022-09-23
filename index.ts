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

async function getJoke() {
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

    const input = document.getElementById("joke");
    const printJoke: HTMLElement = input!;
    printJoke.innerHTML = dadJoke;

    const title = document.getElementById("title");
    const changeTitle: HTMLElement = title!;
    changeTitle.innerHTML = "How many stars do you give to this Dad Joke?";

    reportData.joke = dadJoke;

    apiCall++;
  } else {
    console.log("ChuckJoke");
    const newChuckJoke = await fetch(CHUCK_URL, request);
    let response = await newChuckJoke.json();
    let chuckJoke: string = response.value;

    const input = document.getElementById("joke");
    const printJoke: HTMLElement = input!;
    printJoke.innerHTML = chuckJoke;

    const title = document.getElementById("title");
    const changeTitle: HTMLElement = title!;
    changeTitle.innerHTML =
      "How many stars do you give to this Chuck Norris joke?";

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

async function getWeather(): Promise<void> {
  let weather = await fetch(WEATHER_URL);
  let data = await weather.json();

  let todaysWeather = {
    location: "",
    temperature: "",
  };

  todaysWeather.location = data.name;
  todaysWeather.temperature = data.main.temp;

  const location = document.getElementById("location") as HTMLElement;
  location.innerText = "Ciudad: " + todaysWeather.location + ". ";
  const temperature = document.getElementById("temperature") as HTMLElement;
  temperature.innerText =
    " Temperatura actual: " + todaysWeather.temperature + "º";

  console.log(data);
}

document.addEventListener("DOMContentLoaded", getWeather);
