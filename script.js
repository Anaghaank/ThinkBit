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

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  nextBtn.disabled = true;
  choicesEl.innerHTML = "";
  const currentQ = questions[currentQuestionIndex];
  questionEl.textContent = currentQ.question;

  currentQ.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-btn");
    btn.addEventListener("click", () => selectAnswer(index, btn));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
}

function selectAnswer(selectedIndex, btn) {
  const currentQ = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach(b => {
    b.disabled = true;
    b.classList.add("disabled");
  });

  if (selectedIndex === currentQ.answer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[currentQ.answer].classList.add("correct");
  }

  nextBtn.disabled = false;
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
}

restartBtn.addEventListener("click", () => {
  document.getElementById("quiz-container").classList.remove("hidden");
  resultEl.classList.add("hidden");
  startQuiz();
});

startQuiz();
