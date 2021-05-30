import { searchByName, sortData, filterDataCategories } from "./data.js";
import { displayList, setPagination } from "./panit_card_character.js";
import { paintCharacterCard } from "./character_card.js";
import { getListFilters } from "./filter_data_dom.js";
import { home } from "./home.js";
import data from "./data/rickandmorty/rickandmorty.js";

const btnCharacter = document.getElementById("btn-character");
const btnHome = document.getElementById("btn-home");
const btnEpisodes = document.getElementById("btn-episodes");
const btnLocations = document.getElementById("btn-locations");
const menuIcon = document.querySelector("#menu-icon");
const listMenu = document.querySelector("#list-menu");
const searchBar = document.getElementById("search-bar");
const sectionCharacter = document.getElementById("section-character");
const sectionHome = document.getElementById("section-home");
const sectionEpisodes = document.getElementById("section-episodes");
const sectionLocations = document.getElementById("section-locations");
const listOrder = document.getElementById("list-order");
const DeleteBtn = document.getElementById("btn-delete");
let filters = {};

//barra de busqueda
function search() {
  searchBar.innerHTML = "";
  let barSearch = document.createElement("input");
  barSearch.type = "search";
  barSearch.placeholder = "Buscar personaje....";
  barSearch.classList.add("search-bar");
  searchBar.appendChild(barSearch);
  barSearch.addEventListener("input", () => {
    let textInpunt = barSearch.value.toLowerCase();
    let newCharacterFound = searchByName(data.results, textInpunt);
    displayList(newCharacterFound, 1);
    setPagination(newCharacterFound);
    orderData(newCharacterFound);
  });
}

//pintar botones de la a-z  z-a
function drawSort() {
  listOrder.innerHTML = "";
  let filterAz = document.createElement("img");
  filterAz.src = "img/az.svg";
  let filterZa = document.createElement("img");
  filterZa.src = "img/za.svg";
  listOrder.insertAdjacentElement("afterbegin", filterAz);
  listOrder.insertAdjacentElement("beforeend", filterZa);
  filterZa.classList.add("filter-btn");
  filterAz.classList.add("filter-btn");
  filterAz.id = "asc";
  filterZa.id = "desc";
}

// ordenar de la a-z  z-a
function orderData(data) {
  listOrder.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-btn")) {
      let idFilter = event.target.id;
      let sortedCharacters = sortData(data, idFilter);
      displayList(sortedCharacters, 1);
    }
  });
}

//pintar los datos  de  personaje
sectionCharacter.addEventListener("click", (event) => {
  const cardNew = event.target.closest(".card");
  paintCharacterCard(cardNew, data.results);
});

//click mostrar secciones
btnCharacter.addEventListener("click", () => {
  sectionCharacter.classList.remove("hidden-section");
  sectionHome.classList.add("hidden-section");
  sectionEpisodes.classList.add("hidden-section");
  sectionLocations.classList.add("hidden-section");
  displayList(data.results, 1);
  setPagination(data.results);
  orderData(data.results);
  search();
  drawSort();
});

btnHome.addEventListener("click", () => {
  sectionHome.innerHTML = "";
  sectionCharacter.classList.add("hidden-section");
  sectionHome.classList.remove("hidden-section");
  sectionEpisodes.classList.add("hidden-section");
  sectionLocations.classList.add("hidden-section");
  home();
});

btnEpisodes.addEventListener("click", () => {
  sectionEpisodes.innerHTML = "";
  const img = document.createElement("img");
  img.src = "./img/construction.svg";
  img.classList.add("img-constrction");
  const text = document.createElement("p");
  text.textContent = "Episodes site build"
  text.classList.add("text-constrction");
  sectionEpisodes.classList.remove("hidden-section");
  sectionCharacter.classList.add("hidden-section");
  sectionHome.classList.add("hidden-section");
  sectionLocations.classList.add("hidden-section");
  sectionEpisodes.appendChild(text); 
  sectionEpisodes.appendChild(img);  
});

btnLocations.addEventListener("click", () => {
  sectionLocations.innerHTML = "";
  const img = document.createElement("img");
  img.src = "./img/construction.svg";
  img.classList.add("img-constrction");
  const text = document.createElement("p");
  text.classList.add("text-constrction");
  text.textContent = "Locations site build"
  sectionLocations.classList.remove("hidden-section");
  sectionEpisodes.classList.add("hidden-section");
  sectionCharacter.classList.add("hidden-section");
  sectionHome.classList.add("hidden-section");
  sectionLocations.appendChild(text);
  sectionLocations.appendChild(img);
});

//menu resposive toggle
menuIcon.addEventListener("click", () => {
  listMenu.classList.toggle("toggle");
});
listMenu.addEventListener("click", (event) => {
  if (event.target.classList.contains("menuItem")) {
    listMenu.classList.toggle("toggle");
  }
});

//llenar listas  filtros
sectionCharacter.addEventListener("click", (event) => {
  if (event.target.classList.contains("category")) {
    const categorySelected = event.target.id;
    getListFilters(categorySelected);
  }
});

// filtrar  personajes - cambio de estado  de botones
sectionCharacter.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-filter")) {
    const { id, value } = event.target.dataset;
    filters[id] = value;
    const filterData = filterDataCategories(data.results, filters);
    setPagination(filterData);
    displayList(filterData, 1);
    orderData(filterData);
    statusButton();
  }
});

//pintar los botones del filtro
function statusButton() {
  const othersButtons = document.querySelectorAll(".btn-filter");
  othersButtons.forEach((element) => {
    const idByElement = element.dataset.id;
    const valueByElement = element.dataset.value;
    // const { id: idByElement, value: valueByElement } = element.dataset;
    if (filters[idByElement] === valueByElement) {
      element.classList.remove("inactive");
      element.classList.add("active");
    } else {
      element.classList.remove("active");
      element.classList.add("inactive");
    }
  });
}

DeleteBtn.addEventListener("click", () => {
  filters = {};
  let btnFilter = document.querySelectorAll(".filter-list");
  btnFilter.forEach((element) => {
    element.innerHTML = "";
  });
  filterDataCategories(data.results, filters);
  displayList(data.results, 1);
  setPagination(data.results);
  orderData(data.results);
});

home();
