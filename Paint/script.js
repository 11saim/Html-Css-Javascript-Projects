const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const shapes = document.querySelectorAll(".shapes p");
const fillColor = document.querySelector(".fill-color");
const colors = document.querySelectorAll(".colors-collection .color");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let startX, startY;
let isDrawing = false;
let snapshot;
let currentShape = null;
let isfill = false;
let currColor = "black";

shapes.forEach((shape) => {
    shape.addEventListener("click", () => {
        shapes.forEach((shape) => {
            shape.classList.remove("text-blue-500");
        })
        if (shape.innerText == currentShape) {
            currentShape = null;
        } else {
            currentShape = shape.innerText;
            shape.classList.add("text-blue-500")
        }
    })
})

fillColor.addEventListener("click", () => {
    isfill = !isfill;
    fillColor.classList.toggle("text-blue-500")
})

colors.forEach((color) => {
    color.addEventListener("click", (e) => {
        colors.forEach((color) => {
            color.classList.remove("color-selected");
        })
        currColor = e.target.classList[1]
        color.classList.add("color-selected");
    })
})

function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}

function drawCircle(currentX, currentY) {
    ctx.beginPath();
    ctx.arc(startX, startY, Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2), 0, Math.PI * 2);
    ctx.lineWidth = 2;
}

function drawBox(currentX, currentY) {
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.beginPath()
    ctx.rect(startX, startY, width, height);
    ctx.lineWidth = 2;
}

function drawTriangle(currentX, currentY) {
    const topX = startX;
    const topY = startY;
    const leftX = startX - (currentX - startX);
    const leftY = currentY;
    const rightX = currentX;
    const rightY = currentY;

    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.closePath();
    ctx.lineWidth = 2;
}
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    takeSnapshot();
})
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    if (!currentShape) return;
    restoreSnapshot();

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    if (currentShape == "Box") {
        drawBox(currentX, currentY);
    } else if (currentShape == "Triangle") {
        drawTriangle(currentX, currentY);
    } else {
        drawCircle(currentX, currentY);
    }
    if (isfill) {
        ctx.fillStyle = currColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = currColor;
        ctx.stroke();
    }
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
})
