const content = document.getElementsByClassName("input");
const submit_btn = document.getElementsByClassName("Submit")[0];
submit_btn.addEventListener("click", () => {
  let is_Submitted = false;
  for (const input in content) {
    if (content[input].value != "") {
      is_Submitted = true;
    } else {
      is_Submitted = false;
      break;
    }
  }
  for (const input in content) {
    const target_ele = document.getElementsByClassName(
      content[input].parentNode.className
    )[0];
    if (content[input].value != "") {
      target_ele.getElementsByClassName("correct")[0].style.display = "block";
      target_ele.getElementsByClassName("error")[0].style.display = "none";
    } else {
      target_ele.getElementsByClassName("error")[0].style.display = "block";
      content[input].setAttribute("placeholder", "This Feild is Required!");
      target_ele.getElementsByClassName("correct")[0].style.display = "none";
    }
    if (is_Submitted) {
      document.getElementsByClassName("Message")[0].innerText = "Submitted";
      document.getElementsByClassName("Message")[0].style.color = "#11ff00";
    } else {
      document.getElementsByClassName("Message")[0].innerText =
        "FullFill Requirments to Submit Form!";
      document.getElementsByClassName("Message")[0].style.color = "#ff0000";
    }
  }
});
