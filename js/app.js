const main_container = document.querySelector(".main-container");
const rules_btn = document.getElementById("rules-btn");
const cross = document.querySelector(".cross");
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

const choices_btn = document.querySelectorAll(".choice");

for (let choice of choices_btn) {
  choice.addEventListener("click", (e) => {
    const user_choice = choice.id;
    const ia_choice = getRandomChoice(); // À définir - génère le choix de l'IA
    whoWin(user_choice, ia_choice);
  });
}

function whoWin(userChoice, iaChoice) {
  if (
    (userChoice === "paper" && iaChoice === "paper") ||
    (userChoice === "rock" && iaChoice === "rock") ||
    (userChoice === "scissors" && iaChoice === "scissors")
  ) {
    displayWinner("No one win");
  } else if (
    (userChoice === "paper" && iaChoice === "rock") ||
    (userChoice === "rock" && iaChoice === "scissors") ||
    (userChoice === "scissors" && iaChoice === "paper")
  ) {
    displayWinner("you win");
    score++;
    // updateDataFromLocalStorage();
  } else {
    displayWinner("you lose ");
  }
}

// Local Storage Manipulation
function getDataFromLocalStorage() {
  console.log(dataLocalStorage);
  if (dataLocalStorage) {
    displayScore(dataLocalStorage);
  } else {
    score = 0;
    localStorage.setItem("score", score);
    displayScore(score);
  }
}

function updateDataFromLocalStorage() {
  let updatedData = JSON.stringify({ score: score });
  localStorage.setItem("score", updatedData);
}

// Function to display
function displayScore(score) {
  const scoreDisplay = document.querySelector(".score span");
  scoreDisplay.innerText = score;
}

function displayWinner(message) {
  const result = document.querySelector(".display-result");
  result.innerText = message;
}

//fct ia choice
function getRandomChoice() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  return choices[randomNum];
}

// btn de test de focntion
var bouton = document.getElementById("monBouton");
bouton.addEventListener("click", () => {
  whoWin(choices[1], choices[3]);
});

/*

    Mettre à jour le score :
    Ajoutez un élément dans votre HTML pour afficher le score. Mettez à jour le score chaque fois qu'une manche est jouée.

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
