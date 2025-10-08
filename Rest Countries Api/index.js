import { loadPagination } from "../Pagination/script.js";

// Local Variables
const cardArea = document.querySelector(".card-area")
const card = document.querySelector(".card")
const filter = document.querySelector(".filter .selected")
let currentDisplayedCards = 1;
let data = null;


// Async Function For Getting Data From ./data.json
async function loadData() {
    const res = await fetch("./data.json");
    const countries = await res.json();
    data = countries
    displayCards()
}

// Calling async Function
loadData();

// Filter Option Toggler
filter.addEventListener("click", () => {
    document.querySelector(".options").classList.toggle("scale-y-0");
    document.querySelector(".options").classList.toggle("opacity-0");
    document.querySelector(".options").classList.toggle("scale-y-100");
    document.querySelector(".options").classList.toggle("opacity-100");
})

// Function To Display Cards
function displayCards() {
    for (let i = 0; i < 12; i++) {
        let newCard = card.cloneNode(true);
        newCard.classList.remove("hidden")
        newCard.querySelector("img").src = data[i]['flags']['png']
        newCard.querySelector("h1").innerText = data[i]['name'];
        newCard.querySelectorAll('p')[0].querySelector('span').innerText = data[i]['population']
        newCard.querySelectorAll('p')[1].querySelector('span').innerText = data[i]['region']
        newCard.querySelectorAll('p')[2].querySelector('span').innerText = data[i]['capital']
        cardArea.appendChild(newCard);
    }
}



loadPagination(15);