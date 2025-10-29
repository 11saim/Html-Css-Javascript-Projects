const leftCountryCode = document.querySelector(".country-one")
const rightCountryCode = document.querySelector(".country-two")
const countriesListPage = document.querySelector(".countries")
const closeBtn = document.querySelector(".close-btn")
const countriesDetailFormat = document.querySelector("ul li")
const countryArea = document.querySelector("ul")
let selectedCountryOnLeft = "PKR"
let selectedCountryOnRight = "USD"
let countriesDetail = null

function renderCountries() {
    countriesDetail.forEach((country, index) => {
        const cloneLi = countriesDetailFormat.cloneNode(true);
        cloneLi.classList.remove("hidden");
        cloneLi.querySelector("h3 span").innerText = country['Country'];
        cloneLi.querySelector("p span").innerText = `${country['Currency Name']}(${country['Currency Code']})`;
        countryArea.appendChild(cloneLi);
    })
}

leftCountryCode.addEventListener("click", (e) => {
    countriesListPage.classList.remove("hidden")
    if (!countriesDetail) {
        fetch("./countries-data.json")
            .then((response) => response.json())
            .then((data) => {
                countriesDetail = data;
                renderCountries();
            })
            .catch((err) => console.log(err))
    }
})


rightCountryCode.addEventListener("click", (e) => {
    countriesListPage.classList.remove("hidden")
})


closeBtn.addEventListener("click", () => {
    countriesListPage.classList.add("hidden")
})