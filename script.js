const btnrules = document.querySelector(".rule1");
const btnclose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "stone",
    beats: "scissors",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "paper",
    beats: "stone",
  },
];
const choicebuttons = document.querySelectorAll(".choice-btn");
const gamediv = document.querySelector(".game");
const resultdiv = document.querySelector(".results");
const resultsdivs = document.querySelectorAll(".results-result");

const resultwinner = document.querySelector(".results-winner");
const resulttext = document.querySelector(".result-text");

const playagainbutton = document.querySelector(".play-again");
const scoreNumber = document.querySelector(".score_num");
const scoreNumber2 = document.querySelector(".score_num2");

const next = document.getElementsByClassName(".next");

choicebuttons.forEach((button) => {
  button.addEventListener("click", () => {
    const choicename = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choicename);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aichoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}
function aichoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}
function displayResults(results) {
  resultsdivs.forEach((resdiv, index) => {
    setTimeout(() => {
      resdiv.innerHTML = `
      <div class="choice ${results[index].name}">
      <img src="${results[index].name}.png"  alt="${results[index].name}" />
      </div>
      `;
    }, index * 1000);
  });
  gamediv.classList.toggle("hidden");
  resultdiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userwin = isWinner(results);
    const aiwins = isWinner(results.reverse());
    const next = document.querySelector(".next");
    if (userwin) {
      resulttext.innerText = "You Win against pc";
      next.style.display = "block";
      resultsdivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiwins) {
      resulttext.innerText = "You Lost against pc";
      next.style.display = "none";
      resultsdivs[1].classList.toggle("winner");
      keepScore2(1);
    } else {
      resulttext.innerText = "tie up";
      next.style.display = "none";
    }

    resultwinner.classList.toggle("hidden");
    resultdiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

playagainbutton.addEventListener("click", () => {
  gamediv.classList.toggle("hidden");
  resultdiv.classList.toggle("hidden");

  resultsdivs.forEach((resdiv) => {
    resdiv.innerHTML = "";
    resdiv.classList.remove("winner");
  });
  resulttext.innertext = "";
  resultwinner.classList.toggle("hidden");
  resultdiv.classList.toggle("show-winner");
});

btnrules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnclose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("userScore", score);
}

function keepScore2(point2) {
  score2 += point2;
  scoreNumber2.innerText = score2;
  localStorage.setItem("computerScore", score2);
}

window.onload = function () {
  score = localStorage.getItem("userScore")
    ? parseInt(localStorage.getItem("userScore"))
    : 0;
  score2 = localStorage.getItem("computerScore")
    ? parseInt(localStorage.getItem("computerScore"))
    : 0;
  scoreNumber.innerText = score;
  scoreNumber2.innerText = score2;
};
