const YT_GIFT_URL = "https://youtu.be/your_video_here";

const quizData = [
  {
    question: "Когда мы начали встречаться?",
    type: "radio",
    options: ["15.03.2024", "14.03.2024", "12.03.2024", "17.03.2024"],
    answer: "15.03.2024"
  },
  {
    question: "Сколько я ждал ответа?",
    type: "radio",
    options: ["1 час", "2 часа", "3 часа", "не ждал"],
    answer: "1 час"
  },
  {
    question: "Когда был наш первый поцелуй?",
    type: "radio",
    options: ["20.03.2024", "18.03.2024", "17.03.2024", "19.03.2024"],
    answer: "17.03.2024"
  },
  {
    question: "Твои старые лучшие друзья, которые меня бесили больше всех 😡",
    type: "checkbox",
    options: ["Ислам", "Аятхан", "Самир", "Лэйла"],
    answers: ["Ислам", "Лэйла"]
  }
];

const quizContainer = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const giftLink = document.getElementById("gift-link");

let currentQuestion = 0;
let correctAnswers = 0;

function showQuestion() {
  quizContainer.innerHTML = "";
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    const card = document.createElement("div");
    card.className = "question-card";

    const title = document.createElement("h3");
    title.textContent = q.question;
    card.appendChild(title);

    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = q.type;
      input.name = "question";
      input.value = opt;
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      card.appendChild(label);
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-btn";
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Показать результат" : "Дальше ❤️";
    nextBtn.onclick = checkAnswer;
    card.appendChild(nextBtn);

    quizContainer.appendChild(card);
  } else {
    showResult();
  }
}

function checkAnswer() {
  const q = quizData[currentQuestion];
  const selected = [...document.querySelectorAll("input:checked")].map(i => i.value);

  if (q.type === "checkbox") {
    const correct = q.answers.every(a => selected.includes(a)) && selected.length === q.answers.length;
    if (correct) correctAnswers++;
  } else {
    if (selected[0] === q.answer) correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  if (correctAnswers === quizData.length) {
    giftLink.href = YT_GIFT_URL;
    confetti();
  } else {
    resultDiv.innerHTML = "<h2>Пон, забыла, но ладно</h2><p>Попробуй ещё раз 💌</p><button class='next-btn' onclick='location.reload()'>Заново</button>";
  }
}

function confetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    const colors = ['#ff99b9', '#ffc4d0', '#ffebf0'];
    const confettiPiece = document.createElement("div");
    confettiPiece.style.position = "fixed";
    confettiPiece.style.width = "10px";
    confettiPiece.style.height = "10px";
    confettiPiece.style.background = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.top = "0";
    confettiPiece.style.left = Math.random() * 100 + "vw";
    confettiPiece.style.opacity = "0.8";
    confettiPiece.style.borderRadius = "50%";
    confettiPiece.style.transition = "transform 2s linear";
    document.body.appendChild(confettiPiece);
    setTimeout(() => confettiPiece.style.transform = `translateY(100vh)`, 10);
    setTimeout(() => confettiPiece.remove(), 2000);

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

showQuestion();
