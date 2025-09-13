const open_btn = document.querySelector(".menu")
const close_btn = document.querySelector(".close")
const header = document.querySelector("header")
const navbar = document.querySelector("nav")
window.addEventListener("click", () => {
    header.classList.remove("menu-open")
})
open_btn.addEventListener("click", (e) => {
    e.stopPropagation()
    header.classList.add("menu-open")
})
navbar.addEventListener("click", (e) => {
    e.stopPropagation();
})
close_btn.addEventListener("click", () => {
    header.classList.remove("menu-open")
})