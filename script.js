const questions = [
  {
    question: "What is the output of the expression: 3 + 4 * 2?",
    choices: ["14", "11", "10", "16"],
    answer: 1 // 3 + (4 * 2) = 11
  },
  {
    question: "In a 64-bit system, how many bytes does a 'long' usually occupy?",
    choices: ["4 bytes", "8 bytes", "16 bytes", "Depends on compiler"],
    answer: 1
  },
  {
    question: "Which sorting algorithm has the best average time complexity?",
    choices: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    answer: 2 // Quick Sort: O(n log n)
  },
  {
    question: "A train 180 meters long is running at 54 km/h. How much time will it take to cross a platform 120 meters long?",
    choices: ["12 seconds", "18 seconds", "20 seconds", "15 seconds"],
    answer: 1 // Total distance = 300 m, Speed = 15 m/s ⇒ 300/15 = 20 s
  },
  {
    question: "What is the missing number in the series: 2, 6, 12, 20, ?",
    choices: ["28", "30", "32", "36"],
    answer: 2 // Pattern: +4, +6, +8, +10 → next +12 = 32
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
