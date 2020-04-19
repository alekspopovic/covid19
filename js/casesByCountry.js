import Utilities from "./Utilities.js";

let utilities = new Utilities();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const apiEndpoint = "https://corona.lmao.ninja/v2/countries";

fetch(apiEndpoint, requestOptions)
.then(response => response.text())
.then(result => {
    let data = JSON.parse(result);
    let dataContainer = document.getElementById("casesByCountry");

    let countryDiv, countryNameDiv, casesDiv, todayCasesDiv, deathsDiv;
    let todayDeathsDiv, recoveredDiv, criticalDiv;

    data.forEach(country => {
        countryDiv = utilities.createElement("div", "data", "");
        countryDiv = utilities.addEvent(countryDiv, "selected");
        countryDiv = utilities.addTouchEvent(countryDiv, "selected");
        countryDiv.setAttribute("data-value", country.country.toLowerCase());

        countryNameDiv = utilities.createElement("div", "", country.country);

        countryDiv.appendChild(countryNameDiv);

        casesDiv = utilities.createElement("div", "", country.cases);
        todayCasesDiv = utilities.createElement("div", "", country.todayCases);
        deathsDiv = utilities.createElement("div", "", country.deaths);
        todayDeathsDiv = utilities.createElement("div", "", country.todayDeaths);
        recoveredDiv = utilities.createElement("div", "", country.recovered);
        criticalDiv = utilities.createElement("div", "", country.critical);

        countryDiv.appendChild(casesDiv);
        countryDiv.appendChild(todayCasesDiv);
        countryDiv.appendChild(deathsDiv);
        countryDiv.appendChild(todayDeathsDiv);
        countryDiv.appendChild(recoveredDiv);
        countryDiv.appendChild(criticalDiv);

        dataContainer.appendChild(countryDiv);
    });

    
})
.catch(error => {
    console.log('error', error);

    let news = document.getElementsByClassName("news")[0];
    news.innerHTML = "There was an error while retrieving the news. Please try again. " + error;
});