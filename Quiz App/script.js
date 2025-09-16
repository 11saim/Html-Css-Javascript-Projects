// Imports
import quizData from './QuestionAnswers.js'



// Local Variables
const startBtn = document.querySelector(".start-btn")
const startPage = document.querySelector(".start-page")
const questionAnswerPage = document.querySelector(".ques-ans-page")
const resultPage = document.querySelector(".result-page")
const score = document.querySelector(".score p")
const timeCount = document.querySelector(".timer p")
const question = document.querySelector('.question p')
const answers = document.querySelectorAll(".answers div")
const nextBtn = document.querySelector(".next")
const answeredCount = document.querySelector(".answered-count p")
const greenBar = document.querySelector(".green")
const redBar = document.querySelector(".red")
const retryBtn = document.querySelector(".retry button")
const successRate = document.querySelector(".green-arrow p")
const failureRate = document.querySelector(".red-arrow p")
let highestScore = localStorage.getItem("Score") || 0;
let isOptionSelected = false;
let currentQues = 20;
let correctAns = 0;
let wrongAns = 0;
let sec = 18;
let timerId = null



// Functions
// Timer Logic
function timer() {
    timerId = setInterval(() => {
        timeCount.innerHTML = `00:<span>${--sec >= 10 ? sec : "0" + sec}</span>`;
        if (sec == 0 && isOptionSelected == false) {
            setQuestion(++currentQues);
            wrongAns += 1;
            clearInterval(timerId);
            reset();
        }
        else if (sec == 12) {
            questionAnswerPage.classList.remove("start")
            questionAnswerPage.classList.add("mid")
        }
        else if (sec == 6) {
            questionAnswerPage.classList.remove("mid")
            questionAnswerPage.classList.add("end")
        }
        else if (sec == 0) {
            clearInterval(timerId);
        }
    }, 1000)
}

// Next Question Logic
function setQuestion(quesNum) {
    if (quesNum >= 0 && quesNum <= 24) {
        answeredCount.innerHTML = `<span>${quesNum + 1 >= 10 ? quesNum + 1 : quesNum + 1}</span>/25`;
        question.innerText = quizData[quesNum]['question']
        const options = quizData[quesNum]['options']
        answers.forEach((answer, index) => {
            const answerPara = answer.querySelector('p')
            answerPara.innerText = options[index];
        })
    }
}

// Option Selection Logic
function optionSelection(selectedOpt) {
    const correctOpt = quizData[currentQues]['correct'];
    if (selectedOpt.innerText == correctOpt) {
        selectedOpt.classList.add("correct");
        correctAns += 1
    } else {
        answers.forEach((answer) => {
            if (answer.innerText == selectedOpt.innerText) {
                answer.classList.add("wrong");
            } else if (answer.innerText == correctOpt) {
                answer.classList.add("correct");
            }
        })
        wrongAns += 1
    }
    isOptionSelected = true;
    clearInterval(timerId);
}

// Reset 
function reset() {
    isOptionSelected = false;
    answers.forEach((answer) => {
        answer.classList.remove("wrong");
        answer.classList.remove("correct");
    })
    sec = 18;
    timeCount.innerHTML = `00:<span>18</span>`;
    questionAnswerPage.classList.remove("end")
    questionAnswerPage.classList.remove("mid")
    questionAnswerPage.classList.add("start")
    timer();
}

function updateBar(correct, wrong) {
    greenBar.style.width = (correct / 25) * 100 > 0 ? (correct / 25) * 100 + "%" : "2%";
    redBar.style.width = (wrong / 25) * 100 > 0 ? (wrong / 25) * 100 + "%" : "2%";
    successRate.innerText = (correct / 25) * 100 + "%";
    failureRate.innerText = (wrong / 25) * 100 + "%";
    if (highestScore < correct) {
        localStorage.setItem("Score", JSON.stringify(correct))
    }
}

function isHighestScore() {
    if (highestScore != 0 && highestScore > 0) {
        score.style.display = 'block';
        score.innerHTML = `Highest Score: <span>${highestScore}</span>/25`;
    }
}


// Event Listeners
// Starting Game Logic and Event Listener
startBtn.addEventListener("click", () => {
    startPage.classList.add("close")
    questionAnswerPage.classList.remove("close")
    setQuestion(currentQues);
    timer();
})

// Next Question Button Event Listener
nextBtn.addEventListener("click", () => {
    if (currentQues == 24) {
        questionAnswerPage.classList.add("close")
        resultPage.classList.remove("close")
        updateBar(correctAns, wrongAns);
    }
    if (isOptionSelected) {
        setQuestion(++currentQues);
        reset();
    }
})

// Option Selection Event Listener
answers.forEach((answer) => {
    answer.addEventListener("click", () => {
        if (!isOptionSelected && currentQues < 25) {
            optionSelection(answer);
        }
    })
})


retryBtn.addEventListener("click", () => {
    resultPage.classList.add("close")
    startPage.classList.remove("close")
    reset();
    currentQues = 0;
    isHighestScore();
})

isHighestScore()