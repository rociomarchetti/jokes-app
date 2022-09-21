const API_URL = "https://icanhazdadjoke.com/";

const request = {
  headers: {
    Accept: "application/json",
  },
};

let reportJokes: { joke: string; score: any; date: string }[] = [];
let score: 1 | 2 | 3 | string;

async function getJoke(): Promise<void> {
  const newJoke = await fetch(API_URL, request);
  let response = await newJoke.json();
  let joke: string = response.joke;

  const input = document.getElementById("joke");
  const printJoke: HTMLElement = input!;
  printJoke.innerHTML = joke;

  const title = document.getElementById("title");
  const changeTitle: HTMLElement = title!;
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
  } else {
    reportData.score = userPuntuation;
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
