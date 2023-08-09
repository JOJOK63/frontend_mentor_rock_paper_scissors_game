const main_container = document.querySelector(".main-container");
const rules_btn = document.getElementById("rules-btn");
const cross = document.querySelector(".cross");

const rules_container = document.querySelector(".rules-container");

rules_btn.addEventListener("click", (e) => {
  rules_container.classList.remove("hidden");
  main_container.classList.add("hidden");
});
cross.addEventListener("click", (e) => {
  rules_container.classList.add("hidden");
  main_container.classList.remove("hidden");
});

/** Gestion des choix tour 1 */

const choices_btn = document.querySelectorAll(".choice");

for (let choice of choices_btn) {
  choice.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    // Autres actions à effectuer en réponse au clic sur un choix
  });
}
