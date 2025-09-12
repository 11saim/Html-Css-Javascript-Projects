let timer_id;
let timer = (changes) => {
  timer_id = setInterval(changes, 100);
};
let mini_second = 0;
let second = 0;
let min = 0;
let changes = () => {
  mini_second++;
  if (mini_second == 60) {
    second++;
    if (min == 60) {
      min++;
    }
    mini_second = 0;
  }
  document.querySelector("h1").innerText = `${min < 10 ? 0 : ""}${min}:${
    second < 10 ? 0 : ""
  }${second}:${mini_second < 10 ? 0 : ""}${mini_second}`;
};
let = is_start = false;
const start_btn = document.getElementsByClassName("start")[0];
start_btn.addEventListener("click", () => {
  if (is_start == false) {
    timer(changes);
    start_btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    is_start = true;
  } else {
    clearInterval(timer_id);
    start_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    is_start = false;
  }
});
const stop_btn = document.getElementsByClassName("stop")[0];
stop_btn.addEventListener("click", () => {
  clearInterval(timer_id);
  start_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  is_start = false;
});
const reset_btn = document.getElementsByClassName("reset")[0];
reset_btn.addEventListener("click", () => {
  document.querySelector("h1").innerText = "00:00:00";
  clearInterval(timer_id);
  start_btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  mini_second = second = min = 0;
  is_start = false;
});
