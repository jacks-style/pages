const BUTTON = document.getElementById("btn__monster");
const PIC = document.getElementById("div__hidden");
const IMG1 = document.getElementById("img__1");

BUTTON.addEventListener("click", () => {
  PIC.style.display = "flex";
  IMG1.style.display = "none";
  BUTTON.style.display = "none";
});
