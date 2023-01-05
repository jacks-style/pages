const BUTTON = document.getElementById("catsbtn");
const IMAGE = document.getElementById("catspic");

BUTTON.addEventListener("mouseover", () => {
  IMAGE.style.display = "block";
  IMAGE.style.animation = "start 0.2s ease-in-out";
});
BUTTON.addEventListener("click", () => {
  IMAGE.style.animation = "move 1.1s ease-in-out";
});

BUTTON.addEventListener("mouseout", () => {
  IMAGE.style.animation = "end 0.2s ease-in-out forwards";
});
