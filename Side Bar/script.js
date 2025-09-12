const btn = document.querySelector("button");
const center = document.getElementsByClassName("icons")[0];
const bottom = document.getElementsByClassName("btns")[0];
let isExpand = false;
const MakeChanges = () => {
  const deviceWidth = window.innerWidth;
  if (deviceWidth > 700) {
    if (isExpand) {
      document.documentElement.style.setProperty("--Direction", "column");
      document.documentElement.style.setProperty("--alignment", "center");
      document.documentElement.style.setProperty("--Display", "none");
    } else {
      document.documentElement.style.setProperty("--Direction", "row");
      document.documentElement.style.setProperty("--alignment", "flex-start");
      document.documentElement.style.setProperty("--Display", "block");
    }
  } else {
    if (isExpand) {
      center.style.display = "none";
      bottom.style.display = "none";
    } else {
      center.style.display = "flex";
      bottom.style.display = "flex";
    }
  }
  isExpand = !isExpand;
};
btn.addEventListener("click", MakeChanges);

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) {
    center.style.display = "flex";
    bottom.style.display = "flex";
  } else {
    center.style.display = "none";
    bottom.style.display = "none";
  }
})
