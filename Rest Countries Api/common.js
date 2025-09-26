const toggler = document.querySelector(".toggler")
const HTML = document.querySelector("html")
let Theme = JSON.parse(localStorage.getItem("theme"))
const currTheme = document.querySelector(".toggler button")
const themeIcon = document.querySelector(".toggler div")


// Initail Theme Setup
if (Theme == "dark") {
    currTheme.innerText = "Light Mode";
    HTML.classList.add("dark")
    themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    currTheme.innerText = "Dark Mode";
    HTML.classList.remove("dark")
    themeIcon.innerHTML = '<i class="fa-regular fa-moon -rotate-[30deg] text-black"></i>';
}

// Event Listeners
toggler.addEventListener("click", () => {
    if (HTML.classList.contains("dark")) {
        localStorage.setItem("theme", JSON.stringify("light"))
        currTheme.innerText = "Dark Mode";
        HTML.classList.remove("dark");
        themeIcon.innerHTML = '<i class="fa-regular fa-moon -rotate-[30deg] text-black"></i>';
    } else {
        localStorage.setItem("theme", JSON.stringify("dark"))
        currTheme.innerText = "Light Mode";
        HTML.classList.add("dark")
        themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
})
