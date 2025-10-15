// Importing Pagination Function
import { loadPagination } from "../Pagination/script.js";

// Local Variables
const cardArea = document.querySelector(".card-area")
const card = document.querySelector(".card")
const filter = document.querySelector(".filter .selected")
const input = document.querySelector("input")
const regions = document.querySelectorAll(".options ul li")
const filterText = filter.querySelector("button")
const filterOptions = document.querySelector(".options");
let data = null;


// Async Function For Getting Data From ./data.json
async function loadData() {
    const res = await fetch("./data.json");
    const countries = await res.json();
    data = countries
    displayCards(0, 16)
}

// Calling async Function
loadData();

// Toggler For Filter Option
filter.addEventListener("click", () => {
    addTransition();
})

// Funcion To Create Card
function createCard(i) {
    let newCard = card.cloneNode(true);
    newCard.classList.remove("hidden")
    newCard.querySelector("img").src = data[i]['flags']['png']
    newCard.querySelector("h1").innerText = data[i]['name'];
    newCard.querySelectorAll('p')[0].querySelector('span').innerText = data[i]['population'].toLocaleString()
    newCard.querySelectorAll('p')[1].querySelector('span').innerText = data[i]['region']
    newCard.querySelectorAll('p')[2].querySelector('span').innerText = data[i]['capital']
    newCard.setAttribute('href', `./details.html?name=${data[i]['name']}`)
    cardArea.appendChild(newCard);
}

// Function To Add Transition In Filter Options
function addTransition() {
    filterOptions.classList.toggle("scale-y-0");
    filterOptions.classList.toggle("scale-y-100");
    filterOptions.classList.toggle("opacity-0");
    filterOptions.classList.toggle("opacity-100");
}

// Function To Display Cards
function displayCards(start, end) {
    cardArea.innerHTML = "";
    for (let i = start; i < end; i++) {
        createCard(i);
    }
}

// Calculation For Displaying Card According To Page Number
function calcCardRange(pageNum) {
    if (pageNum * 16 < 250) {
        displayCards((pageNum * 16) - 16, pageNum * 16);
    } else {
        displayCards((pageNum * 16) - 16, (pageNum * 16) - 6);
    }
}

// Initial Call To Load Pagination
loadPagination(16);

// Importing Variable To Have Access To Current Page
import { currPage } from "../Pagination/script.js";

// Pagination Area Variable
const Pagination = document.querySelector(".pagination div")

// Initializing Observer For Pagination 
const observer = new MutationObserver((mutations) => {
    calcCardRange(currPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
});

// Applying Observer On Pagination So Page Change Can Be Detected
observer.observe(Pagination, { childList: true, subtree: true, characterData: true, attributes: true });

// Debouncing Function
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function For Search Input
function inputHandler(e) {
    if (e.target.value.trim() == "") {
        Pagination.parentElement.style.display = "flex";
        calcCardRange(currPage);
    } else {
        Pagination.parentElement.style.display = "none";
        cardArea.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
                createCard(i);
            }
        }
    }
    filterText.innerText = "Filter By Region";
}

// Event Listener For Search Input
input.addEventListener("input", debounce(inputHandler, 400))


regions.forEach((region) => {
    region.addEventListener("click", () => {
        if (filterText.innerText != region.innerText) {
            filterText.innerText = region.innerText
            addTransition();
            Pagination.parentElement.style.display = "none";
            cardArea.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].region == filterText.innerText) {
                    createCard(i);
                }
            }
        } else {
            filterText.innerText = "Filter By Region";
            addTransition();
            Pagination.parentElement.style.display = "flex";
            calcCardRange(currPage);
        }
        input.value = "";
    })
})


const filterMenu = document.querySelector(".filter");

document.addEventListener("click", (e) => {
    if (!filterMenu.contains(e.target)) {
        if (filterOptions.classList.contains("scale-y-100")) {
            addTransition();
        }
    }
});