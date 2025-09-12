let Images = document.getElementsByClassName("img");
let left_btn = document.getElementsByClassName("left-btn")[0];
let right_btn = document.getElementsByClassName("right-btn")[0];
let Image_Container = document.getElementsByClassName("images")[0];
let curr_img = 1;
left_btn.addEventListener("click", () => {
  if (curr_img < 1) {
    curr_img = 6;
  }
  console.log(curr_img);
  curr_img--;
  display_images(curr_img);
});
right_btn.addEventListener("click", () => {
  if (curr_img > 6) {
    curr_img = 1;
  }
  console.log(curr_img);
  curr_img++;
  display_images(curr_img);
});
let display_images = (start) => {
  Image_Container.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    start = (start % 6) + 1;
    let img = document.createElement("IMG");
    img.src = `Images/${start}.avif`;
    img.classList.add("img");
    Image_Container.appendChild(img);
  }
};
display_images(1);
