"use strict";
//https://www.sohamkamani.com/typescript/rest-http-api-call/#usage-and-examples
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
const request = {
    headers: {
        Accept: "application/json",
    },
};
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const newJoke = yield fetch(API_URL, request);
        let response = yield newJoke.json();
        let joke = response.joke;
        console.log(joke);
        const input = document.getElementById("joke");
        const printJoke = input;
        printJoke.innerHTML = joke;
        const title = document.getElementById("title");
        const changeTitle = title;
        changeTitle.innerHTML = 'Best dad joke ever:';
    });
}
