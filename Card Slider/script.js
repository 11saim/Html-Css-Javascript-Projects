const nextBtn = document.querySelector(".right");
const prevBtn = document.querySelector(".left");
const carousel = document.querySelector(".carousel");

nextBtn.addEventListener("click", () => {
  const cardWidth = document.querySelector(".card").offsetWidth + 20;
  carousel.scrollLeft += cardWidth;
});

prevBtn.addEventListener("click", () => {
  const cardWidth = document.querySelector(".card").offsetWidth + 20;
  carousel.scrollLeft -= cardWidth;
});
