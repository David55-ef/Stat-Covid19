async function sortData() {
  // 1. Get the current search term and sanitize it for the title
  let search = document.getElementById("searchbox").value.trim();
  if (!search) {
    alert(`Please enter a country name`);
    return; // Exit the function if search is empty
  }

  // A utility function to capitalize the first letter of each word (e.g., "united states" -> "United States")
  const formattedCountryName = search
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  try {
    const res = await fetch(
      `https://disease.sh/v3/covid-19/countries/${search}`
    );
    const data = await res.json();

    // Check for API-specific error message
    if (data.message) {
      alert(
        `"${formattedCountryName}" has no reported Covid-19 data. Please check the spelling.`
      );

      // If previous stats exist, clear the title to reflect the error
      const existingTitle = document.getElementById("country-stats-title");
      if (existingTitle) existingTitle.remove();

      return; // Exit the function on error
    }

    // 2. Dynamic Title Creation/Update
    const trackerSection = document.querySelector(".tracker");
    let countryTitle = document.getElementById("country-stats-title");

    if (!countryTitle) {
      // Create the h1 element if it doesn't exist
      countryTitle = document.createElement("h1");
      countryTitle.id = "country-stats-title";
      countryTitle.style.marginBottom = "25px"; // Add some spacing

      // Find the element after which we want to insert the title (e.g., the search-section)
      const searchSection = document.querySelector(".search-section");
      if (searchSection) {
        // Insert the new title element right after the search section
        searchSection.parentNode.insertBefore(
          countryTitle,
          searchSection.nextSibling
        );
      } else {
        // Fallback: append to tracker if search-section isn't found
        trackerSection.appendChild(countryTitle);
      }
    }

    // Set the new title text
    countryTitle.innerHTML = `Statistics for <span>${formattedCountryName}</span>`;
    // To style the title similar to your other titles, you can add a class:
    // countryTitle.classList.add('section-title-style');

    // 3. Update the Data Cards (cleaned up the redundant variable assignments)
    document.getElementById(
      "active"
    ).innerText = `${data.population.toLocaleString()}`; // Assuming 'active' was intended for population
    document.getElementById(
      "cases"
    ).innerText = `${data.cases.toLocaleString()}`;
    document.getElementById(
      "tests"
    ).innerText = `${data.tests.toLocaleString()}`;
    document.getElementById(
      "recovered"
    ).innerText = `${data.recovered.toLocaleString()}`;
    document.getElementById(
      "critical"
    ).innerText = `${data.critical.toLocaleString()}`;
    document.getElementById(
      "deaths"
    ).innerText = `${data.deaths.toLocaleString()}`;

    // Optional: Clear search box after successful search
    document.getElementById("searchbox").value = "";
  } catch (err) {
    console.error(err); // Log the detailed error
    alert(
      "Something went wrong while fetching data. Check your network or the API status."
    );
  }
}

// Ensure the rest of your code remains the same
let search = document.getElementById("searchbox");
let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", sortData);
search.addEventListener("keypress", (e) => {
  // Only call sortData and clear input on 'Enter' key
  if (e.key === "Enter") {
    sortData();
  }
});

// FOR CHECKBOX FUNCTIONALITY
const menuToggle = document.getElementById("menu-toggle");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuToggle.checked = false; // uncheck the box
  });
});
