function countDown1() {
  {
    let today = new Date();
    let day = today.getDate();
    if (day < 10) day = "0" + day;
    let month = today.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let year = today.getFullYear();

    document.getElementById("clock1").innerHTML =
      day + "-" + month + "-" + year;
  }
  setTimeout("countDown1()", 1000);
}
function countDown2() {
  {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 10) hour = "0" + hour;
    let minute = today.getMinutes();
    if (minute < 10) minute = "0" + minute;
    let second = today.getSeconds();
    if (second < 10) second = "0" + second;

    document.getElementById("clock2").innerHTML =
      hour + ":" + minute + ":" + second;
  }
  setTimeout("countDown2()", 1000);
}
