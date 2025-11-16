async function sortData() {
  let search = document.getElementById("searchbox").value;
  if (!search) {
    alert(`Please enter a country name`);
  }
  try {
    const res = await fetch(
      `https://disease.sh/v3/covid-19/countries/${search}`
    );
    const data = await res.json();
    if (data.message) {
      alert(`${search} has no reported Covid-19 data`);
      return;
    }
    let populationCard = (document.getElementById(
      "active"
    ).innerText = `${data.population}`);
    let casesCard = (document.getElementById(
      "cases"
    ).innerText = `${data.cases}`);
    let testsCard = (document.getElementById(
      "tests"
    ).innerText = `${data.tests}`);
    let recoveredCard = (document.getElementById(
      "recovered"
    ).innerText = `${data.recovered}`);
    let criticalCard = (document.getElementById(
      "critical"
    ).innerText = `${data.critical}`);
    let deathCard = (document.getElementById(
      "deaths"
    ).innerText = `${data.deaths}`);
  } catch (err) {
    alert("something went wrong while fetching data.");
  }
}

let search = document.getElementById("searchbox");
let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", sortData);
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sortData(), (search.value = "");
});

// FOR CHECKBOX FUNCTIONALITY
const menuToggle = document.getElementById("menu-toggle");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuToggle.checked = false; // uncheck the box
  });
});
