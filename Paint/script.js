const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const shapes = document.querySelectorAll(".shapes p")
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let startX, startY;
let isDrawing = false;
let snapshot;
let currentShape = null;

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

function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}

function drawCircle(currentX, currentY) {
    ctx.beginPath();
    ctx.arc(startX, startY, Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2), 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawBox(currentX, currentY) {
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.beginPath()
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
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
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
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
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
})
