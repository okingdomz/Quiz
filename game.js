const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

// Timer variables
// const time_line = document.getElementById('time_line');
// const timeText = document.getElementById('timer time_text');
// const timeCount = document.getElementById('timer timer_sec');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// time value for counter
// let timeValue = 15;

let questions = [
    {
        question: "Is Lebron the Greatest to ever do it?",
        choice1: "Yes",
        choice2: "No",
        choice3: "There is No Goat",
        choice4: "He is for this Generation",
        answer: 3
    },
    {
        question: "Who will be the Face of the NBA in 3 Years?",
        choice1: "Giannis",
        choice2: "Luka",
        choice3: "Morant",
        choice4: "Victor",
        answer: 2
    },
    {
        question: "Who has the nickname: The Klaw?",
        choice1: "Porzingis",
        choice2: "Kawhi ",
        choice3: "Lebron James",
        choice4: "Stephen Curry",
        answer: 2
    },
    {
        question: "How long can you be in the Paint without a penalty?",
        choice1: "1 second",
        choice2: "5 second",
        choice3: "3 second",
        choice4: "10 seconds",
        answer: 3
    }


];

// timer

// const timeCount = timer.querySelector(" .timer .timer_sec ");
// let counter;

// function startTimer(time){
//     counter = setInterval(timer, 1000);
//     function timer(){
//         timeCount.textContent = time;
//         time--;
//     }
// }

// timer_left_txt=time left
// timer_sec =15

// constant variables for points 

// function startTimer(timer){
//     counter = setInterval(timer, 1000);
//     function time(){
//         timeCount.timeContent = time;
//         time--;
//     }
// }

const correct_bonus = 5;
const max_questions = 4;

startGame = () => {
    // starting timer function
    // startTimer(15);
    // startTimerLine(0);
   
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= max_questions) {
        // timer for clock
        // startTimer(15);
        localStorage.setItem('mostRecentScore', score);
        // sends to end page
                return window.location.replace("end.html");
            }
    questionCounter++;

    questionCounterText.innerText = questionCounter + "/" + max_questions;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];


    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;




};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classtoApply = 
           selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
// creates score for bonus points whne the answer is correct and not when wrong
        if(classtoApply === "correct") {
            incrementScore(correct_bonus);
        }

        selectedChoice.parentElement.classList.add(classtoApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();
        }, 1000);
    });

});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


// timer option 3
let time = 1;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        return window.location.replace("end.html");
    } else {
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    }
},1000);
}

startCountdown();
startGame();