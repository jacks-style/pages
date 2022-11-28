const BUTTON = document.getElementById("cat__button");
const IMAGE = document.getElementById("cats__img");

BUTTON.addEventListener("mouseover", () => {
  IMAGE.style.display = "block";
});
BUTTON.addEventListener("mouseout", () => {
  IMAGE.style.display = "none";
});
