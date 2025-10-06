// DOM Elements
const prevBtn = document.querySelector(".previous")
const nextBtn = document.querySelector(".next")
const pageNumContainer = document.querySelector(".Page-Num-Container")
const pageNumElement = document.querySelector("p")

// Functions

// Function To Make Changes In Current Page Number
function updateChangesForFirst(first) {
    const pageNums = document.querySelectorAll("p");
    pageNums[first].classList.remove("bg-sky-500")
    pageNums[first].classList.remove("text-white")
    pageNums[first].classList.add("hover:bg-sky-500")
    pageNums[first].classList.add("hover:text-white")
}

// Function To Make Changes In Next Page Number
function updateChangesForSecond(second) {
    const pageNums = document.querySelectorAll("p");
    pageNums[second].classList.add("bg-sky-500")
    pageNums[second].classList.add("text-white")
    pageNums[second].classList.remove("hover:bg-sky-500")
    pageNums[second].classList.remove("hover:text-white")
}

// Function To Append Page Numbers 
function appendPageNums(quantity) {
    for (let i = 0; i < quantity; i++) {
        const newPageNum = pageNumElement.cloneNode(true);
        newPageNum.classList.remove("bg-sky-500")
        newPageNum.classList.remove("text-white")
        newPageNum.classList.add("hover:bg-sky-500")
        newPageNum.classList.add("hover:text-white")
        newPageNum.innerText = i + 2;
        pageNumContainer.appendChild(newPageNum);
    }
}

// Function To Put Dots When Pages Increased
function putDots(pageNumber, maxPage) {
    const pageNums = document.querySelectorAll("p")
    pageNums[1].innerText = "...";
    pageNums[2].innerText = pageNumber;
    pageNums[3].innerText = "...";
    pageNums[1].classList.remove("hover:bg-sky-500")
    pageNums[1].classList.remove("hover:text-white")
    pageNums[3].classList.remove("hover:bg-sky-500")
    pageNums[3].classList.remove("hover:text-white")
    pageNums[4].innerText = maxPage;
}

// Function To Put Number Instead Of Dots When Pages Decreased
function changeDotToNumber(pageNumber, Number) {
    const pageNums = document.querySelectorAll("p")
    pageNums[pageNumber].innerText = Number;
    pageNums[pageNumber].classList.add("hover:bg-sky-500")
    pageNums[pageNumber].classList.add("hover:text-white")
}

// Function To Manage Pagination Operations
function loadPagination(numberOfPages = 1) {
    let pages = numberOfPages;
    let currPage = 1;
    if (pages < 2) {
        prevBtn.classList.add("hidden")
        nextBtn.classList.add("hidden")
    } else if (pages > 1 && pages < 6) {
        appendPageNums(pages - 1);
        prevBtn.addEventListener("click", () => {
            if (currPage > 1) {
                updateChangesForFirst(currPage - 1);
                updateChangesForSecond(currPage - 2);
                currPage -= 1;
            }
        })
        nextBtn.addEventListener("click", () => {
            if (currPage < pages) {
                updateChangesForFirst(currPage - 1)
                updateChangesForSecond(currPage);
                currPage += 1
            }
        })
        const pageNums = document.querySelectorAll("p");
        pageNums.forEach((pageNum, index) => {
            pageNum.addEventListener("click", () => {
                pageNums[currPage - 1].classList.remove("bg-sky-500")
                pageNums[currPage - 1].classList.remove("text-white")
                pageNum.classList.add("bg-sky-500")
                pageNum.classList.add("text-white")
                pageNums[currPage - 1].classList.add("hover:bg-sky-500")
                pageNums[currPage - 1].classList.add("hover:text-white")
                pageNum.classList.remove("hover:bg-sky-500")
                pageNum.classList.remove("hover:text-white")
                currPage = index + 1;
            })
        })
    } else if (pages > 5 && pages < 10) {
        appendPageNums(4)
        const pageNums = document.querySelectorAll("p");
        prevBtn.addEventListener("click", () => {
            if (currPage > 1) {
                currPage -= 1
                if (currPage < 4) {
                    updateChangesForFirst(currPage)
                    updateChangesForSecond(currPage - 1)
                    pageNums[2].innerText = 3;
                    pageNums[2].classList.add("hover:bg-sky-500")
                    pageNums[2].classList.add("hover:text-white")
                } else if (currPage == pages - 1) {
                    updateChangesForFirst(4)
                    updateChangesForSecond(3)
                } else {
                    pageNums[3].innerText = currPage;
                    pageNums[4].innerText = currPage + 1;
                }
            }
        })
        nextBtn.addEventListener("click", () => {
            if (currPage < pages) {
                if (currPage < 4) {
                    updateChangesForFirst(currPage - 1)
                    updateChangesForSecond(currPage)
                } else if (currPage == pages - 1) {
                    updateChangesForFirst(3)
                    updateChangesForSecond(4)
                } else {
                    pageNums[2].innerText = "...";
                    pageNums[2].classList.remove("hover:bg-sky-500")
                    pageNums[2].classList.remove("hover:text-white")
                    pageNums[3].innerText = currPage + 1;
                    pageNums[4].innerText = currPage + 2;
                }
                currPage += 1;
            }
        })
        pageNums.forEach((pageNum, index) => {
            pageNum.addEventListener("click", () => {
                const clickNum = parseInt(pageNum.innerText)
                if (clickNum == currPage) {
                    return
                }
                if (clickNum < 5 && currPage < 5) {
                    updateChangesForSecond(index);
                    updateChangesForFirst(currPage - 1);
                    currPage = index + 1;
                } else if (clickNum > 4 && currPage == pages) {
                    updateChangesForSecond(index);
                    updateChangesForFirst(4)
                    currPage = parseInt(pageNum.innerText)
                } else if (clickNum > 4 && clickNum < pages) {
                    pageNums[2].innerText = "...";
                    pageNums[2].classList.remove("hover:bg-sky-500")
                    pageNums[2].classList.remove("hover:text-white")
                    pageNums[3].innerText = pageNum.innerText;
                    updateChangesForSecond(3)
                    pageNums[4].innerText = parseInt(pageNum.innerText) + 1;
                    if (currPage < 4) {
                        pageNums[currPage - 1].classList.remove("bg-sky-500")
                        pageNums[currPage - 1].classList.remove("text-white")
                        if (pageNums[currPage - 1].innerText != "...") {
                            pageNums[currPage - 1].classList.add("hover:bg-sky-500")
                            pageNums[currPage - 1].classList.add("hover:text-white")
                        }
                    }
                    currPage = parseInt(pageNum.innerText) - 1
                } else if (clickNum == pages) {
                    updateChangesForFirst(3);
                    updateChangesForSecond(4);
                    currPage = pages;
                } else if (clickNum < 5 && currPage > 4) {
                    updateChangesForSecond(index);
                    if (currPage == pages) {
                        updateChangesForFirst(4)
                    } else {
                        updateChangesForFirst(3)
                    }
                    pageNums[2].innerText = 3;
                    pageNums[3].innerText = 4;
                    pageNums[4].innerText = 5;
                    updateChangesForFirst(2);
                    currPage = parseInt(pageNum.innerText)
                }
            })
        })
    } else if (pages > 9) {
        let forLastThreeBoxes = 0;
        appendPageNums(4);
        const pageNums = document.querySelectorAll("p");
        prevBtn.addEventListener("click", () => {
            if (currPage > 1) {
                currPage -= 1;
                if (currPage < 3) {
                    updateChangesForFirst(currPage)
                    updateChangesForSecond(currPage - 1)
                    changeDotToNumber(1, 2)
                } else if (currPage > pages - 3) {
                    forLastThreeBoxes--;
                    updateChangesForFirst(3 + forLastThreeBoxes)
                    updateChangesForSecond(2 + forLastThreeBoxes)
                } else {
                    putDots(currPage, pages);
                }
            }
        })
        nextBtn.addEventListener("click", () => {
            if (currPage < pages) {
                if (currPage > pages - 3) {
                    updateChangesForFirst(2 + forLastThreeBoxes)
                    updateChangesForSecond(3 + forLastThreeBoxes)
                    changeDotToNumber(3, pages - 1)
                    forLastThreeBoxes++;
                } else if (currPage < 3) {
                    updateChangesForFirst((currPage % pageNums.length) - 1)
                    updateChangesForSecond((currPage % pageNums.length))
                } else {
                    putDots(currPage + 1, pages)
                }
                currPage += 1
            }
        })
    }
}


// Initail Function Call
loadPagination(9);