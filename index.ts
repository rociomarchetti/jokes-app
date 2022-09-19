/* const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
} */

https://www.sohamkamani.com/typescript/rest-http-api-call/#usage-and-examples

const link = 'https://icanhazdadjoke.com/'

interface Joke {
    id: string,
    joke: string,
    status: number
}

async function getJokes(): Promise<Joke> {
    const response = await fetch(link);
    const data = await response.json();   
    if (response.status === 200) {
        return fetch ('/')
    }
    else {
        console.error("HTTP-Error, càrrega temps: " + response.status);
    }
}
