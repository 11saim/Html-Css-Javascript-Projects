let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissor = document.getElementById("scissor");
let user_score = document.getElementById("left-score");
let computer_score = document.getElementById("right-score");
let message = document.getElementById("message-box");
let Result;
let user_prev_score = 0;
let computer_prev_score = 0;
let Play_Game = () => {
  if (user_choice == computer_choice) {
    return "Draw";
  } else if (user_choice == "rock" && computer_choice == "paper") {
    return "Lose";
  } else if (user_choice == "rock" && computer_choice == "scissor") {
    return "Won";
  } else if (user_choice == "paper" && computer_choice == "rock") {
    return "Won";
  } else if (user_choice == "paper" && computer_choice == "scissor") {
    return "Lose";
  } else if (user_choice == "scissor" && computer_choice == "rock") {
    return "Lose";
  } else if (user_choice == "scissor" && computer_choice == "paper") {
    return "Won";
  }
};
let Make_Changes = (Result) => {
  if (Result == "Draw") {
    message.style.backgroundColor = "lightGreen";
    message.innerText = "Match Draw";
  } else if (Result == "Won") {
    message.style.backgroundColor = "Green";
    message.innerText = "You Won";
    user_prev_score += 1;
    user_score.innerText = user_prev_score;
  } else if (Result == "Lose") {
    message.style.backgroundColor = "Red";
    message.innerText = "You Lose";
    computer_prev_score += 1;
    computer_score.innerText = computer_prev_score;
  }
};
choices = {
  1: "rock",
  2: "paper",
  3: "scissor",
};
let user_choice;
let computer_choice;
rock.addEventListener("click", () => {
  user_choice = choices[1];
  computer_choice = choices[Math.floor(Math.random() * 3) + 1];
  Result = Play_Game();
  Make_Changes(Result);
});
paper.addEventListener("click", () => {
  user_choice = choices[2];
  computer_choice = choices[Math.floor(Math.random() * 3) + 1];
  Result = Play_Game();
  Make_Changes(Result);
});
scissor.addEventListener("click", () => {
  user_choice = choices[3];
  computer_choice = choices[Math.floor(Math.random() * 3) + 1];
  Result = Play_Game();
  Make_Changes(Result);
});
