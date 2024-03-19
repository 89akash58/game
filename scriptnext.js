const btnrules = document.querySelector(".rule1");
const btnclose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

btnrules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnclose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
