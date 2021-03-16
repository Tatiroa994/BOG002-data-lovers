// import { example } from "./data.js";
import data from "./data/rickandmorty/rickandmorty.js";

const root = document.getElementById("root");
const btnCharacter = document.getElementById("btn-character");

btnCharacter.addEventListener("click", () => {
  for (let i = 0; i < data.results.length; i++) {
    let name = data.results[i]["name"];
    let image = data.results[i]["image"];
    let newDiv = document.createElement("div");
    let myImage = new Image(200, 200);
    myImage.src = image;
    newDiv.insertAdjacentHTML("beforeend", name);
    newDiv.insertAdjacentElement("afterbegin", myImage);
    root.appendChild(newDiv);
    newDiv.classList.add("card");
  }
});
