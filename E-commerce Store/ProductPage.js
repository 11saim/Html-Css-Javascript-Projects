// Importing Functions 
import { counterClick, menuOpen, menuClose, searchPageFunctionality, closeSearchPage, cartClose, colorLogic, addToCartUsingCardButton, cartOpen, makeRadio, makeImage, makelabel, makeColor, resetAddToCartPage } from './Common.js'

// Importing Variables
import { card, colors, menu_toggler, close_btn, search_bar, search_page_close_btn, cart_open, cart_close, counter, product_add_to_cart } from './Common.js'
import products from './products.js';

// Local Variables
let currentCard = 1;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const accordians = document.querySelectorAll(".accordian label");
const leftContainer = document.querySelector(".content .left")
const content = document.querySelector(".content")

// Hidding Card Used For Search Page
card.style.display = "none";

// Functions
function slideHandeler(index) {
    const loopLength = Object.keys(products[index - 1].imgs).length - 1;
    leftContainer.innerHTML = "";
    for (let i = 0; i < loopLength; i++) {
        leftContainer.appendChild(makeRadio(i));
    }

    const imagesDiv = document.createElement("div");
    imagesDiv.classList.add("images");
    imagesDiv.classList.add("img-box");

    for (let i = 0; i < loopLength; i++) {
        imagesDiv.appendChild(makeImage(i, index))
    }

    const radioButtons = document.createElement("div");
    radioButtons.classList.add("radio-buttons")
    radioButtons.classList.add("small-boxes")

    for (let i = 0; i < loopLength; i++) {
        const label = makelabel(i);
        const labelDiv = document.createElement("div")
        labelDiv.classList.add("box");
        labelDiv.classList.add(`box-${i + 1}`)

        const labelImg = makeImage(i, index);
        labelImg.classList.remove('product-img')
        labelImg.classList.add(`small-img-${i + 1}`)
        labelImg.id = "";
        if (String(labelImg.src).includes('images/mid-image')) {
            labelImg.src = products[index - 1]['imgs'][1]
        }
        labelDiv.appendChild(labelImg);
        label.appendChild(labelDiv);
        radioButtons.appendChild(label);
    }
    leftContainer.appendChild(imagesDiv);
    leftContainer.appendChild(radioButtons);
    colors.innerHTML = "";
    for (let i = 0; i < loopLength; i++) {
        colors.appendChild(makeColor(i, index))
    }
    colors.id = index;
    const para = document.createElement("p")
    para.innerText = `I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.`;
    leftContainer.appendChild(para);
    content.id = index;
}

// Menu Open
menu_toggler.addEventListener("click", () => {
    menuOpen();
});

// Menu Close
close_btn.addEventListener("click", () => {
    menuClose();
});

// Search Page Functionality
search_bar.addEventListener("focus", () => {
    searchPageFunctionality();
    const searchPageCards = document.querySelectorAll(".card")
    searchPageCards.forEach((searchPageCard) => {
        if (searchPageCard != card) {
            searchPageCard.style.display = "block"
        }
    })
});

// Close Search Page
search_page_close_btn.addEventListener("click", () => {
    closeSearchPage();
});

// Cart Open
cart_open.addEventListener("click", () => {
    cartOpen();
});

// Cart Close
cart_close.addEventListener("click", () => {
    cartClose();
});

// Counters (+ / - buttons)
counter.addEventListener("click", (e) => {
    counterClick(e);
});

// Color Selection Logic
colors.addEventListener("click", (e) => {
    colorLogic(e);
});

// Add To Cart Using Card Button On Main Page
product_add_to_cart.addEventListener("click", (e) => {
    addToCartUsingCardButton(e);
})

accordians.forEach((accordian) => {
    accordian.addEventListener("click", (e) => {
        accordians.forEach((innerAccordian) => {
            const content = innerAccordian.parentElement.children[2];
            if (innerAccordian == accordian) {
                content.classList.toggle("show-content")
                content.classList.toggle("hide-content")
                if (content.parentElement.children[1].children[1].innerHTML == `<i id="minus" class="fa-solid fa-minus"></i>`) {
                    content.parentElement.children[1].children[1].innerHTML = `<i id="plus" class="fa-solid fa-plus"></i>`
                } else {
                    content.parentElement.children[1].children[1].innerHTML = `<i id="minus" class="fa-solid fa-minus"></i>`
                }
            } else {
                content.classList.remove("show-content")
                content.classList.add("hide-content")
                content.parentElement.children[1].children[1].innerHTML = `<i id="plus" class="fa-solid fa-plus"></i>`;
            }
        })
    })
})

prevBtn.addEventListener("click", () => {
    if (currentCard > 1) {
        currentCard--;
    }
    if (currentCard == 1) {
        prevBtn.style.color = "grey"
    } else {
        prevBtn.style.color = "black"
        nextBtn.style.color = "black"
    }
    slideHandeler(currentCard);
    resetAddToCartPage();
})

nextBtn.addEventListener("click", () => {
    if (currentCard < 12) {
        currentCard++;
    }
    if (currentCard == 12) {
        nextBtn.style.color = "grey"
    } else {
        prevBtn.style.color = "black"
        nextBtn.style.color = "black"
    }
    slideHandeler(currentCard);
    resetAddToCartPage();
})

let clickedCard = JSON.parse(localStorage.getItem("clickedCard")) || 1;
if (clickedCard != 1) {
    slideHandeler(clickedCard);
    resetAddToCartPage();
    localStorage.setItem("clickedCard", JSON.stringify(1))
}