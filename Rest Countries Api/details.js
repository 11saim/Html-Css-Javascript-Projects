const Params = new URLSearchParams(window.location.search);
const countryName = Params.get("name")
const detailsArea = document.querySelector(".detail-Area")

async function getCountryData() {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    const [data] = await res.json()
    console.log(data)
    setDetails(data)
}

getCountryData()

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
          <h1 class="mb-10 text-4xl font-bold">${data.name.common}</h1>
          <div
            class="mb-10 flex flex-col space-y-6 space-x-0 font-medium sm:flex-row sm:space-y-0 sm:space-x-15"
          >
            <div class="leading-[30px]">
              <p>Native Name:<span class="font-normal"> ${data.name.official}</span></p>
              <p>Population:<span class="font-normal"> ${data.population.toLocaleString()}</span></p>
              <p>Region:<span class="font-normal"> ${data.region}</span></p>
              <p>Sub Region:<span class="font-normal"> ${data.subregion}</span></p>
              <p>Capital:<span class="font-normal"> ${data.capital[0]}</span></p>
            </div>
            <div class="leading-[25px]">
              <p>Top Level Domain:<span class="font-normal"> ${data.tld[0]}</span></p>
              <p>Currencies:<span class="font-normal"> Euro</span></p>
              <p>
                Languages:<span class="font-normal">
                  German,Deutsch,French</span
                >
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center space-x-5">
            <span class="font-medium">Border Countries:</span>
            <div class="flex flex-wrap space-x-2">
              <button
                class="my-1 cursor-pointer rounded-[4px] px-7 py-1 shadow-[0_0_0.25em_rgba(67,71,85,0.27),0_0.25em_1em_rgba(90,125,188,0.05)] dark:bg-[hsl(209,23%,22%)] dark:shadow-[0]"
              >
                France
              </button>
              <button
                class="my-1 cursor-pointer rounded-[4px] px-7 py-1 shadow-[0_0_0.25em_rgba(67,71,85,0.27),0_0.25em_1em_rgba(90,125,188,0.05)] dark:bg-[hsl(209,23%,22%)] dark:shadow-[0]"
              >
                Germany
              </button>
              <button
                class="my-1 cursor-pointer rounded-[4px] px-7 py-1 shadow-[0_0_0.25em_rgba(67,71,85,0.27),0_0.25em_1em_rgba(90,125,188,0.05)] dark:bg-[hsl(209,23%,22%)] dark:shadow-[0]"
              >
                Netherlands
              </button>
            </div>
          </div>
        </div>`;

    detailsArea.innerHTML = countryDetails;
}