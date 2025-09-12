const fetchData = async (city) => {
  let response =
    await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=CXB2Q6QD2MFD9LCUDMPPFMCLW&contentType=json
`);
  let data = await response.json();
  return data;
};
function toPascalCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
function applyAnimation() {
  const image = document.querySelector("img");
  const paragraphs = document.querySelectorAll("p");
  image.classList.remove("animate-fade");
  paragraphs[1].classList.remove("animate-fade");
  paragraphs[2].classList.remove("animate-fade");
  setTimeout(() => {
    image.classList.add("animate-fade");
    paragraphs[1].classList.add("animate-fade");
    paragraphs[2].classList.add("animate-fade");
  }, 10);
}
const weatherConditions = {
  clear: "clear",
  partiallycloudy: "clouds",
  clouds: "clouds",
  overcast: "clouds",
  drizzle: "drizzle",
  mist: "mist",
  haze: "mist",
  fog: "mist",
  rain: "rain",
  lightrain: "rain",
  heavyrain: "rain",
  snow: "snow",
  lightsnow: "snow",
  heavysnow: "snow",
  sleet: "snow",
  thunderstorm: "rain",
  tornado: "rain",
  sandstorm: "mist",
  hurricane: "rain",
  blizzard: "snow",
};
const btn = document.getElementsByClassName("search-btn")[0];
const bar = document.querySelector("input");
const close = document.getElementsByClassName("close-btn")[0];
close.addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
});
btn.addEventListener("click", async () => {
  const city = bar.value.trim();
  if (city === "") {
    document.getElementById("overlay").style.display = "flex";
  } else {
    try {
      const weatherData = await fetchData(city);
      const condition = weatherData.currentConditions.conditions;
      const humidity = weatherData.currentConditions.humidity;
      const wind_speed = weatherData.currentConditions.windspeed;
      const temperature = weatherData.currentConditions.temp;
      console.log(weatherData);
      document.querySelectorAll(
        "h1"
      )[0].innerHTML = `${temperature}<sup>o</sup>c`;
      document.querySelectorAll("h1")[1].innerText = toPascalCase(city);
      document.querySelectorAll("p")[1].innerText = `${humidity}%`;
      document.querySelectorAll("p")[2].innerText = `${wind_speed} Km/h`;
      document.querySelector("img").src = `images/${
        weatherConditions[condition.split(" ").join("").toLowerCase()]
      }.png`;
    } catch (error) {
      document.getElementById("overlay").style.display = "flex";
      document.querySelector("p").innerText = "Try Again!";
    }
  }
  applyAnimation();
});
