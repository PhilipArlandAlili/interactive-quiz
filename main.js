const questions = [
    {
        "question": "What is 5 + 3?",
        "options": ["6", "7", "8", "9"],
        "answer": "8"
    },
    {
        "question": "What is 6 - 4?",
        "options": ["2", "3", "4", "5"],
        "answer": "2"
    },
    {
        "question": "What is 7 + 2?",
        "options": ["8", "9", "10", "11"],
        "answer": "9"
    },
    {
        "question": "What is 5 + 7?",
        "options": ["10", "11", "12", "13"],
        "answer": "12"
    },
    {
        "question": "What is 4 + 6?",
        "options": ["9", "10", "11", "12"],
        "answer": "10"
    },
    {
        "question": "What is 5 - 3?",
        "options": ["2", "3", "4", "5"],
        "answer": "2"
    },
    {
        "question": "What is 9 + 1?",
        "options": ["8", "9", "10", "11"],
        "answer": "10"
    },
    {
        "question": "What is 2 + 9?",
        "options": ["9", "10", "11", "12"],
        "answer": "11"
    },
    {
        "question": "What is 3 + 7?",
        "options": ["8", "9", "10", "11"],
        "answer": "10"
    },
    {
        "question": "What is 3 - 2?",
        "options": ["0", "1", "2", "3"],
        "answer": "1"
    },
    {
        "question": "What is 8 + 5?",
        "options": ["12", "13", "14", "15"],
        "answer": "13"
    },
    {
        "question": "What is 6 - 5?",
        "options": ["0", "1", "2", "3"],
        "answer": "1"
    },
    {
        "question": "What is 6 + 9?",
        "options": ["14", "15", "16", "17"],
        "answer": "15"
    },
    {
        "question": "What is 11 + 3?",
        "options": ["12", "13", "14", "15"],
        "answer": "14"
    },
    {
        "question": "What is 5 + 7?",
        "options": ["10", "11", "12", "13"],
        "answer": "12"
    },
    {
        "question": "What is 9 - 8?",
        "options": ["0", "1", "2", "3"],
        "answer": "1"
    },
    {
        "question": "What is 9 + 6?",
        "options": ["14", "15", "16", "17"],
        "answer": "15"
    },
    {
        "question": "What is 13 + 5?",
        "options": ["16", "17", "18", "19"],
        "answer": "18"
    },
    {
        "question": "What is 4 + 9?",
        "options": ["11", "12", "13", "14"],
        "answer": "13"
    },
    {
        "question": "What is 10 + 7?",
        "options": ["15", "16", "17", "18"],
        "answer": "17"
    },
    {
        "question": "What is 4 + 4?",
        "options": ["7", "8", "9", "10"],
        "answer": "8"
    },
    {
        "question": "What is 2 + 2?",
        "options": ["1", "2", "3", "4"],
        "answer": "4"
    },
    {
        "question": "What is 9 + 3?",
        "options": ["10", "11", "12", "13"],
        "answer": "12"
    },
    {
        "question": "What is 9 - 3?",
        "options": ["6", "7", "8", "9"],
        "answer": "6"
    },
    {
        "question": "What is 4 - 2?",
        "options": ["2", "3", "4", "5"],
        "answer": "2"
    },
];

let currentQuestionIndex = 0;
let score = localStorage.getItem("quizScore");
score = isNaN(parseInt(score)) ? 0 : parseInt(score);
let selectedAnswer = null;

const responseImg = document.getElementById("responseImg");
const quizContainer = document.getElementById("quizContainer");
const confirmButton = document.getElementById("confirmBtn");
const nextButton = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const response = document.getElementById("response");

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

let randomizedQuestions = questions.slice();
shuffleArray(randomizedQuestions);
randomizedQuestions = randomizedQuestions.slice(0, 10);

document.getElementById("startBtn").addEventListener("click", function () {
    quizContainer.innerHTML = '';
    document.querySelector(".boardFooter").innerHTML = `
        <button class="btn-home" id="homeBtn">Home</button>
        <button class="btn-confirm" id="confirmBtn">Confirm</button>`;
    loadQuestion();
});

document.addEventListener("DOMContentLoaded", function () {
    const homeModal = document.getElementById("homeModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmHomeBtn = document.getElementById("confirmHomeBtn");

    document.addEventListener("click", function (event) {
        if (event.target.id === "homeBtn") {
            homeModal.style.display = "block";
        }
    });

    cancelBtn.addEventListener("click", () => {
        homeModal.style.display = "none";
    });

    confirmHomeBtn.addEventListener("click", () => {
        homeModal.style.display = "none";
        backHome();
    });
});

function loadQuestion() {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    const options = [...currentQuestion.options];
    // Copy the options for shuffling
    shuffleArray(options);

    quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <div class="options">
            ${currentQuestion.options.map(option =>
        `<button class="option" onclick="selectAnswer(this)">${option}</button>`
    ).join('')}
        </div>
    `;
    document.getElementById("confirmBtn").addEventListener("click", checkAnswer);
}

// Function to handle answer selection
function selectAnswer(button) {
    selectedAnswer = button.textContent;
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

// Function to check the answer
function checkAnswer() {
    if (!selectedAnswer) {
        document.getElementById("response").textContent = "Please select an answer!";
        return;
    }

    quizContainer.innerHTML = "";
    document.querySelector(".boardFooter").innerHTML = ``;

    const correctAnswer = randomizedQuestions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        localStorage.setItem("quizScore", score);
        response.textContent = "🥳 Amazing!";
        responseImg.src = "images/correct.png";

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.5, x: 0.7 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
            });
        } else {
            console.error('Confetti library is not loaded.');
        }

        const feedbackEl = document.createElement("h2");
        feedbackEl.innerText = `"${correctAnswer}" is the correct answer!`;

        quizContainer.appendChild(feedbackEl);

    } else {
        response.textContent = "😔 You got it wrong!";
        responseImg.src = "images/wrong.png";

        const feedbackEl = document.createElement("h2");
        feedbackEl.innerText = `"${correctAnswer}" is the correct answer!`;

        quizContainer.appendChild(feedbackEl);
    }

    // Load the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < randomizedQuestions.length) {
        setTimeout(() => {
            responseImg.src = "images/welcome.png";
            response.textContent = "";
            document.querySelector(".boardFooter").innerHTML = `
            <button class="btn-home" id="homeBtn">Home</button>
            <button class="btn-confirm" id="confirmBtn">Confirm</button>`;
            loadQuestion();
        }, 3000);
    } else {
        setTimeout(() => {
            responseImg.src = "images/welcome.png"; // Reset image at quiz end
            endQuiz();
        }, 3000);
    }
}


// Function to end the quiz
function endQuiz() {
    response.innerText = "Thank You for playing!";
    quizContainer.innerHTML = `
        <div class="resultContainer">
            <p>Your final score: ${score} / ${randomizedQuestions.length}</p>
            <button class="btn-home" id="endHomeBtn">Home</button>
            <button class="btn-start" id="restartBtn">Restart Quiz</button>
        </div>`;

    document.querySelector('.boardFooter').innerHTML = "";
    document.getElementById("endHomeBtn").addEventListener("click", backHome);
    document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    localStorage.setItem("quizScore", score);

    // Reset response and image
    response.innerText = "";
    responseImg.src = "images/welcome.png";

    // Reset footer buttons
    document.querySelector(".boardFooter").innerHTML = `
    <button class="btn-home" id="homeBtn">Home</button>
    <button class="btn-confirm" id="confirmBtn">Confirm</button>`;

    // Load first question
    loadQuestion();
}

// Add window reload event listener to go back home
window.addEventListener('load', backHome);

function backHome() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    localStorage.setItem("quizScore", score);

    // Reset response and image
    response.innerText = "";
    responseImg.src = "images/welcome.png";

    // Reset quiz container to initial state
    quizContainer.innerHTML = `
        <h2>Welcome to Simple <span class="gold">Interactive</span> Quiz</h2>
        <button class="btn-start" id="startBtn">Start</button>
    `;

    // Reset footer
    document.querySelector(".boardFooter").innerHTML = "";

    // Re-add start button event listener
    document.getElementById("startBtn").addEventListener("click", function () {
        quizContainer.innerHTML = '';
        document.querySelector(".boardFooter").innerHTML = `
        <button class="btn-home" id="homeBtn">Home</button>
        <button class="btn-confirm" id="confirmBtn">Confirm</button>`;
        loadQuestion();
    });
}
