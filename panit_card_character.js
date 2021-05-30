export function displayList(items, page) {
  const cardPerPage = 20;
  const listcard = document.getElementById("list-card");
  listcard.innerHTML = "";
  page--;
  const start = cardPerPage * page;
  const end = start + cardPerPage;
  const paginatedItems = items.slice(start, end);
  for (let i = 0; i < paginatedItems.length; i++) {
    const name = paginatedItems[i]["name"];
    const image = paginatedItems[i]["image"];
    const id = paginatedItems[i]["id"];
    const newDiv = document.createElement("div");
    const myImage = document.createElement("img");
    const nombre = document.createElement("h3");
    myImage.src = image;
    nombre.innerText = name;
    newDiv.dataset.character = id;
    newDiv.insertAdjacentElement("beforeend", nombre);
    newDiv.insertAdjacentElement("afterbegin", myImage);
    newDiv.classList.add("card");
    nombre.classList.add("name-card");
    myImage.classList.add("image-card");
    listcard.appendChild(newDiv);
  }
}

export function setPagination(items) {
  const cardPerPage = 20 ;
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = " ";
  let pageCount = Math.ceil(items.length / cardPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const btn = paginationButton(i, items);
    paginationElement.appendChild(btn);
  }
}

function paginationButton(page, items) {
  let currentPage = 1;
  const button = document.createElement("button");
  button.innerText = page;
  if (currentPage == page) button.classList.add("active");
  button.addEventListener("click", () => {
    currentPage = page;
    displayList(items, currentPage);
    button.classList.add("active");
    let currentBtn = document.querySelector(".pagenumbers button.active");
    currentBtn.classList.remove("active");
    button.classList.add("active");
  });
  return button;
}


