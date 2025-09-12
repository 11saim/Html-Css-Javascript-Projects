const success_btn = document.getElementsByClassName("Success")[0];
const error_btn = document.getElementsByClassName("Error")[0];
const invalid_btn = document.getElementsByClassName("Invalid")[0];
const noti_area = document.getElementsByClassName("notifications")[0];
const icons = {
  success: "fa-solid fa-circle-check",
  error: "fa-solid fa-circle-xmark",
  invalid: "fa-solid fa-circle-exclamation",
};
const Toast = (msg) => {
  let noti_div = document.createElement("div");
  noti_div.setAttribute("class", `${msg}-notification`);
  noti_div.classList.add("notification");

  let icon = document.createElement("i");
  icon.setAttribute("class", `${icons[msg]}`);

  let para = document.createElement("p");
  if (msg == "success") {
    para.innerText = "Successfully Submitted";
  } else if (msg == "error") {
    para.innerText = "Please Fix the Error";
  } else if (msg == "invalid") {
    para.innerText = "Invalid Input,Try Again";
  }
  noti_div.appendChild(icon);
  noti_div.appendChild(para);
  noti_area.appendChild(noti_div);
  if (noti_area.childNodes.length > 0) {
    setTimeout(() => {
      noti_area.removeChild(noti_area.firstChild);
    }, 3000);
  }
};
success_btn.addEventListener("click", () => {
  Toast("success");
});
error_btn.addEventListener("click", () => {
  Toast("error");
});
invalid_btn.addEventListener("click", () => {
  Toast("invalid");
});
