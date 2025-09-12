const Slide = document.getElementsByClassName("container")[0];
function createSlide(Slide_no) {
  Slide.innerHTML = "";
  // Create the main 'Slide' div
  const slideDiv = document.createElement("div");
  slideDiv.className = "Slide";

  // Create the 'left' div with button and icon
  const leftDiv = document.createElement("div");
  leftDiv.className = "left";

  const leftButton = document.createElement("button");
  const leftIcon = document.createElement("i");
  leftIcon.className = "fa-solid fa-arrow-left-long";

  leftButton.appendChild(leftIcon);
  leftDiv.appendChild(leftButton);

  // Create the 'center' div with content
  const centerDiv = document.createElement("div");
  centerDiv.className = "center";

  const slideText = document.createElement("p");
  slideText.textContent = `Slide 0${Slide_no}`;

  const heading = document.createElement("h2");
  heading.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing.";

  const subHeading = document.createElement("h4");
  subHeading.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aspernatur iste est error fuga aliquid.";

  const learnMoreButton = document.createElement("button");
  learnMoreButton.textContent = "Learn More";

  centerDiv.append(slideText, heading, subHeading, learnMoreButton);

  // Create the 'right' div with button and icon
  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const rightButton = document.createElement("button");
  const rightIcon = document.createElement("i");
  rightIcon.className = "fa-solid fa-arrow-right-long";

  rightButton.appendChild(rightIcon);
  rightDiv.appendChild(rightButton);

  // Append all sections to the main slide div
  slideDiv.append(leftDiv, centerDiv, rightDiv);

  // Return the constructed slide
  Slide.appendChild(slideDiv);
  leftButton.addEventListener("click", () => {
    curr_img--;
    if (curr_img < 1) curr_img = 5;
    createSlide(curr_img);
    createBottomBar(curr_img + 2);
    Slide.style.backgroundImage = `url('Images/${curr_img}.jpg')`;
  });

  rightButton.addEventListener("click", () => {
    Slide.style.backgroundImage = `url('Images/${(curr_img % 5) + 1}.jpg')`;
    createSlide((curr_img % 5) + 1);
    curr_img++;
    createBottomBar((curr_img % 5) + 2);
  });
}
function createBottomBar(Slide_no) {
  // Create the main 'bottom-bar' div
  const bottomBar = document.createElement("div");
  bottomBar.className = "bottom-bar";

  // Create and append five sections
  for (let i = 1; i <= 5; i++) {
    const section = document.createElement("div");
    section.className = `section-${i}`;

    const paragraph = document.createElement("p");
    paragraph.textContent = `Slide-0${(Slide_no % 5) + 1}`;

    section.appendChild(paragraph);
    bottomBar.appendChild(section);
    Slide_no++;
  }
  // Append the bottom bar to the body
  Slide.appendChild(bottomBar);
}
let curr_img = 1;
createSlide(curr_img);
createBottomBar(curr_img + 2);
