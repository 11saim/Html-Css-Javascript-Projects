const leftCountryCode = document.querySelector(".country-one")
const rightCountryCode = document.querySelector(".country-two")
const countriesListPage = document.querySelector(".countries")
const closeBtn = document.querySelector(".close-btn")
const countriesDetailFormat = document.querySelector("ul li")
const countryArea = document.querySelector("ul")
const searchBar = document.querySelector("#search-country")
const convert = document.querySelector(".convert")
const amount = document.querySelector("#amount")
const result = document.querySelector(".converted-amount p")
const replace = document.querySelector(".replace")
let openCountry = null;
let openSide = null;
let selectedCountryOnLeft = leftCountryCode.querySelector("button").innerText;
let selectedCountryOnRight = rightCountryCode.querySelector("button").innerText;
let countriesDetail = null

function renderCountries() {
    countriesListPage.classList.remove("hidden")
    countryArea.innerHTML = "";
    searchBar.value = "";
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
        openCountry = selectedCountryOnLeft;
        openSide = "left";
        renderCountries()
    }
})


rightCountryCode.addEventListener("click", (e) => {
    if (countriesDetail) {
        openCountry = selectedCountryOnRight;
        openSide = "right";
        renderCountries()
    }
})


closeBtn.addEventListener("click", () => {
    countriesListPage.classList.add("hidden")
})


// Debounce function
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Example usage: search input
const searchBox = document.querySelector("#search");

function handleSearch(event) {
    countryArea.innerHTML = "";
    countriesDetail.forEach((country, index) => {
        const cloneLi = countriesDetailFormat.cloneNode(true);
        cloneLi.classList.remove("hidden");
        cloneLi.classList.add("flex");
        cloneLi.querySelector("h3 span").innerText = country['Country'];
        cloneLi.querySelector("p span").innerText = `${country['Currency Name']}(${country['Currency Code']})`;
        if (country['Country'].toLowerCase().includes(searchBar.value)) {
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
        }
    })
}

const debouncedSearch = debounce(handleSearch, 500);


searchBar.addEventListener("input", () => {
    debouncedSearch();
})

amount.addEventListener("input", () => {
    if (amount.value < 1) {
        amount.value = 1;
    }
})

convert.addEventListener("click", async () => {
    result.innerText = "Converting..."
    const response = await fetch(`https://v6.exchangerate-api.com/v6/584868d8db888dea49a5d3f1/latest/${selectedCountryOnLeft}`)
    const exchangeRate = await response.json();
    const total_amount = exchangeRate['conversion_rates'][selectedCountryOnRight] * amount.value;
    result.innerText = `${amount.value} ${selectedCountryOnLeft} = ${(Math.round(total_amount * 100) / 100).toFixed(2)} ${selectedCountryOnRight}`
})

replace.addEventListener("click", () => {
    const temp = selectedCountryOnLeft;
    selectedCountryOnLeft = selectedCountryOnRight;
    selectedCountryOnRight = temp;
    leftCountryCode.querySelector("button").innerText = selectedCountryOnLeft;
    rightCountryCode.querySelector("button").innerText = selectedCountryOnRight;
})