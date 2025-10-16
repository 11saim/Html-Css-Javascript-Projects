// Local Variables
const Params = new URLSearchParams(window.location.search);
const countryName = Params.get("name")
const detailsArea = document.querySelector(".detail-Area")
const backBtn = document.querySelector(".back")

// Async Function Fetching Country Information
async function getCountryData() {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  const [data] = await res.json()
  setDetails(data)
}

// Call For Fetching Data
getCountryData()

// Function To Create Html For Border Tag
function createBorderTag(countryName) {
  const button = document.createElement("a");

  button.className =
    "my-1 cursor-pointer rounded-[4px] px-7 py-1 shadow-[0_0_0.25em_rgba(67,71,85,0.27),0_0.25em_1em_rgba(90,125,188,0.05)] dark:bg-[hsl(209,23%,22%)] dark:shadow-[0]";

  button.textContent = countryName;
  button.setAttribute("href", `./details.html?name=${countryName}`)
  return button;
}

// Function To Add Borders Tag 
function addBorders(borderCountries) {
  const borderTags = document.querySelector(".BorderTags")
  borderCountries.forEach((borderCountry) => {
    borderTags.appendChild(createBorderTag(borderCountry[0].name.common))
  });
}

// Setting Up Country Details On Page
function setDetails(data) {
  const countryDetails = `<div class="w-full [@media(min-width:1173px)]:w-1/2">
          <img
            class="w-full rounded-[5px]"
            src="${data.flags.svg}"
            alt="${data.name.common} Flag"
          />
        </div>
        <div
          class="w-full dark:text-[hsl(0,100%,100%)] [@media(min-width:1173px)]:w-1/2"
        >
          <h1 class="mb-10 text-3xl md:text-4xl font-bold">${data.name.common}</h1>
          <div
            class="mb-10 flex text-[14px] sm:text-[16px] flex-col space-y-6 space-x-0 font-medium sm:flex-row sm:space-y-0 sm:space-x-15"
          >
            <div class="leading-[30px]">
              <p>Native Name:<span class="font-normal"> ${data.name.official || "None"}</span></p>
              <p>Population:<span class="font-normal"> ${data.population.toLocaleString() || "None"}</span></p>
              <p>Region:<span class="font-normal"> ${data.region || "None"}</span></p>
              <p>Sub Region:<span class="font-normal"> ${data.subregion || "None"}</span></p>
              <p>Capital:<span class="font-normal"> ${data.capital ? Object.keys(data.capital).map((capitalKey) => {
    return (data.capital[capitalKey])
  }).join(", ") : "None"}</span></p>
            </div>
            <div class="leading-[25px]">
              <p>Top Level Domain:<span class="font-normal"> ${Object.keys(data.tld).map((tldKey) => {
    return (data.tld[tldKey])
  }).join(", ")}</span></p>
              <p>Currencies:<span class="font-normal"> ${data.currencies ? Object.keys(data.currencies).map((currKey) => {
    return (data.currencies[currKey].name)
  }).join(", ") : "None"}</span></p>
              <p>
                Languages:<span class="font-normal">
                  ${data.languages ? Object.keys(data.languages).map((langKey) => {
    return (data.languages[langKey])
  }).join(", ") : "None"}</span
                >
              </p>
            </div>
          </div>
          <div class="Borders flex flex-wrap items-center space-x-5">
            <span class="font-medium">Border Countries:</span>
            <div class="BorderTags flex flex-wrap space-x-2 text-[14px] sm:text-[16px]">
            </div>
          </div>
        </div>`;
  detailsArea.innerHTML = countryDetails;
  // Fetching Data Of Borders If Country Have Border With Other Countries
  if (data.borders) {
    Promise.all(Object.keys(data.borders).map((borKey) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${data.borders[borKey]}`).then((res) => res.json()).then((data) => data)
    })).then((data) => addBorders(data))
  } else {
    const borders = document.querySelector(".Borders");
    borders.classList.add("hidden")
  }
}

// Back Button Logic
backBtn.addEventListener("click", () => {
  history.back();
})