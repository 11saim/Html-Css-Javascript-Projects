// DOM Elements
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const shapes = document.querySelectorAll(".shapes p");
const fillColor = document.querySelector(".fill-color");
const colors = document.querySelectorAll(".colors-collection .color");
const brush = document.querySelector(".brush")
const eraser = document.querySelector(".eraser")
const size = document.querySelector(".size")
const clearCanvas = document.querySelector(".clear-canvas")
const saveCanvas = document.querySelector(".save-as-img")

// Setting Canvas Height And Width
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Local Variables
let startX, startY;
let isDrawing = false;
let snapshot;
let currentShape = null;
let isfill = false;
let isBrush = false;
let isEraser = false;
let currColor = "black";

// Reset Tools
function resetTools() {
    isBrush = false;
    brush.classList.remove("text-blue-500");
    isEraser = false;
    eraser.classList.remove("text-blue-500");
    isfill = false;
    fillColor.classList.remove("text-blue-500");
}

// Click Event For Brush Option
brush.addEventListener("click", () => {
    resetTools();
    isBrush = !isBrush;
    brush.classList.toggle("text-blue-500");
    unSelectShape();
    currentShape = null;
})

// Click Event For Eraser Option
eraser.addEventListener("click", () => {
    resetTools();
    isEraser = !isEraser;
    eraser.classList.toggle("text-blue-500")
    unSelectShape();
    currentShape = null;
})

// Removing Color From Selected Shape
function unSelectShape() {
    shapes.forEach((shape) => {
        shape.classList.remove("text-blue-500");
    })
}

// Click Event For Shapes Selection
shapes.forEach((shape) => {
    shape.addEventListener("click", () => {
        unSelectShape();
        if (shape.innerText == currentShape) {
            currentShape = null;
        } else {
            currentShape = shape.innerText;
            shape.classList.add("text-blue-500")
        }
        resetTools();
        isfill = !isfill;
        fillColor.classList.toggle("text-blue-500");
    })
})

// Click Event For Fill Color Option
fillColor.addEventListener("click", () => {
    resetTools();
    isfill = !isfill;
    fillColor.classList.toggle("text-blue-500")
})

// Colors Selection Logic
colors.forEach((color) => {
    color.addEventListener("click", (e) => {
        colors.forEach((color) => {
            color.classList.remove("color-selected");
        })
        currColor = e.target.classList[1]
        color.classList.add("color-selected");
    })
})

// Take Snap Shot
function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Restore Snap Shot
function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
}

// Circle
function drawCircle(currentX, currentY) {
    ctx.beginPath();
    ctx.arc(startX, startY, Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2), 0, Math.PI * 2);
    ctx.lineWidth = 2;
}

// Box
function drawBox(currentX, currentY) {
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.beginPath()
    ctx.rect(startX, startY, width, height);
    ctx.lineWidth = 2;
}

// Triangle
function drawTriangle(currentX, currentY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - (currentX - startX), currentY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.lineWidth = 2;
}

// Brush Or Eraser
function brushEraser(tool, e) {
    if (tool == "eraser") {
        // If Eraser Then Start Removing From Where Cursor Goes
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
        // If Brush Then Draw Normally
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = currColor;
    }
    ctx.strokeStyle = currColor;
    ctx.lineWidth = size.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [startX, startY] = [e.offsetX, e.offsetY];
}

// Pointer Down Event On Canvas
canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    takeSnapshot();
})

// Draw Selected Shape
function drawShape(e) {
    ctx.globalCompositeOperation = "source-over";
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
}

// Pointer Move Event On Canvas
canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    if (currentShape) {
        drawShape(e);
    } else if (isBrush) {
        brushEraser("brush", e);
    } else if (isEraser) {
        brushEraser("eraser", e);
    }
})

// Pointer Up Event On Canvas
canvas.addEventListener("pointerup", () => {
    isDrawing = false;
});

// Clear Canvas
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// Save Canvas As Image
saveCanvas.addEventListener("click", () => {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = `my_drawing_${Math.random()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();

    ctx.restore();
});