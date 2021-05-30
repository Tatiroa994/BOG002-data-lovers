export function home() {
  const sectionHome = document.getElementById("section-home");
  const containerHome =  document.createElement("div");
  containerHome.classList.add("container-home");
  const title = document.createElement("h1");
  title.textContent = "WELCOME"
  const text = document.createElement("p");
  text.textContent = "Rick Sánchez is an example of the typical \"mad scientist\". He is a genius, but he is irresponsible, alcoholic, selfish, a little depressed and with little sanity. grandson Morty; a 14-year-old boy, shy and not very smart. Reuniting with their grandson, Rick and Morty experience a variety of adventures throughout the Cosmos and parallel Universes."
  const img = document.createElement("img");
  img.src = "./img/homeImg.jpg";
  containerHome.appendChild(title);
  containerHome.appendChild(text);
  containerHome.appendChild(img);
  sectionHome.appendChild(containerHome);
}

