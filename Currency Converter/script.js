const leftCountryCode = document.querySelector(".country-one")
const rightCountryCode = document.querySelector(".country-two")
const countriesListPage = document.querySelector(".countries")
const closeBtn = document.querySelector(".close-btn")
const countriesDetailFormat = document.querySelector("ul li")
const countryArea = document.querySelector("ul")
let selectedCountryOnLeft = leftCountryCode.querySelector("button").innerText;
let selectedCountryOnRight = rightCountryCode.querySelector("button").innerText;
let countriesDetail = null

function renderCountries(openCountry, openSide) {
    countriesListPage.classList.remove("hidden")
    countryArea.innerHTML = "";
    countriesDetail.forEach((country, index) => {
        const cloneLi = countriesDetailFormat.cloneNode(true);
        cloneLi.classList.remove("hidden");
        cloneLi.classList.add("flex");
        cloneLi.querySelector("h3 span").innerText = country['Country'];
        cloneLi.querySelector("p span").innerText = `${country['Currency Name']}(${country['Currency Code']})`;
        if (country['Currency Code'] == openCountry) {
            countryArea.prepend(cloneLi);
            cloneLi.querySelector(".select img").classList.remove("hidden");
        } else {
            countryArea.appendChild(cloneLi);
        }
        cloneLi.addEventListener("click", (e) => {
            if (openSide == "left") {
                selectedCountryOnLeft = cloneLi.querySelector(".country-code").innerText.split("(")[1].replace(")", "");
                leftCountryCode.querySelector("button").innerText = selectedCountryOnLeft;
            } else if (openSide == "right") {
                selectedCountryOnRight = cloneLi.querySelector(".country-code").innerText.split("(")[1].replace(")", "");
                rightCountryCode.querySelector("button").innerText = selectedCountryOnRight;
            }
            countriesListPage.classList.add("hidden")
        })
    })
}

function openCountriesListPage() {
    if (!countriesDetail) {
        fetch("./countries-data.json")
            .then((response) => response.json())
            .then((data) => {
                countriesDetail = data;
            })
            .catch((err) => console.log(err))
    }
}

openCountriesListPage();

leftCountryCode.addEventListener("click", (e) => {
    if (countriesDetail) {
        renderCountries(selectedCountryOnLeft, "left")
    } else {
        console.log(countriesDetail)
    }
})


rightCountryCode.addEventListener("click", (e) => {
    if (countriesDetail) {
        renderCountries(selectedCountryOnRight, "right")
    }
})


closeBtn.addEventListener("click", () => {
    countriesListPage.classList.add("hidden")
})