// Variables 
let curr = 1;
const max = 16

// DOM
const previousBtn = document.querySelector(".previous")
const nextBtn = document.querySelector(".next")
const pages = document.querySelectorAll("p")

// Functions
function updateChanges(first, second) {
    pages[first].classList.remove("bg-sky-500")
    pages[first].classList.remove("text-white")
    pages[first].classList.add("hover:bg-sky-500")
    pages[first].classList.add("hover:text-white")
    pages[second].classList.add("bg-sky-500")
    pages[second].classList.add("text-white")
}

function updatePageNumber(pageNumber) {
    pages[1].innerText = "...";
    pages[3].innerText = "...";
    pages[1].classList.remove("hover:bg-sky-500")
    pages[1].classList.remove("hover:text-white")
    pages[3].classList.remove("hover:bg-sky-500")
    pages[3].classList.remove("hover:text-white")
    pages[4].innerText = max;
    pages[2].innerText = pageNumber;
}

// Event Listeners
// Previous Button Logic
previousBtn.addEventListener("click", () => {
    if (curr > 1) {
        curr -= 1;
        if (curr < 3) {
            updateChanges(curr % 5, (curr % 5) - 1);
            pages[1].innerText = 2;
        } else if (curr > max - 3) {
            updateChanges(curr % 5, (curr % 5) - 1);
        } else {
            updatePageNumber(curr);
        }
    }
})

// Next Button Logic
nextBtn.addEventListener("click", () => {
    if (curr < max) {
        if (curr > max - 3) {
            updateChanges((curr % 5) - 1, curr % 5)
            pages[3].innerText = max - 1;
        } else if (curr < 3) {
            updateChanges((curr % 5) - 1, curr % 5)
        }
        else {
            updatePageNumber(curr + 1)
        }
        curr += 1;
    }
})