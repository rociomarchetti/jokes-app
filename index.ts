//https://www.sohamkamani.com/typescript/rest-http-api-call/#usage-and-examples

const API_URL = "https://icanhazdadjoke.com/";

const request = {
    headers: {
      Accept: "application/json",
    },
  };

async function getJoke(): Promise<void> { 

    const newJoke = await fetch(API_URL, request);
    let response = await newJoke.json();
    let joke: string = response.joke
    console.log(joke)
    
    const input = document.getElementById("joke");
    const printJoke: HTMLElement = input!
    printJoke.innerHTML = joke;

    const title = document.getElementById("title")
    const changeTitle: HTMLElement = title!
    changeTitle.innerHTML = 'Best dad joke ever:'
}

     



