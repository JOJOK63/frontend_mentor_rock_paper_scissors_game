const main_container = document.querySelector(".main-container");
const rules_btn = document.getElementById("rules-btn");
const cross = document.querySelector(".cross");
const showResult = document.querySelector(".result-container");
const group_user_choice = document.querySelector(".group-user-choice");
const user_choice_div = document.querySelector(".user-choice");
const group_ia_choice = document.querySelector(".group-ia-choice");
const ia_choice_div = document.querySelector(".ia-choice");
const result = document.querySelector(
  ".result-container #message-information-result"
);
const playAgain = document.getElementById("play-again");
const reset_score = document.querySelector(".reset");
var winnerIa = false;
var winnerUser = false;

var score = 0;
var dataLocalStorage = localStorage.getItem("score");
const choices = {
  1: "paper",
  2: "scissors",
  3: "rock",
};
const rules_container = document.querySelector(".rules-container");

rules_btn.addEventListener("click", (e) => {
  rules_container.classList.remove("hidden");
  main_container.classList.add("hidden");
});
cross.addEventListener("click", (e) => {
  rules_container.classList.add("hidden");
  main_container.classList.remove("hidden");
});

getDataFromLocalStorage();

/** Gestion des choix tour 1 */
const choices_group_div = document.querySelector(".choice-group");
const choices_btn = document.querySelectorAll(".choice");
for (let choice of choices_btn) {
  choice.addEventListener("click", (e) => {
    const user_choice = choice.id;
    const ia_choice = getRandomChoice(); // À définir - génère le choix de l'IA
    whoWin(user_choice, ia_choice);
    choices_group_div.classList.add("hidden");
  });
}

function whoWin(userChoice, iaChoice) {
  if (
    (userChoice === "paper" && iaChoice === "paper") ||
    (userChoice === "rock" && iaChoice === "rock") ||
    (userChoice === "scissors" && iaChoice === "scissors")
  ) {
    displayWinner("No one win", userChoice, iaChoice);
  } else if (
    (userChoice === "paper" && iaChoice === "rock") ||
    (userChoice === "rock" && iaChoice === "scissors") ||
    (userChoice === "scissors" && iaChoice === "paper")
  ) {
    winnerUser = true;
    displayWinner("you win", userChoice, iaChoice);
    score = score + 1;
    updateScoreOnLocalStorage(score);
    displayScore(score);
  } else {
    winnerIa = true;
    displayWinner("you lose ", userChoice, iaChoice);
  }
}

// Local Storage Manipulation
function getDataFromLocalStorage() {
  if (dataLocalStorage) {
    score = parseInt(dataLocalStorage);
    displayScore(dataLocalStorage);
  } else {
    score = 0;
    localStorage.setItem("score", score);
    displayScore(score);
  }
}

function updateScoreOnLocalStorage(newScore) {
  localStorage.setItem("score", newScore); // Met à jour le score dans le localStorage
}

// Function to display
function displayScore(score) {
  const scoreDisplay = document.querySelector(".score span");
  scoreDisplay.innerText = score;
}

function displayWinner(message, user_choice, ia_choice) {
  showResult.classList.remove("hidden");
  result.innerText = message;

  user_choice_div.classList.add("choice-result");
  ia_choice_div.classList.add("choice-result");
  user_choice_div.id = `${user_choice}`;
  ia_choice_div.id = `${ia_choice}`;

  setTimeout(() => {
    group_user_choice.classList.toggle("hidden");
    group_user_choice.classList.toggle("move");
  }, 0);

  setTimeout(() => {
    group_ia_choice.classList.toggle("hidden");
    group_ia_choice.classList.toggle("move");
  }, 1000);

  setTimeout(() => {
    result.classList.toggle("hidden");
    result.classList.toggle("move");
    displayWinnerStyleFront(winnerIa, winnerUser);
  }, 1200);

  setTimeout(() => {
    playAgain.classList.toggle("hidden"); // Remove the hidden class
    playAgain.classList.toggle("move");
  }, 1200);
}

playAgain.addEventListener("click", () => {
  toggleMoveOrHiddenOrWinner();
  showResult.classList.add("hidden");
  choices_group_div.classList.remove("hidden");
  winnerIa = false;
  winnerUser = false;
});

//fct ia choice
function getRandomChoice() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  return choices[randomNum];
}

reset_score.addEventListener("click", () => {
  score = 0;
  localStorage.setItem("score", score);
  displayScore(score);
});

function toggleMoveOrHiddenOrWinner() {
  group_user_choice.classList.toggle("hidden");
  group_user_choice.classList.toggle("move");
  group_ia_choice.classList.toggle("hidden");
  group_ia_choice.classList.toggle("move");
  result.classList.toggle("hidden");
  result.classList.toggle("move");
  playAgain.classList.toggle("hidden"); // Remove the hidden class
  playAgain.classList.toggle("move");
  user_choice_div.classList.remove("winner");
  ia_choice_div.classList.remove("winner");
}

function displayWinnerStyleFront(winnerIa, winnerUser) {
  if (winnerIa === true) {
    ia_choice_div.classList.add("winner");
  } else if (winnerUser === true) {
    user_choice_div.classList.add("winner");
  }
}

/*
function setMove() {
  user_choice_div.classList.add("move");
  ia_choice_div.classList.add("move");
  result.classList.add("move");
  playAgain.classList.add("move");
}
*/
/*
    Afficher les résultats :
    Après avoir déterminé le gagnant de la manche, affichez le résultat à l'utilisateur. Vous pouvez utiliser des alertes, des messages dans le DOM ou d'autres éléments pour afficher le résultat.

    Gérer plusieurs manches :
    Pour un jeu plus complet, vous pouvez permettre aux joueurs de jouer plusieurs manches et garder une trace du score total. Vous pouvez également réinitialiser le jeu après un certain nombre de manches ou lorsque les joueurs le souhaitent.

    Améliorer l'interface utilisateur :
    Ajoutez des animations ou des transitions pour rendre l'expérience utilisateur plus agréable. Peaufinez les styles pour que le jeu soit visuellement attrayant.

    Gérer les autres règles du jeu (facultatif) :
    Si vous souhaitez ajouter plus d'options, comme un lézard ou Spock dans le jeu, vous devrez étendre la logique pour gérer toutes les combinaisons possibles.

    Gérer les conditions de victoire et de défaite :
    Ajoutez des conditions pour déterminer quand le joueur gagne ou perd complètement le jeu, et affichez un message approprié.

    Mise en page pour mobile et tablette (facultatif) :
    Si vous le souhaitez, vous pouvez optimiser la mise en page et l'expérience utilisateur pour les appareils mobiles et les tablettes.

N'oubliez pas de tester fréquemment votre jeu et d'itérer sur les fonctionnalités pour les améliorer au fur et à mesure. Cela vous aidera à créer un jeu plus complet et amusant pour les utilisateurs. Bonne continuation !
*/
