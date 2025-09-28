const max = 20
let curr = 1;
const previousBtn = document.querySelector(".previous")
const nextBtn = document.querySelector(".next")
const pages = document.querySelectorAll("p")
let forLast = 0;


previousBtn.addEventListener("click", () => {
    if (curr > 1) {
        curr -= 1;
        if (curr < 3) {
            // pages[curr - 1].classList.add("bg-sky-500")
            // pages[curr - 1].classList.add("text-white")
            // pages[curr].classList.remove("bg-sky-500")
            // pages[curr].classList.remove("text-white")
            // pages[curr].classList.add("hover:bg-sky-500")
            // pages[curr].classList.add("hover:text-white")
            console.log(curr % 5);
            console.log((curr % 5) - 1);
        } else if (curr > 17) {
            // pages[4 - forLast].classList.remove("bg-sky-500")
            // pages[4 - forLast].classList.remove("text-white")
            // pages[4 - forLast].classList.add("hover:bg-sky-500")
            // pages[4 - forLast].classList.add("hover:text-white")
            // pages[4 - forLast].classList.add("bg-sky-500")
            // pages[4 - forLast].classList.add("text-white")
            // forLast -= 1;
            console.log(curr % 5);
            console.log((curr % 5) - 1);
        }
    }
})


nextBtn.addEventListener("click", () => {
    if (curr < 20) {
        if (curr > 17) {
            // pages[2 + forLast].classList.remove("bg-sky-500")
            // pages[2 + forLast].classList.remove("text-white")
            // pages[2 + forLast].classList.add("hover:bg-sky-500")
            // pages[2 + forLast].classList.add("hover:text-white")
            // pages[3 + forLast].classList.add("bg-sky-500")
            // pages[3 + forLast].classList.add("text-white")
            console.log((curr % 5) - 1);
            console.log(curr % 5);
            forLast += 1
        } else if (curr < 3) {
            // pages[curr - 1].classList.remove("bg-sky-500")
            // pages[curr - 1].classList.remove("text-white")
            // pages[curr - 1].classList.add("hover:bg-sky-500")
            // pages[curr - 1].classList.add("hover:text-white")
            // pages[curr].classList.add("bg-sky-500")
            // pages[curr].classList.add("text-white")
            console.log((curr % 5) - 1);
            console.log(curr % 5);
        }
        curr += 1;
    }
})