const Create_Task = (Task_Area, Task, Task_Num) => {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.classList.add(Task_Num);

  const leftDiv = document.createElement("div");
  leftDiv.className = "left";

  const taskStatusDiv = document.createElement("div");
  taskStatusDiv.className = "task-status";
  const img = document.createElement("img");
  img.src = "images/unchecked.png";
  img.alt = "";
  taskStatusDiv.appendChild(img);

  const taskHeadingDiv = document.createElement("div");
  taskHeadingDiv.className = "unchecked";
  const h4 = document.createElement("h4");
  h4.textContent = Task;
  taskHeadingDiv.appendChild(h4);

  leftDiv.appendChild(taskStatusDiv);
  leftDiv.appendChild(taskHeadingDiv);

  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const deleteTaskDiv = document.createElement("div");
  deleteTaskDiv.className = "delete-task";
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteTaskDiv.appendChild(deleteButton);

  rightDiv.appendChild(deleteTaskDiv);

  taskDiv.appendChild(leftDiv);
  taskDiv.appendChild(rightDiv);

  Task_Area.appendChild(taskDiv);
};
const enter_btn = document.getElementsByClassName("enter")[0];
let Task_Num = 0;
enter_btn.addEventListener("click", () => {
  const input = document.querySelector("input");
  if (input.value == "") {
    console.log("Enter Something!");
  } else {
    const Tasks = document.getElementsByClassName("bottom")[0];
    Create_Task(Tasks, input.value, (Task_Num += 1));
    input.value = "";
  }
});
let Task_Section = document.getElementsByClassName("bottom")[0];
Task_Section.addEventListener("click", (e) => {
  if (e.target.className == "delete-btn") {
    e.target.parentElement.parentElement.parentElement.remove();
  } else if (
    e.target.className == "left" ||
    e.target.tagName == "H4" ||
    e.target.tagName == "IMG"
  ) {
    let Task;
    let heading;
    if (e.target.tagName == "H4" || e.target.tagName == "IMG") {
      Task = e.target.parentElement.parentElement.parentElement.className[5];
      heading = document.getElementsByClassName(Task)[0].querySelector("h4")
        .parentElement.className;
    }
    if (heading == "unchecked") {
      document
        .getElementsByClassName(Task)[0]
        .querySelector("h4")
        .parentElement.classList.remove("unchecked");
      document
        .getElementsByClassName(Task)[0]
        .querySelector("h4")
        .parentElement.classList.add("checked");
      document.getElementsByClassName(Task)[0].querySelector("img").src =
        "images/checked.png";
    } else {
      document
        .getElementsByClassName(Task)[0]
        .querySelector("h4")
        .parentElement.classList.remove("checked");
      document
        .getElementsByClassName(Task)[0]
        .querySelector("h4")
        .parentElement.classList.add("unchecked");
      document.getElementsByClassName(Task)[0].querySelector("img").src =
        "images/unchecked.png";
    }
  }
});
