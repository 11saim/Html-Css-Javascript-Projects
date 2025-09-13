import products from "./products.js";

// DOM Elements
export const add_to_cart_page = document.querySelector(".product-info");
export const img_container = document.querySelector(".img-container");
export const colors = document.querySelector(".colors");
export const menu_toggler = document.querySelector(".menu-toggler");
export const close_btn = document.querySelector(".cross");
export const search_bar = document.querySelector("#search");
export const search_page_close_btn = document.querySelector(".search-page-close-btn");
export const cart_open = document.querySelector(".cart-open");
export const cart_close = document.querySelector(".cart-close");
export const counter = document.querySelector(".counter");
export const product_add_to_cart = document.querySelector(".product-add-to-cart");
export const card = document.querySelector(".card");
export const search_page_cards = document.querySelector(".card-area");
const header = document.querySelector("header");
const search_page = document.querySelector(".search-page");
const cart_page = document.querySelector(".cart-page");
const colorName = document.querySelector(".color-name");
const productsArea = document.querySelector(".products");
const productQuantity = document.querySelector(".product-Quantity");
const totalAmount = document.querySelector(".total-amount")
let isColorSelected = false;
let cart = [];


// Functions
function saveCart(e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product_details = {};
    let isAlreadyAdded = false;
    const content = document.querySelector(".content");
    let comparisonId = null;
    if (content) {
        comparisonId = content.id;
    } else {
        comparisonId = e.target.parentElement.parentElement.parentElement.id;
    }
    cart.forEach((item) => {
        if (item.id == comparisonId && item.Color == colorName.innerText) {
            item.Quantity += parseInt(e.target.parentElement.children[6].children[1].innerText) || 1;
            isAlreadyAdded = true;
        }
    })
    if (!isAlreadyAdded) {
        product_details.id = comparisonId;
        product_details.Color = colorName.innerText
        product_details.Quantity = parseInt(e.target.parentElement.children[6].children[1].innerText) || 1;
        cart.push(product_details);
    }
    showToast('✅ Product added to cart!', 'success');
    resetAddToCartPage();
    resetColors();
    if (add_to_cart_page) {
        add_to_cart_page.classList.remove("product-info-open");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function resetColors() {
    const allColors = document.querySelectorAll(".color");
    allColors.forEach((color) => {
        color.children[1].style.opacity = "0";
    });
}

export function makeCard(index, sec_img) {
    let newCard = card.cloneNode(true);
    newCard.id = index;
    newCard.childNodes[1].childNodes[1].src = `images/small-product-${index}.avif`;
    newCard.childNodes[1].childNodes[3].src = sec_img;
    newCard.childNodes[1].addEventListener("click", () => {
        localStorage.setItem("clickedCard", JSON.stringify(index));
    })
    return newCard;
}

export function makeRadio(index) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "product-img";
    input.id = `radio-${index + 1}`;
    if (index === 0) {
        input.checked = true;
    }
    return input;
}

export function makeImage(index, cardId) {
    const img = document.createElement("img");
    img.id = `img-${index + 1}`;
    img.classList.add("product-img");
    img.src = products[cardId - 1].imgs[index + 2];
    img.alt = `Image-${index + 1}`;
    return img;
}

export function makelabel(index) {
    const label = document.createElement("label");
    label.htmlFor = `radio-${index + 1}`;
    return label;
}

export function makeColor(index, cardId) {
    const color = document.createElement("div");
    color.classList.add("color");
    color.id = index;

    const bg_color = document.createElement("div");
    bg_color.classList.add("bg-color");
    bg_color.style.backgroundColor = products[cardId - 1].colorsCode[index + 1];

    const border = document.createElement("div");
    border.classList.add("border");

    color.appendChild(bg_color);
    color.appendChild(border);

    return color;
}

export function resetAddToCartPage() {
    if (colors && img_container) {
        colors.innerHTML = "";
        img_container.innerHTML = "";
    }
    colorName.innerText = "";
    isColorSelected = false;
    colors.nextElementSibling.nextElementSibling.children[1].innerText = 0
}

export function showToast(message, type) {
    const container = document.getElementById("toastContainer");

    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    const p = document.createElement("p");
    p.innerText = message;
    toast.appendChild(p);
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

export function createCartProduct(productId, ProductSelectedColor, productQuantity) {

    let choosedImg = `images/small-product-${productId}.avif`;
    const matched = products.find(item => ProductSelectedColor == item.colorsName[2] && productId == item.id);
    if (matched) {
        choosedImg = `images/small-product-${productId}-2.avif`;
    }

    // Create product container
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("products");

    // Create a product
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Product image
    const img = document.createElement("img");
    img.src = choosedImg;
    img.alt = "";

    // Details container
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");

    // Product name
    const productName = document.createElement("p");
    productName.classList.add("product-name");
    productName.textContent = "i'm a product";

    // Product price
    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = "$15.00";

    // Product color
    const productColor = document.createElement("p");
    productColor.classList.add("product-color");
    productColor.innerHTML = `Color: <span>${ProductSelectedColor}</span>`;

    // Counter container
    const counterDiv = document.createElement("div");
    counterDiv.classList.add("counter");

    const minusIcon = document.createElement("i");
    minusIcon.id = "minus";
    minusIcon.className = "minus fa-solid fa-minus";

    const quantitySpan = document.createElement("span");
    quantitySpan.classList.add("quantity");
    quantitySpan.innerText = `${productQuantity}`;

    const plusIcon = document.createElement("i");
    plusIcon.id = "plus";
    plusIcon.className = "plus fa-solid fa-plus";

    // Append counter children
    counterDiv.appendChild(minusIcon);
    counterDiv.appendChild(quantitySpan);
    counterDiv.appendChild(plusIcon);

    // Append all details
    detailsDiv.appendChild(productName);
    detailsDiv.appendChild(productPrice);
    detailsDiv.appendChild(productColor);
    detailsDiv.appendChild(counterDiv);

    // Trash icon
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";

    // Total price
    const totalPrice = document.createElement("p");
    totalPrice.classList.add("total-price");
    totalPrice.textContent = "$15.00";

    // Append everything to product div
    productDiv.appendChild(img);
    productDiv.appendChild(detailsDiv);
    productDiv.appendChild(trashIcon);
    productDiv.appendChild(totalPrice);

    return productDiv;

}

export function loadCart() {
    productsArea.innerHTML = "";
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    productQuantity.innerHTML = `Cart <span>(${cart.length} item)</span>`;
    let totalQuantity = 0;
    cart.forEach((item, index) => {
        const product = createCartProduct(item.id, item.Color, item.Quantity);
        product.id = index;
        product.children[1].children[3].addEventListener("click", (e) => {
            const updatedQuantity = parseInt(counterClick(e));
            if (updatedQuantity <= 0) {
                removeCartProduct(item, index)
            }
            else if (updatedQuantity) {
                if (updatedQuantity > item.Quantity) {
                    totalQuantity += 1
                }
                else if (updatedQuantity < item.Quantity) {
                    totalQuantity -= 1
                }
                item.Quantity = updatedQuantity;
                totalAmount.innerText = `$${15 * totalQuantity}.00`;
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        })
        product.children[2].addEventListener("click", () => {
            removeCartProduct(item, index)
        })
        productsArea.appendChild(product);
        totalQuantity += item['Quantity'];
    })
    totalAmount.innerText = `$${15 * totalQuantity}.00`;
}

export function counterClick(e) {
    if (e.target.id === "plus") {
        const PLUS = e.target.previousElementSibling;
        PLUS.innerText = parseInt(PLUS.innerText) + 1;
        return PLUS.innerText;
    } else if (e.target.id === "minus" && parseInt(e.target.nextElementSibling.innerText) != 0) {
        const MINUS = e.target.nextElementSibling;
        MINUS.innerText = parseInt(MINUS.innerText) - 1;
        return MINUS.innerText;
    }
}

export function removeCartProduct(item, index) {
    let allProducts = document.querySelectorAll(".product");
    allProducts = [...allProducts];
    allProducts.filter((product) => {
        if (product.id == item.id - 1) {
            return true;
        }
    })
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast('❌ Product removed from cart!', 'danger')
    loadCart();
}

export function closeAddToCartPage() {
    resetAddToCartPage();
    add_to_cart_page.classList.remove("product-info-open");
}

export function menuOpen() {
    header.classList.add("menu-open");
}

export function menuClose() {
    header.classList.remove("menu-open");
}

export function searchPageFunctionality() {
    search_page.classList.add("search-page-open");
    search_page_cards.innerHTML = "";

    for (let i = 1; i <= 4; i++) {
        search_page_cards.appendChild(makeCard(i, ""));
    }
}

export function closeSearchPage() {
    search_page.classList.remove("search-page-open");
    search_page_cards.innerHTML = "";
}

export function cartOpen() {
    cart_page.classList.add("cart-page-open");
    loadCart()
}

export function cartClose() {
    cart_page.classList.remove("cart-page-open");
}

export function colorLogic(e) {
    const colorDiv = e.target.closest(".color");
    if (!colorDiv) return;

    const border = colorDiv.children[1];
    const isBorderVisible = border.style.opacity == 1;

    const allColors = document.querySelectorAll(".color");
    resetColors();

    colorName.classList.remove("alert")

    if (!isBorderVisible) {
        border.style.opacity = "1";
        isColorSelected = true;
        const cardId = parseInt(colorDiv.parentElement.id);
        const colorIndex = parseInt(colorDiv.id);
        colorName.innerText = products[cardId - 1].colorsName[colorIndex + 1];
    } else {
        border.style.opacity = "0";
        colorName.innerText = "";
        isColorSelected = false;
    }
}

export function addToCartUsingCardButton(e) {
    if (!isColorSelected) {
        colorName.innerText = "Select Color";
        colorName.classList.add("alert");
    } else {
        saveCart(e);
    }
}