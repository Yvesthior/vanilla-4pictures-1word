const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("level");
const answerImages = document.getElementById("answer-images");
const submitBtn = document.getElementById("submit-btn");
const answer = document.getElementById("answer-value");

let shuffledQuestions, currentQuestionIndex;

// function validateForm() {
//   var x = document.forms["myForm"]["answer-value"].value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   } else {
//     console.log(x);
//   }
// }

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(data) {
  questionElement.innerText = data.level;
  data.images.forEach((imagefile) => {
    const img = document.createElement("img");
    img.src = imagefile;
    img.classList.add("image");
    answerImages.appendChild(img);
  });
  submitBtn.addEventListener("click", () => {
    if (answer.value.toLowerCase() === data.answer.toLowerCase()) {
      setStatusClass(document.body, "correct");
      alert("Bien Joué");
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
      } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
      }
    } else {
      setStatusClass(document.body, "wrong");
      alert("Mauvaise Réponse ! Essaie Encore");
    }
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerImages.firstChild) {
    answerImages.removeChild(answerImages.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerImages.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, value) {
  clearStatusClass(element);
  if (value === "correct") {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    level: "Niveau 1",
    images: [
      "https://www.coolcarspage.com/wp-content/uploads/2016/04/1460645346439_Classic-car-300x200.jpg",
      "https://www.motorbiscuit.com/wp-content/uploads/2014/10/12C1232_32-300x200.jpg",
      "https://garageroyale.online/wp-content/uploads/2018/12/businessCars-300x200.jpg",
      "https://artebellum-v2-mini.s3-eu-west-1.amazonaws.com/1958-devin-ss-monza-1k3cvrp7e-1-300x200.jpg",
    ],
    letters: ["V", "E", "R", "B", "U", "M", "T", "G", "I", "E", "A", "O"],
    answer: "voiture",
  },
  {
    level: "Niveau 2",
    images: [
      "https://lh3.googleusercontent.com/proxy/-1CJubG25dcDADQwuY1O9rd-x7ID_yCDvdB75rH_gpWaWH4zDsfCwb_pCZ0nr4jodNWCqTBAoIq5cYcUa7roZK3WV85pgW9R8V22sDDHCz0xW78kD6mLx-3JGqGwdTE3_R2CJ3xX9JiLrGkuplr9-Q",
      "https://fruitsfromchile.com/wp-content/uploads/2018/09/DSC_3217-copy-300x200.jpg",
      "https://lh3.googleusercontent.com/proxy/f8kFRgJKjM76LTYHI3n4drMoz7PwS-RJ2K7lNaPYG230kY6eSmZAJM008JZt3j1fYY5YkkWvdSznx0gV8_tWXfYsAntxbzBcdI_DDmQqv4XAWhsPaygxRSzM-jWwd5oYdDNyWDM",
      "https://lh3.googleusercontent.com/proxy/ajLmxDC4kJTPg-UEMWaIX0lKpCnXn3MoQDnpXplb7vUx7DbHciZULiZMUhgBFzqARi1dJpR4CSyqwGFOjRyVBRLXeOh54DolESrazLu5WuzwgaAJyAo3gYFjt-NsscI",
    ],
    letters: ["F", "E", "R", "S", "U", "M", "T", "G", "I", "E", "A", "O"],
    answer: "fruits",
  },
];

// lettres: [
//     { text: "4", correct: true },
//     { text: "22", correct: false },
//     { text: "22", correct: false },
//   ],
