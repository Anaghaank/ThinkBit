const questions = [
  {
    question: "What is 7 + 5?",
    choices: ["10", "11", "12", "13"],
    answer: 2
  },
  {
    question: "Which shape has 4 equal sides?",
    choices: ["Rectangle", "Square", "Triangle", "Circle"],
    answer: 1
  },
  {
    question: "What comes next in the series: 2, 4, 6, ?",
    choices: ["7", "8", "9", "10"],
    answer: 1
  },
  {
    question: "If all Bloops are Razzies and some Razzies are Lazzies, are all Bloops definitely Lazzies?",
    choices: ["Yes", "No"],
    answer: 1
  },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "London"],
    answer: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 20;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");
const currentQuestionNumEl = document.getElementById("current-question-num");
const totalQuestionsEl = document.getElementById("total-questions");
const timeLeftEl = document.getElementById("time-left");

function shuffleArray(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;

  // Shuffle questions for randomness
  shuffleArray(questions);

  totalQuestionsEl.textContent = questions.length;
  resultEl.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  timeLeftEl.textContent = timeLeft;

  nextBtn.disabled = true;
  choicesEl.innerHTML = "";
  
  const currentQ = questions[currentQuestionIndex];
  currentQuestionNumEl.textContent = currentQuestionIndex + 1;

  questionEl.textContent = currentQ.question;
  questionEl.focus();

  // Shuffle choices each time
  const choicesCopy = currentQ.choices.map((choice, idx) => ({choice, idx}));
  shuffleArray(choicesCopy);

  choicesCopy.forEach(({choice, idx}) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-btn");
    btn.setAttribute("data-original-index", idx);
    btn.addEventListener("click", () => selectAnswer(idx, btn));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoShowAnswer();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function selectAnswer(selectedIndex, btn) {
  clearInterval(timer);

  const currentQ = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach(b => {
    b.disabled = true;
    b.classList.add("disabled");
  });

  if (selectedIndex === currentQ.answer) {
    btn.classList.add("correct");
    score++;
    correctCount++;
  } else {
    btn.classList.add("wrong");
    // Highlight correct answer button
    buttons.forEach(b => {
      if (parseInt(b.getAttribute("data-original-index")) === currentQ.answer) {
        b.classList.add("correct");
      }
    });
    wrongCount++;
  }

  nextBtn.disabled = false;
}

function autoShowAnswer() {
  const currentQ = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach(b => {
    b.disabled = true;
    b.classList.add("disabled");
    if (parseInt(b.getAttribute("data-original-index")) === currentQ.answer) {
      b.classList.add("correct");
    }
  });

  wrongCount++;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = score;
  totalEl.textContent = questions.length;
  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("wrong-count").textContent = wrongCount;
  questionEl.blur();
}

restartBtn.addEventListener("click", () => {
  startQuiz();
});

startQuiz();
