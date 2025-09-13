// Importing Functions 
import { makeCard, makeRadio, makeImage, makelabel, makeColor, counterClick, resetAddToCartPage, menuOpen, menuClose, searchPageFunctionality, closeSearchPage, cartClose, colorLogic, addToCartUsingCardButton, cartOpen } from './Common.js'

// Importing Variables
import { colors, img_container, add_to_cart_page, menu_toggler, close_btn, search_bar, search_page_close_btn, cart_open, cart_close, counter, product_add_to_cart } from './Common.js'

// Importing Products
import products from "./products.js";

// DOM Elements
const card_container = document.querySelector(".cards");
const add_to_cart_page_close_btn = document.querySelector(".close");
const product_code = document.querySelector(".product-code");

// Clone Cards for Main Page
for (let i = 2; i <= 12; i++) {
    card_container.appendChild(makeCard(i, `images/product-${i}.avif`));
}

// Open Add To Cart Popup
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.children[4].addEventListener("click", () => {
        const loopLength = Object.keys(products[card.id - 1].imgs).length - 1;

        for (let i = 0; i < loopLength; i++) {
            img_container.appendChild(makeRadio(i));
        }

        const images = document.createElement("div");
        images.classList.add("images");
        img_container.appendChild(images);

        for (let i = 0; i < loopLength; i++) {
            images.appendChild(makeImage(i, card.id));
        }

        const radio_buttons = document.createElement("div");
        radio_buttons.classList.add("radio-buttons");
        img_container.appendChild(radio_buttons);

        for (let i = 0; i < loopLength; i++) {
            radio_buttons.appendChild(makelabel(i));
        }

        product_code.innerText = products[card.id - 1].code;

        for (let i = 0; i < Object.keys(products[card.id - 1].colorsCode).length; i++) {
            colors.appendChild(makeColor(i, card.id));
            colors.id = card.id;
        }
        add_to_cart_page.id = card.id;
        add_to_cart_page.classList.add("product-info-open");
    });
});


// Close Add To Cart Popup
add_to_cart_page_close_btn.addEventListener("click", () => {
    resetAddToCartPage();
    add_to_cart_page.classList.remove("product-info-open");
});


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

