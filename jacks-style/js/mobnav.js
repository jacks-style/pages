// MOBILE NAV
const MOB_NAV = document.querySelector(".div__navi-mobile");

function mobile_menu_open() {
  MOB_NAV.style.display = "block";
}

document.getElementById("li__mobile1").addEventListener("click", () => {
  MOB_NAV.style.display = "none";
});
document.getElementById("li__mobile2").addEventListener("click", () => {
  MOB_NAV.style.display = "none";
});
document.getElementById("li__mobile3").addEventListener("click", () => {
  MOB_NAV.style.display = "none";
});
document.getElementById("li__mobile4").addEventListener("click", () => {
  MOB_NAV.style.display = "none";
});
document.getElementById("img__nm-close").addEventListener("click", () => {
  MOB_NAV.style.display = "none";
});
