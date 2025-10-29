const leftCountryCode = document.querySelector(".country-one")
const rightCountryCode = document.querySelector(".country-two")
const countriesListPage = document.querySelector(".countries")

leftCountryCode.addEventListener("click", (e) => {
    countriesListPage.classList.remove("hidden")
})

rightCountryCode.addEventListener("click", (e) => {
    countriesListPage.classList.remove("hidden")
})