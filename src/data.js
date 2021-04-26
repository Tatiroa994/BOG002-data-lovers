import data from "./data/rickandmorty/rickandmorty.js";

export const searchByName = (data, input) => {
  //barra de busqueda
  let characterFound = [];
  data.forEach((element) => {
    if (element.name.toLowerCase().includes(input))
      characterFound.push(element);
  });
  return characterFound;
};

export const getCharacter = (idCard) => {
  // datos personaje por tarjeta
  let newList = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i]["id"] === idCard) {
      newList = {
        image: {
          url: data.results[i].image,
        },
        info: {
          Name: data.results[i].name,
          Status: data.results[i].status,
          Specie: data.results[i].species,
          Gender: data.results[i].gender,
          Origin: data.results[i]["origin"].name,
          Location: data.results[i]["location"].name,
          "Appearance episodes": data.results[i]["episode"].length,
        },
      };
    }
  }
  return newList;
};

export const sortData = (data, sortOrder) => {
  // ordenar a la az
  data.sort((a, b) => {
    // Si a es mayor que b 1 hace que b vaya antes que a
    if (a.name > b.name) {
      return 1;
    }
    // Si a es menor que b -1 hace que a vaya antes que b
    if (a.name < b.name) {
      return -1;
    }
    // Si son iguales retorna cero, no hay cambio de posiciones
    return 0;
  });
  if (sortOrder !== "asc") {
    return data.reverse();
  }
  return data;
};

export function filterDataCategories(filteredData, filter) {
  let count = 0;
  const keys = Object.keys(filter);
  if (keys.length === 0) {
    return filteredData;
  }
  keys.forEach((key) => {
    const filterByCategory = filteredData.filter(
      (obj) => obj[key] === filter[key]
    );
    filteredData = [...filterByCategory];
    count++;
  });
  if (count === keys.length) {
    return filteredData;
  }
  // filterDataCategories(filteredData, filter);
  // console.log(filterDataCategories(filteredData, filter));
}
