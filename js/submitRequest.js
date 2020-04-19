let countries, lastDays, cases, deaths, recovered;

let submitButton = document.getElementById("drawButton");

submitButton.addEventListener("click", function() {
    let daysRadio = document.querySelector('input[name="time"]:checked');
    let casesCheckbox = document.querySelector('input[name="cases"]:checked');
    let deathsCheckbox = document.querySelector('input[name="deaths"]:checked');
    let recoveredCheckbox = document.querySelector('input[name="recovered"]:checked');

    if (daysRadio) {
        lastDays = daysRadio.value;
    }

    if (casesCheckbox) {
        cases = true;
    } else {
        cases = false;
    }

    if (deathsCheckbox) {
        deaths = true;
    } else {
        deaths = false;
    }

    if (recoveredCheckbox) {
        recovered = true;
    } else {
        recovered = false;
    }

    // show cases by default if nothing is selected
    if (!cases && !deaths && !recovered) {
        cases = true;
    }

    let selectedCountries = document.getElementsByClassName("selected");
    countries = new Array();

    for (let country of selectedCountries) {
        countries.push(country.getAttribute("data-value"));
    }

    let allCountries = countries.join(',');

    let url = `/covid19/?countries=${allCountries}`;

    if (cases) {
        url =`${url}&cases=true`;
    }

    if (deaths) {
        url =`${url}&deaths=true`;
    }

    if (recovered) {
        url =`${url}&recovered=true`;
    }

    if (lastDays) {
        url =`${url}&lastDays=${lastDays}`;
    }

    window.location.href = url;
});