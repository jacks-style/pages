function odliczanie() {
  let dzisiaj = new Date();
  let dzien = dzisiaj.getDate();
  if (dzien < 10) dzien = "0" + dzien;
  let miesiac = dzisiaj.getMonth() + 1;
  if (miesiac < 10) miesiac = "0" + miesiac;
  let rok = dzisiaj.getFullYear();
  let godzina = dzisiaj.getHours();
  if (godzina < 10) godzina = "0" + godzina;
  let minuta = dzisiaj.getMinutes();
  if (minuta < 10) minuta = "0" + minuta;
  let sekunda = dzisiaj.getSeconds();
  if (sekunda < 10) sekunda = "0" + sekunda;

  document.getElementById("zegar").innerHTML =
    dzien +
    "." +
    miesiac +
    "." +
    rok +
    " " +
    "-" +
    " " +
    godzina +
    ":" +
    minuta +
    ":" +
    sekunda;

  setTimeout("odliczanie()", 1000);
}
