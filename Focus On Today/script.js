const inputs = document.querySelectorAll("input")
const inputsPara = document.querySelectorAll(".task-value")
const errorMessage = document.querySelector(".error-message")
const checkBoxs = document.querySelectorAll("i")
const bar = document.querySelector(".bar")
const totalCompletedTasks = document.querySelector(".total-task-done")
let completedTask = 0;
let data = JSON.parse(localStorage.getItem("data")) || {
    first: {
        value: "",
        completed: false
    },
    second: {
        value: "",
        completed: false
    },
    third: {
        value: "",
        completed: false
    }
}
localStorage.setItem("data", JSON.stringify(data))

inputs.forEach((input) => {
    if (data[input.id]) {
        if (data[input.id].value) {
            updateInput(input, data[input.id].value)
            if (data[input.id].completed) {
                let checkBox = input.previousElementSibling;
                const taskText = checkBox.nextElementSibling.nextElementSibling;
                checkBox.classList.remove("fa-circle");
                checkBox.classList.remove("fa-regular");
                checkBox.classList.add("fa-solid");
                checkBox.classList.add("fa-circle-check");
                taskText.style.textDecoration = "line-through";
                checkBox.style.color = "#48a300";
                taskText.style.color = "#48a300";
                updateProgress(1);
            }
        }
    }
})

function warning() {
    errorMessage.style.visibility = "visible";
}

function updateInput(input, dataValue = input.value) {
    errorMessage.style.visibility = "hidden";
    input.nextElementSibling.innerText = dataValue;
    input.style.display = "none";
    input.nextElementSibling.style.display = "block";
    input.previousElementSibling.style.color = "black";
    data[input.id].value = dataValue;
    localStorage.setItem("data", JSON.stringify(data));
}

function updateProgress(value) {
    completedTask += value;
    bar.children[1].style.width = 33.33 * completedTask + "%";
    totalCompletedTasks.innerText = completedTask;
}

inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (input.value.trim() == "") {
                input.previousElementSibling.style.color = "lightgrey";
                input.value = "";
                input.nextElementSibling.innerText = "";
                input.blur()
                warning();
                data[input.id].value = "";
                data[input.id].completed = false;
                localStorage.setItem("data", JSON.stringify(data));
            } else {
                updateInput(input);
            }
        }
    })

    input.addEventListener("blur", () => {
        if (input.value.trim() != "") {
            updateInput(input);
        } else {
            input.previousElementSibling.style.color = "lightgrey";
            input.value = "";
            input.nextElementSibling.innerText = "";
            warning();
            data[input.id].value = "";
            data[input.id].completed = false;
            localStorage.setItem("data", JSON.stringify(data));
        }
    })

})

inputsPara.forEach((para) => {
    para.addEventListener("click", () => {
        if (para.previousElementSibling.previousElementSibling.classList.contains("fa-circle")) {
            para.previousElementSibling.value = para.innerText;
            para.style.display = "none";
            para.previousElementSibling.style.display = "block";
            para.previousElementSibling.focus();
        }
    })
})

checkBoxs.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
        const taskText = checkBox.nextElementSibling.nextElementSibling;
        let input = checkBox.nextElementSibling
        if (taskText.innerText.trim() === "") {
            warning();
        } else {
            if (checkBox.classList.contains("fa-circle-check")) {
                checkBox.classList.remove("fa-circle-check");
                checkBox.classList.remove("fa-solid");
                checkBox.classList.add("fa-regular");
                checkBox.classList.add("fa-circle");
                taskText.style.textDecoration = "none";
                taskText.style.color = "black";
                checkBox.style.color = "black";
                updateProgress(-1);
                data[input.id].completed = false;
                localStorage.setItem("data", JSON.stringify(data));
            } else {
                checkBox.classList.remove("fa-circle");
                checkBox.classList.remove("fa-regular");
                checkBox.classList.add("fa-solid");
                checkBox.classList.add("fa-circle-check");
                taskText.style.textDecoration = "line-through";
                checkBox.style.color = "#48a300";
                taskText.style.color = "#48a300";
                updateProgress(1);
                data[input.id].completed = true;
                localStorage.setItem("data", JSON.stringify(data));
            }
        }
    });
});


