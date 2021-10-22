let pollutionIndexContainer = document.getElementById("pollutionData");
let pollutionValue = document.getElementById("aqiValue");

if (pollutionValue.innerHTML <= 50) {
    pollutionIndexContainer.style.backgroundColor = "#5EF75F";
}
if (pollutionValue.innerHTML > 50 && pollutionValue.innerHTML <= 100) {
    pollutionIndexContainer.style.backgroundColor = "#D0D000";
}
if (pollutionValue.innerHTML > 100 && pollutionValue.innerHTML <= 150) {
    pollutionIndexContainer.style.backgroundColor = "#FFB240";
}
if (pollutionValue.innerHTML > 150 && pollutionValue.innerHTML <= 200) {
    pollutionIndexContainer.style.backgroundColor = "#F94D4D";
}
if (pollutionValue.innerHTML > 200) {
    pollutionIndexContainer.style.backgroundColor = "#E300E3";
}
