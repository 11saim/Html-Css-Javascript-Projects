// DOM Elements
const prevBtn = document.querySelector(".previous")
const nextBtn = document.querySelector(".next")
const pageNumContainer = document.querySelector(".Page-Num-Container")
const pageNumElement = document.querySelector("p")

// Functions
function loadPagination(numberOfPages) {
    let pages = numberOfPages;
    let currPage = 1

    if (pages == 1) {
        prevBtn.classList.add("hidden")
        nextBtn.classList.add("hidden")
    } else if (pages > 1 && pages < 6) {
        for (let i = 0; i < pages - 1; i++) {
            const newPageNum = pageNumElement.cloneNode(true);
            newPageNum.classList.remove("bg-sky-500")
            newPageNum.classList.remove("text-white")
            newPageNum.classList.add("hover:bg-sky-500")
            newPageNum.classList.add("hover:text-white")
            newPageNum.innerText = i + 2;
            pageNumContainer.appendChild(newPageNum);
        }
        const pageNums = document.querySelectorAll("p");
        prevBtn.classList.remove("hidden")
        nextBtn.classList.remove("hidden")
        prevBtn.addEventListener("click", () => {
            if (currPage > 1) {
                pageNums[currPage - 1].classList.remove("bg-sky-500")
                pageNums[currPage - 1].classList.remove("text-white")
                pageNums[currPage - 1].classList.add("hover:bg-sky-500")
                pageNums[currPage - 1].classList.add("hover:text-white")
                pageNums[currPage - 2].classList.add("bg-sky-500")
                pageNums[currPage - 2].classList.add("text-white")
                pageNums[currPage - 2].classList.remove("hover:bg-sky-500")
                pageNums[currPage - 2].classList.remove("hover:text-white")
                currPage -= 1;
            }
        })
        nextBtn.addEventListener("click", () => {
            if (currPage < pages) {
                pageNums[currPage - 1].classList.remove("bg-sky-500")
                pageNums[currPage - 1].classList.remove("text-white")
                pageNums[currPage - 1].classList.add("hover:bg-sky-500")
                pageNums[currPage - 1].classList.add("hover:text-white")
                pageNums[currPage].classList.add("bg-sky-500")
                pageNums[currPage].classList.add("text-white")
                pageNums[currPage].classList.remove("hover:bg-sky-500")
                pageNums[currPage].classList.remove("hover:text-white")
                currPage += 1
            }
        })
    } else if (pages > 5) {
    }
}



loadPagination(3);