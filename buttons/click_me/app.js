let element = document.createElement("button");
element.innerHTML = "Click me!";
document.body.appendChild(element);
element.addEventListener("mouseover", () => {
  element.style.marginTop = "20vw";
});
element.addEventListener("mouseout", () => {
  element.style.marginTop = "0";
});
element.addEventListener("click", () => {
  alert("Yeah!");
});
