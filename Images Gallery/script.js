const btns = document.querySelectorAll(".buttons button");
const cards = document.querySelectorAll(".card-area .card");
[...btns].forEach((btn) => {
  btn.addEventListener("click", () => {
    [...btns].forEach((btn1) => {
      btn1.classList.remove("active");
    });
    btn.classList.add("active");
    if (btn.innerText == "All") {
      [...cards].forEach((card) => {
        card.classList.remove("hide");
      });
    } else {
      [...cards].forEach((card) => {
        if (card.dataset.name == btn.innerText.toLowerCase()) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    }
  });
});
