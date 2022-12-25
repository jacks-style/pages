// MOBILE NAV
const mobileNav = document.querySelector(".navimobile");

function mobileMenuOpen() {
  mobileNav.style.display = "block";
}

document.querySelector(".navimobile__item1").addEventListener("click", () => {
  mobileNav.style.display = "none";
});
document.querySelector(".navimobile__item2").addEventListener("click", () => {
  mobileNav.style.display = "none";
});
document.querySelector(".navimobile__item3").addEventListener("click", () => {
  mobileNav.style.display = "none";
});
document.querySelector(".navimobile__item4").addEventListener("click", () => {
  mobileNav.style.display = "none";
});
document.querySelector(".navimobile__close").addEventListener("click", () => {
  mobileNav.style.display = "none";
});
